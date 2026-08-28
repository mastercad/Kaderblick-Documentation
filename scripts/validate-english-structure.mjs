import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const projectRoot = new URL('../', import.meta.url).pathname;
const sourceRoots = ['src', 'templates', 'public/js', 'content'];
const assetRoots = ['public/images', 'public/models'];
const findings = [];
const nonEnglishIdentifier = /(?:aufgabe|aufstellung|benachrichtigung|bericht|benutzer|beobachtung|fahrgemeinschaft|funktionaer|inventar|kalender|kamera|kasse|kleider|nachricht|profil(?!e)|spieler|spielort|strafe|teileliste|training(?:s)?nachweis|turnier|umfrage|verein|wissen)/i;
const legacyUrlSegment = /\/(?:abrechnung|aufgaben|aufstellungen|aushelfen|authentifizierung|benachrichtigungen|benutzer-zuordnungen|beobachtungsliste|berichte|erste-schritte|fahrgemeinschaften|inventar|kalender|kassenbuch|kleidergroessen|mein-deckel|mein-spieltag|nachrichten|profil|rollen|spiele|spieler|spielstaetten|staff-und-funktionaere|strafenkatalog|trainer|trainingsnachweise|turniere|umfragen|vereine-teams|video-analyse|wissenspool|kamera-systeme|kamera|bauanleitung|teileliste|3d-ansicht)(?:\/|$)/i;

async function filesBelow(directory) {
    const entries = await readdir(join(projectRoot, directory), { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const path = join(directory, entry.name);
        files.push(...(entry.isDirectory() ? await filesBelow(path) : [path]));
    }
    return files;
}

function report(path, value, category) {
    findings.push(`${relative(projectRoot, join(projectRoot, path))}: ${category}: ${value}`);
}

for (const root of sourceRoots) {
    for (const path of await filesBelow(root)) {
        if (!['.php', '.twig', '.js', '.json'].includes(extname(path))) continue;
        const content = await readFile(join(projectRoot, path), 'utf8');

        const identifierPatterns = [
            /\b(?:class|function|const|let|var)\s+([A-Za-z_$][A-Za-z0-9_$]*)/g,
            /(?:private|protected|public)\s+(?:readonly\s+)?(?:[A-Za-z_\\|?]+\s+)?\$([A-Za-z_][A-Za-z0-9_]*)/g,
            /\{%-?\s*set\s+([A-Za-z_][A-Za-z0-9_]*)/g,
            /\b(?:id|class|data-[a-z0-9-]+)=["']([^"']+)["']/g,
        ];
        for (const pattern of identifierPatterns) {
            for (const match of content.matchAll(pattern)) {
                if (nonEnglishIdentifier.test(match[1])) report(path, match[1], 'non-English identifier');
            }
        }

        for (const match of content.matchAll(/#\[Route\(['"]([^'"]+)['"]/g)) {
            if (legacyUrlSegment.test(match[1])) report(path, match[1], 'non-English canonical route');
        }
        for (const match of content.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
            if (legacyUrlSegment.test(match[1])) report(path, match[1], 'non-English internal URL');
        }
        for (const match of content.matchAll(/path\(['"]([^'"]+)['"]/g)) {
            if (!match[1].startsWith('docs_')) report(path, match[1], 'non-canonical route reference');
        }
    }
}

for (const root of assetRoots) {
    for (const path of await filesBelow(root)) {
        const assetPath = relative(root, path);
        if (!/^[A-Za-z0-9./-]+$/.test(assetPath)) report(path, assetPath, 'invalid asset path characters');
        if (nonEnglishIdentifier.test(assetPath)) report(path, assetPath, 'non-English asset path');
    }
}

if (findings.length) {
    console.error(findings.join('\n'));
    process.exitCode = 1;
} else {
    console.log('English code identifiers, canonical URLs and asset paths validated.');
}
