# Quick-Event-Konfigurationen

- Demo `/quick-event-konfigurationen` als Trainer am 28.08.2026: leere Liste, Editor mit Standardkonfiguration und 10 Buttons, keine API-Fehler.
- Quellen: `QuickEventPresets/index.tsx`, `PresetList.tsx`, `PresetEditDialog.tsx`, `WysiwygPanel.tsx`, `SharePresetDialog.tsx`, `QuickEventPanel.tsx` und `useQuickEventConfig.ts`.
- Zugriffsbedingung im Frontend: Superadmin, `ROLE_SUPPORTER` oder `user.isCoach`.
- Eigene Presets: aktivieren/deaktivieren, teilen, kopieren, bearbeiten, löschen. Geteilte Presets: vor Bearbeitung kopieren, kopieren, Freigabe aus eigener Sicht entfernen.
- Editor: Name, getrennte Gruppen für Match-Status/Spielerevents, Drag-and-drop innerhalb einer Gruppe, Pfeilsteuerung, Ereignistyp, Bezeichnung, Langdruck-Optionen.
- Laufzeitpanel: Aufstellung vor Kader-Fallback, Ereignis-/Spielerauswahl, eigener Wechselablauf, berechnete Minute, 8 Sekunden Undo, Match-Status und Unterbrechung.
- Screenshots: `public/images/docs/quick-events/overview.png`, `editor.png`; Reproduktion mit `scripts/audit-quick-events.mjs`.
