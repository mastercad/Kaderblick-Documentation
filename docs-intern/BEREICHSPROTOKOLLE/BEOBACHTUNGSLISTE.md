# Beobachtungsliste

- Geprüft als Trainer auf `/watchlist` am 28.08.2026.
- Demo-Zustand: 0 Einträge; Dialog zum Hinzufügen erreichbar; keine API-Fehler.
- Quellbeleg: `frontend/src/pages/Watchlist.tsx`, außerdem direkte Lesezeichenaktionen in `Players.tsx` und `Coaches.tsx`.
- Ein Eintrag kann Spieler oder Trainer betreffen. Karten enthalten Vereinszuordnung, gegebenenfalls deren Ende und bei Spielern vorhandene Spielstatistiken.
- Aktionen: anonym/sichtbar umschalten, entfernen; Suche innerhalb der Liste; Personensuche ab zwei Zeichen; Seitengröße 10.
- Screenshots: `overview.png`, `person-hinzufuegen.png`; reproduzierbar mit `scripts/audit-watchlist.mjs`.
