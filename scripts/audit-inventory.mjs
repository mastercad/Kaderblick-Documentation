import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const output = new URL('../var/inventory-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 }, locale: 'de-DE',
  storageState: new URL('../var/ui-audit/kit-manager/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();
const failures = [];
page.on('response', (r) => { if (r.url().includes('/api/') && r.status() >= 400) failures.push(`${r.status()} ${r.url()}`); });
await page.goto('https://demo.kaderblick.de/inventory', { waitUntil: 'networkidle', timeout: 30000 });
const privacy = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
if (await privacy.isVisible().catch(() => false)) await privacy.evaluate((node) => {
  let element = node;
  while (element && element !== document.body) {
    if (getComputedStyle(element).position === 'fixed') { element.remove(); return; }
    element = element.parentElement;
  }
});
await page.locator('main').first().waitFor({ state: 'visible' });
await page.waitForTimeout(2500);
const main = page.locator('main').first();
await waitForReady(page, main); await main.screenshot({ path: new URL('overview.png', output).pathname });
await writeFile(new URL('uebersicht.txt', output), await main.innerText());
await writeFile(new URL('fehler.txt', output), failures.join('\n'));
let add = page.getByRole('button', { name: /Neuer Artikel|Ersten Artikel/i }).first();
if (!await add.isVisible().catch(() => false)) add = main.getByRole('button').first();
if (await add.isVisible().catch(() => false)) {
  await add.click();
  const dialog = page.getByRole('dialog').last();
  await dialog.waitFor();
  await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('neuer-artikel.png', output).pathname });
  await writeFile(new URL('neuer-artikel.txt', output), await dialog.innerText());
}
await browser.close();
console.log('Inventar als Zeugwart geprüft.');
