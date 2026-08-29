# Bereichsprotokoll: Anmeldung und Konto

## Geprüfte Oberfläche

- Demo-Instanz, Anmeldedialog: Anmeldung und Registrierung
- `/forgot-password`: Link zum Zurücksetzen anfordern
- `/request-unlock`: Link zur Kontoentsperrung anfordern
- Screenshots am 28. August 2026 in deutscher Sprache aufgenommen

## Geprüfte Implementierung

- `frontend/src/components/LoginForm.tsx`
- `frontend/src/components/RegisterForm.tsx`
- `frontend/src/components/GoogleLoginButton.tsx`
- `frontend/src/components/TwoFactorChallengeForm.tsx`
- `frontend/src/modals/AuthModal.tsx`
- `frontend/src/pages/ForgotPassword.tsx`
- `frontend/src/pages/ResetPassword.tsx`
- `frontend/src/pages/RequestUnlock.tsx`
- `frontend/src/pages/UnlockAccount.tsx`
- `frontend/src/pages/VerifyEmail.tsx`
- `frontend/src/components/navigation/NavUserMenu.tsx`

## Abgedeckte Funktionen und Zustände

- Anmeldung per E-Mail und Passwort
- Anmeldung über Google
- Demo-Zugangsauswahl als Kennzeichen der Demo-Instanz
- Zwei-Faktor-Prüfung per Authenticator, E-Mail-Code oder Backup-Code
- Registrierung, Passwort-Mindestlänge und übereinstimmende Bestätigung
- Erfolg der Registrierung und E-Mail-Bestätigung
- Anfordern und Verwenden eines Passwort-Zurücksetzlinks
- Fehlender oder ungültiger Zurücksetzlink
- Anfordern und Verwenden eines Entsperr-Links
- Erfolgreicher, fehlender oder ungültiger Entsperr-Link
- Abmeldung und belegte Einträge des Benutzermenüs

## Nicht ausgelöste Aktionen

- Keine Registrierung erstellt
- Keine E-Mail versendet
- Kein Passwort geändert
- Kein Konto gesperrt oder entsperrt
- Keine Zwei-Faktor-Einstellung verändert

Die zugehörigen Erfolgs- und Fehlerzustände wurden aus den oben genannten Komponenten geprüft.

## Verknüpfungsanfrage (lokale Entwicklungsoberfläche)

- Am 29. August 2026 auf `localhost:5173` mit einem real angemeldeten Administratorkonto in Deutsch, Englisch, Französisch, Russisch und vereinfachtem Chinesisch geprüft.
- Fünf mobile Schritte: Personentyp, serverseitige Teamsuche, serverseitig auf das Team eingeschränkte Personensuche, Beziehung und Zusammenfassung.
- Teamtreffer zeigen Teamname, Altersgruppe und Verein; die vollständige Teamliste wird nicht in den Browser vorgeladen.
- Die Aufnahme endet jeweils vor `Antrag stellen`; es wurde keine Verknüpfungsanfrage erzeugt.
- Für reproduzierbare, sprachübergreifend identische Darstellungen wurden ausschließlich die Suchtreffer der Team-/Personensuche kontrolliert bereitgestellt. Authentifizierung und Oberfläche liefen gegen die lokale Entwicklungsinstanz.

Geprüfte zusätzliche Implementierung: `RegistrationContextDialog.tsx`, `RegistrationRequestController.php` und die lokalisierten Meldungen unter `translations/messages/registration_context/`.
