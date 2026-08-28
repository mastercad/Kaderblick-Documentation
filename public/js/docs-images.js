(function () {
    'use strict';
    const main = document.getElementById('main-content');
    const images = [...document.querySelectorAll('.screenshot__img')];
    if (!main || !images.length || typeof HTMLDialogElement === 'undefined') return;

    const dialog = document.createElement('dialog');
    dialog.className = 'image-lightbox';
    dialog.innerHTML = '<button class="image-lightbox__close" type="button"></button><figure><img><figcaption></figcaption></figure>';
    const close = dialog.querySelector('button');
    close.textContent = `× ${main.dataset.imageClose}`;
    close.setAttribute('aria-label', main.dataset.imageClose);
    document.body.append(dialog);
    let trigger = null;
    const open = (image) => {
        trigger = image;
        const target = dialog.querySelector('img');
        target.src = image.currentSrc || image.src;
        target.alt = image.alt;
        dialog.querySelector('figcaption').textContent = image.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
        dialog.showModal();
        close.focus();
    };
    images.forEach((image) => {
        const figure = image.closest('figure');
        if (figure && !figure.querySelector('.screenshot__zoom')) {
            const hint = document.createElement('span');
            hint.className = 'screenshot__zoom';
            hint.innerHTML = `<span aria-hidden="true">⌕</span> ${main.dataset.imageOpen}`;
            figure.append(hint);
        }
        image.tabIndex = 0;
        image.setAttribute('role', 'button');
        image.setAttribute('aria-label', `${main.dataset.imageOpen}: ${image.alt}`);
        image.addEventListener('click', () => open(image));
        image.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(image); }
        });
    });
    const closeDialog = () => { dialog.close(); trigger?.focus(); };
    close.addEventListener('click', closeDialog);
    dialog.addEventListener('click', (event) => { if (event.target === dialog) closeDialog(); });
})();
