import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
const output = new URL('../var/size-guide-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, locale: 'de-DE', storageState: new URL('../var/ui-audit/coaches/storage-state.json', import.meta.url).pathname });
const page = await context.newPage(); const failures = [];
page.on('response', r => { if (r.url().includes('/api/') && r.status() >= 400) failures.push(`${r.status()} ${r.url()}`); });
await page.goto('https://demo.kaderblick.de/team-size-guide', { waitUntil: 'networkidle', timeout: 30000 });
const privacy = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
if (await privacy.isVisible().catch(() => false)) await privacy.evaluate(node => { let e=node; while(e&&e!==document.body){if(getComputedStyle(e).position==='fixed'){e.remove();return;}e=e.parentElement;} });
await page.waitForTimeout(1800); const main = page.locator('main').first();
await waitForReady(page, main); await main.screenshot({ path: new URL('overview.png', output).pathname });
await waitForReady(page, page); await page.screenshot({ path: new URL('gesamtseite.png', output).pathname, fullPage: true });
await writeFile(new URL('inhalt.txt', output), await main.innerText());
const reminderLabels = { fr: /Envoyer rappel/i };
const reminder = page.getByRole('button', { name: reminderLabels[process.env.DEMO_LOCALE] ?? /Erinnerung senden/i }).first();
if (await reminder.isVisible().catch(() => false) && await reminder.isEnabled()) {
  await reminder.click(); const dialog = page.getByRole('dialog').last(); await dialog.waitFor();
  await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('erinnerung.png', output).pathname });
  await writeFile(new URL('erinnerung.txt', output), await dialog.innerText());
  await page.keyboard.press('Escape'); await dialog.waitFor({ state: 'hidden' });
}
const order = page.getByRole('button', { name: /Bestellung erstellen/i }).first();
if (await order.isVisible().catch(() => false)) {
  await order.click(); const dialog = page.getByRole('dialog').last(); await dialog.waitFor();
  await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('bestellung.png', output).pathname });
  await writeFile(new URL('bestellung.txt', output), await dialog.innerText());
}
await writeFile(new URL('fehler.txt', output), failures.join('\n'));
await browser.close(); console.log('Teamgrößen-Ratgeber als Trainer geprüft.');
