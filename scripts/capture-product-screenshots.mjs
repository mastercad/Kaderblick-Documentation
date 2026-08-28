import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';
import { mkdir } from 'node:fs/promises';

const baseUrl = 'https://demo.kaderblick.de';
const password = process.env.KB_DEMO_PASSWORD;
if (!password) throw new Error('KB_DEMO_PASSWORD muss gesetzt sein.');

const output = new URL('../var/product-screenshots/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });

async function dismissCookies(page) {
  const cookieButton = page.getByRole('button', { name: /alle akzeptieren/i });
  if (await cookieButton.isVisible().catch(() => false)) {
    await cookieButton.click();
    await cookieButton.waitFor({ state: 'hidden' });
  }
}

async function removeCookieOverlayForCapture(page) {
  const notice = page.getByText(/Wir respektieren deine Privatsphäre/i).first();
  if (!await notice.isVisible().catch(() => false)) return;
  await notice.evaluate((node) => {
    let element = node;
    while (element && element !== document.body) {
      if (getComputedStyle(element).position === 'fixed') {
        element.remove();
        return;
      }
      element = element.parentElement;
    }
  });
}

async function openProfile(profile, email) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: 'de-DE' });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await dismissCookies(page);
  await page.getByRole('button', { name: /^anmelden$/i }).click();
  const dialog = page.getByRole('dialog');
  await dialog.locator('input[type="email"]').fill(email);
  await dialog.locator('input[type="password"]').fill(password);
  await dialog.locator('button[type="submit"]').click();
  await page.waitForURL(/\/dashboard/, { timeout: 20000 });
  await page.getByText('Dashboard', { exact: true }).first().waitFor({ state: 'visible', timeout: 30000 });
  await page.getByText(/Willkommen zurück/i).waitFor({ state: 'visible', timeout: 30000 });
  await dismissCookies(page);
  await page.waitForTimeout(2500);
  return page;
}

async function captureMain(page, profile, name, path) {
  await page.goto(`${baseUrl}${path}`, { waitUntil: 'domcontentloaded' });
  await dismissCookies(page);
  await page.locator('main').waitFor({ state: 'visible' });
  await page.waitForTimeout(2200);
  await removeCookieOverlayForCapture(page);
  await waitForReady(page, page.locator('main')); await page.locator('main').screenshot({ path: new URL(`${profile}-${name}.png`, output).pathname });
}

const trainer = await openProfile('trainer', 'trainer1.sonnenberg@demo-kaderblick.de');
await removeCookieOverlayForCapture(trainer);
await waitForReady(trainer, trainer.locator('main').first()); await trainer.screenshot({ path: new URL('trainer-navigation.png', output).pathname, fullPage: false });
await captureMain(trainer, 'trainer', 'dashboard', '/dashboard');
await captureMain(trainer, 'trainer', 'calendar', '/calendar');
await captureMain(trainer, 'trainer', 'games', '/games');
await captureMain(trainer, 'trainer', 'team', '/my-team');
for (const [name, path] of [
  ['players', '/players'], ['coaches', '/coaches'], ['formations', '/formations'],
  ['reports', '/reports'], ['tasks', '/tasks'], ['news', '/news'],
  ['surveys', '/surveys'], ['training-proofs', '/training-proofs'],
  ['watchlist', '/watchlist'], ['imports', '/imports'], ['locations', '/locations']
]) await captureMain(trainer, 'trainer', name, path);
await trainer.close();

const player = await openProfile('player', 'spieler1.sonnenberg@demo-kaderblick.de');
await captureMain(player, 'player', 'dashboard', '/dashboard');
await captureMain(player, 'player', 'matchday', '/my-matchday');
await player.close();

const admin = await openProfile('admin', 'admin.sonnenberg@demo-kaderblick.de');
await removeCookieOverlayForCapture(admin);
await waitForReady(admin, admin.locator('main').first()); await admin.screenshot({ path: new URL('admin-navigation.png', output).pathname, fullPage: false });
await captureMain(admin, 'admin', 'clubs', '/clubs');
await captureMain(admin, 'admin', 'teams', '/teams');
for (const [name, path] of [
  ['user-relations', '/admin/user-relations'],
  ['staff-assignments', '/admin/staff-assignments'],
  ['functionary-assignments', '/admin/functionary-assignments'],
  ['cashbook', '/cash-book'], ['billing', '/billing'],
  ['penalties', '/fines-catalogue'], ['inventory', '/inventory']
]) await captureMain(admin, 'admin', name, path);
await admin.close();

const treasurer = await openProfile('treasurer', 'kassenwart-team.sonnenberg@demo-kaderblick.de');
await captureMain(treasurer, 'treasurer', 'cashbook', '/cash-book');
await captureMain(treasurer, 'treasurer', 'billing', '/billing');
await captureMain(treasurer, 'treasurer', 'my-tab', '/my-balance');
await captureMain(treasurer, 'treasurer', 'penalties', '/fines-catalogue');
await treasurer.close();

const kitManager = await openProfile('kit-manager', 'zeugwart-team.sonnenberg@demo-kaderblick.de');
await captureMain(kitManager, 'kit-manager', 'inventory', '/inventory');
await kitManager.close();

const superadmin = await openProfile('superadmin', 'superadmin.sonnenberg@demo-kaderblick.de');
await captureMain(superadmin, 'superadmin', 'hall-of-fame', '/hall-of-fame');
await captureMain(superadmin, 'superadmin', 'title-xp-overview', '/admin/title-xp-overview');
await captureMain(superadmin, 'superadmin', 'xp-config', '/admin/xp-config');
await superadmin.close();

await browser.close();
console.log('Produktoberflächen aufgenommen.');
