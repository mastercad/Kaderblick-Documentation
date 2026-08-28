/**
 * Wartet vor Dokumentations-Screenshots auf vollständig nachgeladene Inhalte.
 * Bricht bei einem dauerhaft sichtbaren Ladezustand ab, statt ein unbrauchbares
 * Bild zu veröffentlichen.
 */
export async function waitForReady(page, target = page.locator('main').first(), options = {}) {
  async function removePrivacyOverlay() {
    const necessaryOnly = page.getByRole('button', { name: /Nur notwendige|Necessary only|Nécessaires uniquement|Только необходимые|仅必要/i }).first();
    if (await necessaryOnly.isVisible().catch(() => false)) {
      await necessaryOnly.click().catch(() => {});
      await necessaryOnly.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
    }
    await page.locator('body').evaluate((body) => {
      const privacyPattern = /Wir respektieren deine Privatsphäre|We respect your privacy|Nous respectons votre vie privée|Мы уважаем вашу конфиденциальность|我们尊重(?:你|您)的隐私/i;
      for (const modal of Array.from(body.querySelectorAll('.MuiModal-root'))) {
        const text = modal.textContent ?? '';
        const isPrivacyModal = privacyPattern.test(text)
          && /Cookie-Einstellungen|Cookie settings|Paramètres des cookies|Настройки файлов cookie|Cookie\s*设置/i.test(text)
          && /Alle akzeptieren|Accept all|Tout accepter|Принять все|全部接受/i.test(text);
        if (isPrivacyModal) { modal.remove(); return; }
      }
      for (const element of Array.from(body.querySelectorAll('*')).reverse()) {
        const text = element.textContent ?? '';
        if (!privacyPattern.test(text) || !['fixed', 'sticky'].includes(getComputedStyle(element).position)) continue;
        element.remove();
        return;
      }
    });
  }
  await removePrivacyOverlay();
  const readyTarget = typeof target?.waitFor === 'function' ? target : page.locator('main').first();
  const timeout = options.timeout ?? 30000;
  const startedAt = Date.now();
  const spinnerSelector = [
    '[role="progressbar"]',
    '.MuiCircularProgress-root',
    '.MuiLinearProgress-root',
    '[aria-busy="true"]',
  ].join(',');

  await readyTarget.waitFor({ state: 'visible', timeout });
  let previous = null;
  let stableRounds = 0;

  while (Date.now() - startedAt < timeout) {
    await removePrivacyOverlay();
    const visibleSpinners = await readyTarget.locator(spinnerSelector).evaluateAll((nodes) =>
      nodes.filter((node) => {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        const className = String(node.className ?? '');
        const isDeterminate = /-determinate\b/.test(className) || node.hasAttribute('aria-valuenow');
        const isBusy = node.getAttribute('aria-busy') === 'true';
        return !isDeterminate && (isBusy || node.matches('[role="progressbar"], .MuiCircularProgress-root, .MuiLinearProgress-root'))
          && style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      }).length,
    );
    const text = (await readyTarget.innerText()).replace(/\s+/g, ' ').trim();
    const loadingText = /^(Lade|Wird geladen)|\bLade Daten\b|Loading…|Chargement…|Загрузка|加载中/u.test(text);

    if (visibleSpinners === 0 && !loadingText && text === previous && text.length > 0) {
      stableRounds += 1;
      if (stableRounds >= 3) {
        await removePrivacyOverlay();
        return;
      }
    } else {
      stableRounds = 0;
    }
    previous = text;
    await page.waitForTimeout(500);
  }

  throw new Error(`Screenshot abgebrochen: Inhalt nach ${timeout} ms nicht vollständig geladen.`);
}
