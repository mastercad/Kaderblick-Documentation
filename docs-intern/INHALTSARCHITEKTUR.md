# Inhaltsarchitektur und Lokalisierung

Stand: 28. August 2026

## Verbindliche Struktur

- Alle regulären Dokumentationsseiten verwenden ausschließlich `templates/docs/page.html.twig`.
- Das gemeinsame Grundlayout liegt in `templates/base.html.twig`.
- Wiederverwendbare interaktive Spezialkomponenten liegen unter `templates/components/`.
- Lokalisierte Endverbraucherinhalte liegen unter `content/<Sprache>/<Seite>.json`.
- Sprachspezifische Twig-Dateien sind unzulässig.
- Englische kanonische Seitenpfade bestimmen den Seitenschlüssel. Beispiel: `/training-proofs` verwendet `content/de/training-proofs.json` und die entsprechenden Dateien der vier weiteren Sprachen.
- Kameradetailseiten und nicht lokalisierte interaktive Werkzeuge behalten ihre jeweils eine Funktionsvorlage. Auch dort darf keine zweite Vorlage nur für eine Sprache entstehen.

## Format eines Inhaltsdokuments

Jede JSON-Datei enthält:

```json
{
  "title": "Seitentitel für Browser und Registerkarte",
  "body": "Vertrauenswürdiger, bereits strukturierter Dokumentationsinhalt"
}
```

`body` enthält ausschließlich den Inhalt des Hauptbereichs. Header, Navigation, Suche, Sprachwahl, Theme, Footer und allgemeines Seitenlayout werden nicht darin wiederholt.

## Vorgehen bei Inhaltsänderungen

1. Betroffene Seite anhand ihres englischen kanonischen Pfads bestimmen.
2. Deutsche Referenzfassung fachlich aktualisieren.
3. Dieselbe fachliche Änderung kontextbezogen in Englisch, Französisch, Russisch und vereinfachtem Chinesisch einarbeiten.
4. Marken-, Funktions- und Schaltflächennamen anhand ihres tatsächlichen Oberflächenkontexts behandeln; `Kaderblick` bleibt immer unverändert.
5. Links, IDs, CSS-Klassen und sonstige Strukturbezeichner in allen Sprachdateien identisch und englisch halten.
6. Inhalts-, Struktur- und Browserprüfungen ausführen.

## Vollständigkeitsregeln

- Zu jeder deutschen Inhaltsdatei müssen Dateien für `en`, `fr`, `ru` und `zh_Hans` vorhanden sein.
- Eine neue Rolle, Kachel, Verknüpfung, Abbildung oder Sektion wird gleichzeitig in allen fünf Inhaltsfassungen angelegt.
- Strukturänderungen gehören in das gemeinsame Template, eine Komponente oder die gemeinsamen Stylesheets und werden nicht fünfmal kopiert.
- Der Rolleneinstieg besitzt in jeder Sprache neun identische Rollenwege und 66 fachlich zugeordnete Bereichsverweise.
- Die Tests verhindern die Wiedereinführung sprachspezifischer Twig-Dateien und prüfen die vollständigen Sprachdateisätze.

## Lange Anleitungen und Kapitel

- `getting-started`, `reports`, `calendar`, `games`, `profile`, `dashboard`, `lineups` und `clubs-teams` werden auf ihrer bisherigen URL als aufgabenbezogene Kapitelübersicht dargestellt.
- Der lokalisierte Inhalt bleibt je Bereich in einer gemeinsamen JSON-Datei. Jeder zugeordnete `h2`-Abschnitt besitzt eine explizite, in allen Sprachen identische semantische ID. `LongFormContent` ordnet diese benannten Abschnitte fachlich definierten Arbeitsabläufen mit stabilen, sprachunabhängigen Kapitelpfaden zu. Zusammengehörige Abschnitte dürfen dabei unabhängig von ihrer ursprünglichen Position gemeinsam dargestellt werden.
- Kapitel werden nicht aus Textlänge, Überschriftenanzahl oder einer vorgegebenen Zielzahl abgeleitet. Maßgeblich ist, welche Abschnitte eine zusammenhängende Aufgabe beziehungsweise Entscheidung der Benutzer erklären.
- Neue oder entfernte Fachabschnitte in diesen Dokumenten erfordern eine semantische Abschnitts-ID, eine inhaltliche Prüfung und gegebenenfalls eine bewusste Zuordnung in `LongFormContent`.
- Kapitelüberschriften und Kartenzusammenfassungen werden in allen fünf Sprachen redaktionell gepflegt. Automatisch aus dem Fließtext abgeschnittene Kartentexte sind unzulässig.
- Kapitelseiten bieten Rückweg, Kapitelstand und Vor-/Zurück-Navigation. Die globale Suche folgt den Links der Übersichtsseiten und indexiert dadurch auch die einzelnen Kapitel.
- Normale Dokumentationsseiten behalten ihren vollständigen Inhalt auf einer Seite und erhalten eine dauerhaft erreichbare Abschnittsnavigation aus `h2` und `h3`.
