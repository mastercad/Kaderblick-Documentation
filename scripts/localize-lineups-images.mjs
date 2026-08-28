import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { assetLocale, docsLocale, demoLocales } from './lib/demo-locale.mjs';

for (const locale of demoLocales) {
  const docs = docsLocale(locale);
  const assets = assetLocale(locale);
  const publicRoot = new URL(`../public/images/docs/${assets}/`, import.meta.url);
  await mkdir(new URL('lineups/', publicRoot), { recursive: true });
  await mkdir(new URL('games/', publicRoot), { recursive: true });

  const copies = [
    [`../var/formation-tactics-audit/${docs}/overview.png`, 'lineups/current-lineups.png'],
    [`../var/formations-audit/${docs}/auswahl.png`, 'lineups/formation-systems.png'],
    [`../var/formations-audit/${docs}/editor.png`, 'lineups/lineup-editor.png'],
    [`../var/formation-tactics-audit/${docs}/board-panels.png`, 'lineups/tactics-board.png'],
    [`../var/tactics-audit/${docs}/match-plan.png`, 'games/match-plan.png'],
    [`../var/match-plan-actions-audit/${docs}/formation-choice.png`, 'games/match-plan-formation-choice.png'],
    [`../var/match-plan-actions-audit/${docs}/new-phase.png`, 'games/match-plan-new-phase.png'],
    [`../var/match-plan-actions-audit/${docs}/import-tactics.png`, 'games/match-plan-import-tactics.png'],
    [`../var/match-plan-actions-audit/${docs}/save-template.png`, 'games/match-plan-save-template.png'],
  ];
  for (const [source, target] of copies) {
    await copyFile(new URL(source, import.meta.url), new URL(target, publicRoot));
  }

  const contentPath = new URL(`../content/${docs}/lineups.json`, import.meta.url);
  const content = await readFile(contentPath, 'utf8');
  const normalized = content.replace(new RegExp(`images/docs/(?:de|en|fr|ru|zh_Hans|zh-hans)/`, 'g'), 'images/docs/');
  await writeFile(contentPath, normalized.replaceAll('images/docs/', `images/docs/${assets}/`));
}
