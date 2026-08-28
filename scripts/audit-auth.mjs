import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir } from 'node:fs/promises';

const baseUrl = 'https://demo.kaderblick.de';
const output = new URL('../var/auth-audit/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, locale: 'de-DE' });

async function dismissCookies() {
  const accept = page.getByRole('button', { name: /alle akzeptieren/i });
  if (await accept.isVisible().catch(() => false)) {
    await accept.click();
    await accept.waitFor({ state: 'hidden' });
  }
}

await page.goto(baseUrl, { waitUntil: 'networkidle' });
await dismissCookies();
await page.getByRole('button', { name: /^anmelden$/i }).click();
let dialog = page.getByRole('dialog').filter({ has: page.getByRole('tab', { name: /^anmelden$/i }) });
await dialog.waitFor();
await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('sign-in.png', output).pathname });
await dialog.getByRole('tab', { name: /registrieren/i }).click();
await page.waitForTimeout(300);
await waitForReady(page, dialog); await dialog.screenshot({ path: new URL('register.png', output).pathname });
await dialog.getByRole('tab', { name: /anmelden/i }).click();
await dialog.getByText(/passwort vergessen/i).click();
await page.waitForURL(/forgot-password/);
await page.goto(`${baseUrl}/forgot-password`, { waitUntil: 'networkidle' });
await dismissCookies();
const forgotPasswordCard = page.locator('main form').locator('..');
await waitForReady(page, forgotPasswordCard);
await forgotPasswordCard.screenshot({ path: new URL('forgot-password.png', output).pathname });

await page.goto(`${baseUrl}/request-unlock`, { waitUntil: 'domcontentloaded' });
await dismissCookies();
await page.locator('main').waitFor();
await page.waitForTimeout(400);
const unlockCard = page.locator('main form').locator('..');
await waitForReady(page, unlockCard);
await unlockCard.screenshot({ path: new URL('konto-entsperren.png', output).pathname });

await browser.close();
console.log('Anmelde- und Wiederherstellungsansichten aufgenommen.');
