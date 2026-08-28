# Recherche- und Oberflächennachweise

Diese Datei enthält ausschließlich Abläufe und Bezeichnungen, die in der laufenden Demo-Instanz geprüft oder vom Betreiber fachlich verbindlich vorgegeben wurden. Ein Eintrag ist keine fertige Endverbraucherdokumentation.

## Auswertungen

### Fachliche Vorgabe des Betreibers

- Es gibt zwei Bedienoberflächen: den vierstufigen Mobile Wizard und den wesentlich umfangreicheren Report Builder.
- Der Mobile Wizard ist der vereinfachte Einstieg mit begrenztem Funktionsumfang.
- Der Report Builder richtet sich mit seinen zusätzlichen Möglichkeiten eher an erfahrene Benutzer.
- Auf der Abschlussseite des Mobile Wizard öffnet `Anpassen` die aktuelle Auswahl im Report Builder.
- Beim Anlegen eines Dashboard-Statistik-Widgets kann zwischen Mobile Wizard und Report Builder gewählt werden.

### In der Demo geprüft: Trainer

Geprüfter Zugangstyp: Trainer-Fixture. Geprüfte Bildschirmbreiten: 1440 × 1000 und 390 × 844.

1. `Neue Auswertung` öffnet `Auswertung erstellen`.
2. Schritt 1 fragt `Über wen soll der Bericht sein?` und bietet:
   - `Unsere Mannschaft`,
   - `Einen bestimmten Spieler`,
   - `Mannschaften vergleichen`,
   - `Spieler vergleichen`,
   - `Anforderungen & Nachweise`,
   - `Zu- und Absagen`.
3. Für `Unsere Mannschaft` lautet Schritt 2 `Welche Mannschaft(en)?`. In der geprüften Demo ist `FC Sonnenberg Senioren I` vorausgewählt. Ohne Auswahl werden laut sichtbarem Hinweis alle Mannschaftsdaten zusammengefasst.
4. Schritt 3 lautet `Was soll angezeigt werden?` und bietet für diesen Gegenstand:
   - Tore,
   - Vorlagen,
   - Torschüsse,
   - Karten,
   - Fouls,
   - Pässe,
   - Spielminuten,
   - Laufleistung,
   - Saisonverlauf.
5. Schritt 4 lautet `Welcher Zeitraum?` und bietet:
   - Aktuelle Saison,
   - Letzte 10 Spiele,
   - Letzter Monat,
   - Alle verfügbaren Daten.
6. Die Abschlussseite enthält:
   - `Name der Auswertung` mit einem erzeugten Namensvorschlag,
   - `Darstellungsart` mit den im geprüften Fall sichtbaren Optionen Donut-Diagramm, Balkendiagramm und Kreisdiagramm,
   - `Einträge ohne Wert ausblenden`,
   - die Diagrammvorschau beziehungsweise konkrete Hinweise, wenn keine Daten zur Kombination vorliegen,
   - `Zurück`, `Anpassen` und `Speichern`.
7. `Anpassen` öffnet `Manuelle Konfiguration` mit den Bereichen:
   - `Basis`,
   - `Daten & Chart`,
   - `Filter`,
   - `Optionen`.
8. Im geöffneten Bereich `Basis` waren die Schnellstart-Kategorien `Alle`, `Spieler`, `Team & Saison`, `Vergleich` sowie `Wetter & Feld` und zahlreiche fachlich benannte Vorlagen sichtbar.
9. `Daten & Chart` enthält in der geprüften Konfiguration:
   - die fachliche Datenquelle `Spiele und Leistung`,
   - `Auswertung nach`,
   - `Was messen?`,
   - `Zusätzlich unterteilen nach`,
   - `Chart-Typ`,
   - `Felder tauschen`,
   - die dauerhaft sichtbare Vorschau.
10. `Filter` enthält in der geprüften Konfiguration:
    - `Saison / Zeitraum` mit `Alle Daten`, `Aktuelle Saison`, `Bestimmte Saison` und `Zeitraum`,
    - Team,
    - Spieler,
    - Spieltyp,
    - Ereignistyp,
    - Platztyp,
    - Wetter (Niederschlag).
11. `Optionen` enthält abhängig vom Diagrammtyp:
    - `Gleitender Durchschnitt` einschließlich einstellbarer Länge; beim geprüften Donut-Diagramm als nicht verfügbar gekennzeichnet,
    - `Zentralwert`,
    - `Legende anzeigen`,
    - `Datenlabels anzeigen`,
    - `Einträge ohne Wert ausblenden`.
12. Die Vorschau bleibt in allen vier Builder-Bereichen sichtbar und nennt bei einer leeren Darstellung konkrete mögliche Ursachen.
13. `Widget hinzufügen` auf dem Dashboard bietet `Statistik-Widget`. Der anschließende Dialog `Statistik Widget hinzufügen` bietet:
    - `Einfacher Assistent` mit dem sichtbaren Hinweis `Geführt in wenigen Schritten – ideal für den schnellen Einstieg`,
    - `Detaillierter Builder` mit dem sichtbaren Hinweis `Volle Kontrolle über alle Optionen – für erfahrene Nutzer`,
    - die Auswahl vorhandener Auswertungen,
    - `Abbrechen` und `Hinzufügen`.

### Verwendete Bildschirmaufnahmen

Die folgenden Aufnahmen wurden nach dem vollständigen Laden geprüft und in die Dokumentation übernommen:

- `public/images/docs/reports/current-reports.png`
- `public/images/docs/reports/mobile-wizard-start.png`
- `public/images/docs/reports/mobile-wizard-finish.png`
- `public/images/docs/reports/report-builder-data-chart.png`
- `public/images/docs/reports/report-builder-filters.png`
- `public/images/docs/reports/report-builder-options.png`
- `public/images/docs/reports/dashboard-statistic-widget-choice.png`

Sie zeigen ausschließlich Daten der Demo-Fixtures. Ladeanzeigen und Cookie-Dialog sind nicht sichtbar.

### Noch zu prüfen

- sämtliche auswählbaren Werte und deren Abhängigkeiten in `Daten & Chart`, `Filter` und `Optionen`,
- abweichende Kennzahlen und Schritte der übrigen fünf Gegenstände,
- Berechtigungs- und Datensicht für Spieler, Vereinsadministration, Supporter und weitere Beziehungen,
- Speichern, erneutes Bearbeiten, Vorschau und Dashboard-Verhalten ohne bestehende Demo-Daten zu verändern.

## Weitere vom Betreiber verbindlich genannte Lücken

Folgende Punkte sind als Rechercheaufträge erfasst und dürfen erst nach Demo-Prüfung ausformuliert werden:

- Erstlogin-Auswahl für Benutzer ohne Spieler- oder Trainerverbindung; Vereinsmitarbeiter werden von der Administration angelegt.
- Supportverknüpfungsanfrage bei fehlenden Teamrechten.
- Aufstellungsvorlage, taktischer Screen, spielbezogene Startaufstellung und weitere Spielaufstellungen einschließlich Bedeutung für Einsatzminuten nach `Spiel beendet`.
- Unabhängiger Import von Vorlagentaktiken in ein Spiel sowie ausschließlich spielbezogene Taktiken.
- Sonderberechtigung von Vereinsadministratoren für Spiele mit teamfremden Mannschaften unter der genannten Vereinszugehörigkeitsbedingung.
- Drei Wege zum Aushelfen sowie die dazugehörigen Benachrichtigungen.
- Vollständiger Nachrichtenbereich.
- Alle sechs sichtbaren Ereignistypen und ihre unterschiedlichen Kalender-Assistenten.

### Aufstellungsvorlagen, Match-Plan und Taktiken

- Demo-Prüfung als Trainer auf `/games/178` mit `scripts/audit-match-plan-actions.mjs`; Dialogtexte und Screenshots liegen unter `var/match-plan-actions-audit/`.
- Belegt sind die Formationsauswahl, die unabhängige Kopie einer Vorlage in die Startformation, Vorschau, neue Spielformationen mit Minute und Bezeichnung, separater Taktikimport sowie das Speichern als Vorlage mit oder ohne Taktiken.
- Der taktische Screen wurde mit `scripts/audit-tactics.mjs` geprüft. Belegt sind Ganz-/Halbfeld, eigene Spieler, Gegner, Ball, Pass- und Laufwege, Zonen, sechs Farben, nummerierte Schritte, Rückgängig/Wiederholen, Löschen und Präsentationsmodus.
- Die Spielminutenberechnung wurde in `PlayerStatsRecalcService.php` und `PlayerStatsRecalcListener.php` geprüft: Startformation ab Minute 0, tatsächliche Wechselereignisse als Ein-/Ausstiegszeitpunkte und Berechnung erst beim beendeten Spiel unter Berücksichtigung der hinterlegten Spielzeiten.

### Kalender-Assistenten

- Demo-Prüfung mit `scripts/audit-event-wizards.mjs`; geladene Dialoge, Schritttexte und Screenshots liegen unter `var/event-wizards-audit/`.
- Belegte Schrittfolgen: Spiel (5), Training (3), Vereinstreffen (3), Event (3), Aufgabe (3), Turnier (4).
- Die bedingten Felder für Spielzeiten, Aushilfsspieler, Aufgabenwiederholung und Turnierbegegnungen wurden zusätzlich in `EventStepContent.tsx`, `GameTimingFields.tsx`, `TaskEventFields.tsx`, `TournamentFields.tsx` und `WizardSteps.tsx` geprüft.

### Aushelfen und Vereinsadmin-Regel

- Demo-Prüfung der Aushelfereinstellung liegt unter `var/matchday-helper-audit/`; die Spielanlage zeigt den Schritt `Zusätzliche Spieler` in `var/event-wizards-audit/spiel-*.txt`.
- `MatchHelperEligibilityService.php` belegt den Wechsel zwischen gemeldeter Bereitschaft und allen altersberechtigten Kandidaten sowie die Prüfung von Alter, Wettbewerb, Vereinsbezug und bestehender Teamzuordnung.
- `HelperOfferService.php` belegt das selbstständige Hilfsangebot, die Trainerentscheidung, die Terminfreigabe bei Annahme, den Teilnahmestatus und die Benachrichtigungen an beide Seiten.
- `CalendarEventService::validateMatchTeamOwnership()` und dessen Unit-Tests belegen: Bei normalen Spielen muss mindestens eines der beiden Teams zum verwalteten Bereich gehören; bei Turnieren mindestens eine Begegnung. Der Vereinsbereich wird durch `AdminScopeService` für den Spieltermin aufgelöst.

## Match-Plan und Taktiktafel

### In der Demo geprüft: Trainer, abgeschlossenes Spiel

Geprüfte Begegnung: Demo-Spiel `178`, vollständig geladene Traineransicht.

- Der Match-Plan enthält eine eigenständige `Startformation` und darunter `Spielformationen`.
- Sichtbare Aktionen an der Startformation:
  - `Vorschau`,
  - `Bearbeiten`,
  - `Formation wählen`,
  - `Vorlage laden`,
  - `Taktiken (0)`,
  - `Taktiken aus Vorlage`,
  - `Als Vorlage speichern`,
  - `Entfernen`.
- Der sichtbare Hinweis erklärt, dass Spielernamen mit den Zusagen für dieses Spiel abgeglichen werden.
- `Für Spieler freigeben` veröffentlicht den Match-Plan für Spieler; der geprüfte Plan war `Nicht freigegeben`.
- Unter `Spielformationen` stehen `Neue Formation` und im Leerzustand `Erste Formation anlegen` zur Verfügung.
- Der sichtbare Hilfetext ordnet Folgeformationen ausdrücklich Wechseln und späteren Umstellungen zu.
- Die Taktiktafel öffnet bildschirmfüllend. In der geprüften Ansicht waren belegt:
  - Passweg,
  - Laufweg,
  - Zone,
  - sechs Farben,
  - Rückgängig und Wiederholen,
  - ausgewähltes Element löschen,
  - Gegner hinzufügen,
  - Ganzfeld/Halbfeld,
  - Aktionsschritte,
  - Präsentationsmodus,
  - einblendbare Werkzeug- und Taktikleiste,
  - Speichern und Schließen.
- Die Statuszeile benennt das aktive Werkzeug und seine Touch-/Mausbedienung.
- Der Quellcode der tatsächlich ausgelieferten Taktiktafel bestätigt darüber hinaus das Zurücksetzen von Spielerpositionen, das Löschen aller Zeichnungen, Taktikvorlagen, mehrere benennbare Taktiken und das Team-Briefing im Präsentationsmodus. Diese Punkte müssen vor der Endverbraucherbeschreibung noch einzeln in der Demo durchlaufen werden.

### Geprüfte Aufnahmen

- `public/images/docs/games/match-plan.png`
- `public/images/docs/lineups/tactics-board.png`

## Erstlogin- und Personenverknüpfung

### In der Demo geprüft: Konto ohne UserRelation

- Der Dialog heißt `Meine Vereinszugehörigkeit angeben` und ist zusätzlich über `Verknüpfung anfragen` im Benutzermenü erreichbar.
- Vier Schritte: `Spieler oder Trainer?`, `Person auswählen`, `Deine Beziehung`, `Bestätigung`.
- Die Suche startet ab zwei Buchstaben und zeigt bei vorhandenen Daten Mannschaften zur Einordnung der Person.
- Spielerbeziehungen in der geprüften Demo: Elternteil, Erziehungsberechtigter, Freund, Geschwister, Spieler selbst, Verwandter.
- Trainerbeziehungen in der geprüften Demo: Assistent, Beobachter, Mentor, Trainer selbst, Vertretung.
- Eine optionale Anmerkung wird in der Prüfansicht mit Typ, Person und Beziehung zusammengefasst.
- Erst `Antrag stellen` sendet die Anfrage. Für die Recherche wurde kein Antrag gesendet.
- Nach der Bearbeitung wird der Benutzer laut sichtbarem Dialogtext benachrichtigt.
- Der ausgelieferte Profilpfad zeigt den Dialog nur ohne UserRelation, bisherigen Antrag, Staff-/Funktionärszuordnung und Administratorrolle. Dies bestätigt die Betreiberangabe, dass Vereinsmitarbeiter administrativ angelegt werden.

Geprüfte Aufnahmen:

- `public/images/docs/getting-started/link-request-type.png`
- `public/images/docs/getting-started/link-request-search.png`
- `public/images/docs/getting-started/link-request-relation.png`
- `public/images/docs/getting-started/link-request-review.png`

## Supporter-Anfrage

### In der Demo geprüft: Spieler ohne Bearbeitungsrecht am Spiel

- `Ereignis hinzufügen` und `Video hinzufügen` sind sichtbar und öffnen ohne entsprechende Berechtigung `Supporter-Rechte anfragen`.
- In der geprüften Fixture bestand bereits eine offene Anfrage für das Team. Der Dialog zeigte Team und Eingangszeitpunkt und bot keine erneute Antragsschaltfläche.
- Der ausgelieferte Dialogpfad belegt:
  - bei mehreren berechtigten Teams Teamwahl und optionale Notiz,
  - bei genau einem berechtigten Team direkte Übermittlung,
  - einen eigenen Zustand ohne anfragbares Team,
  - eine Benachrichtigung nach Genehmigung oder Ablehnung.
- Die Verwaltungsoberfläche besitzt dafür den getrennten Reiter `Supporter-Anfragen` mit Genehmigung und Ablehnung.

Geprüfte Aufnahme:

- `public/images/docs/games/supporter-request-pending.png`
