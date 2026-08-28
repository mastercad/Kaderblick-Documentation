# Lokalisierungsleitfaden

Stand: 28. August 2026

## Umfang

Vollständig zu lokalisieren sind Seitentitel, Überschriften, Fließtexte, Schritte, Listen, Tabellen, Bildunterschriften, Alternativtexte und zugängliche Beschriftungen. Code, Befehle, Dateinamen und URLs bleiben unverändert.

## Geschützte Namen

- Kaderblick
- kaderblick.de
- Kaderblick Video Manager
- Kaderblick Analyse Player
- Kaderblick Video Combiner

Diese Namen dürfen nicht übersetzt, umgestellt oder an die Zielsprache angepasst werden.

## Redaktioneller Ablauf

1. Jede deutsche Dokumentationsseite besitzt für Englisch, Französisch, Russisch und vereinfachtes Chinesisch eine eigene vollständige Twig-Datei im selben Verzeichnis.
2. Beispiel: Zu `templates/spieler/index.html.twig` gehören `index.en.html.twig`, `index.fr.html.twig`, `index.ru.html.twig` und `index.zh_Hans.html.twig`.
3. Jede Sprachfassung wird als zusammenhängende Seite erstellt. Überschriften, Schritte, Beschriftungen und Erklärungen werden gemeinsam im fachlichen Seitenkontext übertragen.
4. Rollen, Benutzerbeziehungen, Voraussetzungen und Auswirkungen werden gegen die deutsche Referenzfassung geprüft. Kein Abschnitt darf allein als isolierte Zeichenfolge übersetzt werden.
5. Kurze Oberflächenbegriffe wie „OK“, „Weiter“, „Übernehmen“ oder „Alles klar“ werden entsprechend ihrer konkreten Aktion und dem sichtbaren Produkttext der Zielsprache formuliert.
6. Satzzeichen, Zahlen, Uhrzeiten, Symbole und Emojis sind keine Übersetzungseinträge. Sie stehen ausschließlich dort, wo sie innerhalb einer vollständigen Seite benötigt werden.
7. Nach jeder inhaltlichen Änderung werden die vier betroffenen Seitendateien vollständig nachgezogen und erneut im gerenderten Zusammenhang geprüft.

## Redaktionelle Prüfung

- Kein deutscher Resttext in einer fremdsprachigen Seite.
- Kaderblick ist überall unverändert.
- Sichtbare Namen der Kaderblick-Oberfläche entsprechen der gewählten Sprache.
- Anrede, Rollenbegriffe und Funktionsnamen sind innerhalb einer Sprache einheitlich.
- Links, Zahlen, Datumsangaben und Bedienelemente behalten ihre Bedeutung.
- Bildunterschrift und Alternativtext beschreiben weiterhin den tatsächlich gezeigten Zustand.
- Kein Übersetzungskatalog darf denselben deutschen Ausgangsbegriff ohne Seiten- und Bedienkontext pauschal in allen Vorkommen ersetzen.
- Seiteninhalte dürfen nicht in einem zentralen Sprachkatalog oder einer einzigen Sammeldatei zusammengeführt werden.
