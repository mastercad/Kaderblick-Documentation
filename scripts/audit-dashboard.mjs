import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const baseUrl = 'https://demo.kaderblick.de';
const output = new URL('../var/dashboard-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/coaches/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();

async function removeCookieOverlay() {
  const notice = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
  if (!await notice.isVisible().catch(() => false)) return;
  await notice.evaluate((node) => {
    let element = node;
    while (element && element !== document.body) {
      if (getComputedStyle(element).position === 'fixed') { element.remove(); return; }
      element = element.parentElement;
    }
  });
}

await page.goto(`${baseUrl}/dashboard`, { waitUntil: 'domcontentloaded' });
const main = page.locator('main').first();
await main.waitFor({ timeout: 30000 });
await waitForReady(page, main);
await removeCookieOverlay();

await page.getByRole('button', { name: /widget hinzufügen/i }).click();
let dialog = page.getByRole('dialog').last();
await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('widget-hinzufuegen.png', output).pathname });
await writeFile(new URL('widget-hinzufuegen.txt', output), await dialog.innerText());
await dialog.getByText(/statistik-widget/i).click();
await page.waitForTimeout(800);
dialog = page.getByRole('dialog').last();
await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('bericht-widget-hinzufuegen.png', output).pathname });
await writeFile(new URL('bericht-widget-hinzufuegen.txt', output), await dialog.innerText());
await dialog.getByRole('button', { name: /abbrechen/i }).click();

await page.getByTitle('Einstellungen').first().click();
dialog = page.getByRole('dialog').last();
await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('widget-settings.png', output).pathname });
await writeFile(new URL('widget-einstellungen.txt', output), await dialog.innerText());
await dialog.getByRole('button', { name: /abbrechen/i }).click();

await page.getByTitle('Entfernen').first().click();
dialog = page.getByRole('dialog').last();
await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('widget-entfernen.png', output).pathname });
await writeFile(new URL('widget-entfernen.txt', output), await dialog.innerText());
await dialog.getByRole('button', { name: /abbrechen/i }).click();

await browser.close();
console.log('Dashboard-Aktionen geprüft und aufgenommen.');
