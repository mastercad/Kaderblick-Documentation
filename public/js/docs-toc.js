(function () {
    'use strict';
    const main = document.getElementById('main-content');
    if (!main) return;
    let shell = main.querySelector('.docs-shell');
    let toc = shell?.querySelector('[data-page-toc]');
    if (main.querySelector('.docs-page--overview')) {
        toc?.remove();
        return;
    }
    if (!shell) {
        const docsPage = main.querySelector(':scope > .docs-page');
        if (!docsPage) return;
        shell = document.createElement('div');
        shell.className = 'docs-shell';
        docsPage.before(shell);
        shell.append(docsPage);
        toc = document.createElement('aside');
        toc.className = 'page-toc';
        toc.dataset.pageToc = '';
        toc.setAttribute('aria-label', main.dataset.tocTitle);
        shell.append(toc);
    }

    const headings = [...shell.querySelectorAll('.docs-page h2, .docs-page h3')].filter((heading) => !heading.closest('.on-this-page'));
    if (headings.length < 3) { toc.remove(); shell.classList.add('docs-shell--without-toc'); return; }

    const used = new Set();
    headings.forEach((heading, index) => {
        const base = (heading.id || heading.textContent).trim().toLocaleLowerCase(document.documentElement.lang || undefined)
            .normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^\p{Letter}\p{Number}]+/gu, '-').replace(/^-+|-+$/g, '') || `section-${index + 1}`;
        let id = base;
        let suffix = 2;
        while (used.has(id)) id = `${base}-${suffix++}`;
        used.add(id);
        heading.id = id;
        heading.tabIndex = -1;
    });

    const title = document.createElement('p');
    title.className = 'page-toc__title';
    title.textContent = main.dataset.tocTitle;
    const list = document.createElement('ol');
    list.className = 'page-toc__list';
    headings.forEach((heading) => {
        const item = document.createElement('li');
        item.className = `page-toc__item page-toc__item--${heading.tagName.toLowerCase()}`;
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent.trim();
        link.dataset.tocLink = heading.id;
        item.append(link);
        list.append(item);
    });
    toc.append(title, list);

    const controls = document.createElement('div');
    controls.className = 'reading-controls';
    const menuButton = document.createElement('button');
    menuButton.className = 'reading-controls__sections';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = `<span aria-hidden="true">☷</span><span>${main.dataset.tocOpen}</span>`;
    const topButton = document.createElement('button');
    topButton.className = 'reading-controls__top';
    topButton.type = 'button';
    topButton.setAttribute('aria-label', main.dataset.backToTop);
    topButton.innerHTML = '<span aria-hidden="true">↑</span>';
    controls.append(menuButton, topButton);
    main.append(controls);

    const closeMenu = () => {
        toc.classList.remove('page-toc--open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.lastElementChild.textContent = main.dataset.tocOpen;
    };
    menuButton.addEventListener('click', () => {
        const open = toc.classList.toggle('page-toc--open');
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.lastElementChild.textContent = open ? main.dataset.tocClose : main.dataset.tocOpen;
    });
    toc.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
    topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

    const links = new Map([...toc.querySelectorAll('[data-toc-link]')].map((link) => [link.dataset.tocLink, link]));
    let active = headings[0].id;
    links.get(active)?.setAttribute('aria-current', 'location');
    const setActive = (id) => {
        if (!links.has(id) || id === active) return;
        links.get(active)?.removeAttribute('aria-current');
        links.get(id).setAttribute('aria-current', 'location');
        active = id;
    };
    const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-18% 0px -68% 0px' });
    headings.forEach((heading) => observer.observe(heading));

    const toggleTop = () => topButton.classList.toggle('reading-controls__top--visible', window.scrollY > 700);
    addEventListener('scroll', toggleTop, { passive: true });
    toggleTop();
})();
