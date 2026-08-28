import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';

const output = new URL('../var/report-builder-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'de-DE', storageState: new URL('../var/ui-audit/coaches/storage-state.json', import.meta.url).pathname });
const page = await context.newPage();
await page.goto('https://demo.kaderblick.de/reports', { waitUntil: 'networkidle' });
const main = page.locator('main').first();
await waitForReady(page, main);
let create = main.getByRole('button', { name: /Neue Auswertung|Auswertung erstellen|Neuer Bericht/i }).first();
if (!await create.isVisible().catch(() => false)) create = main.getByRole('button').first();
await create.click();
const dialog = page.getByRole('dialog').last();
await waitForReady(page, dialog);
await dialog.screenshot({ path: new URL('mobile-wizard-start.png', output).pathname });
await writeFile(new URL('step-1.json', output), JSON.stringify({ text: await dialog.innerText(), buttons: await dialog.getByRole('button').allTextContents() }, null, 2));

await dialog.getByRole('button').nth(1).click();
await page.waitForTimeout(500);
const step2 = page.getByRole('dialog').last();
await waitForReady(page, step2);
await writeFile(new URL('step-2.json', output), JSON.stringify({ text: await step2.innerText(), buttons: await step2.getByRole('button').allTextContents() }, null, 2));
await step2.getByRole('button').last().click();
await page.waitForTimeout(500);
const step3 = page.getByRole('dialog').last();
await waitForReady(page, step3);
await writeFile(new URL('step-3.json', output), JSON.stringify({ text: await step3.innerText(), buttons: await step3.getByRole('button').allTextContents() }, null, 2));
const step3Buttons = step3.getByRole('button');
if (await step3Buttons.count() > 3) await step3Buttons.nth(1).click();
await page.waitForTimeout(500);
const finish = page.getByRole('dialog').last();
await waitForReady(page, finish);
await finish.screenshot({ path: new URL('mobile-wizard-finish.png', output).pathname });

let manual = finish.getByText(/Anpassen/i).first();
if (await manual.isVisible().catch(() => false)) await manual.click();
await page.waitForTimeout(500);
const builder = page.getByRole('dialog').last();
await waitForReady(page, builder);
for (const [label, file] of [[/Daten.*Chart/i, 'report-builder-data-chart.png'], [/Filter/i, 'report-builder-filters.png'], [/Optionen/i, 'report-builder-options.png']]) {
  const tab = builder.getByText(label).first();
  if (await tab.isVisible().catch(() => false)) await tab.click();
  await page.waitForTimeout(300);
  await builder.screenshot({ path: new URL(file, output).pathname });
}
await browser.close();
