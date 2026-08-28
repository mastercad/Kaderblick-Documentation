# fussball.de-Import

## Geprüfte Quellen

- Demo als Trainer: `/imports`, `/imports/browser-extension`, `/imports/extension-connect`
- Frontend: `ImportManagement.tsx`, `BrowserExtensionInstall.tsx`, `ImportReview.tsx`
- Routen: `/imports`, `/imports/:id`, `/imports/browser-extension`, `/imports/extension-connect`

## Laufzeitbefund vom 28.08.2026

- Der Trainer sieht den Import in der Navigation.
- Der Importverlauf ist in der Demo leer.
- Chrome wird auf der Installationsseite erkannt.
- Für Chrome, Edge und Firefox ist kein offizieller Installationslink hinterlegt.
- Die Verbindungsseite bietet `Erweiterung verbinden` an.
- Bei den drei Aufrufen traten keine API-Antworten ab Status 400 auf.

## Nicht per Demo belegbarer Zustand

Die Demo enthält keinen Importentwurf. Es wurde kein Datensatz erzeugt oder verändert. Die Beschreibung der Entwurfsprüfung ist deshalb direkt aus den vorhandenen Bedienelementen und Zustandsregeln in `ImportReview.tsx` abgeleitet. Für diese Ansicht wird erst ein Screenshot veröffentlicht, wenn ein echter, zur Dokumentation freigegebener Entwurf vorhanden ist.

## Screenshots

- `public/images/docs/fussball-de-import/verlauf.png`
- `public/images/docs/fussball-de-import/browser-erweiterung.png`
- `public/images/docs/fussball-de-import/verbindung.png`

Reproduzierbar mit `scripts/audit-imports.mjs` und dem Trainer-Storage-State.
