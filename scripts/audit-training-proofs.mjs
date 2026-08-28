import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const output = new URL('../var/training-proofs-audit/', import.meta.url);
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: '/usr/bin/google-chrome',
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/coaches/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();
await page.goto('https://demo.kaderblick.de/training-proofs', { waitUntil: 'networkidle' });

const consent = page.getByRole('button', { name: /Nur notwendige/i });
if (await consent.isVisible().catch(() => false)) {
  await consent.click();
  await page.waitForTimeout(500);
}
const privacyHeading = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
if (await privacyHeading.isVisible().catch(() => false)) {
  await privacyHeading.evaluate((node) => {
    let element = node;
    while (element && element !== document.body) {
      if (getComputedStyle(element).position === 'fixed') {
        element.remove();
        return;
      }
      element = element.parentElement;
    }
  });
}

const heading = page.getByRole('heading', { name: 'Trainingsnachweise', exact: true });
await heading.waitFor({ state: 'visible', timeout: 15000 });
const main = page.locator('main').first();
await waitForReady(page, main); await main.screenshot({ path: new URL('coach-overview.png', output).pathname });
await writeFile(new URL('coach-overview.txt', output), await main.innerText());

await browser.close();
console.log('Trainingsnachweise als Trainer geprüft und aufgenommen.');
