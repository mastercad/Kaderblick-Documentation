import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { docsLocale, forceDemoLocale, messages } from './lib/demo-locale.mjs';

const locale = process.env.DEMO_LOCALE ?? 'de';
const output = new URL(`../var/formation-tactics-audit/${docsLocale(locale)}/`, import.meta.url);
await mkdir(output, { recursive: true });
const formationsMessages = await messages('formations', locale);
const tacticsBoardMessages = await messages('tactics_board', locale);

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/trainer/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();
await forceDemoLocale(page, locale);
const failures = [];
page.on('response', (response) => {
  if (response.url().includes('/api/') && response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
});
await page.goto('https://demo.kaderblick.de/formations', { waitUntil: 'networkidle' });
const privacy = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
if (await privacy.isVisible().catch(() => false)) {
  await privacy.evaluate((node) => node.closest('[role="dialog"]')?.remove());
}
await waitForReady(page, page.locator('main'));
await writeFile(new URL('overview.txt', output), await page.locator('main').innerText());
await page.locator('main').screenshot({ path: new URL('overview.png', output).pathname });

await writeFile(new URL('controls.json', output), JSON.stringify(await page.locator('button').evaluateAll((nodes) => nodes.map((node) => ({
  text: node.textContent?.trim(),
  label: node.getAttribute('aria-label'),
  title: node.getAttribute('title'),
  icons: [...node.querySelectorAll('svg')].map((icon) => icon.getAttribute('data-testid')),
}))), null, 2));
let boardButton = page.getByRole('button', { name: formationsMessages['formations.open_board'], exact: true }).first();
if (!await boardButton.isVisible().catch(() => false)) {
  if (process.env.ALLOW_CREATE_TEMPLATE !== '1') {
    throw new Error('Keine Vorlage gefunden; Erstellung ist in diesem Lauf deaktiviert.');
  }
  const createButton = page.getByRole('button', { name: /Neue Vorlage|Erste Vorlage erstellen/i }).first();
  if (!await createButton.isVisible().catch(() => false)) {
    throw new Error('Weder Vorlage noch Aktion zum Erstellen einer Vorlage gefunden.');
  }
  await createButton.click();
  let dialog = page.getByRole('dialog').last();
  await waitForReady(page, dialog);
  await dialog.getByText('4-4-2', { exact: true }).click();
  dialog = page.getByRole('dialog').last();
  await waitForReady(page, dialog);
  await dialog.getByRole('textbox').first().fill('Dokumentation Taktik');
  await page.waitForTimeout(400);
  const assignTeam = dialog.getByRole('button', { name: /^Team einsetzen$/ }).first();
  if (await assignTeam.isVisible().catch(() => false)) await assignTeam.click();
  await dialog.getByRole('button', { name: /^Speichern/ }).click();
  await page.waitForTimeout(1500);
  if (await dialog.isVisible().catch(() => false)) {
    await writeFile(new URL('create-error.txt', output), `${await dialog.innerText()}\n\n${failures.join('\n')}`);
    await dialog.screenshot({ path: new URL('create-error.png', output).pathname });
    throw new Error('Vorlage wurde nicht gespeichert; Diagnose unter var/formation-tactics-audit/create-error.*');
  }
  await waitForReady(page, page.locator('main'));
  await page.locator('main').screenshot({ path: new URL('created-template.png', output).pathname });
  boardButton = page.getByRole('button', { name: formationsMessages['formations.open_board'], exact: true }).first();
}
if (!await boardButton.isVisible().catch(() => false)) {
  throw new Error('Kein sichtbarer Taktiktafel-Einstieg auf /formations gefunden.');
}
await writeFile(new URL('entry.json', output), JSON.stringify({
  label: await boardButton.getAttribute('aria-label'),
  title: await boardButton.getAttribute('title'),
}, null, 2));
await boardButton.click();
await page.waitForTimeout(400);
await waitForReady(page, page);
const dialog = page.getByRole('dialog').last();
if (!await dialog.isVisible().catch(() => false)) {
  throw new Error('Die Taktiktafel der Aufstellungsvorlage wurde nicht geöffnet.');
}
await writeFile(new URL('board.txt', output), await dialog.innerText());
await dialog.screenshot({ path: new URL('board.png', output).pathname });

const rightPanel = dialog.getByRole('button', { name: tacticsBoardMessages['tactics_board.open_right'], exact: true });
if (await rightPanel.isVisible().catch(() => false)) {
  await rightPanel.click();
  await page.waitForTimeout(250);
  await writeFile(new URL('board-panels.txt', output), await dialog.innerText());
  await dialog.screenshot({ path: new URL('board-panels.png', output).pathname });
}

await browser.close();
console.log('Taktik-Einstieg der globalen Aufstellungsvorlagen geprüft.');
