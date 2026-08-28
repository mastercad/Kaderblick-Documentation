import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const imagesRoot = join(root, 'public/images/docs');
const reserved = new Set(['de', 'en', 'fr', 'ru', 'zh-hans', 'camera', 'software']);

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  }))).flat();
}

for (const entry of await readdir(imagesRoot, { withFileTypes: true })) {
  if (!entry.isDirectory() || reserved.has(entry.name)) continue;
  const source = join(imagesRoot, entry.name);
  const target = join(imagesRoot, 'de', entry.name);
  await mkdir(target, { recursive: true });
  await cp(source, target, { recursive: true, force: true });
  await rm(source, { recursive: true });
}

const sourceRoots = [join(root, 'content'), join(root, 'templates')];
for (const sourceRoot of sourceRoots) {
  for (const file of await filesBelow(sourceRoot)) {
    if (!/\.(?:json|twig)$/.test(file)) continue;
    let body = await readFile(file, 'utf8');
    body = body.replace(/images\/docs\/(?!de\/|en\/|fr\/|ru\/|zh-hans\/|camera\/|software\/)([A-Za-z0-9_.\/-]+\.(?:png|jpe?g|webp|svg))/g, 'images/docs/de/$1');
    await writeFile(file, body);
  }
}

console.log(`Bildstruktur migriert; geprüft: ${relative(root, imagesRoot)}`);
