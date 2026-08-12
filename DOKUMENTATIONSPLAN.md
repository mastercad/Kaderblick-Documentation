# Arbeitsplan für die Kaderblick-Benutzerdokumentation

Diese Datei hält den Arbeitsstand der vollständigen Überarbeitung fest. Maßgeblich für Funktionen und Bedienwege ist immer der aktuelle Stand von `mastercad/Kaderblick-Website`. Vorhandene alte Dokumentation wird nicht ungeprüft übernommen.

## Verbindliche Schreibregeln

- Aus Anwendersicht dokumentieren: Orientierung, konkrete Bedienabläufe, alternative Bedienwege, sichtbare Voraussetzungen, Berechtigungsunterschiede, Auswirkungen einer Aktion und Zusammenhänge mit anderen Bereichen.
- Keine internen Namen, Programmbestandteile, Datenbankbegriffe, Schnittstellen oder technischen Abläufe erklären.
- Englische Begriffe vermeiden. Sichtbare englische Bezeichnungen nur nennen, wenn sie in der aktuellen Oberfläche tatsächlich vorhanden und zum Auffinden erforderlich sind.
- Keine Meta-Texte über Zielgruppe, Verständlichkeit oder Aufbau der Dokumentation in die Benutzerseiten schreiben.
- Keine motivierenden, beruhigenden, kumpelhaften oder werblichen Floskeln.
- Keine offensichtlichen Selbstverständlichkeiten, Füllsätze, Worthülsen, Wiederholungen oder künstlichen Einleitungen.
- Listen nur verwenden, wenn eine echte Auswahl, Aufzählung oder klar getrennte Schrittfolge dadurch übersichtlicher wird. Erklärenden Text nicht durch Stichpunktlisten ersetzen.
- Nicht künstlich kürzen: Ein Bereich gilt erst als dokumentiert, wenn alle bestätigten relevanten Bedienwege und Zusammenhänge erfasst sind.
- Unterschiede zwischen Spielern, Eltern bzw. Bezugspersonen, Trainern, Unterstützern und Verwaltungsberechtigten nur dort erklären, wo sie die sichtbare Bedienung oder verfügbaren Funktionen verändern.
- Keine Funktion, Berechtigung oder Folge einer Aktion raten.
- Bildplatzhalter nur verwenden, wenn ein Bild beim Auffinden, Unterscheiden oder Bedienen tatsächlich hilft. Der Platzhalter nennt Bildschirmzustand, relevante sichtbare Elemente und Zweck des Bildes.
- Personenbezogene Daten auf später gelieferten Bildern möglichst anonymisieren.
- Vor jedem Commit den Text nochmals auf Füllsätze, KI-typische Metaformulierungen, unnötige Listen, Selbstverständlichkeiten, technische Begriffe, unbelegte Aussagen und fehlende Bedienwege prüfen.

## Bearbeitungsstand

| Bereich | Stand |
|---|---|
| Erste Schritte | abgeschlossen |
| Anmelden & Registrieren | abgeschlossen |
| Dashboard | abgeschlossen |
| Kalender & Termine | abgeschlossen |
| Spiele | abgeschlossen |
| Team & Verein | abgeschlossen |
| Aufgaben | abgeschlossen |
| Neuigkeiten & Gemeinschaft | abgeschlossen |
| Nachrichten | abgeschlossen |
| Benachrichtigungen | abgeschlossen |
| Profil & Benutzerzuordnung | abgeschlossen |
| Aufstellungen | abgeschlossen |
| Auswertungen | abgeschlossen |
| Fahrgemeinschaften | abgeschlossen |
| Verwaltung | abgeschlossen |
| Mein Spieltag | abgeschlossen |
| Weitere aktuelle Bereiche | offen |

### Weitere aktuelle Bereiche

| Bereich | Stand |
|---|---|
| Aushelfen | abgeschlossen |
| fussball.de Import | offen |
| Team Size Guide | offen |
| Spieler & Teams im Trainerbereich | offen |
| Beobachtungsliste | offen |
| Quick-Event Konfiguration | offen |
| Weitere außerhalb der Hauptnavigation erreichbare Benutzerbereiche | noch zu prüfen |

## Vorgehen je Bereich

1. Aktuelle Seite, sichtbare Bedienelemente und zugehörige Abläufe im aktuellen Kaderblick-Quellcode prüfen.
2. Andere Stellen suchen, an denen dieselbe Tätigkeit ebenfalls möglich ist.
3. Sichtbare Unterschiede nach Aufgabe und Berechtigung prüfen.
4. Folgen der Aktion und Zusammenhänge mit anderen Bereichen bestimmen.
5. Vorhandene Dokumentationsseite nur als Gerüst betrachten und inhaltlich neu schreiben.
6. Bildplatzhalter dort setzen, wo ein Bild das Finden oder Verstehen deutlich erleichtert.
7. Querverweise auf zusammenhängende Bereiche ergänzen.
8. Den fertigen Stand als Commit in `mastercad/Kaderblick-Documentation` schreiben.
9. Bearbeitungsstand in dieser Datei aktualisieren.
