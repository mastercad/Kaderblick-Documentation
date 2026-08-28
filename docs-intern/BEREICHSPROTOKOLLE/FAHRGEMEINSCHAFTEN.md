# Bereichsprotokoll: Fahrgemeinschaften

## Geprüfte Oberfläche

- Trainer-Demo, Spieltermin mit freigegebenen Fahrgemeinschaften
- Termindetails mit Wetter- und Fahrgemeinschaftssymbol
- Fahrt mit Fahrer, fünf Plätzen, vier Mitfahrern und Fahreraktionen
- Formular „Mitfahrgelegenheit anbieten“

## Geprüfte Implementierung

- `frontend/src/modals/EventDetailsModal/index.tsx`
- `frontend/src/modals/EventDetailsModal/components/EventInfoCard.tsx`
- `frontend/src/modals/EventDetailsModal/hooks/useTeamRideStatus.ts`
- `frontend/src/modals/TeamRideDetailsModal.tsx`
- `frontend/src/modals/AddTeamRideModal.tsx`
- `frontend/src/components/NotificationDetailModal.tsx`

## Korrigierter Altbestand

- Das Angebotsformular besitzt keine eigenen Felder für Treffpunkt oder Abfahrtszeit; dafür gibt es die optionale Notiz.
- Die Platzanzahl ist nicht auf 1 bis 8 begrenzt. Nachgewiesen ist nur ein Mindestwert von 1.
- Die Oberfläche belegt keine pauschale Aussage über eine unbegrenzte Anzahl Fahrten pro Termin.
- Das Zurückziehen einer Fahrt besitzt in der geprüften Implementierung keinen Bestätigungsdialog.

## Abgedeckte Funktionen

- Symbolstatus ohne Fahrt, mit freien Plätzen und vollständig belegt
- Anzeige von Fahrer, Gesamt-, Frei- und Belegtzahl, Notiz und Mitfahrern
- Fahrt mit Platzanzahl und Notiz anbieten
- Platz buchen und Sperren bei voller Fahrt
- eigene Buchung stornieren
- Mitfahrer durch den Fahrer entfernen
- komplette Fahrt durch den Fahrer zurückziehen
- Einschränkungen bei abgesagtem Termin
- passende Benachrichtigungstypen und Profileinstellungen

## Nicht ausgelöste Aktionen

- Keine Fahrt angeboten oder zurückgezogen
- Kein Platz gebucht oder storniert
- Kein Mitfahrer entfernt

Die Auswirkungen dieser Aktionen wurden anhand der aufgeführten Dialoge und ihrer Speichervorgänge geprüft.
