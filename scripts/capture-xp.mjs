import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir } from 'node:fs/promises';

const baseUrl = 'https://demo.kaderblick.de';
const output = new URL('../var/xp-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/superadmin/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();

for (const [name, route] of [
  ['hall-of-fame', '/hall-of-fame'],
  ['title-xp-overview', '/admin/title-xp-overview'],
  ['xp-config', '/admin/xp-config'],
]) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
  await page.locator('main').waitFor();
  await page.waitForTimeout(2500);
  const notice = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
  if (await notice.isVisible().catch(() => false)) await notice.evaluate((node) => {
    let element = node;
    while (element && element !== document.body) {
      if (getComputedStyle(element).position === 'fixed') { element.remove(); break; }
      element = element.parentElement;
    }
  });
  await waitForReady(page, page.locator('main')); await page.locator('main').screenshot({ path: new URL(`${name}.png`, output).pathname });
}
await browser.close();
console.log('XP- und Titelbereiche aufgenommen.');
