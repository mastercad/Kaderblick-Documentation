# Bereichsprotokoll: XP, Titel und Hall of Fame

Stand: 28. August 2026

## Geprüfte Oberflächen

- XP-Aufschlüsselung im Spielerprofil.
- öffentliche Hall of Fame.
- Superadministration: Titel- und XP-Übersicht.
- Superadministration: XP-Regeln.

## Persönliche XP-Aufschlüsselung

- erreichbar über die Level-/XP-Schaltfläche im Profilkopf,
- Karriere-Level und Karriere-XP,
- Saison-Level und Saison-XP,
- aktueller Titel und weitere Titel, sofern vorhanden,
- XP gruppiert nach den tatsächlich erfassten Aktionsarten; Balken dienen dem relativen Vergleich der Gruppen.

## Hall of Fame

- Saison-Level-Rangliste mit Rang, Avatar, Name, Saison-XP, Karriere-XP und Saison-Level,
- Titelträger gruppiert nach Plattform, Liga, Pokal oder Team,
- Titelkategorien Torschützen, Assists und Einsätze,
- Ränge Gold, Silber und Bronze,
- Sichtbarkeit je Konto im Profilregister Einstellungen steuerbar.

## Titel- und XP-Übersicht

- Kennzahlen: vergebene Titel, Spieler, Plattformtitel, Teamtitel,
- Tabelle vergebener Titel mit Kategorie, Bereich, Rang, Name und Spielerzahl,
- Spielerübersicht mit Suche, Seitennavigation, aktuellem Titel, Level, XP und Fortschrittsbalken,
- XP-Aufschlüsselung für einen gewählten Benutzer.

## XP-Regeln

- Zusammenfassung aktiver Regeln und ihrer XP-Werte,
- Filter Alle, Plattform, Sport und Spielereignisse,
- Regel aktivieren/deaktivieren,
- Regel auf- und zuklappen,
- Bezeichnung und Beschreibung in unterstützten Sprachen,
- XP-Wert, Kategorie, Wartezeit, Tageslimit und Monatslimit,
- Systemregeln sind gekennzeichnet,
- Spielereignistypen verwenden den allgemeinen Ereigniswert oder einen eigenen Wert,
- eigener Wert kann angelegt, geändert und gelöscht werden,
- Standardwerte können nach Bestätigung wiederhergestellt werden.

## Belege

- `frontend/src/modals/ProfileModal/dialogs/XpBreakdownModal.tsx`
- `frontend/src/pages/HallOfFame.tsx`
- `frontend/src/pages/admin/AdminTitleXpOverview.tsx`
- `frontend/src/pages/admin/XpConfig.tsx`
- `api/src/Domain/Xp/XpRuleDefaultProvider.php`
- Aufnahmen unter `public/images/docs/xp-system/`.
