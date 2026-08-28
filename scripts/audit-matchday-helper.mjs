import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const output = new URL('../var/matchday-helper-audit/', import.meta.url);
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/google-chrome'});
async function capture(role, route, name, headingPattern) {
  const context=await browser.newContext({viewport:{width:1440,height:1100},locale:'de-DE',storageState:new URL(`../var/ui-audit/${role}/storage-state.json`,import.meta.url).pathname});
  const page=await context.newPage(); const failures=[];
  page.on('response',r=>{if(r.url().includes('/api/')&&r.status()>=400)failures.push(`${r.status()} ${r.url()}`)});
  await page.goto(`https://demo.kaderblick.de${route}`,{waitUntil:'networkidle',timeout:30000});
  const privacy=page.getByText(/Wir respektieren deine Privatsphäre/i).first();
  if(await privacy.isVisible().catch(()=>false))await privacy.evaluate(node=>{let e=node;while(e&&e!==document.body){if(getComputedStyle(e).position==='fixed'){e.remove();return;}e=e.parentElement;}});
  await page.getByRole('heading',{name:headingPattern}).first().waitFor({timeout:20000}).catch(()=>{}); await page.waitForTimeout(1500);
  const main=page.locator('main').first(); await waitForReady(page, main); await main.screenshot({path:new URL(`${name}.png`,output).pathname});
  await writeFile(new URL(`${name}.txt`,output),await main.innerText()); await writeFile(new URL(`${name}-fehler.txt`,output),failures.join('\n'));
  await context.close();
}
await capture('trainer','/my-matchday/143','spieltag-trainer',/SV Weissach|Keine Spiele/i);
await capture('player','/my-matchday/143','spieltag-spieler',/SV Weissach|Keine Spiele/i);
await capture('player','/help-out','aushelfen-spieler',/Aushelfen/i);
await capture('parent','/help-out','aushelfen-eltern',/Aushelfen/i);
await browser.close(); console.log('Mein Spieltag und Aushelfen nach Rollen geprüft.');
