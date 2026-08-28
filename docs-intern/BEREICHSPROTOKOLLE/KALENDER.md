# Bereichsprotokoll: Kalender

## Geprüfte Oberfläche

- Trainer-Demo, `/calendar`: Monatsansicht, Typfilter, Ansichtswechsel und „Neues Event“
- Assistent „Neues Event“: gemeinsame Basisdaten
- Event-Typ „Training“: Basisdaten, Trainingsdetails und wiederkehrendes Training
- Desktop-Aufnahmen am 28. August 2026

## Geprüfte Implementierung

- `frontend/src/pages/Calendar.tsx`
- `frontend/src/pages/calendar/CalendarHeader.tsx`
- `frontend/src/pages/calendar/CalendarMobileNav.tsx`
- `frontend/src/pages/calendar/useCalendarEventSave.ts`
- `frontend/src/components/EventModal/EventBaseForm.tsx`
- `frontend/src/components/EventModal/EventStepContent.tsx`
- `frontend/src/components/EventModal/PermissionFields.tsx`
- `frontend/src/components/EventModal/TrainingEventFields.tsx`
- `frontend/src/components/EventModal/TrainingSeriesScopeStep.tsx`
- `frontend/src/modals/EventDetailsModal/index.tsx`
- `frontend/src/modals/EventDetailsModal/hooks/useEventParticipation.ts`
- `frontend/src/modals/EventDetailsModal/components/EventInfoCard.tsx`
- `frontend/src/modals/EventDetailsModal/components/PlayerOverviewModal.tsx`

## Abgedeckte Funktionen

- Navigation zwischen Datum und Ansichten auf Desktop und Mobilgeräten
- Filter für alle in der Demo sichtbaren Termintypen
- Gemeinsame Basisdaten, Rückmeldefrist und Terminerinnerungen
- Sichtbarkeit für öffentlich, Verein, Team, einzelne Personen und persönliche Einträge
- Training mit Team, Ort, Dauer, errechneter Endzeit, Treffpunkt und Treffzeit
- Wiederkehrendes Training mit Wochentagen und Serienende
- Bearbeitungsumfang vorhandener Trainingsserien
- Termindetails, Teilnahmeziele aus Benutzerbeziehungen, Status, Notiz und Abwesenheitshinweis
- Teilnehmer- und Kaderübersicht
- berechtigungsabhängiges Bearbeiten, Absagen, Reaktivieren, Löschen und Poster-Teilen
- Verknüpfungen zu Aufgaben, Benachrichtigungen, Fahrgemeinschaften und Profileinstellungen

## Nicht ausgelöste Aktionen

- Kein Termin gespeichert
- Keine Serie erstellt oder verändert
- Keine Teilnahmeantwort gespeichert
- Kein Termin abgesagt, reaktiviert oder gelöscht

Die nicht ausgelösten Zustände und Folgen wurden aus den aufgeführten Komponenten und Speicherroutinen geprüft.
