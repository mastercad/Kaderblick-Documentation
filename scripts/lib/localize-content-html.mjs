export function localizeContentHtml(html, locale) {
  const urlLocale = locale === 'zh_Hans' ? 'zh-hans' : locale;

  return html
    .replace(
      /href="\/(?!de(?:\/|$)|en(?:\/|$)|fr(?:\/|$)|ru(?:\/|$)|zh-hans(?:\/|$)|\/)/g,
      `href="/${urlLocale}/`,
    )
    .replace(
      /src="\/?images\/docs\/(?!de\/|en\/|fr\/|ru\/|zh-hans\/|camera\/|software\/)/g,
      `src="/images/docs/${urlLocale}/`,
    )
    .replace(/((?:src|href)=")(images|models|css|js|fonts)\//g, '$1/$2/');
}
