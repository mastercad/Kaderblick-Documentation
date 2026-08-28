# Bereichsprotokoll: Mein Spieltag und Aushelfen

Stand: 28. August 2026

## Laufzeitprüfung

- bekannten Demo-Spieltermin 143 direkt in „Mein Spieltag“ geöffnet
- Spieler-Fixture: Spielkopf, Vollständigkeit 2/2, eigene Rückmeldung, zugesagte Mitspieler und Fahrgemeinschaft
- Trainer-Fixture: alle 16 Rückmeldungen, Kaderbesetzung, Fahrgemeinschaft und Spieltagsaufgaben
- Aushelfen mit Spieler- und Eltern-Fixture geöffnet: speicherbare Einstellung ohne zusätzliche Profilauswahl, da jeweils genau ein Spielerprofil geliefert wurde
- sämtliche protokollierten Aufrufe dieser vier Läufe ohne HTTP-Fehler

## Quellcodeprüfung Mein Spieltag

Quelle: `frontend/src/pages/Matchday.tsx`

- automatische Auswahl relevanter Spiele im Sieben-Tage-Zeitraum
- mehrere Spiele als Reiter sowie mobile Wischbedienung
- leerer Zustand und Kalenderverknüpfung
- Termin, Ort, Paarung, Beschreibung, Treffpunkt und Treffzeit
- Vollständigkeit aus Teilnahme und eigener Aufgabe
- konfigurierbare Teilnahme, Konflikt- und Abwesenheitsdialoge
- Spieleransicht mit zugesagten Personen
- Traineransicht mit allen Rückmeldungen
- Kaderampel, Matchplan-/Positionsansicht und Besetzungsvorschläge
- Fahrgemeinschaften mit Fahrer, Mitfahrern, freien Plätzen und direkter Verwaltung
- eigene sowie in der Traineransicht alle Spieltagsaufgaben
- Aushilfseinladung und Verfügbarkeitsantwort

## Quellcodeprüfung Aushelfen

Quelle: `frontend/src/pages/HelperAvailability.tsx`

- vorhandene Spielerbeziehungen werden vom Server geliefert
- automatische Auswahl bei genau einem Spielerprofil
- Auswahlfeld bei mehreren Profilen
- Bereitschaftsschalter, Hinweis für Trainer und Speichern
- deaktivierter Zustand und Warnung ohne Spielerprofil
- Hinweis auf zusätzliche Altersklassen- und Wettbewerbsregeln

## Aufnahmen

- `public/images/docs/mein-spieltag/spieler.png`
- `public/images/docs/mein-spieltag/trainer.png`
- `public/images/docs/aushelfen/einstellung.png`
