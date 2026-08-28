import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const output = new URL('../var/import-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/coaches/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();
const failures = [];
page.on('response', (response) => {
  if (response.url().includes('/api/') && response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
});

async function removePrivacyBanner() {
  const privacy = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
  if (await privacy.isVisible().catch(() => false)) await privacy.evaluate((node) => {
    let element = node;
    while (element && element !== document.body) {
      if (getComputedStyle(element).position === 'fixed') { element.remove(); return; }
      element = element.parentElement;
    }
  });
}

async function capture(path, heading, file, requireHeading = true) {
  await page.goto(`https://demo.kaderblick.de${path}`, { waitUntil: 'networkidle', timeout: 30000 });
  await removePrivacyBanner();
  if (requireHeading) await page.getByRole('heading', { name: heading }).first().waitFor({ timeout: 15000 });
  await page.waitForTimeout(1500);
  const main = page.locator('main').first();
  await waitForReady(page, main); await main.screenshot({ path: new URL(`${file}.png`, output).pathname });
  await writeFile(new URL(`${file}.txt`, output), await main.innerText());
}

await capture('/imports', 'fussball.de Importe', 'verlauf');
await capture('/imports/browser-extension', /Browser-Erweiterung/i, 'browser-erweiterung', false);
await page.goto('https://demo.kaderblick.de/imports/extension-connect', { waitUntil: 'networkidle', timeout: 30000 });
await removePrivacyBanner();
await page.waitForTimeout(1500);
const connect = page.locator('main').first();
await waitForReady(page, connect); await connect.screenshot({ path: new URL('verbindung.png', output).pathname });
await writeFile(new URL('verbindung.txt', output), await connect.innerText());
await writeFile(new URL('fehler.txt', output), failures.join('\n'));
await browser.close();
console.log('fussball.de-Import als Trainer geprüft.');
