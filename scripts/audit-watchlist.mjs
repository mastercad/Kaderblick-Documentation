import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const output = new URL('../var/watchlist-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, locale: 'de-DE', storageState: new URL('../var/ui-audit/coaches/storage-state.json', import.meta.url).pathname });
const page = await context.newPage();
const failures = [];
page.on('response', (response) => { if (response.url().includes('/api/') && response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
await page.goto('https://demo.kaderblick.de/watchlist', { waitUntil: 'networkidle', timeout: 30000 });
const privacy = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
if (await privacy.isVisible().catch(() => false)) await privacy.evaluate((node) => { let element = node; while (element && element !== document.body) { if (getComputedStyle(element).position === 'fixed') { element.remove(); return; } element = element.parentElement; } });
await page.getByRole('heading', { name: /Beobachtungsliste/i }).first().waitFor();
await page.waitForTimeout(1500);
const main = page.locator('main').first();
await waitForReady(page, main); await main.screenshot({ path: new URL('overview.png', output).pathname });
await writeFile(new URL('uebersicht.txt', output), await main.innerText());
const add = page.getByRole('button', { name: /Hinzufügen|Erste Person/i }).first();
if (await add.isVisible().catch(() => false)) {
  await add.click();
  const dialog = page.getByRole('dialog').last();
  await dialog.waitFor();
  await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('person-hinzufuegen.png', output).pathname });
  await writeFile(new URL('person-hinzufuegen.txt', output), await dialog.innerText());
}
await writeFile(new URL('fehler.txt', output), failures.join('\n'));
await browser.close();
console.log('Beobachtungsliste als Trainer geprüft.');
