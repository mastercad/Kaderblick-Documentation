# Bereichsprotokoll: Verein und Teams

## Geprüfte Oberfläche

- Trainer-Demo: „Mein Team“ mit Teamkopf, Trainingsnachweisen, Kader, Terminen und Aufgaben
- Superadmin-Demo: Teamliste, Teamdetails und Team bearbeiten
- Superadmin-Demo: Vereinsliste, Vereinsdetails und Verein bearbeiten
- Vorhandene Saisonübersicht „Mein Verein“ mit Quellabgleich

## Geprüfte Implementierung

- `frontend/src/pages/MyTeam.tsx`
- `frontend/src/pages/ClubSeason.tsx`
- `frontend/src/pages/Teams.tsx`
- `frontend/src/pages/Clubs.tsx`
- `frontend/src/components/TeamBannerSection.tsx`
- `frontend/src/modals/TeamDetailsModal.tsx`
- `frontend/src/modals/TeamEditModal.tsx`
- `frontend/src/modals/TeamDeleteConfirmationModal.tsx`
- `frontend/src/modals/ClubDetailsModal.tsx`
- `frontend/src/modals/ClubEditModal.tsx`
- `frontend/src/modals/ClubDeleteConfirmationModal.tsx`

## Abgedeckte Funktionen

- Teamwechsel und eigene Spieler-/Trainerkennzeichnung
- Kader, Dokumentzugriff, anstehende Termine und eigene Aufgaben
- Teambanner hochladen, ersetzen und mit Bestätigung löschen
- Saisonübersicht mit Teamwerten, Form, nächstem Spiel und Torschützen
- Teamliste mit Saison, Suche, Pagination und berechtigungsabhängigen Aktionen
- Teamdetails
- Teamstammdaten, Standard-Rückmeldefrist, fussball.de-Felder, Spielzeitvorgaben und Motivation
- Vereinsliste mit Suche, Pagination und berechtigungsabhängigen Aktionen
- Vereinsdetails, Spielstätte und Kontakt
- Vereinsstammdaten, Aktivstatus, Standardsprache, Sportstätte, Kontakt und fussball.de-Felder
- Löschbestätigungen

## Getrennter Vertiefungsbereich

Die Trainingsnachweise besitzen einen eigenständigen, umfangreichen Ablauf. Ihre vollständige Beschreibung wird in einem eigenen Bereich geführt und von „Mein Team“ verlinkt.

## Befund

In den Teamdetails des geprüften Teams wurden nicht gepflegte Alterswerte als „NaN Jahre“ angezeigt. Der Wert stammt aus der laufenden Demoansicht und wird nicht als reguläre Benutzerfunktion dokumentiert. Der Befund gehört in den Abschlussbericht.

## Nicht ausgelöste Aktionen

- Kein Team oder Verein angelegt, gespeichert oder gelöscht
- Kein Banner hochgeladen oder gelöscht
- Keine fussball.de-Daten geladen
- Keine Rückmeldefrist oder Spielzeitvorgabe geändert
