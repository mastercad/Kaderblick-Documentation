import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { waitForReady } from './lib/wait-for-ready.mjs';
const output = new URL('../var/quick-event-audit/', import.meta.url); await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/google-chrome'});
const context=await browser.newContext({viewport:{width:1440,height:1100},locale:'de-DE',storageState:new URL('../var/ui-audit/coaches/storage-state.json',import.meta.url).pathname});
const page=await context.newPage(); const failures=[]; page.on('response',r=>{if(r.url().includes('/api/')&&r.status()>=400)failures.push(`${r.status()} ${r.url()}`)});
await page.goto('https://demo.kaderblick.de/quick-event-konfigurationen',{waitUntil:'networkidle',timeout:30000});
const privacy=page.getByText(/Wir respektieren deine Privatsphäre/i).first(); if(await privacy.isVisible().catch(()=>false))await privacy.evaluate(node=>{let e=node;while(e&&e!==document.body){if(getComputedStyle(e).position==='fixed'){e.remove();return}e=e.parentElement}});
const main=page.locator('main').first(); await waitForReady(page, main); await main.screenshot({path:new URL('overview.png',output).pathname}); await writeFile(new URL('uebersicht.txt',output),await main.innerText());
let create=page.getByRole('button',{name:/Konfiguration erstellen|Neu/i}).first(); if(!await create.isVisible().catch(()=>false)) create=main.getByRole('button').first(); if(await create.isVisible().catch(()=>false)){await create.click();await page.waitForTimeout(1000);const dialog=page.getByRole('dialog').first();const target=await dialog.isVisible().catch(()=>false)?dialog:page.locator('main').first();await waitForReady(page,target);await target.screenshot({path:new URL('editor.png',output).pathname});await writeFile(new URL('editor.txt',output),await target.innerText());}
await writeFile(new URL('fehler.txt',output),failures.join('\n')); await browser.close(); console.log('Quick-Event-Konfiguration als Trainer geprüft.');
