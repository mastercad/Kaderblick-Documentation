# Spiele und Spieldetails

## Demo-Prüfung

- Spieler, `/games`, Saison 2024/25 am 28.08.2026
- 21 abgeschlossene Spiele für FC Sonnenberg Senioren I
- Detailspiel `/games/178`: SV Bergheim – FC Sonnenberg, 2:4, 34 Ereignisse, Videos und Spielzeiten
- keine API-Fehler

## Quellen

- `frontend/src/pages/Games.tsx`
- `frontend/src/pages/GameDetails.tsx`
- `frontend/src/pages/game-details/useGameDetails.ts`
- Komponenten `ScoreboardHeroCard`, `LiveTickerControls`, `GameEventsSection`, `VideosSection`, `TimingSection`
- Quick-Event-Komponenten und Match-Plan-Komponenten

## Korrigierte Altdokumentation

- In `/games` gibt es keine Funktion `Neues Spiel`; Anlage erfolgt im Kalender.
- Kein separates manuelles Ergebnisfeld in der Spielübersicht belegt.
- fussball.de-Synchronisation erscheint nur bei vorhandener `fussballDeUrl`; der separate Import hat einen Prüfablauf.
- Dokumentierte Ereignisarten richten sich nach den vorhandenen Typen und tatsächlichen Demoereignissen, nicht nach einer pauschalen festen Liste.

## Screenshots

- `public/images/docs/spiele/overview.png`
- `public/images/docs/spiele/detail.png`
- Reproduktion: `scripts/audit-games.mjs`
