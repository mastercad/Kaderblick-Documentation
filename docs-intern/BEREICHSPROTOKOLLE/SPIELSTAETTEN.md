# Spielstätten

## Quellen und Laufzeitprüfung

- Demo `/locations` als Vereinsadmin am 28.08.2026
- `frontend/src/pages/Locations.tsx`
- `frontend/src/modals/LocationEditModal.tsx`
- Kalender-Ortsauswahl in `frontend/src/components/EventModal/LocationField.tsx`

## Belegte Demoansicht

- 10 alphabetisch angezeigte Spielstätten
- Spalten: Name, Adresse, Stadt, Breitengrad, Längengrad, Aktionen
- Anlageformular erreichbar
- Keine API-Antwort ab Status 400

## Formularfelder und Verhalten

- Name ist erforderlich; Adresse, Stadt, Kapazität, Ausstattung, Latitude, Longitude, Flutlicht und Belag sind optional.
- Kapazität hat den Mindestwert 0.
- OpenStreetMap-Suche bildet die Abfrage aus Name, Adresse und Stadt. Ein Treffer wird direkt gesetzt; mehrere Treffer werden zur Auswahl angezeigt.
- Bearbeiten und Löschen werden pro Eintrag über die ausgelieferten Berechtigungen gesteuert.

## Screenshots

- `public/images/docs/spielstaetten/overview.png`
- `public/images/docs/spielstaetten/anlegen.png`
- Reproduktion: `scripts/audit-locations.mjs`
