import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const output = new URL('../var/finance-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });

async function removePrivacy(page) {
  const node = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
  if (await node.isVisible().catch(() => false)) {
    await node.evaluate((item) => {
      let element = item;
      while (element && element !== document.body) {
        if (getComputedStyle(element).position === 'fixed') { element.remove(); return; }
        element = element.parentElement;
      }
    });
  }
}

async function audit(role, route, prefix, headingText) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    locale: 'de-DE',
    storageState: new URL(`../var/ui-audit/${role}/storage-state.json`, import.meta.url).pathname,
  });
  const page = await context.newPage();
  const failures = [];
  page.on('response', (response) => {
    if (response.url().includes('/api/') && response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
  });
  await page.goto(`https://demo.kaderblick.de/${route}`, { waitUntil: 'networkidle', timeout: 30000 });
  await removePrivacy(page);
  await page.locator('main').first().waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForTimeout(2500);
  const main = page.locator('main').first();
  await waitForReady(page, main); await main.screenshot({ path: new URL(`${prefix}-overview.png`, output).pathname });
  await writeFile(new URL(`${prefix}-overview.txt`, output), await main.innerText());
  await writeFile(new URL(`${prefix}-errors.txt`, output), failures.join('\n'));
  return { context, page, main };
}

const balance = await audit('trainer', 'mein-deckel', 'balance', 'Mein Deckel');
const book = balance.page.getByRole('button', { name: /Auf Deckel buchen/i });
if (await book.isVisible().catch(() => false)) {
  await book.click();
  const dialog = balance.page.getByRole('dialog').last();
  await dialog.waitFor();
  await waitForReady(balance.page, dialog); await dialog.screenshot({ path: new URL('balance-transaction.png', output).pathname });
  await writeFile(new URL('balance-transaction.txt', output), await dialog.innerText());
}
await balance.context.close();

const cash = await audit('team-treasurer', 'kassenbuch', 'cash-book', 'Kassenbuch');
for (const label of [/Buchung hinzufügen/i, /Neue Buchung/i]) {
  const button = cash.page.getByRole('button', { name: label }).first();
  if (await button.isVisible().catch(() => false)) {
    await button.click();
    const dialog = cash.page.getByRole('dialog').last();
    await dialog.waitFor();
    await waitForReady(cash.page, dialog); await dialog.screenshot({ path: new URL('cash-book-transaction.png', output).pathname });
    await writeFile(new URL('cash-book-transaction.txt', output), await dialog.innerText());
    break;
  }
}
await cash.context.close();
await browser.close();
console.log('Mein Deckel und Kassenbuch geprüft.');
