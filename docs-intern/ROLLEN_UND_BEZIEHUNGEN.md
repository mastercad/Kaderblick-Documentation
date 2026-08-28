# Rollen, Benutzerbeziehungen und Dokumentationsperspektiven

Stand: 28. August 2026

Dieses Dokument trennt belegte Benutzerperspektiven von noch zu prüfenden Detailrechten. Es ist eine interne Wartungsgrundlage und verwendet daher Fundstellenbezeichnungen, die nicht in die Endverbraucherdokumentation übernommen werden.

## Grundprinzip

Die sichtbare Kaderblick-Oberfläche ergibt sich nicht allein aus einer einzigen Rollenbezeichnung. Maßgeblich können mehrere Ebenen gleichzeitig sein:

1. allgemeiner Kontostatus,
2. plattformweite Rolle,
3. Verwaltungs- oder Supportzuständigkeit für einen Verein oder ein Team,
4. Beziehung des Kontos zu einem Spieler oder Trainer,
5. Staff- oder Funktionärszuordnung auf Vereins- oder Teamebene,
6. objektbezogene Rechte für den jeweils geöffneten Datensatz.

Deshalb darf die Endverbraucherdokumentation nicht pauschal behaupten, dass jede Person mit derselben Funktionsbezeichnung überall dieselben Aktionen sieht.

## Belegte Kernprofile der Demo-Prüfung

| Dokumentationsperspektive | Belegtes Profil | Fachlicher Kontext | Prüfstatus |
|---|---|---|---|
| Superadministrator | separates Demo-Fixture-Konto | plattformweite Administration | 58 Routen geprüft |
| Vereinsadministrator | Vereinsadmin-Zuordnung | ein bestimmter Verein | 58 Routen geprüft |
| Trainer | Selbstbeziehung zu einem Trainer | zugeordnete Mannschaft(en) | 58 Routen geprüft |
| Spieler | Selbstbeziehung zu einem Spieler | konkrete Mannschaft | 58 Routen geprüft |
| Elternteil | Elternbeziehung zu einem Spieler | konkrete Jugendmannschaft | 58 Routen geprüft |
| Supporter | Supporter-Zuordnung für einen Verein | abgegrenzter Verein | 58 Routen geprüft |
| Teamkassenwart | Funktionärszuordnung zu einem Team | Teamkasse | 58 Routen geprüft |
| Vereinskassenwart | Funktionärszuordnung zu einem Verein | Vereinskasse | 58 Routen geprüft |
| Zeugwart | Staff-Zuordnung zu einem Team | Material und Inventar | 58 Routen geprüft |
| Medienbeauftragter | Staff-Zuordnung zu einem Team | Medienarbeit | 58 Routen geprüft |

Die Prüfung einer Route belegt noch nicht automatisch jede Aktion innerhalb dieser Route. Detailrechte werden pro Funktion und Objekt gesondert nachgetragen.

## Belegte Beziehungstypen

Die Demo-Fixtures weisen folgende unmittelbar nutzerbezogene Perspektiven nach:

- eigenes Spielerprofil,
- eigenes Trainerprofil,
- Elternbeziehung zu einem Spieler.

Weitere Beziehungstypen werden erst nach Prüfung ihrer Stammdaten und des Laufzeitverhaltens als Endverbraucherperspektive ergänzt.

## Belegte Verwaltungs- und Supportebenen

- Superadministration auf Plattformebene,
- Vereinsadministration für einen zugewiesenen Verein,
- Supporter-Zuständigkeit für einen zugewiesenen Verein.

Die Anwendung enthält außerdem Hinweise auf entsprechende Teamebenen. Deren konkrete Demo-Zugänge und sichtbare Abweichungen werden noch gesondert geprüft.

## Belegte Teamfunktionen

### Funktionäre

- Mannschaftskapitän,
- Spielführer,
- Jugendwart,
- Elternbeirat,
- Kassenwart.

### Staff

- Physiotherapeut,
- Teammanager,
- Zeugwart,
- Busfahrer,
- Medienbeauftragter.

## Belegte Vereinsfunktionen

### Funktionäre

- Vereinspräsident,
- Vizepräsident,
- Sportwart,
- Schriftführer,
- Beisitzer,
- Kassenwart.

### Staff

- Vereinsarzt,
- Geschäftsführer,
- Platzwart,
- Pressesprecher.

## Geplante rollenbezogene Einstiege der Endverbraucherdokumentation

Die Navigation soll nicht jede Kombination aus Rolle und Zuordnung als vollständige Kopie der Dokumentation darstellen. Vorgesehen sind kompakte Einstiege:

- Spieler,
- Eltern und weitere betreuende Beziehungen,
- Trainer und Trainerstab,
- Teamorganisation und Staff,
- Kasse und Finanzen,
- Material und Ausrüstung,
- Medien und Kommunikation,
- Team- und Vereinsfunktionäre,
- Vereins- und Teamadministration,
- Supporter,
- Superadministration.

Jeder Einstieg enthält:

1. die typischen verfügbaren Bereiche,
2. die wichtigsten ersten Schritte,
3. zentrale Arbeitsabläufe,
4. belegte Grenzen und Abweichungen,
5. Verweise auf gemeinsame vollständige Funktionsanleitungen.

## Umgesetztes Verhalten der Rollenauswahl

- Eine Rollenkachel verweist niemals unmittelbar auf eine einzelne allgemeine Bereichsseite.
- Der Klick öffnet den zu dieser Kachel gehörenden Rollenweg auf der Rollenhilfeseite.
- Gleichzeitig ist immer nur der ausgewählte Rollenweg sichtbar; ohne Auswahl bleibt die Seite kompakt.
- Jeder Rollenweg nennt den maßgeblichen Personen-, Team-, Vereins- oder Plattformkontext.
- Die verlinkten Anleitungen decken den gesamten belegten Arbeitsbereich der Perspektive ab und erklären jeweils, warum der Bereich dazugehört.
- Einstieg und Abgrenzung verhindern, dass eine Beziehung oder Funktion fälschlich als umfassendere Berechtigung verstanden wird.
- Ein Rücksprung führt wieder zur Rollenauswahl, ohne die Leseposition auf eine fachfremde Hilfeseite zu verlagern.

## Regeln für Berechtigungsaussagen

- Sichtbarkeit in der Seitennavigation und tatsächlicher Zugriff auf eine direkte URL werden getrennt bewertet.
- Eine sichtbare Seite belegt nicht automatisch ein Recht zum Erstellen, Bearbeiten oder Löschen.
- Ein fehlender Navigationspunkt kann eine bewusste Einschränkung oder nur eine Navigationsentscheidung sein; die Ursache wird ohne weiteren Beleg nicht behauptet.
- Rechte können vom ausgewählten Verein, Team, Spieler, Trainer, Termin oder Spiel abhängen.
- Superadministrator-Ergebnisse dürfen nicht auf andere Rollen übertragen werden.
- Gemeinsame Funktionen werden zentral erklärt; Rollenunterschiede werden an den betroffenen Schritten hervorgehoben.
