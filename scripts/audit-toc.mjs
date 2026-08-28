import { chromium } from '/media/Austausch/Projekte/fussballverein/Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { execFile } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';

const baseUrl = process.env.KB_DOCS_URL ?? 'http://127.0.0.1:8083';
const run = promisify(execFile);
const { stdout: routerJson } = await run('php', ['bin/console', 'debug:router', '--format=json']);
const routes = Object.entries(JSON.parse(routerJson))
    .filter(([name]) => name.startsWith('docs_'))
    .map(([, route]) => route.path)
    .filter((path) => !path.includes('{'))
    .sort();
const locales = process.env.TOC_LOCALE ? [process.env.TOC_LOCALE] : ['de', 'en', 'fr', 'ru', 'zh_Hans'];
const outputName = process.env.TOC_LOCALE ? `toc-audit-${process.env.TOC_LOCALE}.json` : 'toc-audit.json';
const output = new URL(`../var/${outputName}`, import.meta.url);
const findings = [];
const results = [];
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

for (const locale of locales) {
    for (const route of routes) {
        const response = await page.goto(`${baseUrl}${route}?lang=${locale}`, { waitUntil: 'domcontentloaded' });
        const finalUrl = new URL(page.url());
        const expectedUrl = new URL(baseUrl);
        if (finalUrl.origin !== expectedUrl.origin) {
            results.push({ locale, route, status: response?.status(), externalRedirect: finalUrl.href });
            continue;
        }
        const state = await page.evaluate(() => {
            const main = document.getElementById('main-content');
            const docsPage = main?.querySelector(':scope > .docs-page, :scope > .docs-shell > .docs-page');
            const overview = docsPage?.classList.contains('docs-page--overview') ?? false;
            const toc = main?.querySelector('.page-toc');
            const headings = [...(docsPage?.querySelectorAll('h2, h3') ?? [])].filter((heading) => !heading.closest('.guide-overview'));
            const links = [...(toc?.querySelectorAll('a[href^="#"]') ?? [])];
            return {
                centralizedPage: Boolean(docsPage),
                heroCount: docsPage?.querySelectorAll(':scope > .docs-hero').length ?? 0,
                heroHeading: docsPage?.querySelector(':scope > .docs-hero > h1')?.textContent.trim() ?? '',
                heroLead: docsPage?.querySelector(':scope > .docs-hero > .docs-hero__lead')?.textContent.trim() ?? '',
                overview,
                tocCount: main?.querySelectorAll('.page-toc').length ?? 0,
                headingCount: headings.length,
                linkCount: links.length,
                title: toc?.querySelector('.page-toc__title')?.textContent.trim() ?? '',
                brokenLinks: links.filter((link) => !document.getElementById(decodeURIComponent(link.hash.slice(1)))).map((link) => link.hash),
                duplicateIds: headings.map((heading) => heading.id).filter((id, index, ids) => !id || ids.indexOf(id) !== index),
            };
        });
        results.push({ locale, route, status: response?.status(), ...state });
        if (response?.status() !== 200
            || (state.centralizedPage && (state.heroCount !== 1 || !state.heroHeading || !state.heroLead))
            || (!state.overview && state.headingCount >= 3 && (state.tocCount !== 1
            || state.linkCount !== state.headingCount
            || !state.title))
            || state.brokenLinks.length
            || state.duplicateIds.length
        ) {
            findings.push({ locale, route, status: response?.status(), ...state });
        }
    }
}

await browser.close();
await writeFile(output, `${JSON.stringify({ routes, locales, results, findings }, null, 2)}\n`);
if (findings.length) throw new Error(`${findings.length} TOC-Prüfungen fehlgeschlagen.`);
console.log(`${results.length} Seitenvarianten: jeweils ein vollständiges Inhaltsverzeichnis mit funktionierenden Sprunglinks.`);
