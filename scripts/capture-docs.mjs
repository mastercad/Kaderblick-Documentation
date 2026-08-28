import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir } from 'node:fs/promises';

const baseUrl = process.env.KB_DOCS_URL ?? 'http://127.0.0.1:8099';
const output = new URL('../var/docs-preview/', import.meta.url);
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
for (const viewport of [{ name: 'desktop', width: 1440, height: 1000 }, { name: 'mobile', width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport });
  for (const [name, path] of [['home', '/'], ['roles', '/roles'], ['start', '/getting-started'], ['dashboard', '/dashboard'], ['reports', '/reports']]) {
    await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: new URL(`${viewport.name}-${name}.png`, output).pathname, fullPage: true });
  }
  if (viewport.name === 'desktop') {
    await page.evaluate(() => localStorage.setItem('kaderblick-docs-theme', 'dark'));
    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: new URL('desktop-dark-home.png', output).pathname, fullPage: true });
  }
  await page.close();
}
await browser.close();
console.log('Dokumentationsvorschauen erstellt.');
