import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const baseUrl = process.env.KB_DOCS_URL ?? 'http://127.0.0.1:8099';
const output = new URL('../var/docs-render-audit/', import.meta.url);
await mkdir(output, { recursive: true });

const locales = ['de', 'en', 'fr', 'ru', 'zh_Hans'];
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
];
const visualRoutes = ['/', '/roles', '/profile', '/xp-system', '/games', '/reports', '/knowledge-pool', '/admin'];
const findings = [];
const results = [];

function localPath(value) {
  const url = new URL(value, baseUrl);
  if (url.origin !== new URL(baseUrl).origin) return null;
  if (url.pathname.startsWith('/_profiler') || url.pathname.startsWith('/_wdt')) return null;
  if (/\.(?:png|jpe?g|gif|svg|webp|ico|css|js|woff2?|pdf|csv|zip|mtl|obj|stl|glb|gltf)$/i.test(url.pathname)) return null;
  // Camera pages contain continuously animated WebGL views. They are checked
  // separately and excluded from the general render audit.
  if (url.pathname.startsWith('/tools/camera/')) return null;
  return url.pathname;
}

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });

async function readLayoutGeometry(page) {
  return page.evaluate(() => {
    const rect = (selector) => {
      const box = document.querySelector(selector)?.getBoundingClientRect();
      return box ? { top: box.top, right: box.right, bottom: box.bottom, left: box.left, width: box.width, height: box.height } : null;
    };
    const toggle = document.querySelector('.sidebar-toggle');
    return {
      header: rect('.site-header'),
      sidebar: rect('.sidebar'),
      main: rect('.site-content'),
      toggleVisible: toggle ? getComputedStyle(toggle).display !== 'none' : false,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });
}

// Discover every route exposed through the documentation navigation and page links.
const discovery = await browser.newPage({ viewport: viewports[0] });
const queue = ['/'];
const routes = new Set();
while (queue.length) {
  const route = queue.shift();
  if (routes.has(route)) continue;
  routes.add(route);
  const response = await discovery.goto(`${baseUrl}${route}?lang=de`, { waitUntil: 'domcontentloaded' });
  if (!response?.ok()) {
    findings.push(`Routenentdeckung ${route}: HTTP ${response?.status() ?? 'ohne Antwort'}`);
    continue;
  }
  for (const href of await discovery.locator('a[href]').evaluateAll((links) => links.map((link) => link.href))) {
    const path = localPath(href);
    if (path && !routes.has(path)) queue.push(path);
  }
}
await discovery.close();

// Every discovered page must render successfully and use the requested locale.
const routePage = await browser.newPage({ viewport: viewports[0] });
for (const locale of locales) {
  for (const route of [...routes].sort()) {
    const response = await routePage.goto(`${baseUrl}${route}?lang=${locale}`, { waitUntil: 'domcontentloaded' });
    const state = await routePage.evaluate(() => ({
      lang: document.documentElement.lang,
      heading: document.querySelector('main h1')?.textContent?.trim() ?? '',
      mainTextLength: document.querySelector('main')?.innerText.trim().length ?? 0,
      flags: document.querySelector('#docs-language')?.innerText ?? '',
      horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
    }));
    const expectedLang = locale.replace('_', '-');
    if (!response?.ok()) findings.push(`${locale} ${route}: HTTP ${response?.status() ?? 'ohne Antwort'}`);
    if (state.lang !== expectedLang) findings.push(`${locale} ${route}: lang=${state.lang}, erwartet ${expectedLang}`);
    if (!state.heading || state.mainTextLength < 40) findings.push(`${locale} ${route}: Hauptinhalt fehlt oder ist zu kurz`);
    if (!['🇩🇪', '🇬🇧', '🇫🇷', '🇷🇺', '🇨🇳'].every((flag) => state.flags.includes(flag))) findings.push(`${locale} ${route}: Sprachflaggen unvollständig`);
    if (state.horizontalOverflow > 2) findings.push(`${locale} ${route}: horizontales Überlaufen um ${state.horizontalOverflow}px`);
    results.push({ locale, route, status: response?.status() ?? null, ...state });
  }
}
await routePage.close();

// Check layout geometry, theme switching and mobile navigation on representative pages.
for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  for (const locale of locales) {
    for (const route of visualRoutes) {
      await page.goto(`${baseUrl}${route}?lang=${locale}`, { waitUntil: 'domcontentloaded' });
      let geometry = await readLayoutGeometry(page);
      if (!geometry.main || !geometry.header) {
        await page.reload({ waitUntil: 'domcontentloaded' });
        geometry = await readLayoutGeometry(page);
      }
      if (!geometry.main || !geometry.header) findings.push(`${viewport.name} ${locale} ${route}: Layoutbereiche fehlen`);
      if (geometry.main && geometry.header && geometry.main.top < geometry.header.bottom - 1) findings.push(`${viewport.name} ${locale} ${route}: Inhalt liegt unter dem Kopfbereich`);
      if (viewport.name === 'desktop' && geometry.main && geometry.sidebar && geometry.main.left < geometry.sidebar.right - 1) findings.push(`${viewport.name} ${locale} ${route}: Inhalt liegt unter der Navigation`);
      if (viewport.name !== 'desktop' && !geometry.toggleVisible) findings.push(`${viewport.name} ${locale} ${route}: mobile Menütaste fehlt`);
      if (geometry.overflow > 2) findings.push(`${viewport.name} ${locale} ${route}: horizontales Überlaufen um ${geometry.overflow}px`);
    }
  }

  await page.goto(`${baseUrl}/roles?lang=de`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.setItem('kaderblick-docs-theme', 'light'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.locator('.theme-toggle').click();
  const theme = await page.evaluate(() => ({ html: document.documentElement.dataset.theme, saved: localStorage.getItem('kaderblick-docs-theme'), pressed: document.querySelector('.theme-toggle')?.getAttribute('aria-pressed') }));
  if (theme.html !== 'dark' || theme.saved !== 'dark' || theme.pressed !== 'true') findings.push(`${viewport.name}: Dark-Mode-Umschaltung fehlerhaft`);

  if (viewport.name !== 'desktop') {
    await page.locator('.sidebar-toggle').click();
    const opened = await page.evaluate(() => ({ open: document.querySelector('.sidebar')?.classList.contains('sidebar--open'), expanded: document.querySelector('.sidebar-toggle')?.getAttribute('aria-expanded') }));
    if (!opened.open || opened.expanded !== 'true') findings.push(`${viewport.name}: Navigation öffnet nicht`);
    await page.keyboard.press('Escape');
    const closed = await page.evaluate(() => ({ open: document.querySelector('.sidebar')?.classList.contains('sidebar--open'), expanded: document.querySelector('.sidebar-toggle')?.getAttribute('aria-expanded') }));
    if (closed.open || closed.expanded !== 'false') findings.push(`${viewport.name}: Navigation schließt nicht mit Escape`);
  }

  await page.screenshot({ path: new URL(`${viewport.name}-roles-dark.png`, output).pathname, fullPage: true });
  await page.close();
}

// The visible header field must open its result list, build a locale-specific index and link to a matching section.
const searchPage = await browser.newPage({ viewport: viewports[0] });
await searchPage.goto(`${baseUrl}/?lang=de`, { waitUntil: 'domcontentloaded' });
await searchPage.locator('[data-search-input]').focus();
if (await searchPage.locator('[data-search-popover]').getAttribute('hidden') !== null) findings.push('Suche: Trefferliste öffnet nicht am Suchfeld');
await searchPage.locator('[data-search-input]').fill('Hall of Fame');
try {
  await searchPage.locator('.search-result__link').first().waitFor({ state: 'visible', timeout: 15000 });
  const searchResult = await searchPage.locator('.search-result__link').first().evaluate((link) => ({ text: link.textContent, href: link.getAttribute('href') }));
  if (!searchResult.text?.includes('Hall of Fame')) findings.push('Suche: erwarteter XP-Treffer fehlt');
  const resultUrl = new URL(searchResult.href, baseUrl);
  if (resultUrl.pathname !== '/xp-system' || !resultUrl.hash) findings.push(`Suche: Treffer verweist nicht auf den passenden Abschnitt (${searchResult.href})`);
  if (await searchPage.locator('.search-result__link').first().locator('mark').count() === 0) findings.push('Suche: Suchbegriff wird im Treffer nicht hervorgehoben');
  if (await searchPage.locator('.search-result__link').first().locator('.search-result__match').count() !== 1) findings.push('Suche: Trefferart fehlt');
  const snippet = await searchPage.locator('.search-result__link').first().locator('.search-result__snippet').innerText();
  if (!snippet.toLocaleLowerCase('de').includes('hall of fame')) findings.push('Suche: Textausschnitt zeigt die Fundstelle nicht');
  await searchPage.locator('[data-search-input]').fill('XP');
  await searchPage.locator('.search-result__link').first().waitFor({ state: 'visible' });
  const categories = await searchPage.locator('.search-result__link').evaluateAll((links) => links.map((link) => ({
    title: link.querySelector('.search-result__title')?.textContent?.trim(),
    category: link.querySelector('.search-result__match')?.textContent?.trim(),
  })));
  if (categories.find((item) => item.title === 'Hall of Fame')?.category !== 'Treffer im Inhalt') findings.push('Suche: Hall of Fame wird für XP nicht als Inhaltstreffer erkannt');
  if (categories.find((item) => item.title === 'Deine XP-Aufschlüsselung öffnen')?.category !== 'Treffer in der Überschrift') findings.push('Suche: XP-Aufschlüsselung wird nicht als Überschriftentreffer erkannt');
} catch (_) {
  findings.push('Suche: innerhalb von 15 Sekunden kein Treffer');
}
await searchPage.keyboard.press('Escape');
if (await searchPage.locator('[data-search-popover]').getAttribute('hidden') === null) findings.push('Suche: Trefferliste schließt nicht mit Escape');
await searchPage.close();

await browser.close();
await writeFile(new URL('results.json', output), JSON.stringify({ generatedAt: new Date().toISOString(), routes: [...routes].sort(), results, findings }, null, 2));

if (findings.length) {
  console.error(findings.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Render-Audit ohne Befund: ${routes.size} Routen × ${locales.length} Sprachen; Desktop, Tablet und Mobil geprüft.`);
}
