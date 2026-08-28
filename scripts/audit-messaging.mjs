import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const baseUrl = 'https://demo.kaderblick.de';
const output = new URL('../var/messaging-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/coaches/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();

async function removeCookieOverlay() {
  const notice = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
  if (!await notice.isVisible().catch(() => false)) return;
  await notice.evaluate((node) => {
    let element = node;
    while (element && element !== document.body) {
      if (getComputedStyle(element).position === 'fixed') { element.remove(); return; }
      element = element.parentElement;
    }
  });
}

await page.goto(`${baseUrl}/dashboard`, { waitUntil: 'networkidle' });
await removeCookieOverlay();

const bell = page.getByRole('button', { name: /notifications/i }).first();
await bell.click();
let popover = page.getByRole('presentation').last();
await page.waitForTimeout(400);
await waitForReady(page, popover); await popover.screenshot({ path: new URL('benachrichtigungen.png', output).pathname });
await writeFile(new URL('benachrichtigungen.txt', output), await popover.innerText());
const messagesPage = await context.newPage();
await messagesPage.goto(`${baseUrl}/dashboard`, { waitUntil: 'networkidle' });
const messagesNotice = messagesPage.getByText(/Wir respektieren deine Privatsphäre/i).first();
if (await messagesNotice.isVisible().catch(() => false)) {
  await messagesNotice.evaluate((node) => {
    let element = node;
    while (element && element !== document.body) {
      if (getComputedStyle(element).position === 'fixed') { element.remove(); return; }
      element = element.parentElement;
    }
  });
}
await messagesPage.getByRole('button', { name: 'Benutzerkonto' }).click({ timeout: 10000 });
await messagesPage.getByRole('menuitem').filter({ hasText: /^Nachrichten/i }).click();
let dialog = messagesPage.getByRole('dialog').last();
await dialog.waitFor();
await page.waitForTimeout(1000);
await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('nachrichten.png', output).pathname });
await writeFile(new URL('nachrichten.txt', output), await dialog.innerText());

const compose = dialog.getByRole('button', { name: /neue nachricht/i }).first();
await compose.click();
await page.waitForTimeout(400);
await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('nachricht-verfassen.png', output).pathname });
await writeFile(new URL('nachricht-verfassen.txt', output), await dialog.innerText());

const manage = dialog.getByRole('button', { name: /gruppen verwalten/i });
if (await manage.isVisible().catch(() => false)) {
  await manage.click();
  await messagesPage.waitForTimeout(400);
  const groupDialog = messagesPage.getByRole('dialog').last();
  await waitForReady(page, groupDialog); await groupDialog.screenshot({ path: new URL('gruppen-verwalten.png', output).pathname });
  await writeFile(new URL('gruppen-verwalten.txt', output), await groupDialog.innerText());
}

await browser.close();
console.log('Nachrichten und Benachrichtigungen geprüft und aufgenommen.');
