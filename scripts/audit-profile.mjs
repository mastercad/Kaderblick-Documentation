import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';

const profileName = process.env.KB_PROFILE_NAME ?? 'trainer';
const role = process.env.KB_PROFILE_ROLE ?? 'trainer';
const baseUrl = 'https://demo.kaderblick.de';
const output = new URL(`../var/profile-audit/${profileName}/`, import.meta.url);
const storageState = new URL(`../var/ui-audit/${role}/storage-state.json`, import.meta.url).pathname;
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  locale: 'de-DE',
  storageState,
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

async function redactSensitiveValues(target) {
  await target.evaluate((root) => {
    for (const input of root.querySelectorAll('input')) {
      const marker = `${input.type} ${input.name ?? ''} ${input.autocomplete ?? ''} ${input.getAttribute('aria-label') ?? ''}`;
      if (/password|token|secret|api/i.test(marker) && input.value) input.value = '••••••••';
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      node.nodeValue = node.nodeValue
        .replace(/\b(?:sk|kb|api)[-_][A-Za-z0-9_-]{12,}\b/g, '••••••••')
        .replace(/\b[A-Fa-f0-9]{32,}\b/g, '••••••••');
    }
  });
}

await page.goto(`${baseUrl}/dashboard`, { waitUntil: 'domcontentloaded' });
const main = page.locator('main').first();
await main.waitFor({ timeout: 30000 });
await waitForReady(page, main);
await removeCookieOverlay();

const buttons = await page.locator('button').evaluateAll((nodes) => nodes.map((node, index) => ({
  index,
  text: node.textContent?.trim() ?? '',
  ariaLabel: node.getAttribute('aria-label'),
  title: node.getAttribute('title'),
})));
await writeFile(new URL('buttons.json', output), JSON.stringify(buttons, null, 2));

const profileTrigger = page.getByRole('button', { name: 'Benutzerkonto' });
if (!await profileTrigger.count()) throw new Error('Profil-Schaltfläche nicht gefunden.');
await profileTrigger.click();
await page.waitForTimeout(800);
const menuItems = await page.getByRole('menuitem').allTextContents();
await writeFile(new URL('menu.json', output), JSON.stringify(menuItems, null, 2));
const profileItem = page.getByRole('menuitem').filter({ hasText: /Profil/i }).first();
if (await profileItem.count()) await profileItem.click();
await page.getByRole('dialog').waitFor({ timeout: 10000 });
await page.waitForTimeout(1400);

const dialog = page.getByRole('dialog').first();
const tabs = await dialog.getByRole('tab').allTextContents();
const tabSlugs = ['profile', 'equipment', 'settings', 'notifications', 'api-token', 'calendar', 'absences', 'documents'];
const audit = [];
const failures = [];
for (let index = 0; index < tabs.length; index += 1) {
  if (/api[- ]?token/i.test(tabs[index])) {
    audit.push({ tab: tabs[index].trim(), omitted: 'Sensible Inhalte werden weder erfasst noch abgebildet.' });
    continue;
  }
  console.log(`Prüfe Profilregister: ${tabs[index].trim()}`);
  await dialog.getByRole('tab').nth(index).click();
  try {
    await waitForReady(page, dialog, { timeout: 90000 });
  } catch (error) {
    const loadingElements = await dialog.locator('[role="progressbar"], .MuiCircularProgress-root, .MuiLinearProgress-root, [aria-busy="true"]').evaluateAll((nodes) => nodes.map((node) => ({
      tag: node.tagName,
      className: node.className,
      text: node.textContent?.trim(),
      ariaLabel: node.getAttribute('aria-label'),
      context: node.parentElement?.parentElement?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 300),
    })));
    failures.push({ tab: tabs[index].trim(), error: error.message, loadingElements });
    console.error(`Keine Aufnahme für ${tabs[index].trim()}: Inhalt blieb im Ladezustand.`);
    continue;
  }
  await removeCookieOverlay();
  await redactSensitiveValues(dialog);
  audit.push({
    tab: tabs[index].trim(),
    text: (await dialog.innerText()).trim(),
    fields: await dialog.locator('input, textarea, [role="combobox"]').evaluateAll((nodes) => nodes.map((node) => ({
      label: node.getAttribute('aria-label') || node.getAttribute('name') || node.getAttribute('placeholder'),
      type: node.getAttribute('type') || node.getAttribute('role') || node.tagName,
    }))),
    buttons: await dialog.getByRole('button').allTextContents(),
  });
  const tabSlug = tabSlugs[index] ?? `tab-${index}`;
  await dialog.screenshot({ path: new URL(`profil-${index}-${tabSlug}.png`, output).pathname });
  const didScroll = await dialog.evaluate((root) => {
    const candidates = Array.from(root.querySelectorAll('*')).filter((element) => element.scrollHeight > element.clientHeight + 80);
    const target = candidates.sort((a, b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight))[0];
    if (!target) return false;
    target.scrollTop = target.scrollHeight;
    return true;
  });
  if (didScroll) {
    await waitForReady(page, dialog);
    await dialog.screenshot({ path: new URL(`profil-${index}-${tabSlug}-unten.png`, output).pathname });
    await dialog.evaluate((root) => {
      for (const element of root.querySelectorAll('*')) if (element.scrollTop > 0) element.scrollTop = 0;
    });
  }
}
await writeFile(new URL('profile.json', output), JSON.stringify(audit, null, 2));
await writeFile(new URL('fehler.json', output), JSON.stringify(failures, null, 2));

let levelButton = dialog.getByRole('button', { name: /Level\s+\d+/i });
if (!await levelButton.count()) levelButton = dialog.getByRole('button').filter({ hasText: /\d+/ }).first();
if (await levelButton.count()) {
  await levelButton.click();
  const dialogs = page.getByRole('dialog');
  const xpDialog = dialogs.last();
  await waitForReady(page, xpDialog);
  await redactSensitiveValues(xpDialog);
  await writeFile(new URL('xp.json', output), JSON.stringify({
    text: (await xpDialog.innerText()).trim(),
    buttons: await xpDialog.getByRole('button').allTextContents(),
  }, null, 2));
  await xpDialog.screenshot({ path: new URL('xp-aufschluesselung.png', output).pathname });
  await page.keyboard.press('Escape');
}

const dialogButtons = await dialog.locator('button').evaluateAll((nodes) => nodes.map((node, index) => ({
  index,
  text: node.textContent?.trim() ?? '',
  ariaLabel: node.getAttribute('aria-label'),
  title: node.getAttribute('title'),
})));
await writeFile(new URL('dialog-buttons.json', output), JSON.stringify(dialogButtons, null, 2));
await browser.close();
console.log(`Profil mit ${tabs.length} Registern geprüft.`);
