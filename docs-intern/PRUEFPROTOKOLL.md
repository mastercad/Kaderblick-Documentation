# Prüfprotokoll der Benutzeroberfläche

## Vollständigkeitsaudit der Dokumentationsartefakte

- Alle aktiven Endverbraucherbereiche besitzen eine deutsche Referenzseite sowie vollständige Seitenfassungen für Englisch, Französisch, Russisch und vereinfachtes Chinesisch.
- Navigation und gemeinsame Oberflächentexte besitzen Kataloge für alle fünf Sprachen.
- Sämtliche 114 aus veröffentlichten Templates referenzierten Aufnahmen sind vorhanden, nicht leer und visuell auf Ladezustände, blockierende Overlays und sichtbare Zugangsdaten geprüft.
- 32 weitere Bilddateien sind unreferenzierter Alt- oder Duplikatbestand und gelten nicht als veröffentlicht.
- Die Rollenmatrix belegt zehn Demo-Perspektiven mit jeweils 58 geöffneten Routen. Detailaktionen wurden je Funktionsbereich zusätzlich über Oberfläche und Quellpfade geprüft.
- Administration, Rollenorientierung und bereichsübergreifende Abläufe verwenden die belegten Ebenen und Beziehungen.

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
