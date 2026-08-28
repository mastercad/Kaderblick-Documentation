import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const output = new URL('../var/organizations-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/superadmin/storage-state.json', import.meta.url).pathname,
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

async function auditList(path, prefix, heading, detailText) {
  await page.goto(`https://demo.kaderblick.de${path}`, { waitUntil: 'networkidle' });
  await removeCookieOverlay();
  await page.getByRole('heading', { name: heading }).waitFor({ timeout: 20000 });
  await waitForReady(page, page); await page.screenshot({ path: new URL(`${prefix}-liste.png`, output).pathname });
  const details = page.getByRole('button', { name: /Details/i }).first();
  await details.click();
  let dialog = page.getByRole('dialog').last();
  await dialog.waitFor();
  await dialog.getByText(detailText, { exact: false }).first().waitFor({ timeout: 10000 });
  await waitForReady(page, dialog); await dialog.screenshot({ path: new URL(`${prefix}-details.png`, output).pathname });
  await writeFile(new URL(`${prefix}-details.txt`, output), await dialog.innerText());
  const edit = dialog.getByRole('button', { name: /Bearbeiten/i });
  if (await edit.isVisible().catch(() => false)) {
    await edit.click();
    dialog = page.getByRole('dialog').last();
    await dialog.waitFor();
    await page.waitForTimeout(300);
    await waitForReady(page, dialog); await dialog.screenshot({ path: new URL(`${prefix}-bearbeiten.png`, output).pathname });
    await writeFile(new URL(`${prefix}-bearbeiten.txt`, output), await dialog.innerText());
  }
}

await auditList('/teams', 'teams', /^Teams$/i, 'FC Rotbach A-Junioren');
await auditList('/clubs', 'vereine', /^Vereine$/i, 'FC Rotbach 1967');
await browser.close();
console.log('Team- und Vereinsverwaltung geprüft und aufgenommen.');
