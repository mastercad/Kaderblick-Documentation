# Bereichsprotokoll: Dashboard

Stand: 28. August 2026

## Quellen

- Trainer-Demo mit eingerichtetem Dashboard.
- Dialoge Widget hinzufügen, Statistik-Widget hinzufügen, Widget-Einstellungen und Widget löschen geöffnet und aufgenommen.
- `frontend/src/pages/Dashboard.tsx`
- `frontend/src/components/DashboardWidget.tsx`
- `frontend/src/modals/AddWidgetModal.tsx`
- `frontend/src/modals/SelectReportModal.tsx`
- `frontend/src/modals/WidgetSettingsModal.tsx`

## Belegte Funktionen

- Widget-Arten: Kalender, Nachrichten, Neuigkeiten, anstehende Termine, Geburtstage, Statistik-Widget.
- Statistik-Widget: vorhandene Auswertungen mehrfach auswählen; neue Auswertung über einfachen Assistenten oder detaillierten Builder erstellen.
- Widget-Aktionen: verschieben, aktualisieren, Einstellungen, entfernen; Statistik-Widgets zusätzlich bearbeiten.
- Breiten: schmal, normal, halbe Breite, groß, volle Breite.
- Kalender-Widget: Tag, Woche oder Monat; Offset relativ zu heute von -52 bis +52 Einheiten.
- Entfernen nur nach Bestätigung mit Widget-Name.
- Leerer Zustand: einfacher Assistent, detaillierter Builder oder anderes Widget hinzufügen.
- Spieler und Trainer: Quick-RSVP-Komponente.
- Spieler: offener Trainingsnachweis mit Zahl, Bezeichnung, Fälligkeit und direktem Upload-Einstieg.
- Bearbeitung einer Berichtsvorlage durch normale Mitglieder erzeugt eine persönliche Kopie; Administration kann die Vorlage selbst aktualisieren.
