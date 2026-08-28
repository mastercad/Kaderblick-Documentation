import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { docsLocale, forceDemoLocale, messages } from './lib/demo-locale.mjs';
const locale = process.env.DEMO_LOCALE ?? 'de';
const output = new URL(`../var/formations-audit/${docsLocale(locale)}/`, import.meta.url);
await mkdir(output, { recursive: true });
const formationsMessages = await messages('formations', locale);
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1200 }, locale, storageState: new URL('../var/ui-audit/trainer/storage-state.json', import.meta.url).pathname });
const page = await context.newPage(); const failures = [];
await page.route('**/api/**', async (route) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(route.request().method())) {
    await route.abort('blockedbyclient');
    return;
  }
  await route.continue();
});
await forceDemoLocale(page, locale);
page.on('response', r => { if (r.url().includes('/api/') && r.status() >= 400) failures.push(`${r.status()} ${r.url()}`); });
await page.goto('https://demo.kaderblick.de/formations', { waitUntil: 'networkidle', timeout: 30000 });
const privacy = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
if (await privacy.isVisible().catch(() => false)) await privacy.evaluate(node => { let e = node; while (e && e !== document.body) { if (getComputedStyle(e).position === 'fixed') { e.remove(); return; } e = e.parentElement; } });
const main = page.locator('main').first(); await waitForReady(page, main);
await main.screenshot({ path: new URL('overview.png', output).pathname }); await writeFile(new URL('uebersicht.txt', output), await main.innerText());
const add = page.getByRole('button', { name: formationsMessages['formations.create'], exact: true }).first();
if (await add.isVisible().catch(() => false)) {
  await add.click(); let dialog = page.getByRole('dialog').last(); await waitForReady(page, dialog);
  await dialog.screenshot({ path: new URL('auswahl.png', output).pathname }); await writeFile(new URL('auswahl.txt', output), await dialog.innerText());
  await dialog.getByText('4-4-2', { exact: true }).click(); dialog = page.getByRole('dialog').last(); await waitForReady(page, dialog);
  await dialog.screenshot({ path: new URL('editor.png', output).pathname }); await writeFile(new URL('editor.txt', output), await dialog.innerText());
}
await writeFile(new URL('fehler.txt', output), failures.join('\n')); await browser.close(); console.log('Formationen als Trainer geprüft.');
