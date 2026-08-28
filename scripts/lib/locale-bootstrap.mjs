import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';

const locale = process.env.DEMO_LOCALE ?? 'de';
const docsLocale = locale === 'zh-Hans' ? 'zh_Hans' : locale;
const catalogRoot = '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/translations/messages';

function files(root) {
  return readdirSync(root).flatMap((name) => {
    const path = join(root, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const translations = [];
if (locale !== 'de') {
  for (const germanPath of files(catalogRoot).filter((path) => path.endsWith('.de.json'))) {
    const localizedPath = germanPath.replace(/\.de\.json$/, `.${locale}.json`);
    if (!existsSync(localizedPath)) continue;
    const german = JSON.parse(readFileSync(germanPath, 'utf8'));
    const localized = JSON.parse(readFileSync(localizedPath, 'utf8'));
    for (const [id, source] of Object.entries(german)) {
      const target = localized[id];
      if (typeof source !== 'string' || typeof target !== 'string' || source.includes('{') || target.includes('{')) continue;
      translations.push([source, target]);
    }
  }
  translations.sort((left, right) => right[0].length - left[0].length);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function translateSelector(value) {
  if (locale === 'de' || value == null) return value;
  if (typeof value === 'string') {
    return translations.find(([source]) => source === value)?.[1] ?? value;
  }
  if (!(value instanceof RegExp)) return value;
  const matches = translations.filter(([source]) => {
    value.lastIndex = 0;
    return value.test(source);
  });
  if (matches.length === 0 || matches.length > 80) return value;
  const alternatives = [...new Set(matches.map(([, localized]) => escapeRegex(localized)))];
  const anchoredStart = value.source.startsWith('^') ? '^' : '';
  const anchoredEnd = value.source.endsWith('$') ? '$' : '';
  return new RegExp(`${anchoredStart}(?:${alternatives.join('|')})${anchoredEnd}`, value.flags);
}

function localizedPath(path) {
  if (locale === 'de' || typeof path !== 'string') return path;
  const directory = dirname(path);
  if (basename(directory) === docsLocale) return path;
  const targetDirectory = join(directory, docsLocale);
  mkdirSync(targetDirectory, { recursive: true });
  return join(targetDirectory, basename(path));
}

function patchSelectors(target) {
  for (const method of ['getByRole', 'getByText', 'getByLabel', 'getByPlaceholder', 'getByTitle']) {
    if (typeof target[method] !== 'function' || target[`__localized_${method}`]) continue;
    const original = target[method];
    target[method] = function (first, second) {
      const result = method === 'getByRole'
        ? original.call(this, first, second ? { ...second, name: translateSelector(second.name) } : second)
        : original.call(this, translateSelector(first), second);
      return patchSelectors(result);
    };
    target[`__localized_${method}`] = true;
  }
  for (const method of ['first', 'last', 'locator', 'filter', 'nth']) {
    if (typeof target[method] !== 'function' || target[`__localized_chain_${method}`]) continue;
    const original = target[method];
    target[method] = function (...args) {
      if (method === 'filter' && args[0]) {
        args[0] = {
          ...args[0],
          hasText: translateSelector(args[0].hasText),
          hasNotText: translateSelector(args[0].hasNotText),
        };
      }
      return patchSelectors(original.apply(this, args));
    };
    target[`__localized_chain_${method}`] = true;
  }
  return target;
}

async function preparePage(page) {
  patchSelectors(page);
  const locator = page.locator('html');
  const prototype = Object.getPrototypeOf(locator);
  if (!prototype.__localized_screenshot) {
    const original = prototype.screenshot;
    prototype.screenshot = function (options = {}) {
      return original.call(this, { ...options, path: localizedPath(options.path) });
    };
    prototype.__localized_screenshot = true;
  }
  const originalScreenshot = page.screenshot.bind(page);
  page.screenshot = (options = {}) => originalScreenshot({ ...options, path: localizedPath(options.path) });
  return page;
}

async function prepareContext(context) {
  await context.addInitScript((selectedLocale) => {
    window.localStorage.setItem('kaderblick.locale', selectedLocale);
  }, locale);
  await context.route('**/api/about-me', async (route) => {
    const response = await route.fetch();
    const user = await response.json();
    await route.fulfill({ response, json: { ...user, locale } });
  });
  const originalNewPage = context.newPage.bind(context);
  context.newPage = async (...args) => preparePage(await originalNewPage(...args));
  return context;
}

const originalLaunch = chromium.launch.bind(chromium);
chromium.launch = async (...args) => {
  const browser = await originalLaunch(...args);
  const originalNewContext = browser.newContext.bind(browser);
  browser.newContext = async (...contextArgs) => prepareContext(await originalNewContext(...contextArgs));
  const originalNewPage = browser.newPage.bind(browser);
  browser.newPage = async (...pageArgs) => {
    const page = await originalNewPage(...pageArgs);
    await prepareContext(page.context());
    return preparePage(page);
  };
  return browser;
};
