import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '../../Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { waitForReady } from './lib/wait-for-ready.mjs';

const baseUrl = 'https://demo.kaderblick.de';
const captureOnlyEventCheck = process.env.KB_CAPTURE_ONLY_EVENT_CHECK === '1';
const password = process.env.KB_DEMO_PASSWORD;
if (!password) throw new Error('KB_DEMO_PASSWORD muss gesetzt sein.');
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const localeCatalog = {
  de: { app: 'de', asset: 'de', browser: 'de-DE' },
  en: { app: 'en', asset: 'en', browser: 'en-GB' },
  fr: { app: 'fr', asset: 'fr', browser: 'fr-FR' },
  ru: { app: 'ru', asset: 'ru', browser: 'ru-RU' },
  zh_Hans: { app: 'zh-Hans', asset: 'zh-hans', browser: 'zh-CN' },
};
const requestedLocale = process.env.KB_CAPTURE_LOCALE;
const locales = requestedLocale && requestedLocale in localeCatalog
  ? { [requestedLocale]: localeCatalog[requestedLocale] }
  : localeCatalog;
const accounts = {
  club: 'daniel.koenig@demo.kaderblick.example',
  coach: 'martin.berger@demo.kaderblick.example',
  member: 'elternteil.sonnenberg@demo-kaderblick.de',
  applicant: 'onboarding.freigegeben@demo-kaderblick.de',
};

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });

async function acceptCookies(page) {
  const button = page.getByRole('button', {
    name: /Alle akzeptieren|Accept all|Tout accepter|Принять все|全部接受|接受所有/i,
  }).first();
  if (await button.isVisible().catch(() => false)) await button.click({ force: true });
}

async function login(email) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1050 }, locale: 'de-DE' });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 });
  await acceptCookies(page);
  await page.getByRole('button', { name: /^Anmelden$/i }).click();
  const dialog = page.getByRole('dialog');
  await dialog.locator('input[type="email"]').fill(email);
  await dialog.locator('input[type="password"]').fill(password);
  await dialog.locator('button[type="submit"]').click();
  await page.waitForURL(/\/dashboard|\/membership-application/, { timeout: 30000 });
  const cookies = await context.cookies();
  await context.close();
  return cookies;
}

const activeAccounts = captureOnlyEventCheck ? { coach: accounts.coach } : accounts;
const sessions = Object.fromEntries(await Promise.all(
  Object.entries(activeAccounts).map(async ([key, email]) => [key, await login(email)]),
));

async function localizedPage(session, locale, viewport = { width: 1440, height: 1050 }) {
  const context = await browser.newContext({ viewport, locale: locale.browser });
  await context.addCookies(session);
  await context.addInitScript((appLocale) => {
    localStorage.setItem('kaderblick.locale', appLocale);
  }, locale.app);
  const page = await context.newPage();
  await page.route('**/api/about-me', async (route) => {
    const response = await route.fetch();
    const user = await response.json();
    await route.fulfill({ response, json: { ...user, locale: locale.app } });
  });
  return { context, page };
}

async function clean(page) {
  await acceptCookies(page);
  await page.evaluate(() => {
    const privacyPattern = /Wir respektieren deine Privatsphäre|We respect your privacy|Nous respectons votre vie privée|Мы уважаем вашу конфиденциальность|我们尊重你的隐私/i;
    const textNodes = [...document.querySelectorAll('body *')]
      .filter((element) => element.children.length === 0 && privacyPattern.test(element.textContent ?? ''));
    for (const textNode of textNodes) {
      let element = textNode;
      while (element && element !== document.body) {
        if (element.getAttribute('role') === 'dialog' || getComputedStyle(element).position === 'fixed') {
          element.remove();
          break;
        }
        element = element.parentElement;
      }
    }
    document.querySelectorAll('button[aria-label]').forEach((element) => {
      if (/Feedback geben|Give feedback|Donner un avis|Отправить отзыв|提供反馈/i.test(element.getAttribute('aria-label') ?? '')) {
        element.style.display = 'none';
      }
    });
  });
}

async function save(locator, assetLocale, relativePath, maxHeight = null) {
  const page = locator.page();
  await waitForReady(page, locator, { timeout: 45000 });
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    const privacyPattern = /Privatsphäre|privacy|vie privée|конфиденциальност|隐私|Cookies?|куки/i;
    [...document.querySelectorAll('body *')].forEach((element) => {
      if ((element.getAttribute('role') === 'dialog' || getComputedStyle(element).position === 'fixed')
        && privacyPattern.test(element.textContent ?? '')) {
        element.remove();
      }
    });
  });
  const output = join(root, 'public', 'images', 'docs', assetLocale, relativePath);
  await mkdir(dirname(output), { recursive: true });
  if (maxHeight === null) {
    await locator.screenshot({ path: output, animations: 'disabled' });
    return;
  }
  const box = await locator.boundingBox();
  if (!box) throw new Error(`Screenshot-Bereich für ${relativePath} ist nicht sichtbar.`);
  await page.screenshot({
    path: output,
    animations: 'disabled',
    clip: { x: box.x, y: box.y, width: box.width, height: Math.min(box.height, maxHeight) },
  });
}

for (const locale of Object.values(locales)) {
  if (!captureOnlyEventCheck) {
  {
    const { context, page } = await localizedPage(sessions.club, locale);
    const captures = [
      ['/club-management', 'overview.png'],
      ['/club-management/people', 'members.png'],
      ['/club-management/tasks?view=applications&panel=overview', 'applications.png'],
      ['/club-management/people?view=import', 'import.png'],
      ['/club-management/organization', 'organization.png'],
      ['/club-management/finance', 'finance.png'],
      ['/club-management/bank?view=sepa&panel=overview', 'bank.png'],
      ['/club-management/communication', 'documents.png'],
      ['/club-management/reports', 'reports.png'],
      ['/club-management/setup', 'settings.png'],
    ];
    for (const [path, filename] of captures) {
      await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle', timeout: 60000 });
      await clean(page);
      await page.locator('main').first().waitFor({ state: 'visible' });
      await save(page.locator('main').first(), locale.asset, `club-management/${filename}`);
    }
    await page.goto(`${baseUrl}/club-management/people`, { waitUntil: 'networkidle', timeout: 60000 });
    await clean(page);
    const memberList = page.locator('main ul').filter({ has: page.locator('.MuiListItemButton-root') }).first();
    await memberList.waitFor({ state: 'visible' });
    await memberList.locator('.MuiListItemButton-root').first().click();
    const memberRecord = page.locator('.MuiDrawer-paper').last();
    await memberRecord.waitFor({ state: 'visible' });
    await save(memberRecord, locale.asset, 'club-management/member-record.png');

    await page.goto(`${baseUrl}/location-occupancy`, { waitUntil: 'networkidle', timeout: 60000 });
    await clean(page);
    await save(page.locator('main').first(), locale.asset, 'location-occupancy/overview.png');
    await page.locator('button[value="season"]').click();
    await page.locator('main [role="status"]').waitFor({ state: 'hidden', timeout: 45000 }).catch(() => undefined);
    await save(page.locator('main').first(), locale.asset, 'location-occupancy/season.png', 1200);
    const occupancyIssue = page.locator('main [data-event-kind]').filter({
      hasText: /Überschneidung|Overlap|Chevauchement|Пересеч|重叠/i,
    }).first();
    if (await occupancyIssue.isVisible().catch(() => false)) {
      await save(occupancyIssue, locale.asset, 'location-occupancy/conflict.png');
    } else {
      await save(page.locator('main').first(), locale.asset, 'location-occupancy/conflict.png');
    }
    await context.close();
  }

  {
    const { context, page } = await localizedPage(sessions.applicant, locale);
    await page.goto(`${baseUrl}/membership-application`, { waitUntil: 'networkidle', timeout: 60000 });
    await clean(page);
    await save(page.locator('main').first(), locale.asset, 'member-portal/application.png');
    await context.close();
  }

  {
    const { context, page } = await localizedPage(sessions.member, locale);
    await page.goto(`${baseUrl}/member-portal`, { waitUntil: 'networkidle', timeout: 60000 });
    await clean(page);
    await save(page.locator('main').first(), locale.asset, 'member-portal/overview.png');
    await context.close();
  }
  }

  {
    const { context, page } = await localizedPage(sessions.coach, locale);
    await page.goto(`${baseUrl}/dashboard`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.evaluate(() => localStorage.setItem('team-context-last:5', '73'));
    await page.goto(`${baseUrl}/calendar`, { waitUntil: 'networkidle', timeout: 60000 });
    await clean(page);
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await page.getByText('U17 Mannschaftstraining 2026-11-17', { exact: true }).click();
    const eventDialog = page.getByRole('dialog').filter({ hasText: 'U17 Mannschaftstraining 2026-11-17' });
    await eventDialog.waitFor({ state: 'visible' });
    await save(eventDialog, locale.asset, 'training-planning/overview.png');
    const editEvent = eventDialog.getByRole('button', {
      name: /Bearbeiten|Edit|Modifier|Редактировать|编辑/i,
    }).first();
    await editEvent.click();
    const eventEditor = page.getByRole('dialog').last();
    await eventEditor.waitFor({ state: 'visible' });
    let occupancyFieldsVisible = false;
    for (let step = 0; step < 7; step += 1) {
      occupancyFieldsVisible = await eventEditor.locator('button[value="whole"], button[value="half"], button[value="A"]').first().isVisible().catch(() => false);
      if (occupancyFieldsVisible) break;
      const next = eventEditor.getByRole('button', {
        name: /Weiter|Next|Suivant|Далее|下一步/i,
      }).last();
      if (!await next.isVisible().catch(() => false) || await next.isDisabled()) break;
      await next.scrollIntoViewIfNeeded();
      await next.click();
    }
    await save(eventEditor, locale.asset, 'location-occupancy/event-check.png');
    await page.keyboard.press('Escape');
    if (captureOnlyEventCheck) {
      await context.close();
      continue;
    }
    await page.goto(`${baseUrl}/trainings/354/plan`, { waitUntil: 'networkidle', timeout: 60000 });
    await clean(page);
    await save(page.locator('main').first(), locale.asset, 'training-planning/editor.png');

    const workflowTabs = page.getByRole('tab');
    await workflowTabs.nth(1).click();
    const schedulePanel = page.getByRole('tabpanel');
    await schedulePanel.waitFor({ state: 'visible' });
    const libraryButton = schedulePanel.getByRole('button').filter({ hasNot: page.locator('svg') }).first();
    await libraryButton.click();
    const libraryDialog = page.getByRole('dialog').last();
    await libraryDialog.waitFor({ state: 'visible' });
    await save(libraryDialog, locale.asset, 'training-planning/exercise-library.png');
    await page.keyboard.press('Escape');

    const setupButton = schedulePanel.locator('button').filter({ has: page.locator('svg[data-testid="MapOutlinedIcon"]') }).first();
    if (await setupButton.isVisible().catch(() => false)) {
      await setupButton.click();
      const setupDialog = page.getByRole('dialog').last();
      await setupDialog.waitFor({ state: 'visible' });
      await save(setupDialog, locale.asset, 'training-planning/setup.png');
      await page.keyboard.press('Escape');
    } else {
      await save(schedulePanel, locale.asset, 'training-planning/setup.png');
    }

    await workflowTabs.nth(2).click();
    await save(page.getByRole('tabpanel'), locale.asset, 'training-planning/team.png');
    await workflowTabs.nth(3).click();
    const toolsPanel = page.getByRole('tabpanel');
    await save(toolsPanel, locale.asset, 'training-planning/tools.png');
    const toolButtons = toolsPanel.getByRole('button');
    if (await toolButtons.count() > 0) {
      await toolButtons.first().click();
      const analyticsDialog = page.getByRole('dialog').last();
      await analyticsDialog.waitFor({ state: 'visible' });
      await save(analyticsDialog, locale.asset, 'training-planning/analytics.png');
      await page.keyboard.press('Escape');
    } else {
      await save(toolsPanel, locale.asset, 'training-planning/analytics.png');
    }

    await page.goto(`${baseUrl}/my-team`, { waitUntil: 'networkidle', timeout: 60000 });
    await clean(page);
    const seasonCard = page.locator('[data-testid="training-season-navigation"]').locator('xpath=ancestor::*[contains(@class,"MuiCard-root")]').first();
    if (await seasonCard.isVisible().catch(() => false)) {
      await save(seasonCard, locale.asset, 'training-planning/season.png');
    } else {
      await save(page.locator('main').first(), locale.asset, 'training-planning/season.png');
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/trainings/354/run`, { waitUntil: 'networkidle', timeout: 60000 });
    await clean(page);
    await save(page.locator('main').first(), locale.asset, 'training-planning/run-mobile.png');
    await context.close();
  }
}

await browser.close();
console.log('Aktuelle, lokalisierte November-2026-Dokumentationsbilder wurden erstellt.');
