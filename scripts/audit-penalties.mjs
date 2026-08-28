import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const output = new URL('../var/penalties-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1050 },
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/coaches/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();
await page.goto('https://demo.kaderblick.de/fines-catalogue', { waitUntil: 'networkidle' });
const privacy = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
if (await privacy.isVisible().catch(() => false)) {
  await privacy.evaluate((node) => {
    let element = node;
    while (element && element !== document.body) {
      if (getComputedStyle(element).position === 'fixed') { element.remove(); return; }
      element = element.parentElement;
    }
  });
}
const main = page.locator('main').first();
await main.waitFor({ timeout: 30000 });
await waitForReady(page, main); await main.screenshot({ path: new URL('katalog.png', output).pathname });
await writeFile(new URL('katalog.txt', output), await main.innerText());

let create = page.getByRole('button', { name: /Neuer Typ/i });
if (!await create.isVisible().catch(() => false)) create = main.getByRole('button').first();
if (await create.isVisible().catch(() => false)) {
  await create.click();
  const dialog = page.getByRole('dialog').last();
  await dialog.waitFor();
  await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('neuer-typ.png', output).pathname });
  await writeFile(new URL('neuer-typ.txt', output), await dialog.innerText());
  await dialog.getByRole('button', { name: /Abbrechen/i }).click();
}

const assignTab = page.getByRole('tab', { name: /Strafe vergeben/i });
if (await assignTab.isVisible().catch(() => false)) {
  await assignTab.click();
  await page.waitForTimeout(500);
  await waitForReady(page, main); await main.screenshot({ path: new URL('vergeben.png', output).pathname });
  await writeFile(new URL('vergeben.txt', output), await main.innerText());
}
await browser.close();
console.log('Strafenkatalog und Vergabe geprüft.');
