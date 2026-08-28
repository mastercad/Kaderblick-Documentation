# Befunde und mögliche Erweiterungen

Stand: 28. August 2026

Dieses Dokument trennt überprüfte Produktbefunde von Vorschlägen. Vorschläge sind keine angekündigten oder geplanten Funktionen.

## Befunde während der Dokumentationsprüfung

- In der bisherigen Dokumentation wurde eine Teilen-Funktion für Aufstellungen als „in Planung“ bezeichnet. Dafür wurde weder in der geprüften Oberfläche noch im bisherigen Prüfinventar ein belastbarer Veröffentlichungsnachweis gefunden. Die öffentliche Dokumentation enthält diese Ankündigung daher nicht mehr.
- Zahlreiche alte Bildreferenzen verwiesen auf nicht vorhandene Dateien. Bis zur Ersetzung durch geprüfte Originalaufnahmen blendet die Bildkomponente solche Referenzen vollständig aus.
- Die bisherigen Seitentexte enthalten mehrere pauschale Aussagen zu Berechtigungen und automatischen Folgewirkungen. Diese werden nur beibehalten, wenn Oberfläche, Konfiguration oder reproduzierbarer Ablauf die Aussage belegt.
- In den Teamdetails des geprüften Demo-Teams „FC Rotbach A-Junioren (U19)“ werden nicht gepflegte Mindest- und Höchstalterswerte als „NaN Jahre“ dargestellt. Die Listenansicht ist davon nicht betroffen.
- Der alte Fahrgemeinschaftstext beschrieb nicht vorhandene Eingabefelder für Treffpunkt und Abfahrtszeit, eine unbelegte Obergrenze von acht Plätzen und einen nicht vorhandenen Bestätigungsdialog beim Zurückziehen. Der veröffentlichte Text wurde an die tatsächlichen Dialoge angepasst.
- In der geprüften Trainer-Demo sind keine Trainingsnachweise vorhanden. Obwohl die API-Antwort die Verwaltungsberechtigung liefert, zeigt die leere Auswahl keine Schaltfläche zum Anlegen des ersten Nachweises. Der Quellcode rendert „Trainingsnachweis hinzufügen“ erst innerhalb der nicht leeren Ergebnisansicht. Der Dialog und seine Felder sind im Quellcode vorhanden, lassen sich in diesem Zustand aber nicht über die Oberfläche öffnen.
- Der Feedbackdialog verwendet in der deutschen Produktoberfläche das formelle Feldlabel „Ihre Nachricht“, obwohl Kaderblick Benutzer sonst überwiegend mit „du“ anspricht. Die Endverbraucherdokumentation bleibt durchgängig bei „du“; der Screenshot bildet den aktuellen Produkttext unverändert ab.
- Der Dialog, der über „Neuer Trainer“ geöffnet wird, trägt in der geprüften Demo bereits beim Anlegen den Titel „Trainer bearbeiten“. Die enthaltenen Felder und die Speichern-Aktion entsprechen einem Erfassungsdialog; die abweichende Überschrift ist ein belegter Oberflächenbefund.
- Die direkten Pfade `/tournaments` und `/admin/videos` führen in der geprüften Demo nicht zu eigenständigen Übersichten. Turniere werden über „Kalender → Neues Event → Turnier“ angelegt; Videos werden in den Details eines Spiels verwaltet. Die Dokumentation verwendet diese erreichbaren Einstiege.
- Die maßgebliche Projektseite veröffentlicht derzeit Kaderblick Video Manager, Kaderblick Analyse Player und Kaderblick Video Combiner. BallMarkerGui und CameraSimulator sind dort nicht als veröffentlichte Projekte aufgeführt und wurden deshalb aus der regulären Software-Navigation der Kaderblick-Dokumentation entfernt.

## Vorschläge für nützliche Erweiterungen

Die folgenden Punkte sind redaktionelle Produktideen, keine zugesagten Funktionen:

1. eine kontextbezogene Hilfe-Schaltfläche, die direkt den passenden Dokumentationsabschnitt öffnet,
2. eine sichtbare Erklärung „Warum sehe ich diesen Bereich?“, die Rolle, Beziehung und aktuellen Organisationskontext verständlich zusammenfasst,
3. eine Vorschau betroffener Personen und Bereiche vor Änderungen an Rollen oder Zuordnungen,
4. eine geführte Ersteinrichtung für Vereinsadministration, Trainer, Spieler und Eltern,
5. eine nachvollziehbare Änderungshistorie für sensible Kassen-, Inventar- und Zuordnungsaktionen,
6. exportierbare, druckfreundliche Ablaufkarten für Spieltag, Turnier und Kameraaufbau.
