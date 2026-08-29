# Benutzer-, Staff- und Funktionärszuordnungen

## Demo-Prüfung

- Superadmin am 28.08.2026
- `/admin/user-relations`: Benutzerliste sowie Registrierung, Supporter und Demo
- `/admin/staff-assignments`: 50 Team- und 40 Vereinszuordnungen
- `/admin/functionary-assignments`: 50 Team- und 60 Vereinszuordnungen
- Keine API-Fehler im Screenshot-Lauf

## Quellen

- `pages/UserRelations/index.tsx`, `UsersTab.tsx`, `RequestsTab.tsx`, `SupporterRequestsTab.tsx`, `DemoRequestsTab.tsx`
- `pages/admin/StaffAssignments/index.tsx`
- `pages/admin/FunctionaryAssignments/index.tsx`
- zugehörige Benutzer-, Rollen-, Beziehungs-, Lösch- und Verifizierungsmodale

## Abgrenzung

- User Relation: Konto steht zu einem Spieler oder Trainer in einem Beziehungstyp.
- Admin-/Supporter-Zuordnung: Konto erhält einen organisatorischen Bereich auf Team- oder Vereinsebene.
- Staff-Zuordnung: operative Funktion in Team oder Verein.
- Funktionärszuordnung: Amt/Funktion in Team oder Verein.
- Globale Rolle: kontoweite Rolle; Bearbeitung nur als Superadmin.

## Screenshots

Unter `public/images/docs/benutzer-zuordnungen/` und `public/images/docs/funktionszuordnungen/`; reproduzierbar mit `scripts/audit-assignments.mjs`.

## Dublettenprüfung (lokale Entwicklungsoberfläche)

- Am 29. August 2026 auf `localhost:5173` in allen fünf Sprachen geprüft.
- Erfasst wurden der Dubletten-Dialog sowie die Konfliktauswahl vor der endgültigen Zusammenführung.
- Die Kandidatenwerte waren kontrollierte Dokumentationsdaten; es wurde weder zusammengeführt noch gelöscht.
- Geprüfte Implementierung: `frontend/src/pages/Players.tsx`, `PlayersController.php`, `PlayerMergeService.php` und `PlayerMergeAccessService.php`.
