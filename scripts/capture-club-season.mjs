import './lib/locale-bootstrap.mjs';
import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';

const output = new URL('../var/chapter-images/', import.meta.url);
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.KB_DOC_BROWSER ?? '/usr/bin/google-chrome',
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  locale: 'de-DE',
  storageState: new URL('../var/ui-audit/trainer/storage-state.json', import.meta.url).pathname,
});
const page = await context.newPage();
await page.goto('https://demo.kaderblick.de/mein-verein', { waitUntil: 'networkidle', timeout: 30000 });
const main = page.locator('main').first();
await waitForReady(page, main);
const box = await main.boundingBox();
if (!box) throw new Error('Saisonübersicht besitzt keinen sichtbaren Aufnahmebereich.');
await page.screenshot({
  path: new URL('club-season.png', output).pathname,
  clip: {
    x: box.x,
    y: box.y,
    width: box.width,
    height: Math.min(box.height, 900),
  },
});
await browser.close();

console.log(`Saisonübersicht in ${process.env.DEMO_LOCALE ?? 'de'} aufgenommen.`);
