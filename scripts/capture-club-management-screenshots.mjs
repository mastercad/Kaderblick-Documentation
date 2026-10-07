import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '../../Kaderblick-Website/frontend/node_modules/playwright/index.mjs';

const email = process.env.KB_STAGING_EMAIL;
const password = process.env.KB_STAGING_PASSWORD;
const stagingClub = process.env.KB_STAGING_CLUB;
const stagingMember = process.env.KB_STAGING_MEMBER_NAME;
if (!email || !password || !stagingClub || !stagingMember) {
  throw new Error('Set KB_STAGING_EMAIL, KB_STAGING_PASSWORD, KB_STAGING_CLUB and KB_STAGING_MEMBER_NAME.');
}

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const locales = {
  de: { app: 'de', asset: 'de', person: 'Mara Beispiel', club: 'Beispielverein 90', number: 'Mitgliedsnummer: 1001' },
  en: { app: 'en', asset: 'en', person: 'Alex Sample', club: 'Example Club 90', number: 'Member number: 1001' },
  fr: { app: 'fr', asset: 'fr', person: 'Camille Exemple', club: 'Club Exemple 90', number: 'Numéro de membre : 1001' },
  ru: { app: 'ru', asset: 'ru', person: 'Анна Примерова', club: 'Клуб-пример 90', number: 'Номер участника: 1001' },
  zh_Hans: { app: 'zh-Hans', asset: 'zh-hans', person: '李晓明', club: '示例俱乐部 90', number: '会员编号：1001' },
};
const captures = [
  ['/club-management', 'overview.png'],
  ['/club-management/members', 'members.png'],
  ['/club-management/finance', 'finance.png'],
  ['/club-management/reports', 'reports.png'],
  ['/club-management/settings', 'settings.png'],
];

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const loginContext = await browser.newContext({ viewport: { width: 1440, height: 1050 }, locale: 'de-DE' });
const loginPage = await loginContext.newPage();
await loginPage.goto('https://staging.kaderblick.de', { waitUntil: 'networkidle', timeout: 60000 });
const cookies = loginPage.getByRole('button', { name: /alle akzeptieren/i });
if (await cookies.isVisible().catch(() => false)) await cookies.click();
await loginPage.getByRole('button', { name: /^anmelden$/i }).click();
const dialog = loginPage.getByRole('dialog');
await dialog.locator('input[type="email"]').fill(email);
await dialog.locator('input[type="password"]').fill(password);
await dialog.locator('button[type="submit"]').click();
await loginPage.waitForURL(/\/dashboard/, { timeout: 30000 });
const authCookies = await loginContext.cookies();
await loginContext.close();

for (const [locale, names] of Object.entries(locales)) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1050 }, locale: locale === 'zh_Hans' ? 'zh-CN' : locale });
  await context.addCookies(authCookies);
  const page = await context.newPage();
  await page.route('**/api/about-me', async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    await route.fulfill({ response, json: { ...json, locale: names.app } });
  });

  for (const [path, filename] of captures) {
    await page.goto(`https://staging.kaderblick.de${path}`, { waitUntil: 'networkidle', timeout: 60000 });
    const acceptCookies = page.getByRole('button', { name: /Alle Cookies akzeptieren|Accept all cookies|Accepter tous les cookies|Принять все кукисы|接受所有 cookie/i });
    if (await acceptCookies.isVisible().catch(() => false)) await acceptCookies.click({ force: true });
    const clubSelector = page.locator('main [role="combobox"]').first();
    await clubSelector.click();
    await page.getByRole('option', { name: stagingClub, exact: true }).click();
    await page.waitForTimeout(2000);
    const memberName = page.getByText(stagingMember, { exact: true });
    if (filename === 'members.png') await memberName.waitFor({ state: 'visible', timeout: 10000 });

    await page.evaluate(({ person, club, number, emailAddress, sourceClub, sourceMember }) => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        let value = node.nodeValue ?? '';
        value = value.replaceAll(sourceClub, club);
        value = value.replaceAll(sourceMember, person);
        value = value.replaceAll('Andreas Kempe', 'A. Beispiel');
        value = value.replaceAll(emailAddress, 'konto@beispiel.invalid');
        if (/^(Mitgliedsnummer|Member number|Numéro de membre|Номер участника|会员编号)\s*[:：]/i.test(value.trim())) value = number;
        node.nodeValue = value;
      }
    }, { person: names.person, club: names.club, number: names.number, emailAddress: email, sourceClub: stagingClub, sourceMember: stagingMember });

    if (filename === 'members.png') {
      await memberName.evaluate((element, replacement) => { element.textContent = replacement; }, names.person);
      const memberNumber = page.getByText(/^(Mitgliedsnummer|Member number|Numéro de membre|Номер участника|会员编号)\s*[:：]/i).first();
      if (await memberNumber.isVisible().catch(() => false)) {
        await memberNumber.evaluate((element, replacement) => { element.textContent = replacement; }, names.number);
      }
    }
    await page.evaluate(() => {
      document.querySelectorAll('[role="dialog"]').forEach((element) => element.remove());
      document.querySelectorAll('button[aria-label]').forEach((element) => {
        if (/Feedback geben|Give feedback|Fournir des commentaires|Отправить отзыв|提供反馈/i.test(element.getAttribute('aria-label') ?? '')) {
          element.style.display = 'none';
        }
      });
    });

    const output = join(root, 'public', 'images', 'docs', names.asset, 'club-management', filename);
    await mkdir(dirname(output), { recursive: true });
    await page.locator('main').screenshot({ path: output, animations: 'disabled' });
  }
  await context.close();
}

await browser.close();
console.log('Localized, anonymized club-management screenshots captured.');
