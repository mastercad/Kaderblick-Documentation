import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const output = new URL('../var/messaging-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/coaches/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();
await page.goto('https://demo.kaderblick.de/calendar', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await waitForReady(page, page); await page.screenshot({ path: new URL('dashboard-diagnose.png', output).pathname });
await writeFile(new URL('dashboard-diagnose.txt', output), `${page.url()}\n${(await page.locator('body').innerText()).slice(0, 4000)}`);
await writeFile(new URL('dashboard-buttons.json', output), JSON.stringify(await page.locator('button').evaluateAll(nodes => nodes.map(node => ({ text: node.textContent?.trim(), aria: node.getAttribute('aria-label'), title: node.getAttribute('title') }))), null, 2));
const accountButton = page.getByRole('button', { name: 'Benutzerkonto', exact: true });
await accountButton.waitFor({ timeout: 8000 });
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
await accountButton.click();
await writeFile(new URL('user-menu.txt', output), (await page.getByRole('menuitem').allTextContents()).join('\n'));
await page.getByRole('menuitem').filter({ hasText: /Nachrichten/i }).click();
const dialog = page.getByRole('dialog').last();
await page.waitForTimeout(1000);
await waitForReady(page, page); await page.screenshot({ path: new URL('nachrichten-seite.png', output).pathname });
await writeFile(new URL('nachrichten-seite.txt', output), (await page.locator('body').innerText()).slice(0, 8000));
await dialog.waitFor({ timeout: 3000 });
await dialog.getByText('Julian Berger').first().waitFor({ timeout: 10000 });
await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('nachrichten.png', output).pathname });
await writeFile(new URL('nachrichten.txt', output), await dialog.innerText());

await dialog.getByRole('button', { name: /neue nachricht/i }).first().click();
await page.waitForTimeout(250);
await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('nachricht-verfassen.png', output).pathname });
await writeFile(new URL('nachricht-verfassen.txt', output), await dialog.innerText());
const manage = dialog.getByRole('button', { name: /gruppen verwalten/i });
const addGroup = dialog.getByRole('button', { name: /gruppe/i }).first();
if (!await manage.isVisible().catch(() => false) && await addGroup.isVisible().catch(() => false)) {
  await addGroup.click();
  await page.waitForTimeout(200);
  await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('gruppe-auswaehlen.png', output).pathname });
}
if (await manage.isVisible().catch(() => false)) {
  await manage.click();
  const groupDialog = page.getByRole('dialog').last();
  await groupDialog.waitFor();
  await waitForReady(page, groupDialog); await groupDialog.screenshot({ path: new URL('gruppen-verwalten.png', output).pathname });
  await writeFile(new URL('gruppen-verwalten.txt', output), await groupDialog.innerText());
}
await browser.close();
console.log('Nachrichtenansichten geprüft und aufgenommen.');
