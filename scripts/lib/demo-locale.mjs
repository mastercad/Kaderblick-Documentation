import { readFile } from 'node:fs/promises';

export const demoLocales = ['de', 'en', 'fr', 'ru', 'zh-Hans'];

export function docsLocale(locale) {
  return locale === 'zh-Hans' ? 'zh_Hans' : locale;
}

export function assetLocale(locale) {
  return locale === 'zh-Hans' ? 'zh-hans' : locale;
}

export async function forceDemoLocale(page, locale) {
  if (!demoLocales.includes(locale)) throw new Error(`Unsupported demo locale: ${locale}`);
  await page.addInitScript((selectedLocale) => {
    window.localStorage.setItem('kaderblick.locale', selectedLocale);
  }, locale);
  await page.route('**/api/about-me', async (route) => {
    const response = await route.fetch();
    const user = await response.json();
    await route.fulfill({ response, json: { ...user, locale } });
  });
}

export async function messages(domain, locale) {
  const path = new URL(
    `../../../Kaderblick-Website/translations/messages/${domain}/messages+intl-icu.${locale}.json`,
    import.meta.url,
  );
  return JSON.parse(await readFile(path, 'utf8'));
}
