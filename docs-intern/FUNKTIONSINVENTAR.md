# Funktions- und Bereichsinventar

Stand der letzten Oberflächenprüfung: 28. August 2026  
Referenzoberfläche: Kaderblick-Demo, deutsche Sprachfassung

## Statuslegende

- **Geprüft**: Bereich wurde in mindestens einem passenden Rollenprofil in der laufenden Oberfläche geöffnet.
- **Teilweise geprüft**: Einstieg und sichtbare Hauptstruktur sind belegt; Detaildialoge oder vollständige Abläufe stehen noch aus.
- **Codehinweis**: Route oder Funktion wurde im Projekt gefunden, aber noch nicht ausreichend in der laufenden Oberfläche belegt.
- **Altbestand**: Inhalt existiert in der bisherigen Dokumentation und muss mit dem aktuellen Produkt abgeglichen werden.

## Öffentlicher Zugang und Konto

| Bereich | Oberflächenpfad | Prüfstatus | Vorgesehene Dokumentation |
|---|---|---|---|
| Öffentliche Startseite | `/` | Geprüft | Überblick, Zielgruppen und Weg zur Anmeldung |
| Funktionsseiten | `/funktionen/*` | Teilweise geprüft | Öffentliche Orientierung vor der Anmeldung |
| Vorteile und Preise | `/vorteile`, `/preise` | Teilweise geprüft | Leistungsüberblick und Tariforientierung |
| Zielgruppenseiten | `/für-trainer`, `/für-eltern`, `/für-jugendleitung` | Teilweise geprüft | Einstieg nach Aufgabe |
| FAQ, Über uns, Kontakt | `/faq`, `/ueber-uns`, `/kontakt` | Teilweise geprüft | Hilfe und Kontaktmöglichkeiten |
| Anmeldung | Anmeldedialog | Geprüft | E-Mail-Anmeldung, Google-Anmeldung und Demo-Zugang |
| Registrierung | Registrierungsregister | Teilweise geprüft | Konto anlegen und Registrierung abschließen |
| E-Mail bestätigen | `/verify-email/:token` | Codehinweis | Bestätigung und Fehlerfälle |
| Passwort vergessen/zurücksetzen | `/forgot-password`, `/reset-password/:token` | Teilweise geprüft | Wiederherstellung des Zugangs |
| Konto entsperren | `/request-unlock`, `/unlock-account` | Codehinweis | Entsperrung beantragen und abschließen |
| Profil und Einstellungen | Profildialog | Teilweise geprüft | Persönliche Daten, Sicherheit, Sprache und Zuordnungen |

## Bedienung der Dokumentation

| Bereich | Bedienung | Prüfstatus | Verhalten |
|---|---|---|---|
| Dokumentationssuche | dauerhaft sichtbares Suchfeld im Kopfbereich | Geprüft | Durchsucht Seitentitel, Überschriften und Abschnittstexte in der gewählten Sprache; ordnet Treffer nach Relevanz und verlinkt den passenden Abschnitt |

## Gemeinsame Arbeitsbereiche

| Bereich | Oberflächenpfad | Prüfstatus | Zentrale Zusammenhänge |
|---|---|---|---|
| Dashboard | `/dashboard` | Geprüft | Widgets, Kalender, News, Nachrichten, Berichte |
| Kalender | `/calendar` | Geprüft | Termine, Teilnahme, Erinnerungen, Teams, Spieltag |
| Nachrichten | globaler Nachrichtenbereich | Teilweise geprüft | Personen, Teams, Benachrichtigungen |
| Benachrichtigungen | globale Benachrichtigungszentrale | Teilweise geprüft | Aufgaben, Termine, Nachrichten und Systemhinweise |
| Neuigkeiten | `/news`, `/news/:id` | Geprüft | Verein/Team, Veröffentlichung und Benachrichtigung |
| Umfragen | `/surveys`, `/survey/fill/:surveyId` | Geprüft | Zielgruppe, Teilnahme und Auswertung |
| Wissenspool | `/wissenspool` | Geprüft | Verein/Team, Leserechte und redaktionelle Pflege |
| Hall of Fame | `/hall-of-fame` | Geprüft | Titel, XP und Auszeichnungen |
| Feedback | `/mein-feedback`, `/mein-feedback/:id` | Geprüft | Rückmeldung, Bearbeitungsstatus und Kommunikation |

## Spielbetrieb und Spieltag

| Bereich | Oberflächenpfad | Prüfstatus | Zentrale Zusammenhänge |
|---|---|---|---|
| Spiele und Turniere | `/games` | Geprüft | Teams, Wettbewerbe, Termine, Matchplan, Videos |
| Spieldetails | `/games/:id` | Teilweise geprüft | Ergebnis, Zeitsteuerung, Ereignisse, Aufstellung, Videos |
| Persönlicher Spieltag | `/mein-spieltag`, `/mein-spieltag/:eventId` | Geprüft | Teilnahme, Treffpunkt, Ablauf und eigene Aufgaben |
| Aushelfen | `/aushelfen` | Geprüft | Spielberechtigte Personen, Verfügbarkeit und Regeln |
| Turnierdetails | `/tournaments/:id` | Teilweise geprüft | Turnierplan, Spiele und Ergebnisse |
| Öffentlicher Live-Ticker | `/live/*` | Teilweise geprüft | Freigabe aus dem Spiel und öffentliche Ansicht |
| fussball.de-Import | `/imports` | Geprüft | Browser-Erweiterung, Prüfung und Übernahme |
| Importprüfung | `/imports/:id` | Teilweise geprüft | erkannte Daten, Korrektur und Freigabe |
| Browser-Erweiterung | `/imports/browser-extension`, `/imports/extension-connect` | Teilweise geprüft | Installation und Verknüpfung |
| Auswertungen | `/reports` | Geprüft | Spiele, Ereignisse, Teams und Spieler |

## Team, Verein und Personen

| Bereich | Oberflächenpfad | Prüfstatus | Zentrale Zusammenhänge |
|---|---|---|---|
| Mein Team | `/my-team` | Geprüft | Kader, Trainer, Zuordnungen, Dokumente, Abwesenheiten |
| Mein Verein | `/mein-verein` | Geprüft | Saison, Vereinsdaten und zugehörige Teams |
| Trainingsnachweise | `/training-proofs` | Geprüft | Trainingstermine, Spieler und Nachweisstatus |
| Teamgrößen-Leitfaden | `/team-size-guide` | Geprüft | Spieler, Trainer, Supporter und Bekleidungsgrößen |
| Spieler | `/players` | Geprüft | Teams, Verein, Position, Dokumente, Abwesenheiten, Watchlist |
| Trainer | `/coaches` | Geprüft | Teams, Verein, Lizenzen und Benutzerbeziehung |
| Teams | `/teams` | Geprüft | Verein, Saison, Altersklasse, Kader und Staff |
| Vereine | `/clubs` | Geprüft | Vereinsadministration, Teams und Zuordnungen |
| Orte | `/locations` | Geprüft | Kalender, Training und Spiele |
| Beobachtungsliste | `/watchlist` | Geprüft | Spieler- und Trainerbeobachtung |
| Benutzer und Zuordnungen | `/admin/user-relations` | Geprüft | Konten, Spieler-/Trainerbeziehungen und Anfragen |
| Staff-Zuordnungen | `/admin/staff-assignments` | Geprüft | Team- und Vereinsebene |
| Funktionärszuordnungen | `/admin/functionary-assignments` | Geprüft | Team- und Vereinsebene |

## Aufgaben und Organisation

| Bereich | Oberflächenpfad | Prüfstatus | Zentrale Zusammenhänge |
|---|---|---|---|
| Meine Aufgaben | `/tasks` | Geprüft | Verantwortliche, Termine und Status |
| Von mir erstellt | `/tasks/created` | Geprüft | Zuweisung und Nachverfolgung |
| Alle Aufgaben | `/tasks/all` | Geprüft | berechtigungsabhängige Gesamtübersicht |
| Quick-Event-Konfiguration | `/quick-event-konfigurationen` | Geprüft | Spielereignisse und schnelle Erfassung |

## Taktik, Video und Analyse

| Bereich | Oberflächenpfad | Prüfstatus | Zentrale Zusammenhänge |
|---|---|---|---|
| Aufstellungsvorlagen | `/formations` | Geprüft | Matchplan, Spieler und taktische Grundordnung |
| Matchplan | innerhalb der Spieldetails | Teilweise geprüft | Spielphasen, Aufstellung und taktische Vorgaben |
| Spielereignisse | innerhalb der Spieldetails | Teilweise geprüft | Live-Ticker, Videozeitpunkte und Berichte |
| Videos | innerhalb der Spieldetails | Teilweise geprüft | Kameras, Videoarten, Ereignisse und Ausschnitte |
| Videoanalyse | innerhalb der Spieldetails und Auswertungen | Teilweise geprüft | Ereignisse, Segmente und Berichte |
| Unbekannte Ereignisse | `/admin/unknown-game-events` | Geprüft | Import und Zuordnung von Ereignisarten |

## Kasse und Ausrüstung

| Bereich | Oberflächenpfad | Prüfstatus | Zentrale Zusammenhänge |
|---|---|---|---|
| Kassenbuch | `/kassenbuch` | Geprüft | Verein/Team, Buchungen und Berechtigungen |
| Abrechnung | `/abrechnung` | Geprüft | persönliche beziehungsweise kontextbezogene Abrechnung |
| Mein Deckel | `/mein-deckel` | Geprüft | persönliche Posten, Kasse und Zahlungen |
| Strafenkatalog | `/strafenkatalog` | Geprüft | Regeln, Verstöße, Deckel und Kasse |
| Inventar | `/inventar` | Geprüft | Artikel, Verfügbarkeit, Ausgabe und Rückgabe |

## Administration und Stammdaten

| Bereich | Oberflächenpfad | Prüfstatus | Zielgruppe |
|---|---|---|---|
| Altersklassen | `/ageGroups` | Geprüft | Superadministration |
| Wettbewerbe | `/competitions` | Geprüft | Superadministration |
| Positionen | `/positions` | Geprüft | Superadministration |
| Starke Füße | `/strongFeets` | Geprüft | Superadministration |
| Belagarten | `/surfaceTypes` | Geprüft | Superadministration |
| Ereignisarten | `/gameEventTypes` | Geprüft | Superadministration |
| Nationalitäten | `/nationalities` | Geprüft | Superadministration |
| Trainerlizenzen | `/coachLicenses` | Geprüft | Superadministration |
| Kameras | `/cameras` | Geprüft | Superadministration |
| Videoarten | `/videoTypes` | Geprüft | Superadministration |
| Titel-/XP-Übersicht und XP-Regeln | `/admin/title-xp-overview`, `/admin/xp-config` | Geprüft | Superadministration |
| Kartenregeln | `/admin/karten-regeln` | Geprüft | Superadministration |
| Aushelferregeln | `/admin/aushelfer-regeln` | Geprüft | Superadministration |
| Postervorlagen | `/admin/poster-vorlagen` | Geprüft | Superadministration |
| Systemeinstellungen | `/admin/system-settings` | Geprüft | Superadministration |
| Aktivitäten und Nutzungsanalyse | `/admin/activity`, `/admin/analytics` | Geprüft | Superadministration |
| Systemwartung und Warnungen | `/admin/system-maintenance` | Geprüft | Superadministration |
| Plattformabrechnung | `/admin/abrechnung` | Geprüft | Superadministration |
| Feedbackverwaltung | `/admin/feedback` | Geprüft | Superadministration |

## Kamera- und ergänzende Softwarebereiche der bisherigen Dokumentation

Diese Inhalte gehören teilweise nicht zur Webanwendung unter `/dashboard`. Der bestehende Kamerabereich einschließlich seiner Unterseiten bleibt unverändert erhalten. Für veröffentlichte Desktop-Anwendungen sind die Projektseite `projects.byte-artist.de` und die dort verlinkten GitHub-Projekte maßgeblich.

| Bereich | Status |
|---|---|
| Übersicht Kamerasysteme | Bestehender Inhalt unverändert |
| Kaderblick-Kamera: Überblick, Bauanleitung, Teileliste, 3D-Ansicht, Software | Bestehender Inhalt unverändert |
| PTZ-Kamera: Überblick, Bauanleitung, Teileliste, 3D-Ansicht, Software | Bestehender Inhalt unverändert |
| DJI Osmo Action 5 Pro | Bestehender Inhalt unverändert |
| Kaderblick Video Manager | Offizielle Projektseite und GitHub-Projekt geprüft |
| Kaderblick Analyse Player | Offizielle Projektseite und GitHub-Projekt geprüft; neu aufgenommen |
| Kaderblick Video Combiner | Offizielle Projektseite und GitHub-Projekt geprüft |
| BallMarkerGui | Nicht als Projekt auf der maßgeblichen Projektseite veröffentlicht; aus der regulären Navigation entfernt |
| CameraSimulator | Nicht als Projekt auf der maßgeblichen Projektseite veröffentlicht; aus der regulären Navigation entfernt |

## Noch systematisch zu vertiefen

- sämtliche Detaildialoge und Formularfelder pro Bereich,
- mobile Navigation und mobile Spezialbedienung,
- vollständige Folgen von Erstellen, Bearbeiten, Archivieren und Löschen,
- Fehlermeldungen und leere Zustände,
- konkrete Unterschiede der einzelnen Staff- und Funktionärstypen,
- Nachrichten- und Benachrichtigungsdialoge,
- Profil, Sicherheit, Sprache, Kalenderintegration und Benutzerzuordnungen,
- Detailpflege der Software erfolgt primär auf der jeweiligen Projektseite; die Kaderblick-Dokumentation erklärt Einordnung, Kernbedienung und Verbindung zur Webanwendung.
