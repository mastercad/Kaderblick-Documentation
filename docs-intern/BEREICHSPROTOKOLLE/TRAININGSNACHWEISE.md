# Bereichsprotokoll: Trainingsnachweise

Stand: 28. August 2026

## Geprüfte Oberfläche

- Demo-Route: `/training-proofs`
- Traineransicht: Überschrift „Trainingsnachweise“, Kontrollansicht, Statusreiter Offen/Geplant/Abgeschlossen/Archiv, Spielerfilter sowie Von-/Bis-Filter
- Spieler- und Eltern-Fixtures: Route aufgerufen; in der aktuellen leeren Demo entstand keine belastbare Nachweiskarte für eine Aufnahme
- Aufnahme: `public/images/docs/trainingsnachweise/coach-overview.png`

## Geprüfte Implementierung

Quelle: `frontend/src/pages/MyTeam.tsx`

- eigenständiger Vollseitenmodus und kompakte Einbindung in „Mein Team“
- Teamwechsel bei mehreren Teamzuordnungen
- auf- und zuklappbarer Bereich; Zustand wird gespeichert
- Statuslogik: geplant, offen, überfällig, abgeschlossen und archiviert
- Filter nach Spieler und Datum; Suche nach Nachweistitel und Spielernamen
- Verwaltungsansicht nach Aufgaben oder Spielern
- Fortschrittswerte für erwartet, eingereicht, fehlend, bald fällig und vollständig
- Spielergruppen ohne Einreichung, teilweise erledigt und vollständig
- Detailgruppen fehlend, eingereicht und entschuldigt
- Dialog zum Erstellen mit Bezeichnung, Distanz, Verfügbarkeit, Fälligkeit, Empfängern und Beschreibung
- Empfängerauswahl leer: alle aktuell berücksichtigten Spieler; Auswahl gesetzt: ausgewählte Spieler
- Spieler-Einreichung als Dokument oder Strava-Aktivität
- Strava-Auswahl mit Distanz, Bewegungszeit, Datum und durchschnittlicher Herzfrequenz, soweit geliefert
- schreibgeschützte Dokumentprüfung in der Verwaltungsansicht
- Entschuldigung für ausgewählte oder alle offenen Nachweise mit Grund und optionaler Notiz
- Aufheben einer Entschuldigung
- Archivieren und Reaktivieren

## Rollen- und Beziehungsaussagen

- `canManageTrainingProofRequirements` schaltet die Kontroll- und Verwaltungsansicht frei.
- Ohne diese Berechtigung rendert die Komponente nur die dem aktuellen Teamdatensatz zugeordneten eigenen Nachweise.
- Eine Vereinsrolle oder die Supporterrolle allein belegt keine Verwaltungsberechtigung.
- Beziehungen können bestimmen, welche Team- und Spielerdaten das Konto erhält; die Demo lieferte für Spieler und Eltern aktuell keine aufnahmefähige Nachweiskarte.

## Offener Produktbefund

Bei leerer Anforderungsliste wird zuerst der Leerzustand gerendert. Die Schaltfläche zum Anlegen liegt im Zweig für vorhandene Anforderungen und ist deshalb beim ersten Nachweis nicht erreichbar. Dieser Befund steht zusätzlich in `docs-intern/BEFUNDE-UND-ERWEITERUNGEN.md`.
