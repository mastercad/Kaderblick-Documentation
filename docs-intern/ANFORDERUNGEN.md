# Verbindliche Anforderungen an die Kaderblick-Endverbraucherdokumentation

Stand: 28. August 2026

Dieses Dokument ist die verbindliche Arbeitsgrundlage für den Neuaufbau und die weitere Pflege der Kaderblick-Dokumentation. Änderungen und Ergänzungen an der Dokumentation müssen gegen diese Anforderungen geprüft werden.

## Verbindliche Ansprache

- Alle Endverbrauchertexte verwenden konsequent die direkte Anrede „du“.
- Die Anrede bleibt professionell, klar und altersgerecht; sie wird weder kumpelhaft noch förmlich distanziert.
- Formulierungen mit „Sie“ sowie wechselnde Anredeformen sind vor jeder Veröffentlichung auszuschließen.
- Keine Rechtfertigungen für bewusst nicht gemachte Aussagen aufnehmen.
- Keine hypothetischen Probleme, Erwartungen oder Missverständnisse erfinden.
- Hinweise und Callouts sind nur zulässig, wenn sie eine konkrete Bedienhandlung, Voraussetzung, Auswirkung oder einen belegten Fehlerfall erklären.
- Metaformulierungen wie „Die Dokumentation nennt ...“, „wird erst dokumentiert ...“ oder vorsorgliche Haftungssätze gehören nicht in Endverbrauchertexte.

## 1. Ziel

Die Dokumentation muss Endverbrauchern eine vollständige, präzise und professionelle Hilfe für alle veröffentlichten Bereiche von Kaderblick geben. Sie muss Navigation, Bedienung, Zusammenhänge, Voraussetzungen, Ergebnisse und Unterstützung so erklären, dass auch Personen mit wenig Erfahrung im Umgang mit Webseiten Kaderblick sicher verwenden können.

Die Dokumentation ist keine Entwicklerdokumentation. Ihr Maßstab ist die tatsächlich nutzbare Benutzeroberfläche.

## 2. Zielgruppen und Perspektiven

Die Dokumentation muss die unterschiedlichen Sichten der Benutzer ausdrücklich berücksichtigen. Sichtbare Bereiche, Inhalte und Handlungsmöglichkeiten können abhängen von:

- der allgemeinen Benutzerrolle,
- der Supporter-Rolle,
- einer Funktion oder Zuständigkeit im Verein,
- einer Funktion oder Zuständigkeit im Team,
- einer Beziehung zu einem Spieler,
- einer Beziehung zu einem Trainer,
- weiteren in der Anwendung tatsächlich nachgewiesenen Benutzerbeziehungen und Berechtigungen.

Beispiele für getrennt zu betrachtende Perspektiven sind Trainer, Kassenwart, Administrator und Superadministrator. Weitere Rollen und Beziehungen werden während der Prüfung vollständig erfasst.

Keine Rolle darf allein aufgrund ihrer Bezeichnung dokumentiert werden. Beschriebene Sichtbarkeit und Berechtigungen müssen durch Benutzeroberfläche, Laufzeitverhalten, Konfiguration oder einen nachvollziehbaren Ausführungspfad belegt sein.

## 3. Rollenbezogene Informationsarchitektur

Die Dokumentation muss vollständig sein, darf Benutzer aber nicht mit einer unstrukturierten Gesamtliste aller Funktionen überfordern. Deshalb gelten folgende Strukturregeln:

1. Es gibt einen gemeinsamen Einstieg für Grundlagen, Anmeldung, Navigation, Profil, Sprache und allgemeine Bedienmuster.
2. Es gibt intuitive Einstiege nach Rolle beziehungsweise Aufgabe, über die Benutzer schnell zu den für sie relevanten Abläufen gelangen.
3. Jede Funktion besitzt eine zentrale, vollständige Anleitung.
4. Rollenwege verweisen auf diese zentralen Anleitungen und erklären zusätzlich nur die belegten Unterschiede bei Sichtbarkeit, Inhalt, Bedienung oder Verantwortung.
5. Wenn eine Funktion für eine Rolle nicht verfügbar ist, wird sie nicht als regulärer Arbeitsschritt dieser Rolle dargestellt.
6. Zusammenhänge zwischen Bereichen werden durch Querverweise, Übersichten und bei echtem Mehrwert durch kompakte Ablaufdarstellungen erklärt.
7. Vollständigkeit wird über ein separates Funktions-, Rollen- und Ablauf-Inventar kontrolliert, nicht durch eine überladene Seitennavigation.

### Verbindliche technische Inhaltsorganisation

- Pro Dokumentationslayout existiert genau eine sprachunabhängige Twig-Vorlage.
- Lokalisierte Inhalte werden anhand der aktiven Sprache aus separaten Inhaltsdaten injiziert.
- Sprachspezifische Kopien einer Twig-Vorlage sind nicht zulässig.
- Jede fachliche Erweiterung wird im selben Arbeitsschritt in allen fünf Sprachdatenbeständen ergänzt.
- Tests kontrollieren die vollständigen Sprachdateisätze und verhindern neue sprachabhängige Templates.
8. Die Dokumentation besitzt im Kopfbereich ein dauerhaft sichtbares Suchfeld. Treffer erscheinen beim Eingeben unmittelbar unter dem Feld und führen zum passenden Abschnitt. Ein vorgeschalteter Dialog, eine reine Suchschaltfläche oder ein eigenes Tastenkürzel sind nicht vorgesehen.

## 4. Inhaltliche Vollständigkeit

Für jeden veröffentlichten und erreichbaren Bereich sind, soweit zutreffend, zu dokumentieren:

- Zweck und Nutzen aus Anwendersicht,
- Voraussetzungen und erforderlicher Kontext,
- Weg zum Bereich in Desktop- und Mobilnavigation,
- sichtbare Seitenelemente und deren Bedeutung,
- sämtliche Schaltflächen, Menüs, Registerkarten, Filter, Suchfelder und Auswahlmöglichkeiten,
- Anlegen, Anzeigen, Bearbeiten, Speichern, Veröffentlichen, Teilen, Archivieren und Löschen,
- Bestätigungsdialoge und Folgen einer Aktion,
- leere Zustände und erste sinnvolle Handlung,
- Lade-, Erfolgs-, Warn- und Fehlerzustände,
- Unterschiede nach Rolle und Benutzerbeziehung,
- Auswirkungen auf andere Bereiche,
- typische vollständige Arbeitsabläufe,
- häufige Fragen und konkrete Problemlösungen,
- Hinweise zum Schutz persönlicher oder sensibler Inhalte, sofern für Anwender relevant.

Auch vermeintlich selbstverständliche Bedienhandlungen dürfen nicht fehlen, wenn unerfahrene Benutzer sie für den erfolgreichen Abschluss eines Ablaufs benötigen. Erklärungen müssen dennoch knapp, konkret und frei von Wiederholungen bleiben.

## 5. Zusammenhänge

Die Dokumentation muss insbesondere verdeutlichen, wie gemeinsam verwendete Daten und Handlungen mehrere Bereiche verbinden. Relevante Zusammenhänge werden erst nach ihrer Prüfung beschrieben. Dazu können beispielsweise gehören:

- Verein, Saison, Team und zugeordnete Personen,
- Spieler- und Trainerbeziehungen,
- Termine, Teilnahme, Treffpunkt und Spieltag,
- Spiele, Kader, Aufstellung, Matchplan, Ereignisse und Live-Ticker,
- Video, Spielereignisse, Ausschnitte, Analyse und Berichte,
- Aufgaben, Termine, Zuständigkeiten und Benachrichtigungen,
- Kasse, Abrechnung, persönlicher Deckel und Strafenkatalog,
- Inventar, Verfügbarkeit, Ausgabe und Rückgabe,
- Rollen, Beziehungen, Sichtbarkeit und Bearbeitungsrechte.

Diese Aufzählung ist eine Prüfliste und kein Beleg, dass jeder Zusammenhang in der aktuellen Anwendung genau so umgesetzt ist.

## 5.1 Verbindlich zu vervollständigende Fachabläufe

Die folgenden vom Betreiber ausdrücklich genannten Abläufe müssen in der Endverbraucherdokumentation vollständig, bebildert, rollenbezogen und in allen fünf Sprachen beschrieben werden. Die Aufzählung darf erst entfernt oder als abgeschlossen markiert werden, wenn Demo-Prüfung, Inhaltsfassung, Übersetzungen, Screenshots und Querverweise nachgewiesen sind.

- Auswahl beim ersten Login für ein Konto ohne Spieler- oder Trainerverbindung sowie der anschließende Verknüpfungsablauf; Vereinsmitarbeiter werden durch die zuständige Administration angelegt.
- Anfrage einer Supportverknüpfung zu einem Team, wenn dem Konto die dafür erforderliche Verbindung oder Berechtigung fehlt.
- Abgrenzung wiederverwendbarer Aufstellungsvorlagen von der Startformation und den weiteren Formationen eines konkreten Spiels.
- Vollständige Bedienung der Taktiktafel einschließlich Zeichenwerkzeugen, Taktiken, Vorlagen, Darstellung, Speichern und Präsentation.
- Übernahme einer Aufstellungsvorlage in ein Spiel, anschließende unabhängige Bearbeitung sowie Wiederverwendung einer Spielaufstellung als neue Vorlage.
- Import von Taktiken aus einer Vorlage unabhängig von der gewählten Formation sowie ausschließlich für ein bestimmtes Spiel angelegte Taktiken.
- Planung späterer Spielformationen für Wechsel und Umstellungen nach der Startformation.
- Zusammenhang zwischen den tatsächlich vorgenommenen Auswechslungen, der Aktion `Spiel beendet` und den daraus bestimmten absolvierten Spielminuten eines Spielers.
- Sonderrecht von Vereinsadministratoren zum Anlegen eines Spiels mit teamfremden Mannschaften unter der Voraussetzung, dass mindestens eine der beiden Mannschaften durch wenigstens einen Spieler dem Verein des Administrators zugeordnet ist.
- Drei getrennte Wege, über die ein Spieler beim Aushelfen berücksichtigt wird: passende Altersvoraussetzung und Auswahl im Assistenten, eigene freiwillige Aushelferbereitschaft sowie Einladung durch einen Trainer einer Mannschaft bei passender Altersvoraussetzung.
- Vollständiger Benachrichtigungs- und Antwortweg für Aushelferbereitschaft und konkrete Aushilfseinladungen.
- Vollständiger Nachrichtenbereich einschließlich Posteingang, Gesendet, Einzel- und Sammeladressierung, Antworten, Weiterleiten, Löschen, Lesestatus, Ansichtswechsel und Empfängergruppen.
- Sämtliche unterschiedlichen Kalender-Assistenten für `Spiel`, `Training`, `Vereinstreffen`, `Event`, `Aufgabe` und `Turnier`, einschließlich aller jeweils sichtbaren Schritte und Optionen.
- Vierstufiger Mobile Wizard für Auswertungen und der wesentlich umfangreichere Report Builder. `Anpassen` auf der Abschlussseite des Mobile Wizard öffnet den Report Builder mit der bisherigen Auswahl. Beim Anlegen eines Dashboard-Statistik-Widgets kann direkt zwischen `Einfacher Assistent` und `Detaillierter Builder` gewählt werden.

## 6. Sprache und Stil

Die veröffentlichte Dokumentation muss:

- sachlich, professionell und eindeutig formuliert sein,
- handlungsorientierte Überschriften und präzise Schritte verwenden,
- Fachbegriffe beim ersten Auftreten verständlich erklären,
- Füllwörter, Werbesprache, leere Worthülsen und unnötige Prosa vermeiden,
- weder kumpelhaft noch persönlich formuliert sein,
- kurze Absätze, klare Schrittfolgen und aussagekräftige Hinweise verwenden,
- gleiche Funktionen und Bedienelemente überall gleich benennen,
- sichtbare Bezeichnungen der jeweils gewählten Oberflächensprache verwenden.

Technische Implementierungsbegriffe werden nicht veröffentlicht, wenn Endverbraucher daraus keinen konkreten Nutzen ziehen können.

## 6.1 Aktuelles Kaderblick-Erscheinungsbild

Die Dokumentationsoberfläche muss visuell an das aktuelle Design der Kaderblick-Website angepasst werden. Das bisherige Erscheinungsbild der Dokumentation bildet einen veralteten Stand ab und darf nicht unverändert fortgeführt werden.

Für die Neugestaltung gelten folgende Anforderungen:

- Aktuelle, in der laufenden Kaderblick-Oberfläche belegte Gestaltungsprinzipien für Typografie, Farben, Abstände, Flächen, Karten, Schaltflächen, Symbole und Interaktionszustände werden berücksichtigt.
- Die Dokumentation bleibt als eigenständiger Hilfebereich eindeutig erkennbar und übernimmt nur Gestaltungsmuster, die Lesbarkeit, Orientierung und Wiedererkennung unterstützen.
- Navigation, Suche, Sprachwahl, Rollenwahl, Inhaltsübersichten, Hinweise, Schrittfolgen und Querverweise erhalten eine konsistente visuelle Hierarchie.
- Desktop-, Tablet- und Mobilansicht müssen vollständig nutzbar sein.
- Kontrast, Tastaturbedienung, sichtbare Fokuszustände, semantische Struktur und verständliche Beschriftungen werden bei der Gestaltung berücksichtigt.
- Dekorative Effekte dürfen Lesbarkeit, Ladeverhalten oder Bedienbarkeit nicht beeinträchtigen.
- Screenshots und Inhaltsgrafiken werden responsiv dargestellt und dürfen auf kleinen Bildschirmen keine wichtigen Details unzugänglich machen.
- Das Ergebnis wird durch direkten visuellen Vergleich mit der aktuellen Kaderblick-Oberfläche und durch Prüfung typischer Dokumentationsseiten abgesichert.

Die konkrete Gestaltung darf erst nach der Untersuchung der aktuellen Oberfläche als „an Kaderblick angepasst“ bewertet werden.

## 7. Abgrenzung zu technischen Informationen

Nicht Bestandteil der veröffentlichten Endverbraucherdokumentation sind insbesondere:

- Quellcode und interne Dateipfade,
- Programmiersprachen, Frameworks und Bibliotheken,
- Datenbanktabellen, Schnittstellen und interne Datenmodelle,
- interne Rollenkennungen und technische Berechtigungsnamen,
- Entwicklungs-, Deployment- und Infrastrukturdetails,
- Secrets, Tokens, Passwörter oder Zugangsdaten,
- interne Diagnoseinformationen ohne Nutzen für Endverbraucher.

Interne Wartungsdateien dürfen technische Fundstellen als Prüfnachweise enthalten. Sie müssen klar von veröffentlichten Inhalten getrennt bleiben und dürfen niemals Secrets enthalten.

## 8. Datenschutz und Screenshots

Screenshots werden direkt aus der tatsächlich geprüften Oberfläche erstellt. Dabei gelten folgende Anforderungen:

- Zugangsdaten dürfen weder sichtbar sein noch in Dateien gespeichert werden.
- Personenbezogene, vertrauliche oder sicherheitsrelevante Daten werden nicht veröffentlicht.
- Bevorzugt werden geeignete Test- und Beispieldaten verwendet.
- Jeder veröffentlichte Screenshot wird vor der Übernahme einzeln geprüft und nötigenfalls zugeschnitten oder bereinigt.
- Ein Screenshot muss einen konkreten Erklärungsschritt unterstützen; rein dekorative Bilder werden vermieden.
- Bildunterschriften erklären, was zu sehen und worauf zu achten ist.
- Screenshots werden einheitlich benannt, versioniert und einem dokumentierten Bereich zugeordnet.
- Bei erheblichen Unterschieden werden Desktop- und Mobilansicht getrennt gezeigt.

Temporäre Aufnahmen aus der Bestandsaufnahme sind keine automatisch freigegebenen Dokumentationsbilder.

## 9. Sprachen und Lokalisierung

Die Dokumentation wird in folgenden Sprachen bereitgestellt:

- Deutsch (`de`),
- Englisch (`en`),
- Französisch (`fr`),
- Russisch (`ru`),
- vereinfachtes Chinesisch (`zh-Hans`).

Deutsch ist zunächst die inhaltliche Referenzfassung. Alle veröffentlichten Inhalte, Navigationselemente, Bildunterschriften, Hinweise und Metadaten müssen lokalisierbar sein. Übersetzungen müssen fachlich gleichwertig sein und dürfen keine Funktionen auslassen. Sprachwechsel, sprachspezifische URLs und Rückfallverhalten müssen nachvollziehbar und konsistent umgesetzt werden.

Screenshots werden nur sprachübergreifend wiederverwendet, wenn die sichtbare Sprache für das Verständnis unerheblich ist. Andernfalls sind lokalisierte Aufnahmen oder eine bewusst sprachneutrale Darstellung erforderlich.

### Geschützte Marken- und Produktnamen

- `Kaderblick` ist in jeder Sprache unverändert zu schreiben und niemals zu übersetzen.
- `kaderblick.de` bleibt als Domain unverändert.
- Vollständige Produktnamen wie `Kaderblick Video Manager`, `Kaderblick Analyse Player` und `Kaderblick Video Combiner` bleiben unverändert.
- Vor der Veröffentlichung wird automatisiert geprüft, dass jeder Ausgangstext mit `Kaderblick` den Markennamen auch in der Übersetzung unverändert enthält.

## 10. Bestehende Kamera- und Softwarebereiche

Die vorhandenen Kamerabereiche bleiben einschließlich sämtlicher Übersichten, Unterseiten, Texte, Abbildungen, Downloads, Modelle und interaktiver Ansichten inhaltlich und strukturell unverändert. Sie dürfen weder gekürzt noch umformuliert, neu gegliedert, ergänzt oder gelöscht werden. Ihre Erreichbarkeit wird lediglich geprüft.

Die eigenständigen Software- und Werkzeugbereiche bleiben erhalten. Sie dürfen anhand belegter Funktionen neu gegliedert, vereinheitlicht und in die allgemeine Navigation eingeordnet werden.


## 11. Veröffentlichter Funktionsstand und Erweiterungsvorschläge

Dokumentiert wird der aktuelle veröffentlichte Funktionsstand. Falls bei der Prüfung Funktionen gefunden werden, die sichtbar angelegt, aber nicht erreichbar, nicht bedienbar oder erkennbar unvollständig sind, werden sie nicht stillschweigend als fertige Endverbraucherfunktion beschrieben.

Solche Befunde werden mit konkretem Beleg in einem getrennten Abschlussbericht aufgeführt. Noch ungeklärte Sachverhalte werden ausdrücklich als ungeklärt bezeichnet.

Sinnvolle zukünftige Erweiterungen dürfen als klar abgegrenzte Vorschau vorgeschlagen werden. Vorschläge dürfen nicht mit vorhandenen Funktionen vermischt werden und müssen ihren erwarteten Anwendernutzen benennen.

## 12. Dauerhafte Wartungsunterlagen

Damit spätere Ergänzungen keine vollständige Neuanalyse erfordern, werden mindestens folgende interne Unterlagen gepflegt:

- diese verbindliche Anforderungsspezifikation,
- ein vollständiges Funktions- und Bereichsinventar,
- eine Rollen-, Beziehungen- und Sichtbarkeitsmatrix,
- ein Ablauf- und Zusammenhangsinventar,
- eine Zuordnung von Dokumentationsseiten zu geprüften Oberflächenbereichen,
- ein Screenshot-Katalog mit Prüfstatus,
- ein Lokalisierungs- und Übersetzungsleitfaden,
- ein Redaktionsleitfaden,
- ein Prüfprotokoll mit Datum, Rolle, Oberfläche und Beleg,
- eine Liste offener, ungeklärter oder erneut zu prüfender Punkte.

Diese Dateien müssen so gepflegt werden, dass eine Änderung an einem Websitebereich gezielt den betroffenen Dokumentationsseiten, Rollenwegen, Screenshots und Übersetzungen zugeordnet werden kann.

## 13. Evidenz und Qualitätssicherung

- Keine Funktion, Sichtbarkeit, Berechtigung, Auswirkung oder Ursache wird ungeprüft als Tatsache dargestellt.
- Quellcode kann Bereiche und Prüfpfade aufzeigen, ersetzt aber nicht automatisch die Prüfung des tatsächlichen Anwenderverhaltens.
- Laufzeitprüfung, sichtbare Oberfläche, Konfiguration und Tests werden als Belege nachvollziehbar festgehalten.
- Widersprüche zwischen Code, Oberfläche und vorhandener Dokumentation werden als offene Befunde behandelt, bis sie geklärt sind.
- Alle internen und externen Links werden geprüft.
- Navigation, responsive Darstellung, Sprachwechsel und relevante Bildschirmgrößen werden geprüft.
- Vor einer Veröffentlichung werden die im Projekt definierten Formatierungs-, Analyse-, Test- und Buildprüfungen ermittelt und ausgeführt.
- Ein Bereich gilt erst dann als dokumentiert, wenn Inhalt, Rollenunterschiede, Zusammenhänge, Screenshots und Übersetzungsstatus im Inventar nachvollziehbar erfasst sind.

## 14. Abnahmekriterien

Die Dokumentation ist vollständig, wenn:

1. jeder veröffentlichte und erreichbare Endverbraucherbereich inventarisiert und einer Dokumentationsseite zugeordnet ist,
2. alle nachgewiesenen Rollen und Benutzerbeziehungen einen verständlichen Einstieg besitzen,
3. alle nachgewiesenen Rollenunterschiede beschrieben sind,
4. zentrale Arbeitsabläufe von Anfang bis Ergebnis erklärt sind,
5. Zusammenhänge und Auswirkungen zwischen Bereichen nachvollziehbar sind,
6. keine relevanten Bedienelemente oder Zustände ohne Erklärung bleiben,
7. Kamera- und Softwarebereiche erhalten und integriert sind,
8. alle fünf Sprachfassungen inhaltlich vollständig und navigierbar sind,
9. veröffentlichte Screenshots geprüft und frei von nicht freigegebenen Daten sind,
10. technische Interna und Secrets aus den Endverbraucherinhalten ausgeschlossen sind,
11. offene oder möglicherweise unfertige Funktionen getrennt und belegt berichtet werden,
12. die projektspezifische Qualitätssicherung erfolgreich ausgeführt oder eine konkrete Einschränkung transparent dokumentiert wurde.
13. das Erscheinungsbild nachweisbar an die aktuelle Kaderblick-Oberfläche angepasst und auf Desktop sowie Mobilgeräten geprüft wurde.

## 15. Umgang mit Zugangsdaten

Für die lokale Prüfung bereitgestellte Zugangsdaten werden ausschließlich zur Laufzeit verwendet. Sie werden nicht in dieser Anforderungsspezifikation, in Prüfprotokollen, Skripten, Screenshots, Versionsständen oder veröffentlichten Dokumentationsseiten gespeichert.
