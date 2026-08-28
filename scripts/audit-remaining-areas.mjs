import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';

const baseUrl = 'https://demo.kaderblick.de';
const output = new URL('../var/remaining-areas-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });

const selectedArea = process.env.KB_AREA;
const areas = [
  { role: 'trainer', name: 'aufgaben', route: '/tasks', create: /Neue Aufgabe|Aufgabe erstellen/i },
  { role: 'trainer', name: 'berichte', route: '/reports', create: /Neue Auswertung|Auswertung erstellen|Neuer Bericht/i },
  { role: 'trainer', name: 'news', route: '/news', create: /Neue Neuigkeit|News erstellen|Neuigkeit erstellen|Beitrag erstellen/i },
  { role: 'trainer', name: 'spieler', route: '/players', create: /Neuer Spieler|Spieler hinzufügen/i },
  { role: 'trainer', name: 'trainer', route: '/coaches', create: /Neuer Trainer|Trainer hinzufügen/i },
  { role: 'trainer', name: 'umfragen', route: '/surveys', create: /Neue Umfrage|Umfrage erstellen/i },
  { role: 'trainer', name: 'turniere', route: '/tournaments', create: /Neues Turnier|Turnier erstellen/i },
  { role: 'superadmin', name: 'videos', route: '/admin/videos', create: /Video hinzufügen|Video hochladen|Neues Video/i },
].filter((area) => !selectedArea || area.name === selectedArea);

for (const area of areas) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    locale: 'de-DE',
    storageState: new URL(`../var/ui-audit/${area.role}/storage-state.json`, import.meta.url).pathname,
  });
  const page = await context.newPage();
  const failures = [];
  page.on('response', (response) => {
    if (response.url().includes('/api/') && response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
  });
  await page.goto(`${baseUrl}${area.route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  const privacy = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
  if (await privacy.isVisible().catch(() => false)) await privacy.evaluate((node) => {
    let element = node;
    while (element && element !== document.body) {
      if (getComputedStyle(element).position === 'fixed') { element.remove(); return; }
      element = element.parentElement;
    }
  });
  const main = page.locator('main').first();
  await waitForReady(page, main, { timeout: 90000 });
  const bottomElements = await page.locator('body').evaluate((body) => Array.from(body.querySelectorAll('*')).map((element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return { element, rect, style };
  }).filter(({ rect, style }) => rect.width > 500 && rect.height > 40 && rect.top > window.innerHeight * 0.7 && style.display !== 'none' && style.visibility !== 'hidden').slice(-20).map(({ element, rect, style }) => ({
    tag: element.tagName,
    id: element.id,
    className: String(element.className).slice(0, 250),
    text: (element.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 300),
    top: Math.round(rect.top),
    height: Math.round(rect.height),
    position: style.position,
  })));
  await writeFile(new URL(`${area.name}-bottom-elements.json`, output), JSON.stringify(bottomElements, null, 2));
  await main.screenshot({ path: new URL(`${area.name}-uebersicht.png`, output).pathname });
  await writeFile(new URL(`${area.name}-uebersicht.txt`, output), await main.innerText());
  await writeFile(new URL(`${area.name}-buttons.json`, output), JSON.stringify(await main.getByRole('button').allTextContents(), null, 2));

  let create = main.getByRole('button', { name: area.create }).first();
  if (!await create.isVisible().catch(() => false)) create = main.getByRole('button').first();
  if (await create.isVisible().catch(() => false)) {
    await create.click();
    const dialog = page.getByRole('dialog').last();
    await waitForReady(page, dialog, { timeout: 90000 });
    await dialog.screenshot({ path: new URL(`${area.name}-anlegen.png`, output).pathname });
    await writeFile(new URL(`${area.name}-anlegen.txt`, output), await dialog.innerText());
    if (area.name === 'aufgaben') {
      const recurring = dialog.getByText(/Wiederkehrend/i).first();
      if (await recurring.isVisible().catch(() => false)) await recurring.click();
      await waitForReady(page, dialog);
      await dialog.screenshot({ path: new URL('aufgaben-wiederkehrend.png', output).pathname });
    }
  }
  await writeFile(new URL(`${area.name}-fehler.txt`, output), failures.join('\n'));
  await context.close();
  console.log(`${area.name}: vollständig geladen`);
}

await browser.close();
