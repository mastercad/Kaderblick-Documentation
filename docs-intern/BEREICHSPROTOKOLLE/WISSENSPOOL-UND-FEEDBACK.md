# Bereichsprotokoll: Wissenspool und Feedback

Stand: 28. August 2026

## Laufzeitprüfung

- Wissenspool mit Trainer-Fixture geöffnet: Teamwahl, Kategorien, Suche, angepinnte und weitere Beiträge, Reaktionen und Kommentare.
- Dialog „Neuer Beitrag“ geöffnet: Team, lokalisierter Titel und Inhalt, Kategorie, Tags, Medienlinks und Teambenachrichtigung.
- „Mein Feedback“ mit Trainer-Fixture geöffnet: Suche, Statusreiter, Kennzahlen und leerer Zustand.
- globalen Feedbackdialog geöffnet: Typ, Nachricht, optionale automatische Bildschirmaufnahme.

## Quellcodeprüfung Wissenspool

Quelle: `frontend/src/pages/KnowledgeBase.tsx`

- Teamkontext, Kategorie- und Tagfilter, Suche
- angepinnte und reguläre Beiträge
- Karten mit Medienvorschau, Autor, Zeit, Reaktionen und Kommentaren
- Detailansicht mit Like, Kommentaren, Medien und Links
- Erstellen/Bearbeiten mit lokalisierten Titel- und Inhaltsfeldern
- Rich-Text-Editor, Tags, neue Tags und mehrere Medienlinks
- YouTube, Vimeo, Spotify und SoundCloud
- optionale Teambenachrichtigung
- berechtigungsabhängiges Bearbeiten, Löschen sowie Anpinnen/Lösen

## Quellcodeprüfung Feedback

Quellen: `frontend/src/modals/FeedbackModal.tsx`, `frontend/src/pages/MyFeedback.tsx`, `frontend/src/pages/MyFeedbackDetail.tsx`, `frontend/src/pages/Feedback.tsx`

- Typen Bug, Funktionswunsch, Frage und Sonstiges
- Pflichtnachricht, Seiten-URL und Browserkennung
- optionale automatische Bildschirmaufnahme mit Vorschau
- persönliche Suche und Reiter Alle/Ausstehend/Erledigt/Neue Antworten
- Status neu, in Bearbeitung und erledigt
- Detailverlauf, Antworten und Gelesenstatus
- Screenshotansicht und GitHub-Verknüpfung
- getrennte Plattformverwaltung mit Suche, Statusworkflow, Antworten, Wiederöffnen und GitHub-Aktionen

## Aufnahmen

- `public/images/docs/wissenspool/overview.png`
- `public/images/docs/wissenspool/neuer-beitrag.png`
- `public/images/docs/feedback/my-feedback.png`
- `public/images/docs/feedback/give-feedback.png`
