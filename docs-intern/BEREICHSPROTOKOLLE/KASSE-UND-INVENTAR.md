# Bereichsprotokoll: Mein Deckel, Kassenbuch, Abrechnung und Inventar

Stand: 28. August 2026

## Laufzeitprüfung

- „Mein Deckel“ mit Trainer-Fixture geöffnet; Saldo, Verbrauch, Zahlungen, Verlauf und Buchungsdialog geladen.
- Kassenbuch mit Teamkassenwart-Fixture geöffnet; Zusammenfassung, Buchungen, Deckel-Übersicht, Katalog und Dialog „Neue Buchung“ geladen.
- Inventar mit Zeugwart-Fixture geöffnet; leere Artikelübersicht und Dialog „Neuer Artikel“ geladen.
- „Abrechnung & Abo“ mit Vereinskassenwart-Fixture geöffnet; neun auswählbare Teams, Teamstatus, Preis und Abo-Auswahl geladen.
- Bei diesen drei Prüfläufen wurden keine HTTP-Fehler der aufgerufenen API-Endpunkte protokolliert.
- Die vorigen pauschalen Audit-Aufnahmen zeigten teilweise nur Ladeplatzhalter. Die veröffentlichten Screenshots stammen aus neuen Läufen mit abgeschlossener Netzwerklast und zusätzlicher Wartezeit.

## Quellcodeprüfung „Mein Deckel“

Quelle: `frontend/src/pages/MeinDeckel/index.tsx`

- Wechsel zwischen verfügbaren eigenen und zugeordneten Personen
- Saldo, Verbrauch und bezahlter Betrag
- Katalog- und Freitextbuchung, Kontext, Menge, Datum, Notiz und Gesamtbetrag
- gemeinsamer Verlauf aus Deckelposten und Zahlungen
- Kennzeichnungen für Strafe, Freitext, Storno, storniert und Zahlungszuordnung
- Bearbeiten eigener Posten; Stornobeschränkung bei abgerechneten oder bereits rückgängig gemachten Posten

## Quellcodeprüfung Kassenbuch

Quelle: `frontend/src/pages/CashBook/index.tsx`

- Team-/Vereinskassen, Eröffnungsbestand, Kassenstand, Einnahmen und Ausgaben
- Jahresfilter, CSV-Export, Einstellungen
- Einnahme-/Ausgabebuchung und Kategorien
- Umbuchung zwischen zulässigen Kassen und nachvollziehbare Gegenbuchung
- Deckelübersicht mit Suche, Detailzeilen, Verbrauch, Zahlung/Auszahlung, Storno und Korrektur
- Katalogartikel mit Preis, Kategorie, Aktivstatus sowie Team-/Vereinszuordnung
- Wechsel zur getrennten Plattformabrechnung „Abrechnung & Abo“

## Quellcodeprüfung Inventar

Quelle: `frontend/src/pages/Inventar.tsx`

- Team-/Vereinsfilter und serverseitig gelieferte Schreibberechtigung
- Artikel mit Kategorie, Zustand, Menge, Einheit, Beschreibung und Notizen
- Einheiten Stück, Paar, Set und Satz; Zustände Gut, Mittel und Schlecht
- Verfügbarkeitsanzeige und aktive Ausleihen
- Ausleiher, Menge, optionales Rückgabedatum und Notiz
- Überfälligkeitskennzeichnung und Rückgabeaktion
- mobile Karten- und Desktop-Tabellenansicht für Ausleihen

## Quellcodeprüfung Abrechnung & Abo

Quelle: `frontend/src/pages/Billing.tsx`

- Teamstatus trial, active, pending, past_due, paused, canceled, blocked und unpaid
- Test- und Bezahlt-bis-Datum sowie erläuternder Grund
- Auswahl mehrerer unbezahlter Teams mit laufend berechnetem Monatsgesamtbetrag
- Weiterleitung zum Zahlungsanbieter, Neustart eines ausstehenden Vorgangs
- Verwaltung eines aktiven Abonnements im Kundenportal
- Zahlungsliste und externe Rechnungs-/PDF-Verknüpfung
- Zustand bei nicht konfigurierter Zahlungsanbindung sowie leere und vollständig abonnierte Zustände

## Aufnahmen

- `public/images/docs/mein-deckel/overview.png`
- `public/images/docs/mein-deckel/buchen.png`
- `public/images/docs/kassenbuch/overview.png`
- `public/images/docs/kassenbuch/buchung.png`
- `public/images/docs/inventar/overview.png`
- `public/images/docs/inventar/neuer-artikel.png`
- `public/images/docs/abrechnung/overview.png`
