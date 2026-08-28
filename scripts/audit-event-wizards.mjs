import './lib/locale-bootstrap.mjs';
import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';

const output = new URL('../var/event-wizards-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 }, locale: 'de-DE',
  storageState: new URL('../var/ui-audit/trainer/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();
const clickNext = async (scope) => {
  const result = await scope.locator('button').evaluateAll((buttons) => {
    const next = buttons.find((button) => /^(Weiter|Next|Suivant|Далее|Вперед|下一步|继续)/i.test((button.textContent ?? '').trim()));
    if (!next) return { clicked: false, labels: buttons.map((button) => (button.textContent ?? '').trim()) };
    next.click();
    return { clicked: true, labels: [] };
  });
  if (!result.clicked) throw new Error(`Weiter-Schaltfläche wurde nicht gefunden: ${JSON.stringify(result.labels)}`);
};
await page.goto('https://demo.kaderblick.de/calendar', { waitUntil: 'networkidle' });
const privacy = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
if (await privacy.isVisible().catch(() => false)) await privacy.evaluate((node) => { let element = node; while (element && element !== document.body) { if (getComputedStyle(element).position === 'fixed') { element.remove(); return; } element = element.parentElement; } });
await waitForReady(page, page.locator('main'));

const allCases = [
  ['spiel', 'Spiel', ['Basisdaten', 'Spieldetails', 'Zusätzliche Spieler', 'Spielzeiten', 'Beschreibung']],
  ['training', 'Training', ['Basisdaten', 'Training', 'Beschreibung']],
  ['club-meeting', 'Vereinstreffen', ['Basisdaten', 'Berechtigungen', 'Beschreibung']],
  ['event', 'Event', ['Basisdaten', 'Berechtigungen', 'Beschreibung']],
  ['task', 'Aufgabe', ['Basisdaten', 'Aufgabe', 'Beschreibung']],
  ['tournament', 'Turnier', ['Basisdaten', 'Spieldetails', 'Begegnungen', 'Beschreibung']],
];
const cases = process.env.EVENT_CASE ? allCases.filter(([slug]) => slug === process.env.EVENT_CASE) : allCases;

for (const [slug, label, stepNames] of cases) {
  await page.goto('https://demo.kaderblick.de/calendar', { waitUntil: 'networkidle' });
  await waitForReady(page, page.locator('main'));
  await page.getByRole('button', { name: /Neues Event/i }).first().click();
  const dialog = page.getByRole('dialog').last();
  await dialog.waitFor();
  await waitForReady(page, dialog);
  const type = dialog.getByRole('combobox', { name: /Event-Typ/i });
  await type.click();
  const eventTypeValues = { spiel: '1', task: '5', tournament: '6' };
  const optionDetails = await page.locator('[role="option"]').evaluateAll((nodes) => nodes.map((node) => ({
    text: (node.textContent ?? '').trim(),
    attributes: Object.fromEntries([...node.attributes].map((attribute) => [attribute.name, attribute.value])),
  })));
  await writeFile(new URL(`${slug}-options.json`, output), JSON.stringify(optionDetails, null, 2));
  const option = page.locator(`[role="option"][data-value="${eventTypeValues[slug]}"]`);
  await option.click();
  await page.waitForTimeout(350);
  await waitForReady(page, dialog);

  const title = dialog.getByRole('textbox', { name: /Titel/i }).first();
  if (await title.isVisible().catch(() => false)) await title.fill(`Dokumentation ${label}`);
  const date = dialog.getByLabel(/^Datum/i).first();
  if (await date.isVisible().catch(() => false)) await date.fill('2026-09-30');
  const time = dialog.getByLabel(/^Uhrzeit/i).first();
  if (await time.isVisible().catch(() => false)) await time.fill('18:00');

  const choose = async (name, optionIndex = 0) => {
    let control = dialog.getByRole('combobox', { name }).first();
    if (!await control.isVisible().catch(() => false)) control = dialog.getByLabel(name).first();
    if (!await control.isVisible().catch(() => false)) return false;
    await control.click();
    const options = page.getByRole('option');
    await options.first().waitFor({ state: 'visible' });
    const count = await options.count();
    await options.nth(Math.min(optionIndex, count - 1)).click();
    await page.waitForTimeout(200);
    return true;
  };

  await writeFile(new URL(`${slug}-steps.json`, output), JSON.stringify(stepNames, null, 2));
  for (let index = 0; index < stepNames.length; index += 1) {
    const stepName = stepNames[index];
    await page.waitForTimeout(250);
    await waitForReady(page, dialog);
    const prefix = `${slug}-${index + 1}`;
    await writeFile(new URL(`${prefix}.txt`, output), await dialog.innerText());
    await dialog.screenshot({ path: new URL(`${prefix}.png`, output).pathname });
    if (index === 1 && ['spiel', 'task', 'tournament'].includes(slug)) break;
    if (index === stepNames.length - 1) continue;
    if (slug === 'spiel' && stepName === 'Spieldetails') {
      await choose(/Spiel-Typ/i);
    }
    if (stepName === 'Berechtigungen') {
      const radio = dialog.getByRole('radio').first();
      if (await radio.isVisible().catch(() => false)) await radio.check();
    }
    await clickNext(dialog);
    await page.waitForTimeout(350);
  }
}

await browser.close();
console.log('Sechs Kalender-Assistenten vollständig durchlaufen.');
