import './lib/locale-bootstrap.mjs';
import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';

const output = new URL('../var/registration-context-audit/', import.meta.url);
const entity = process.env.ENTITY === 'coach' ? 'coach' : 'player';
const entityLabel = entity === 'coach' ? 'Trainer' : 'Spieler';
const query = entity === 'coach' ? 'Tobias' : 'Lukas';
const suffix = entity;
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'de-DE', storageState: new URL('../var/ui-audit/supporter/storage-state.json', import.meta.url).pathname });
const page = await context.newPage();
const clickNext = async (scope) => {
  const clicked = await scope.locator('button').evaluateAll((buttons) => {
    const next = buttons.find((button) => /^(Weiter|Next|Suivant|Далее|Вперед|下一步|继续)/i.test((button.textContent ?? '').trim()));
    if (!next) return false;
    next.click();
    return true;
  });
  if (!clicked) throw new Error('Weiter-Schaltfläche wurde nicht gefunden.');
};
await page.goto('https://demo.kaderblick.de/dashboard', { waitUntil: 'networkidle' });
const privacy = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
if (await privacy.isVisible().catch(() => false)) await privacy.evaluate((node) => { let element = node; while (element && element !== document.body) { if (getComputedStyle(element).position === 'fixed') { element.remove(); return; } element = element.parentElement; } });
await waitForReady(page, page);
const automatic = page.getByRole('dialog').filter({ hasText: /Vereinszugehörigkeit/i }).last();
let dialog = automatic;
if (!await dialog.isVisible().catch(() => false)) {
  await page.getByRole('button', { name: 'Benutzerkonto' }).click();
  await page.getByRole('menuitem', { name: /Verknüpfung anfragen/i }).click();
  dialog = page.getByRole('dialog').last();
}
await dialog.waitFor();
await waitForReady(page, dialog);
await dialog.screenshot({ path: new URL(`step-1-type-${suffix}.png`, output).pathname });
await writeFile(new URL(`step-1-type-${suffix}.txt`, output), await dialog.innerText());
const entityPattern = entity === 'coach'
  ? /^(Trainer|Coach|Entraîneur|Тренер|教练)$/i
  : /^(Spieler|Player|Joueur|Игрок|球员|玩家)$/i;
const entitySelected = await dialog.locator('button').evaluateAll((buttons, pattern) => {
  const expression = new RegExp(pattern, 'i');
  const button = buttons.find((item) => expression.test((item.textContent ?? '').trim()));
  if (!button) return false;
  button.click();
  return true;
}, entityPattern.source);
if (!entitySelected) throw new Error(`${entityLabel} wurde nicht gefunden.`);
await clickNext(dialog);
await waitForReady(page, dialog);
await dialog.screenshot({ path: new URL(`step-2-search-${suffix}.png`, output).pathname });
await writeFile(new URL(`step-2-search-${suffix}.txt`, output), await dialog.innerText());
const search = dialog.getByRole('combobox').first();
await search.fill(query);
await page.waitForTimeout(800);
await waitForReady(page, dialog);
await writeFile(new URL(`search-results-${suffix}.txt`, output), await dialog.innerText());
await dialog.screenshot({ path: new URL(`step-2-results-${suffix}.png`, output).pathname });
const option = page.getByRole('option').first();
if (await option.isVisible().catch(() => false)) {
  await option.click();
  await clickNext(dialog);
  await waitForReady(page, dialog);
  await dialog.screenshot({ path: new URL(`step-3-relation-${suffix}.png`, output).pathname });
  await writeFile(new URL(`step-3-relation-${suffix}.txt`, output), await dialog.innerText());
  const relationLabels = entity === 'coach'
    ? /^(Assistent|Assistant|Adjoint|Помощник|助理)$/i
    : /^(Elternteil|Parent|Родитель|家长|父母)$/i;
  const relationSelected = await dialog.locator('*').evaluateAll((elements, pattern) => {
    const expression = new RegExp(pattern, 'i');
    const element = elements.find((item) => item.children.length === 0 && expression.test((item.textContent ?? '').trim()));
    if (!element) return false;
    element.click();
    return true;
  }, relationLabels.source);
  if (!relationSelected) throw new Error('Beziehungsauswahl wurde nicht gefunden.');
  await clickNext(dialog);
  await waitForReady(page, dialog);
  await dialog.screenshot({ path: new URL(`step-4-review-${suffix}.png`, output).pathname });
  await writeFile(new URL(`step-4-review-${suffix}.txt`, output), await dialog.innerText());
}
await browser.close();
console.log('Verknüpfungsassistent bis zur Beziehungsauswahl geprüft; kein Antrag gesendet.');
