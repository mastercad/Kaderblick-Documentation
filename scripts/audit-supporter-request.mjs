import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';

const output = new URL('../var/supporter-request-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'de-DE', storageState: new URL('../var/ui-audit/player/storage-state.json', import.meta.url).pathname });
const page = await context.newPage();
await page.goto('https://demo.kaderblick.de/games/178', { waitUntil: 'networkidle' });
const privacy = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
if (await privacy.isVisible().catch(() => false)) await privacy.evaluate((node) => { let e = node; while (e && e !== document.body) { if (getComputedStyle(e).position === 'fixed') { e.remove(); return; } e = e.parentElement; } });
await waitForReady(page, page.locator('main'));
const actions = page.getByRole('button', { name: /Ereignis hinzufügen|Video hinzufügen|Quick Event/i });
await writeFile(new URL('available-actions.txt', output), (await actions.allTextContents()).join('\n'));
if (await actions.count()) {
  await actions.first().click();
  const dialog = page.getByRole('dialog').last();
  await dialog.waitFor();
  await waitForReady(page, dialog);
  await dialog.screenshot({ path: new URL('request.png', output).pathname });
  await writeFile(new URL('request.txt', output), await dialog.innerText());
}
await browser.close();
console.log('Supporter-Anfrageeinstieg als Spieler geprüft.');
