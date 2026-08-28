import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { docsLocale, forceDemoLocale, messages } from './lib/demo-locale.mjs';

const locale = process.env.DEMO_LOCALE ?? 'de';
const output = new URL(`../var/match-plan-actions-audit/${docsLocale(locale)}/`, import.meta.url);
await mkdir(output, { recursive: true });
const matchPlanMessages = await messages('match_plan', locale);
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, locale: 'de-DE', storageState: new URL('../var/ui-audit/trainer/storage-state.json', import.meta.url).pathname });
const page = await context.newPage();
await forceDemoLocale(page, locale);
const actions = [
  ['formation-choice', matchPlanMessages['match_plan.action.choose_formation']],
  ['load-template', matchPlanMessages['match_plan.action.load_template']],
  ['import-tactics', matchPlanMessages['match_plan.action.import_tactics']],
  ['save-template', matchPlanMessages['match_plan.action.save_template']],
  ['new-phase', matchPlanMessages['match_plan.action.new_phase']],
];
for (const [slug, label] of actions) {
  await page.goto('https://demo.kaderblick.de/games/178', { waitUntil: 'networkidle' });
  const privacy = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
  if (await privacy.isVisible().catch(() => false)) await privacy.evaluate((node) => { let e = node; while (e && e !== document.body) { if (getComputedStyle(e).position === 'fixed') { e.remove(); return; } e = e.parentElement; } });
  await waitForReady(page, page.locator('main'));
  const action = page.getByRole('button', { name: label, exact: true }).first();
  if (!await action.isVisible().catch(() => false)) continue;
  await action.click();
  await page.waitForTimeout(400);
  await waitForReady(page, page);
  const dialog = page.getByRole('dialog').last();
  const target = await dialog.isVisible().catch(() => false) ? dialog : page.locator('main');
  await writeFile(new URL(`${slug}.txt`, output), await target.innerText());
  await target.screenshot({ path: new URL(`${slug}.png`, output).pathname });
}
await browser.close();
console.log('Match-Plan-Aktionen ohne Speichern geprüft.');
