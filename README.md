# H-D-BnDTool
Ein Firefox-Addon um Rechnungsdaten aus einem Tabellenprogramm (z.B. Excel) automatisch in die BnD Formulare der KfW einzugeben.
Derzeit ist das Programm getestet für die KfW-Programme 261/262/263/461/462/463.

## Funktionsweise:
Das Addon funktioniert nur auf den Seiten "experten.kfw.de" und "public.kfw.de" (Websiten für die Erstellung von Bestätung nach Durchführungen. Zusätzlich funktioniert das Addon nur auf den Unterseiten wo die Rechnungseingabe möglich ist.

Für die Rechnungseingabe müssen die Rechnungsdaten in einem bestimmten Format vorliegen. Dies kann erzeugt werden, indem eine Tabelle erstellt wird, die der nachfolgenden gleicht:
| Ungesetzte Maßnahme | Rechnungsaussteller | Rechnungsnummer | Rechnungsdatum | Förderfähige Rechnungsposition(en) | Förderfähiger Rechnungsbetrag in EUR |
| --- | --- | --- | --- | --- | --- |
| 1 | Unternehmen 1 | 12345 | 01.01.2021 | alle | 65168 |
| 2 | Firma Fachplanung | RE2021-001 | 05.06.2023 | alle | 12345 |

Unter "Umgesetzte Maßnahme" wird definiert, ob es sich bei der Rechnung um eine Rechnung für das Effizienzhaus oder um die Fachplanung handelt.
Bei der BnD für Wohngebäude ist: 1 = Effizienzhaus; 2 = Fachplanung/Baubegleitung
Bei der gBnD für Nichtwohngebäude ist: 1 = Neubau; 2 = Sanierung; 3 = Einzelmaßnahme; 4 = Fachplanung/Baubegleitung; 5 = Nachhaltigkeitszertifizierung

Sobald alle Rechnungen eingegeben sind, wird die Website für die Erstellung von [BnD](https://experten.kfw.de/bnd-ebs/login/login.xhtml) oder [gBnD](https://public.kfw.de/GEW/masks/wizard.xhtml) aufgerufen und zur Rechnungseingabe navigiert. Sobald die Rechnungseingabeseite geöffnet ist, kann die Eingabe der Rechnungen beginnen. Hierzu werden im Tabellenprogramm alle Rechnungsfelder ausgewählt und kopiert (nicht die Überschriftszeile!). Anschließend wieder zur Rechnungseingabeseite in Firefox wechseln und das Addon "H&D BnDTool" (über das Puzzelsymbol oben rechts) auswählen. Die Rechnungsdaten aus dem Tabellenprogramm werden in das Eingabefeld eingefügt und mit dem Klopf "Daten einlesen und starten" automatisch eingelesen.

Nach Einlesen der Rechnungen muss im Falle der BnD abgewartet werden, bis alle Animationen fertig geladen haben. Bei der gBnD dauert die Eingabe länger, da hier bei jeder Rechnungseingabe auf die Rückmeldung vom KfW-Server gewartet werden muss. Der einfachheitshalber werden die Rechnungen daher einzeln im Abstand von einer Sekunde eingegeben.
