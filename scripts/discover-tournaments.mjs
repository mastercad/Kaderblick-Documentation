import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/coaches/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();
const calendarUrls = [];
const dataUrls = [];
page.on('response', (response) => {
  if (/calendar|event/i.test(response.url())) calendarUrls.push(response.url());
  if (['fetch', 'xhr'].includes(response.request().resourceType())) dataUrls.push({ url: response.url(), status: response.status() });
});
await page.goto('https://demo.kaderblick.de/calendar', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(5000);
const result = await page.evaluate(async (observed) => {
  if (!observed) return { status: 0, url: '', contentType: '', body: 'Kein Kalender-API-Aufruf beobachtet' };
  const target = new URL(observed);
  target.searchParams.set('start', '2023-01-01T00:00:00.000Z');
  target.searchParams.set('end', '2027-12-31T23:59:59.999Z');
  const response = await fetch(target.toString(), { credentials: 'include', headers: { 'Accept-Language': 'de' } });
  const text = await response.text();
  let body;
  try { body = JSON.parse(text); } catch { body = text.slice(0, 1000); }
  return { status: response.status, url: response.url, contentType: response.headers.get('content-type'), body };
}, dataUrls.find((entry) => /calendar.*events|events.*calendar/i.test(entry.url))?.url);
await writeFile(new URL('../var/tournament-network.json', import.meta.url), JSON.stringify({ pageUrl: page.url(), calendarUrls, dataUrls }, null, 2));
await writeFile(new URL('../var/tournament-discovery.json', import.meta.url), JSON.stringify(result, null, 2));
const serialized = JSON.stringify(result.body);
const matches = [...serialized.matchAll(/"tournament"\s*:\s*\{[^}]*?"id"\s*:\s*(\d+)/g)].map((match) => match[1]);
console.log(`Status ${result.status}; URL ${result.url}; Typ ${result.contentType}; Turnier-IDs: ${[...new Set(matches)].join(', ') || 'keine'}`);
await browser.close();
