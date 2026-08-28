# Bereichsprotokoll: Nachrichten und Benachrichtigungen

## Geprüfte Oberfläche

- Trainer-Demo: Benutzermenü und Nachrichtenfenster
- Posteingang, Gesendet, Suche, chronologische Ansicht und Unterhaltungsansicht
- Entwurf mit Einzelpersonen, Gruppe, Team und Verein
- Auswahl und Verwaltung von Empfängergruppen
- Glocke und leerer Zustand der Benachrichtigungszentrale

## Geprüfte Implementierung

- `frontend/src/modals/MessagesModal.tsx`
- `frontend/src/modals/messages/MessageListPane.tsx`
- `frontend/src/modals/messages/MessageDetailPane.tsx`
- `frontend/src/modals/messages/MessageComposePane.tsx`
- `frontend/src/modals/messages/BulkTargetPicker.tsx`
- `frontend/src/modals/messages/GroupManagerPane.tsx`
- `frontend/src/components/navigation/NavUserMenu.tsx`
- `frontend/src/components/navigation/NavNotificationCenter.tsx`
- `frontend/src/components/NotificationDetailModal.tsx`
- `frontend/src/context/NotificationContext.tsx`
- Profilprüfung: Benachrichtigungs- und Push-Einstellungen

## Abgedeckte Funktionen

- ungelesener Nachrichtenzähler und Öffnen über das Benutzermenü
- Posteingang und Gesendet mit Suche, Pagination und leeren Zuständen
- chronologische und zusammengefasste Unterhaltungsansicht
- Lesen, Antworten, allen Antworten, Weiterleiten, erneut Senden, als ungelesen Markieren und Löschen
- Verfassen an Einzelpersonen, gespeicherte Gruppen, Teams und Vereine
- kontextbezogene Sammelziele und Entfernen von Empfängern
- Entwurfsverwerfung mit Bestätigung
- Empfängergruppen erstellen, bearbeiten und löschen
- responsive Listen-, Detail- und Entwurfsansicht
- Benachrichtigungszähler, Zeitgruppen, Lesezustand, Detailansicht, „alle gelesen“ und Liste leeren
- sämtliche im Detaildialog nachgewiesenen Benachrichtigungstypen
- Verbindung zu Push- und Kategorieeinstellungen im Profil

## Nicht ausgelöste Aktionen

- Keine Nachricht versendet oder gelöscht
- Keine Empfängergruppe erstellt, geändert oder gelöscht
- Kein Lesezustand verändert
- Keine Benachrichtigung entfernt
- Keine Push-Berechtigung oder Geräteeinstellung verändert

Auswirkungen nicht ausgelöster Aktionen wurden anhand der aufgeführten Komponenten geprüft.
