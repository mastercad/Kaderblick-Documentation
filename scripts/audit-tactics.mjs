import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { docsLocale, forceDemoLocale, messages } from './lib/demo-locale.mjs';

const locale = process.env.DEMO_LOCALE ?? 'de';
const output = new URL(`../var/tactics-audit/${docsLocale(locale)}/`, import.meta.url);
await mkdir(output, { recursive: true });
const matchPlanMessages = await messages('match_plan', locale);
const tacticsBoardMessages = await messages('tactics_board', locale);
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/trainer/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();
await forceDemoLocale(page, locale);
await page.goto('https://demo.kaderblick.de/games/178', { waitUntil: 'networkidle' });
const privacy = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
if (await privacy.isVisible().catch(() => false)) await privacy.evaluate((node) => node.closest('[role="dialog"]')?.remove());
await waitForReady(page, page.locator('main'));
await writeFile(new URL('game.txt', output), await page.locator('main').innerText());
await page.screenshot({ path: new URL('game.png', output).pathname, fullPage: true });
const matchPlanCard = page.getByText(matchPlanMessages['match_plan.title.manager'], { exact: true }).locator('xpath=ancestor::*[contains(@class,"MuiCard-root")][1]');
if (await matchPlanCard.isVisible().catch(() => false)) await matchPlanCard.screenshot({ path: new URL('match-plan.png', output).pathname });
const buttons = await page.getByRole('button').evaluateAll((nodes) => nodes.map((node) => ({ text: node.textContent?.trim(), label: node.getAttribute('aria-label'), title: node.getAttribute('title') })));
await writeFile(new URL('buttons.json', output), JSON.stringify(buttons, null, 2));
const tacticsPattern = new RegExp(`^${matchPlanMessages['match_plan.tactics_count'].replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('\\{count\\}', '\\d+')}$`);
const candidate = page.getByRole('button', { name: tacticsPattern }).first();
if (await candidate.isVisible().catch(() => false)) {
  await candidate.click();
  await page.waitForTimeout(500);
  await waitForReady(page, page);
  const dialog = page.getByRole('dialog').last();
  const target = await dialog.isVisible().catch(() => false) ? dialog : page.locator('main');
  await writeFile(new URL('opened.txt', output), await target.innerText());
  await writeFile(new URL('opened-controls.json', output), JSON.stringify(await target.locator('button,[role="button"]').evaluateAll((nodes) => nodes.map((node) => ({ text: node.textContent?.trim(), label: node.getAttribute('aria-label'), title: node.getAttribute('title'), pressed: node.getAttribute('aria-pressed') }))), null, 2));
  await target.screenshot({ path: new URL('opened.png', output).pathname });
  const tacticsPanel = target.getByRole('button', { name: tacticsBoardMessages['tactics_board.open_right'], exact: true });
  if (await tacticsPanel.isVisible().catch(() => false)) {
    await tacticsPanel.click();
    await page.waitForTimeout(250);
    await writeFile(new URL('panels.txt', output), await target.innerText());
    await target.screenshot({ path: new URL('panels.png', output).pathname });
  }
}
await browser.close();
console.log('Taktik- und Match-Plan-Einstieg geprüft.');
