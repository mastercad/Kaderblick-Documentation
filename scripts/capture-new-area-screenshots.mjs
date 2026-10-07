import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '../../Kaderblick-Website/frontend/node_modules/playwright/index.mjs';

const email = process.env.KB_STAGING_EMAIL;
const password = process.env.KB_STAGING_PASSWORD;
if (!email || !password) throw new Error('Set KB_STAGING_EMAIL and KB_STAGING_PASSWORD.');

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const locales = {
  de: ['de', 'de'], en: ['en', 'en'], fr: ['fr', 'fr'], ru: ['ru', 'ru'], zh_Hans: ['zh-Hans', 'zh-hans'],
};
const volleyballLabels = {
  de: { Frauen: 'Frauen', Erwachsene: 'Erwachsene', Senioren: 'Senioren' },
  en: { Frauen: 'Women', Erwachsene: 'Adults', Senioren: 'Seniors' },
  fr: { Frauen: 'Femmes', Erwachsene: 'Adultes', Senioren: 'Seniors' },
  ru: { Frauen: 'Женщины', Erwachsene: 'Взрослые', Senioren: 'Ветераны' },
  zh_Hans: { Frauen: '女子', Erwachsene: '成人', Senioren: '成年组' },
};
const captures = [
  ['/marketing-materials', 'marketing-materials/overview.png'],
  ['/sports/volleyball/admin/master-data', 'volleyball/master-data.png'],
];
const selectedCaptures = process.env.KB_NEW_AREA
  ? captures.filter(([path]) => path.includes(`/${process.env.KB_NEW_AREA}/`))
  : captures;

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const loginContext = await browser.newContext({ viewport: { width: 1440, height: 1050 }, locale: 'de-DE' });
const loginPage = await loginContext.newPage();
await loginPage.goto('https://staging.kaderblick.de', { waitUntil: 'networkidle', timeout: 60000 });
const cookieButton = loginPage.getByRole('button', { name: /alle Cookies akzeptieren/i });
if (await cookieButton.isVisible().catch(() => false)) await cookieButton.click({ force: true });
await loginPage.getByRole('button', { name: /^anmelden$/i }).click();
const dialog = loginPage.getByRole('dialog');
await dialog.locator('input[type="email"]').fill(email);
await dialog.locator('input[type="password"]').fill(password);
await dialog.locator('button[type="submit"]').click();
await loginPage.waitForURL(/\/dashboard/, { timeout: 30000 });
const authCookies = await loginContext.cookies();
await loginContext.close();

for (const [locale, [appLocale, assetLocale]] of Object.entries(locales)) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1050 }, locale: locale === 'zh_Hans' ? 'zh-CN' : locale });
  await context.addCookies(authCookies);
  const page = await context.newPage();
  await page.route('**/api/about-me', async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    await route.fulfill({ response, json: { ...json, locale: appLocale } });
  });
  for (const [path, relativeOutput] of selectedCaptures) {
    await page.goto(`https://staging.kaderblick.de${path}`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1000);
    if (path.includes('/volleyball/')) {
      await page.evaluate((labels) => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          let value = node.nodeValue ?? '';
          for (const [source, target] of Object.entries(labels)) value = value.replaceAll(source, target);
          node.nodeValue = value;
        }
      }, volleyballLabels[locale]);
    }
    await page.evaluate(() => {
      document.querySelectorAll('[role="dialog"]').forEach((element) => element.remove());
      document.querySelectorAll('button[aria-label]').forEach((element) => {
        if (/Feedback geben|Give feedback|Fournir des commentaires|Отправить отзыв|提供反馈/i.test(element.getAttribute('aria-label') ?? '')) element.style.display = 'none';
      });
    });
    const output = join(root, 'public', 'images', 'docs', assetLocale, relativeOutput);
    await mkdir(dirname(output), { recursive: true });
    await page.locator('main').screenshot({ path: output, animations: 'disabled' });
  }
  await context.close();
}
await browser.close();
console.log('Localized screenshots for marketing materials and volleyball captured.');
