import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';

const output = new URL('../var/tournament-video-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });

async function open(role, route) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    locale: 'de-DE',
    storageState: new URL(`../var/ui-audit/${role}/storage-state.json`, import.meta.url).pathname,
  });
  const page = await context.newPage();
  await page.goto(`https://demo.kaderblick.de${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  return { context, page };
}

const calendar = await open('trainer', '/calendar');
await waitForReady(calendar.page, calendar.page.locator('main').first(), { timeout: 90000 });
const createEvent = calendar.page.getByRole('button', { name: /Neues Event/i }).first();
await createEvent.click();
let dialog = calendar.page.getByRole('dialog').last();
await waitForReady(calendar.page, dialog, { timeout: 90000 });
await dialog.getByLabel(/Titel/i).first().fill('Dokumentationsbeispiel Turnier');
await dialog.getByLabel(/^Datum/i).first().fill('2026-09-05');
await dialog.getByLabel(/^Uhrzeit/i).first().fill('10:00');
const eventType = dialog.getByRole('combobox', { name: /Event-Typ/i }).first();
await eventType.click();
const tournamentSelected = await calendar.page.locator('[role="option"]').evaluateAll((nodes) => { const node = nodes.find(item => /Turnier|Tournament|Tournoi|Турнир|大赛|赛事|锦标赛/i.test(item.textContent ?? '')); if (!node) return false; node.click(); return true; });
if (!tournamentSelected) throw new Error('Turnieroption nicht gefunden.');
await waitForReady(calendar.page, dialog);
await dialog.screenshot({ path: new URL('tournament-basic-data.png', output).pathname });
await dialog.getByRole('button', { name: /^Weiter/i }).last().click();
await waitForReady(calendar.page, dialog, { timeout: 90000 });
await dialog.screenshot({ path: new URL('tournament-details.png', output).pathname });
await writeFile(new URL('tournament-details.txt', output), await dialog.innerText());
await calendar.context.close();

const game = await open(process.env.KB_VIDEO_ROLE ?? 'trainer', `/games/${process.env.KB_GAME_ID ?? '183'}`);
const relationDialog = game.page.getByRole('dialog').filter({ hasText: /Meine Vereinszugehörigkeit angeben/i }).first();
if (await relationDialog.isVisible().catch(() => false)) {
  const close = relationDialog.getByRole('button', { name: /Schließen|Close/i }).first();
  if (await close.isVisible().catch(() => false)) await close.click();
  else await game.page.keyboard.press('Escape');
  await relationDialog.waitFor({ state: 'hidden', timeout: 5000 });
}
const videosHeading = game.page.getByText(/^Videos$/).first();
await videosHeading.waitFor({ timeout: 30000 });
await game.page.waitForTimeout(1500);
if (await relationDialog.isVisible().catch(() => false)) {
  const close = relationDialog.getByRole('button', { name: /Schließen|Close/i }).first();
  if (await close.isVisible().catch(() => false)) await close.click();
  else await game.page.keyboard.press('Escape');
  await relationDialog.waitFor({ state: 'hidden', timeout: 5000 });
}
const videosSection = videosHeading.locator('..').locator('..');
await waitForReady(game.page, videosSection, { timeout: 90000 });
await writeFile(new URL('video-modals.json', output), JSON.stringify(await game.page.locator('.MuiModal-root').evaluateAll((nodes) => nodes.map((node) => ({
  text: (node.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 1000),
  dialogs: node.querySelectorAll('[role="dialog"]').length,
  backdrops: node.querySelectorAll('.MuiBackdrop-root').length,
  className: node.className,
}))), null, 2));
await videosSection.screenshot({ path: new URL('video-bereich.png', output).pathname });
const addVideo = game.page.getByRole('button', { name: /Video hinzufügen/i }).first();
if (await addVideo.isVisible().catch(() => false)) {
  await addVideo.click();
  dialog = game.page.getByRole('dialog').last();
  await waitForReady(game.page, dialog, { timeout: 90000 });
  await dialog.screenshot({ path: new URL('video-hinzufuegen.png', output).pathname });
  await writeFile(new URL('video-hinzufuegen.txt', output), await dialog.innerText());
} else {
  await writeFile(new URL('video-hinzufuegen.txt', output), 'Kein sichtbarer Video-hinzufügen-Zugriff für diese Rolle und Begegnung.');
}
await game.context.close();
await browser.close();
console.log('Turnier- und Videobereiche vollständig geladen und geprüft.');
