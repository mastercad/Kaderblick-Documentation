# Prüfprotokoll der Benutzeroberfläche

## Vollständigkeitsaudit der Dokumentationsartefakte

- Alle aktiven Endverbraucherbereiche besitzen eine deutsche Referenzseite sowie vollständige Seitenfassungen für Englisch, Französisch, Russisch und vereinfachtes Chinesisch.
- Navigation und gemeinsame Oberflächentexte besitzen Kataloge für alle fünf Sprachen.
- Sämtliche 154 aus veröffentlichten Inhalten referenzierten Aufnahmen sind vorhanden, nicht leer und visuell auf Ladezustände, blockierende Overlays und sichtbare Zugangsdaten geprüft.
- 32 weitere Bilddateien sind unreferenzierter Alt- oder Duplikatbestand und gelten nicht als veröffentlicht.
- Die Rollenmatrix belegt zehn Demo-Perspektiven mit jeweils 58 geöffneten Routen. Detailaktionen wurden je Funktionsbereich zusätzlich über Oberfläche und Quellpfade geprüft.
- Administration, Rollenorientierung und bereichsübergreifende Abläufe verwenden die belegten Ebenen und Beziehungen.

## 6. September 2026 – Einsatzplanung

### Geprüfte Quellen

- aktuelle Implementierung der Einsatzplanung in der lokalen Kaderblick-Entwicklungsoberfläche,
- Routen, Bedienhandlungen, Berechtigungsprüfung, Benachrichtigungen und PDF-Ausgabe im Kaderblick-Projekt,
- vollständige Oberflächentexte für Deutsch, Englisch, Französisch, Russisch und vereinfachtes Chinesisch.

### Dokumentationsumfang

- eigene aufgabenbezogene Hauptseite mit fünf Kapiteln und zehn eindeutig benannten Fachabschnitten,
- vollständige Seitenfassungen in allen fünf unterstützten Sprachen,
- Navigation, Kapitelstruktur, Suchindex und Sitemap über die reguläre Dokumentationsarchitektur,
- 40 lokalisierte Produktaufnahmen: zentrale Übersicht, Auswahl und Einrichtung eines neuen Plans, geöffneter Plan, Planbearbeitung, Einsatzarten, Vorlagenübersicht und Vorlagenanlage in jeder Sprache,
- neutrale Vereins- und Personendaten ohne Kennwörter, Tokens oder private Kontaktdaten,
- dokumentierte Reproduktion über `scripts/capture-event-duties.mjs`.

### Visuelle Prüfung

Alle 40 Aufnahmen wurden als gemeinsame Kontaktübersicht und in Originalgröße geprüft. Die Aufnahmen zeigen keine Ladeindikatoren, Cookie-Dialoge oder persönlichen Menüs. Sichtbare Sprache, Planstatus, Einsatzarten, Bereiche, Besetzungsstände, Vorlagendaten und Bedienaktionen entsprechen der jeweiligen Sprachfassung der aktuellen Oberfläche.

### Abschlussprüfung

- `scripts/validate-content.mjs`: ohne Befund.
- `scripts/validate-screenshots.sh`: 730 PNG-Dateien ohne Befund geprüft.
- YAML-Syntax: 22 Dateien gültig.
- Twig-Syntax: 25 Dateien gültig.
- PHP-Syntax: alle geänderten Controller- und Inhaltsklassen gültig.
- PHPUnit: 264 Tests mit 5.626 Assertions erfolgreich.
- `scripts/audit-integrated-sections.mjs`: 35 Seitenvarianten in fünf Sprachen ohne Darstellungsfehler.
- `scripts/audit-docs-render.mjs`: 97 Routen in fünf Sprachen sowie Desktop-, Tablet- und Mobilansichten ohne Befund.
- `composer.json` ist gültig. `composer validate` meldet unabhängig von dieser Änderung, dass die vorhandene `composer.lock` nicht auf dem Stand der unveränderten `composer.json` ist.

## 28. August 2026

### Quellen

- laufende lokale Website unter `http://localhost:5173`,
- laufende Demo-Instanz unter `https://demo.kaderblick.de`,
- aktuelle Frontend-Routen und Navigationskonfiguration,
- Demo-Fixtures für Konten, Benutzerbeziehungen, Verwaltungsbereiche, Staff und Funktionäre,
- bestehende Dokumentationscontroller, Templates und Medien.

### Durchgeführte Oberflächenprüfungen

Für jedes der folgenden Profile wurden 58 definierte Routen automatisiert geöffnet. Erfasst wurden angeforderter und tatsächlicher Pfad, Seitentitel, sichtbare Überschriften, Registerkarten, Schaltflächen, Links, Seitentext und eine temporäre Ganzseitenaufnahme:

- Superadministrator,
- Vereinsadministrator,
- Trainer,
- Spieler,
- Elternteil,
- Supporter,
- Teamkassenwart,
- Vereinskassenwart,
- Zeugwart,
- Medienbeauftragter.

Die temporären Daten liegen unter `var/ui-audit/<profil>/` und sind nicht zur Veröffentlichung freigegeben. Zugangsdaten sind nicht Bestandteil dieser Dateien. Die Verzeichnisse werden nicht versioniert.

### Belegte technische Besonderheit des Prüflaufs

Der erste Anmeldeversuch auf der Demo-Seite befüllte wegen eines gleichnamigen Feldes auf der öffentlichen Kontaktseite nicht das E-Mail-Feld des Anmeldedialogs. Der Browserlauf wurde anschließend auf den Dialog begrenzt. Erst die nachfolgend erfolgreichen und vollständig abgeschlossenen Profile gelten als Rollenbeleg.

### Abschlussprüfung der Inhalts- und Medienartefakte

- `scripts/validate-content.mjs`: ohne Befund.
- Twig-Syntax: 238 Templates gültig.
- YAML-Syntax: 20 Dateien gültig.
- PHPUnit: 213 Tests mit 983 Assertions erfolgreich.
- Kameraübersicht und sämtliche Kameraunterseiten: kein Diff gegenüber dem übernommenen Bestand.
- Softwarebereiche: Kaderblick Video Manager, Kaderblick Analyse Player und Kaderblick Video Combiner in allen fünf Sprachen vorhanden; Produktnamen unverändert.
- Veröffentlichungsscreenshots: 114 referenzierte Aufnahmen vorhanden und visuell geprüft; vollständige Zuordnung in `SCREENSHOT-KATALOG.md`.

### Render-, Navigations- und Sprachprüfung

- `scripts/audit-docs-render.mjs`: 44 reguläre Dokumentationsrouten in fünf Sprachen, insgesamt 220 gerenderte Seitenaufrufe, ohne Befund.
- Geprüft wurden HTTP-Status, Sprachkennung, Hauptinhalt, Sprachwahl mit fünf Flaggen und horizontales Seitenüberlaufen.
- Repräsentative Seiten wurden mit 1440 × 1000, 820 × 1180 und 390 × 844 Pixeln geprüft.
- Inhalt und Seitenleiste überdecken weder Kopfbereich noch einander.
- Light-/Dark-Umschaltung, gespeicherte Darstellung, mobiles Öffnen der Navigation und Schließen mit Escape funktionieren.
- Die dauerhaft sichtbare Header-Suche wurde über das Eingabefeld geöffnet. Indexaufbau, sprachbezogene Volltextsuche, Relevanzsortierung, Bereich und Abschnitt, Kennzeichnung der Trefferart, Textausschnitt um die Fundstelle, Hervorhebung des Suchbegriffs, Abschnittslink und Schließen der Trefferliste mit Escape wurden im Browser geprüft.
- Die erzeugten Referenzansichten für Desktop, Tablet und Mobil wurden zusätzlich visuell geprüft.
- Die unveränderten Kamera-Unterseiten mit dauerhaft animierten WebGL-Modellen sind von dieser allgemeinen Render-Matrix ausgenommen. Ihre zwölf Routen wurden separat aufgerufen und antworteten jeweils mit HTTP 200; die zugehörigen Templates und Controller besitzen keinen Git-Unterschied zum übernommenen Bestand.
