import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const baseUrl = 'https://demo.kaderblick.de';
const output = new URL('../var/calendar-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/coaches/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();

async function dismissCookies() {
  const accept = page.getByRole('button', { name: /alle akzeptieren/i });
  if (await accept.isVisible().catch(() => false)) {
    await accept.evaluate((node) => {
      let element = node;
      while (element && element !== document.body) {
        if (getComputedStyle(element).position === 'fixed') { element.remove(); return; }
        element = element.parentElement;
      }
    });
  }
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
}

await page.goto(`${baseUrl}/calendar`, { waitUntil: 'networkidle' });
await dismissCookies();
await page.getByRole('heading', { name: /^Kalender$/i }).waitFor({ timeout: 30000 });
await waitForReady(page, page); await page.screenshot({ path: new URL('kalender.png', output).pathname });

const create = page.getByRole('button', { name: /neues event/i }).first();
await create.click();
let dialog = page.getByRole('dialog').last();
await dialog.waitFor();
await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('event-grunddaten.png', output).pathname });
await writeFile(new URL('event-grunddaten.txt', output), await dialog.innerText());

const typeSelect = dialog.getByLabel(/event.?typ/i);
await typeSelect.click();
const trainingLabels = { en: 'Training', fr: 'Entraînement', ru: 'Тренировка', 'zh-Hans': '训练' };
const trainingOption = page.getByRole('option', { name: trainingLabels[process.env.DEMO_LOCALE] ?? 'Training', exact: true });
let trainingSelected = false;
if (await trainingOption.isVisible().catch(() => false)) { await trainingOption.click(); trainingSelected = true; }
else trainingSelected = await page.locator('[role="option"]').evaluateAll((nodes) => { const node = nodes.find(item => /Training|Entraînement|Тренировка|训练/i.test(item.textContent ?? '')); if (!node) return false; node.click(); return true; });
if (trainingSelected) {
  await page.waitForTimeout(500);
  await dialog.getByLabel(/^Titel/i).fill('Dokumentationsbeispiel');
  await dialog.getByLabel(/^Uhrzeit/i).first().fill('18:00');
  await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('training-basisdaten.png', output).pathname });
  await dialog.getByRole('button', { name: /^Weiter/i }).last().click();
  await page.waitForTimeout(400);
  await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('training-details.png', output).pathname });
  await writeFile(new URL('training-details.txt', output), await dialog.innerText());
  const recurring = dialog.locator('input[type="checkbox"], [role="switch"]').first();
  if (await recurring.count()) {
    if (await recurring.getAttribute('role') === 'switch') await recurring.click({ force: true });
    else await recurring.check({ force: true });
    await page.waitForTimeout(250);
    await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('training-serie.png', output).pathname });
    await writeFile(new URL('training-serie.txt', output), await dialog.innerText());
  }
}
await page.keyboard.press('Escape');

const firstEvent = page.locator('.rbc-event').first();
if (await firstEvent.isVisible().catch(() => false)) {
  await firstEvent.click();
  dialog = page.getByRole('dialog').last();
  await dialog.waitFor();
  await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('termindetails.png', output).pathname });
  await writeFile(new URL('termindetails.txt', output), await dialog.innerText());
}

await browser.close();
console.log('Kalenderansichten geprüft und aufgenommen.');
