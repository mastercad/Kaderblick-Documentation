import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const baseUrl = process.env.KB_DOCS_URL ?? 'http://127.0.0.1:8083';
const output = new URL('../var/integrated-sections-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const routes = ['/getting-started', '/lineups', '/lineups/plan-tactics', '/calendar', '/help-out', '/games'];
const locales = ['de', 'en', 'fr', 'ru', 'zh_Hans'];
const results = [];
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
for (const locale of locales) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}?lang=${locale}`, { waitUntil: 'networkidle' });
    const state = await page.evaluate(() => ({
      headings: [...document.querySelectorAll('main h2, main h3')].map((node) => node.textContent.trim()),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      mainTop: document.querySelector('main')?.getBoundingClientRect().top,
      headerBottom: document.querySelector('.site-header')?.getBoundingClientRect().bottom,
      markerTextVisible: document.querySelector('main')?.innerText.includes('registration-context:start'),
    }));
    results.push({ locale, route, status: response?.status(), ...state });
    if (locale === 'de') await page.screenshot({ path: new URL(`${route.slice(1).replaceAll('/', '-')}.png`, output).pathname, fullPage: true });
  }
  await page.close();
}
await browser.close();
const findings = results.filter((item) => item.status !== 200 || item.overflow > 2 || item.mainTop < item.headerBottom || item.markerTextVisible);
await writeFile(new URL('results.json', output), `${JSON.stringify({ results, findings }, null, 2)}\n`);
if (findings.length) throw new Error(JSON.stringify(findings));
console.log(`Geordnete Fachabschnitte geprüft: ${results.length} Seitenvarianten ohne Darstellungsfehler.`);
