import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const output = new URL('../var/messaging-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  locale: 'de-DE',
  storageState: new URL(`../var/ui-audit/${process.env.KB_NOTIFICATION_ROLE ?? 'superadmin'}/storage-state.json`, import.meta.url).pathname,
});
const page = await context.newPage();
if (process.env.KB_EMPTY_NOTIFICATIONS === '1') {
  await page.route('**/api/notifications', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ notifications: [] }) }));
}
await page.goto('https://demo.kaderblick.de/dashboard', { waitUntil: 'networkidle' });
const notice = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
if (await notice.isVisible().catch(() => false)) {
  await notice.evaluate((node) => {
    let element = node;
    while (element && element !== document.body) {
      if (getComputedStyle(element).position === 'fixed') { element.remove(); return; }
      element = element.parentElement;
    }
  });
}
let bell = page.locator('button:has(svg[data-testid*="Notification"])').first();
if (!await bell.count()) bell = page.getByRole('button', { name: /Benachrichtigungen/i }).first();
await bell.click();
await page.waitForTimeout(400);
const popover = page.getByRole('presentation').last();
await waitForReady(page, popover); await popover.screenshot({ path: new URL(process.env.KB_NOTIFICATION_FILE ?? 'benachrichtigungen-mit-eintraegen.png', output).pathname });
await writeFile(new URL('benachrichtigungen-mit-eintraegen.txt', output), await popover.innerText());
await browser.close();
console.log('Benachrichtigungszentrale geprüft und aufgenommen.');
