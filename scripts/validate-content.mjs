import { access, readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const templatesRoot = join(root, 'templates');
const contentRoot = join(root, 'content');
const imagesRoot = join(root, 'public/images/docs');
const findings = [];

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  }));
  return nested.flat();
}

const sourceFiles = [
  ...(await filesBelow(templatesRoot)).filter((path) => path.endsWith('.html.twig')),
  ...(await filesBelow(contentRoot)).filter((path) => path.endsWith('.json')),
];

for (const file of sourceFiles) {
  const content = await readFile(file, 'utf8');
  const label = relative(root, file);
  const localeMatch = label.match(/^content\/(de|en|fr|ru|zh_Hans)\//);

  if (localeMatch) {
    const expectedUrlLocale = localeMatch[1] === 'zh_Hans' ? 'zh-hans' : localeMatch[1];
    for (const match of content.matchAll(/href=\\?"\/(?!\/)([^"?#]*)/g)) {
      if (!match[1].startsWith(`${expectedUrlLocale}/`) && match[1] !== expectedUrlLocale) {
        findings.push(`${label}: interner Link ohne Sprachpräfix /${match[1]}`);
      }
    }
  }

  for (const match of content.matchAll(/(?:src|href)=\\?"((?:images|models|css|js|fonts)\/[^"?#]*)/g)) {
    findings.push(`${label}: relativer Asset-Pfad ${match[1]}`);
  }

  for (const match of content.matchAll(/images\/docs\/[A-Za-z0-9_./-]+\.(?:png|jpg|jpeg|webp|svg)/g)) {
    try {
      await access(join(root, 'public', match[0]));
    } catch {
      findings.push(`${label}: fehlendes Bild ${match[0]}`);
    }
    if (localeMatch && localeMatch[1] !== 'de' && !match[0].includes('images/docs/software/')) {
      const expectedAssetLocale = localeMatch[1] === 'zh_Hans' ? 'zh-hans' : localeMatch[1];
      if (!match[0].startsWith(`images/docs/${expectedAssetLocale}/`)) {
        findings.push(`${label}: nicht lokalisiertes Oberflächenbild ${match[0]}`);
      }
    }
  }

  for (const phrase of ['in Planung', 'wahrscheinlich', 'technischen Support']) {
    if (content.includes(phrase)) findings.push(`${label}: zu prüfende Formulierung „${phrase}“`);
  }
  const isPreservedCameraContent = label.startsWith('templates/tools/camera/') || label.startsWith('templates/tools/camera-systems/');
  if (!isPreservedCameraContent && /\b(?:Wählen|Öffnen|Klicken|Geben|Tragen|Prüfen|Nutzen|Lesen|Speichern|Bestätigen|Wechseln) Sie\b/.test(content)) {
    findings.push(`${label}: förmliche Handlungsanweisung gefunden`);
  }
}

const allowedImageDirectories = new Set(['camera', 'de', 'en', 'fr', 'ru', 'software', 'zh-hans']);
for (const entry of await readdir(imagesRoot, { withFileTypes: true })) {
  if (entry.isDirectory() && !allowedImageDirectories.has(entry.name)) {
    findings.push(`public/images/docs: unerlaubter gemeinsamer Bildordner ${entry.name}`);
  }
}

const germanAssets = (await filesBelow(join(imagesRoot, 'de'))).map((path) => relative(join(imagesRoot, 'de'), path));
for (const locale of ['en', 'fr', 'ru', 'zh-hans']) {
  for (const asset of germanAssets) {
    try {
      await access(join(imagesRoot, locale, asset));
    } catch {
      findings.push(`public/images/docs/${locale}: lokalisiertes Gegenstück fehlt für ${asset}`);
    }
  }
}

if (findings.length) {
  console.error(findings.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Inhaltsprüfung ohne Befund.');
}
