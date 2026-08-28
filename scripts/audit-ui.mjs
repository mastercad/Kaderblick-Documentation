import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const baseUrl = process.env.KB_DOC_BASE_URL ?? 'http://localhost:5173';
const email = process.env.KB_DOC_EMAIL;
const password = process.env.KB_DOC_PASSWORD;
const storageState = process.env.KB_DOC_STATE;
const profile = (process.env.KB_DOC_PROFILE ?? 'default').replace(/[^a-z0-9_-]/gi, '-');

if (!storageState && (!email || !password)) {
  throw new Error('KB_DOC_EMAIL und KB_DOC_PASSWORD müssen gesetzt sein.');
}

const allRoutes = [
  '/dashboard', '/calendar', '/games', '/my-matchday', '/help-out',
  '/imports', '/reports', '/my-team', '/mein-verein', '/training-proofs',
  '/my-balance', '/news', '/surveys', '/knowledge-pool', '/hall-of-fame',
  '/tasks', '/tasks/created', '/tasks/all', '/team-size-guide', '/formations',
  '/players', '/teams', '/watchlist', '/quick-event-konfigurationen',
  '/admin/user-relations', '/admin/staff-assignments', '/admin/functionary-assignments',
  '/cash-book', '/billing', '/fines-catalogue', '/inventory', '/clubs',
  '/coaches', '/locations', '/competitions', '/cameras', '/videoTypes',
  '/ageGroups', '/positions', '/strongFeets', '/surfaceTypes', '/gameEventTypes',
  '/nationalities', '/coachLicenses', '/admin/title-xp-overview', '/admin/xp-config',
  '/admin/karten-regeln', '/admin/aushelfer-regeln', '/admin/poster-vorlagen',
  '/admin/system-settings', '/admin/activity', '/admin/analytics',
  '/admin/unknown-game-events', '/admin/system-maintenance', '/admin/billing',
  '/admin/feedback', '/mein-feedback', '/test'
];
const requestedRoutes = (process.env.KB_DOC_ROUTES ?? '').split(',').map((route) => route.trim()).filter(Boolean);
const routes = requestedRoutes.length ? allRoutes.filter((route) => requestedRoutes.includes(route)) : allRoutes;
if (requestedRoutes.length && routes.length !== requestedRoutes.length) {
  throw new Error(`Unbekannte Route in KB_DOC_ROUTES: ${requestedRoutes.filter((route) => !allRoutes.includes(route)).join(', ')}`);
}

const outputDirectory = new URL(`../var/ui-audit/${profile}/`, import.meta.url);
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.KB_DOC_BROWSER ?? '/usr/bin/google-chrome'
});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'de-DE', ...(storageState ? { storageState } : {}) });
const page = await context.newPage();
const authDiagnostics = [];
page.on('response', (response) => {
  if (/\/api\/(login|about-me)/.test(response.url())) {
    authDiagnostics.push({ url: response.url(), status: response.status() });
  }
});
page.on('requestfailed', (request) => {
  if (/\/api\//.test(request.url())) {
    authDiagnostics.push({ url: request.url(), failure: request.failure()?.errorText ?? 'unknown' });
  }
});

await page.goto(storageState ? `${baseUrl}/dashboard` : baseUrl, { waitUntil: 'networkidle' });
if (!storageState) {
  const loginButton = page.getByRole('button', { name: /anmelden|login/i }).first();
  await loginButton.click();
  const authDialog = page.getByRole('dialog');
  await authDialog.locator('input[type="email"]').fill(email);
  await authDialog.locator('input[type="password"]').fill(password);
  await authDialog.locator('form button[type="submit"]').click();
}
try {
  if (!storageState) await page.waitForURL(/\/dashboard/, { timeout: 20000 });
} catch (error) {
  await waitForReady(page, page); await page.screenshot({ path: new URL('login-failure.png', outputDirectory).pathname, fullPage: true });
  await writeFile(new URL('login-failure.txt', outputDirectory), await page.locator('body').innerText());
  await writeFile(new URL('login-diagnostics.json', outputDirectory), JSON.stringify(authDiagnostics, null, 2));
  throw error;
}

const results = [];
for (const route of routes) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(900);
  const bodyText = await page.locator('body').innerText();
  const headings = await page.locator('h1, h2, h3, [role="heading"]').allInnerTexts();
  const buttons = await page.getByRole('button').allInnerTexts();
  const tabs = await page.getByRole('tab').allInnerTexts();
  const links = await page.getByRole('link').allInnerTexts();
  const fileName = route.replace(/^\//, '').replaceAll('/', '--') || 'home';
  await waitForReady(page, page); await page.screenshot({ path: new URL(`${fileName}.png`, outputDirectory).pathname, fullPage: true });
  results.push({
    requestedRoute: route,
    finalUrl: page.url(),
    status: response?.status() ?? null,
    title: await page.title(),
    headings,
    buttons,
    tabs,
    links,
    bodyText
  });
}

await writeFile(new URL('audit.json', outputDirectory), JSON.stringify(results, null, 2));
await context.storageState({ path: new URL('storage-state.json', outputDirectory).pathname });
await browser.close();

console.log(`Geprüfte Routen: ${results.length}`);
