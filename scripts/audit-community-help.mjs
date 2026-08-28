import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const output = new URL('../var/community-help-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, locale: 'de-DE', storageState: new URL('../var/ui-audit/coaches/storage-state.json', import.meta.url).pathname });
const page = await context.newPage();
async function clean() {
  const n=page.getByText(/Wir respektieren deine Privatsphäre/i).first();
  if(await n.isVisible().catch(()=>false)) await n.evaluate((node)=>{let e=node;while(e&&e!==document.body){if(getComputedStyle(e).position==='fixed'){e.remove();return;}e=e.parentElement;}});
}
await page.goto('https://demo.kaderblick.de/knowledge-pool', { waitUntil: 'networkidle', timeout: 30000 });
await clean();
await page.locator('main').first().waitFor({ state: 'visible' });
await page.waitForTimeout(1000);
const main=page.locator('main').first();
await waitForReady(page, main); await main.screenshot({ path: new URL('wissenspool.png', output).pathname });
await writeFile(new URL('wissenspool.txt', output), await main.innerText());
let create=page.getByRole('button',{name:/Beitrag erstellen/i}).first();
if(!await create.isVisible().catch(()=>false)) create=main.getByRole('button').first();
if(await create.isVisible().catch(()=>false)){
  await create.click(); const d=page.getByRole('dialog').last(); await d.waitFor();
  await waitForReady(page, d); await d.screenshot({path:new URL('wissenspool-beitrag.png',output).pathname});
  await writeFile(new URL('wissenspool-beitrag.txt',output),await d.innerText());
  await page.keyboard.press('Escape');
}
await page.goto('https://demo.kaderblick.de/mein-feedback', { waitUntil: 'networkidle', timeout: 30000 });
await clean(); await page.locator('main').first().waitFor({ state: 'visible' }); await page.waitForTimeout(800);
await waitForReady(page, page.locator('main').first()); await page.locator('main').first().screenshot({path:new URL('mein-feedback.png',output).pathname});
await writeFile(new URL('mein-feedback.txt',output),await page.locator('main').first().innerText());
const fab=page.getByRole('button',{name:/Feedback geben/i});
if(await fab.isVisible().catch(()=>false)){
  await fab.click(); const d=page.getByRole('dialog').last(); await d.waitFor();
  await waitForReady(page, d); await d.screenshot({path:new URL('feedback-geben.png',output).pathname});
  await writeFile(new URL('feedback-geben.txt',output),await d.innerText());
}
await browser.close(); console.log('Wissenspool und Feedback geprüft.');
