# Bereichsprotokoll: Mein Profil

Stand: 28. August 2026

## Quellen

- Demo-Ansicht Trainer, acht Profilregister automatisiert geöffnet und aufgenommen.
- `frontend/src/modals/ProfileModal.tsx`
- `frontend/src/modals/ProfileModal/tabs/ProfileTab.tsx`
- `EquipmentTab.tsx`, `SettingsTab.tsx`, `NotificationsTab.tsx`, `ApiTokenTab.tsx`, `AbsencesTab.tsx`, `DocumentsTab.tsx`
- `CalendarIntegrationsTab.tsx`, `EventSelectionSettings.tsx`
- Dialoge für Avatar, Beziehungen, XP-Aufschlüsselung und Zwei-Faktor-Authentifizierung.

## Kopfbereich

- Avatar mit Schaltfläche zum Ändern.
- Name und E-Mail-Adresse.
- Titel, Karrierelevel und Gesamt-XP, sofern vorhanden.
- Systemrollen als Kennzeichnungen.
- Schaltfläche für vorhandene Benutzerbeziehungen oder neue Zuordnungsanfrage.
- Profilvollständigkeit in Prozent; fehlende Angaben sind anklickbar und führen zum betreffenden Register.
- Klick auf Level/XP öffnet die XP-Aufschlüsselung.

## Register Profil

- Name & Kontakt: Vorname, Nachname, E-Mail; alle drei sind Pflichtfelder.
- Körperdaten: Körpergröße in Zentimetern, Gewicht in Kilogramm.
- Passwort ändern: neues Passwort und Bestätigung; leer gelassen bleibt das Passwort unverändert.
- Gemeinsame Aktionen unten: Abbrechen und Speichern.

## Register Ausrüstung

- Trikotgröße: XS bis XXL oder keine Angabe.
- Shorts: XS bis XXL sowie mehrere Bund-/Längenkombinationen oder keine Angabe.
- Trainingsjacke: XS bis XXL oder keine Angabe.
- Stutzen/Socken: 35–38, 39–42, 43–46 oder 47–50 oder keine Angabe.
- Schuhgröße EU als Zahl in 0,5er-Schritten.

## Register Einstellungen

- Sprache: Systemsprache oder eine aktivierte Kaderblick-Sprache mit Flagge.
- Design: System, Hell oder Dunkel.
- Push-Benachrichtigungen: Status, aktivieren, Test senden und erneut prüfen; konkrete Aktionen richten sich nach erkanntem Status und Browserberechtigung.
- Zwei-Faktor-Authentifizierung: Authenticator-App oder E-Mail-Code; Status, Aktivierung, Deaktivierung, verbleibende Backup-Codes und neue Backup-Codes.
- Feiertage im Kalender: ein-/ausschalten; bei Aktivierung Region wählen.
- Hall of Fame: eigene Anzeige in öffentlicher Level-Rangliste und als Titelträger ein-/ausschalten.

## Register Benachrichtigungen

- Kategorien werden einzeln sofort gespeichert.
- Kommunikation: Nachrichten, Vereinsnews, Feedback-Antworten.
- Termine & Spiele: eigener Teilnahmestatus, Spieler-Rückmeldungen, Terminänderungen, Veranstaltungsabsagen, Veranstaltungsreaktivierung, Spielerinnerungen.
- Mannschaft: Mitfahrgelegenheiten, Mitfahrt gebucht, Umfragen, Strafen & Belohnungen, Spielvideos.
- Sonstiges: System- und Verwaltungshinweise.
- Eigene Erinnerungen: wöchentliche Regel, einmalige oder terminbezogene Erinnerung, Option für bereits zugesagte Termine, Zeitabstand und Einheit, weitere Erinnerung, separat speichern.

## Register API-Token

- Status eines persönlichen Tokens und Erstellzeitpunkt.
- Token generieren beziehungsweise neu generieren.
- Neu erzeugtes Token wird einmal angezeigt und kann kopiert werden.
- Vorhandenes Token widerrufen.
- Dieser Bereich braucht in der öffentlichen Endverbraucherdokumentation eine klare Einordnung; keine technischen Nutzungsanleitungen ohne Endverbraucherbezug.

## Register Kalender

- Eigene Kalenderfeeds erzeugen und in Kalenderanwendungen abonnieren.
- Persönlicher, Vereins- und Plattformfeed, abhängig vom bereitgestellten Status.
- Feed-Links kopieren, erneuern oder entfernen.
- Externe iCal-Feeds hinzufügen, benennen, färben, aktivieren, bearbeiten und entfernen.
- Terminarten für die persönliche Kalendersicht über die Ereignisauswahl festlegen.

## Register Abwesenheiten

- Nur mit mindestens einer Spielerbeziehung verfügbar.
- Bei mehreren Spielerbeziehungen getrennte Abschnitte je Spieler.
- Funktionen des eingebundenen Abwesenheitsbereichs sind in der Spielerperspektive zusätzlich zu prüfen.

## Register Dokumente

- Nur mit mindestens einer Spielerbeziehung verfügbar.
- Bei mehreren Spielerbeziehungen getrennte Abschnitte je Spieler.
- Dokumente anzeigen und über die angebotene Upload-Aktion hinzufügen.
- Detailaktionen und Dokumentarten sind in der Spielerperspektive zusätzlich zu prüfen.

## Noch vor Veröffentlichung zu prüfen

- Spieler- und Elternperspektive für Abwesenheiten und Dokumente.
- Avatar-Auswahldialog einschließlich Google-Avatar, Upload und Entfernen.
- Beziehungsdialog und Ablauf einer neuen Zuordnungsanfrage.
- XP-Aufschlüsselung mit Karrierelevel, Saisonlevel, Titel und Aktionsgruppen.
- vollständige Kalenderfeed-Dialoge.
- Zwei-Faktor-Einrichtung, Backup-Code- und Deaktivierungsdialoge ohne tatsächliche Sicherheitsänderung am Demo-Konto.
