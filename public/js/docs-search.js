(() => {
    'use strict';

    const search = document.querySelector('[data-docs-search]');
    if (!search) return;

    const input = search.querySelector('[data-search-input]');
    const popover = search.querySelector('[data-search-popover]');
    const status = search.querySelector('[data-search-status]');
    const results = search.querySelector('[data-search-results]');
    const locale = search.dataset.locale || 'de';
    const urlLocale = locale === 'zh_Hans' ? 'zh-hans' : locale.toLowerCase();
    const supportedUrlLocales = new Set(['de', 'en', 'fr', 'ru', 'zh-hans']);
    let indexPromise = null;
    let index = [];

    const message = (name, count = 0) => (search.dataset[name] || '').replace('{count}', String(count));
    const normalize = (value) => value.toLocaleLowerCase(locale.replace('_', '-')).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
    const searchablePath = (url) => {
        if (url.origin !== window.location.origin) return false;
        if (url.pathname.startsWith('/_')) return false;
        return !/\.(?:png|jpe?g|gif|svg|webp|ico|css|js|woff2?|pdf|csv|zip|mtl|obj|stl|glb|gltf)$/i.test(url.pathname);
    };
    const localizedUrl = (path) => {
        const url = new URL(path, window.location.origin);
        const segments = url.pathname.split('/').filter(Boolean);
        if (supportedUrlLocales.has((segments[0] || '').toLowerCase())) segments.shift();
        url.pathname = `/${[urlLocale, ...segments].join('/')}${url.pathname.endsWith('/') && segments.length ? '/' : ''}`;
        url.searchParams.delete('lang');
        return url;
    };

    function assignHeadingIds(root = document) {
        root.querySelectorAll('main h1, main h2, main h3').forEach((heading, position) => {
            if (!heading.id) heading.id = `section-${position + 1}`;
        });
    }

    function pageEntries(documentNode, path) {
        const main = documentNode.querySelector('main');
        if (!main) return [];
        const headings = [...main.querySelectorAll('h1, h2, h3')];
        const pageTitle = headings.find((heading) => heading.tagName === 'H1')?.textContent.trim() || documentNode.title;

        return headings.map((heading, position) => {
            const parts = [];
            let node = heading.nextElementSibling;
            while (node && !/^H[1-3]$/.test(node.tagName)) {
                const text = node.textContent.replace(/\s+/g, ' ').trim();
                if (text) parts.push(text);
                node = node.nextElementSibling;
            }
            const title = heading.textContent.replace(/\s+/g, ' ').trim();
            const body = parts.join(' ');
            return {
                pageTitle,
                title,
                body,
                normalizedPageTitle: normalize(pageTitle),
                normalizedSectionTitle: normalize(title),
                normalizedTitle: normalize(`${pageTitle} ${title}`),
                normalizedBody: normalize(body),
                href: `${path}#${heading.id || `section-${position + 1}`}`,
            };
        });
    }

    async function buildIndex() {
        const seeds = [...document.querySelectorAll('.sidebar a[href], .site-header__logo')]
            .map((link) => new URL(link.href))
            .filter(searchablePath)
            .map((url) => url.pathname);
        const queue = [...new Set(seeds)];
        const visited = new Set();
        const entries = [];

        while (queue.length && visited.size < 160) {
            const batch = queue.splice(0, 6).filter((path) => !visited.has(path));
            batch.forEach((path) => visited.add(path));
            const pages = await Promise.all(batch.map(async (path) => {
                try {
                    const response = await fetch(localizedUrl(path), { headers: { 'X-Docs-Search': '1' } });
                    if (!response.ok || new URL(response.url).origin !== window.location.origin) return null;
                    return { path, documentNode: new DOMParser().parseFromString(await response.text(), 'text/html') };
                } catch (_) {
                    return null;
                }
            }));

            pages.filter(Boolean).forEach(({ path, documentNode }) => {
                entries.push(...pageEntries(documentNode, path));
                documentNode.querySelectorAll('main a[href]').forEach((link) => {
                    const url = new URL(link.getAttribute('href'), window.location.origin);
                    if (searchablePath(url) && !visited.has(url.pathname) && !queue.includes(url.pathname)) queue.push(url.pathname);
                });
            });
        }

        return entries;
    }

    function ensureIndex() {
        if (!indexPromise) {
            status.textContent = message('loading');
            indexPromise = buildIndex().then((entries) => {
                index = entries;
                runSearch();
                return entries;
            }).catch(() => {
                status.textContent = message('error');
                return [];
            });
        }
        return indexPromise;
    }

    function score(entry, terms, fullQuery) {
        if (!terms.every((term) => entry.normalizedTitle.includes(term) || entry.normalizedBody.includes(term))) return 0;
        let value = entry.normalizedPageTitle.includes(fullQuery) ? 160 : (entry.normalizedTitle.includes(fullQuery) ? 80 : 0);
        terms.forEach((term) => {
            if (entry.normalizedPageTitle.includes(term)) value += 45;
            if (entry.normalizedTitle === term) value += 60;
            else if (entry.normalizedTitle.startsWith(term)) value += 35;
            else if (entry.normalizedTitle.includes(term)) value += 20;
            if (entry.normalizedBody.includes(term)) value += 4;
        });
        return value;
    }

    function excerpt(text, rawTerms) {
        const compact = text.replace(/\s+/g, ' ').trim();
        if (!compact) return '';
        const lowered = compact.toLocaleLowerCase(locale.replace('_', '-'));
        const positions = rawTerms.map((term) => lowered.indexOf(term.toLocaleLowerCase(locale.replace('_', '-')))).filter((position) => position >= 0);
        const matchAt = positions.length ? Math.min(...positions) : 0;
        const start = Math.max(0, matchAt - 75);
        const end = Math.min(compact.length, matchAt + 190);
        return `${start > 0 ? '… ' : ''}${compact.slice(start, end).trim()}${end < compact.length ? ' …' : ''}`;
    }

    function appendHighlighted(target, text, rawTerms) {
        const escaped = rawTerms.filter(Boolean).sort((a, b) => b.length - a.length).map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        if (!escaped.length) {
            target.textContent = text;
            return;
        }
        const matcher = new RegExp(`(${escaped.join('|')})`, 'giu');
        let offset = 0;
        for (const match of text.matchAll(matcher)) {
            target.append(document.createTextNode(text.slice(offset, match.index)));
            const mark = document.createElement('mark');
            mark.textContent = match[0];
            target.append(mark);
            offset = match.index + match[0].length;
        }
        target.append(document.createTextNode(text.slice(offset)));
    }

    function render(found, rawTerms) {
        results.replaceChildren(...found.map(({ entry }) => {
            const item = document.createElement('li');
            item.className = 'search-result';
            const link = document.createElement('a');
            link.className = 'search-result__link';
            link.href = localizedUrl(entry.href);
            const page = document.createElement('div');
            page.className = 'search-result__page';
            appendHighlighted(page, entry.pageTitle, rawTerms);
            const title = document.createElement('div');
            title.className = 'search-result__title';
            appendHighlighted(title, entry.title, rawTerms);
            const matchType = document.createElement('div');
            matchType.className = 'search-result__match';
            const normalizedTerms = rawTerms.map(normalize);
            const headingMatch = normalizedTerms.some((term) => entry.normalizedSectionTitle.includes(term));
            const contentMatch = normalizedTerms.some((term) => entry.normalizedBody.includes(term));
            matchType.textContent = headingMatch ? message('matchHeading') : (contentMatch ? message('matchContent') : message('matchPage'));
            const snippet = document.createElement('div');
            snippet.className = 'search-result__snippet';
            const relevantText = entry.normalizedBody && normalizedTerms.some((term) => entry.normalizedBody.includes(term)) ? entry.body : entry.title;
            appendHighlighted(snippet, excerpt(relevantText, rawTerms), rawTerms);
            link.append(page, title, matchType, snippet);
            item.append(link);
            return item;
        }));
    }

    function runSearch() {
        const rawQuery = input.value.trim();
        const query = normalize(rawQuery);
        results.replaceChildren();
        if (query.length < 2) {
            status.textContent = message('empty');
            return;
        }
        if (!index.length) {
            status.textContent = message('loading');
            ensureIndex();
            return;
        }
        const terms = query.split(' ').filter(Boolean);
        const rawTerms = rawQuery.split(/\s+/u).filter(Boolean);
        const found = index.map((entry) => ({ entry, score: score(entry, terms, query) }))
            .filter((result) => result.score > 0)
            .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, locale))
            .slice(0, 30);
        status.textContent = found.length ? message('resultCount', found.length) : message('noResults');
        render(found, rawTerms);
    }

    function showResults() {
        popover.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        ensureIndex();
    }

    function hideResults() {
        popover.hidden = true;
        input.setAttribute('aria-expanded', 'false');
    }

    assignHeadingIds();
    input.addEventListener('focus', showResults);
    input.addEventListener('input', runSearch);
    results.addEventListener('click', () => hideResults());
    document.addEventListener('pointerdown', (event) => {
        if (!search.contains(event.target)) hideResults();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !popover.hidden) {
            event.preventDefault();
            hideResults();
            input.focus();
        } else if (event.key === 'ArrowDown' && document.activeElement === input) {
            const first = results.querySelector('a');
            if (first) { event.preventDefault(); first.focus(); }
        }
    });
})();
