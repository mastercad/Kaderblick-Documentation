import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';

const output = new URL('../var/rides-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/coaches/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();
const candidates = [{ id: 143, canViewRides: true }];
for (const candidate of candidates) {
  await page.goto(`https://demo.kaderblick.de/calendar?eventId=${candidate.id}`, { waitUntil: 'domcontentloaded' });
  const notice = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
  if (await notice.isVisible().catch(() => false)) {
    await notice.evaluate((node) => {
      let element = node;
      while (element && element !== document.body) {
        if (getComputedStyle(element).position === 'fixed') { element.remove(); return; }
        element = element.parentElement;
      }
    });
  }
  const details = page.getByRole('dialog').filter({ hasText: /SV Weissach Senioren I/ }).last();
  if (!await details.waitFor({ state: 'visible', timeout: 15000 }).then(() => true).catch(() => false)) continue;
  await waitForReady(page, details);
  await details.screenshot({ path: new URL('termindetails-diagnose.png', output).pathname });
  await writeFile(new URL('termindetails-diagnose.txt', output), await details.innerText());
  const car = details.locator('#teamride-information');
  if (!await car.isVisible().catch(() => false)) continue;
  await details.screenshot({ path: new URL('termindetails-mit-fahrt.png', output).pathname });
  await car.click();
  const rideDialog = page.getByRole('dialog').last();
  await rideDialog.waitFor();
  await waitForReady(page, rideDialog);
  await rideDialog.screenshot({ path: new URL('fahrgemeinschaften.png', output).pathname });
  await writeFile(new URL('fahrgemeinschaften.txt', output), await rideDialog.innerText());
  const offer = rideDialog.getByRole('button', { name: /anbieten/i });
  if (await offer.isVisible().catch(() => false)) {
    await offer.click();
    const offerDialog = page.getByRole('dialog').last();
    await waitForReady(page, offerDialog);
    await offerDialog.screenshot({ path: new URL('fahrt-anbieten.png', output).pathname });
    await writeFile(new URL('fahrt-anbieten.txt', output), await offerDialog.innerText());
  }
  break;
}
await browser.close();
console.log(`Fahrgemeinschaften geprüft; ${candidates.length} Termine durchsucht.`);
