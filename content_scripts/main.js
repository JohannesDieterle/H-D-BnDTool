(() => {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  function kostenseiteBestimmen(rechnungen) {
    // Funktioniert nur auf der Website experte.kfw.de und dann erst wenn auf der Seite für die Kosteneingabe
    const urlBNDWohnen = /experten.kfw.de/.test(window.location.href);
    const kosten_erfassen_bnd = document.getElementById(
      "bnd_bauen_form:receiptList:addReceipt"
    );

    // Funktioniert nur auf der Website public.kfw.de und dann erst wenn auf der Seite für die Kosteneingabe
    const urlBNDNichtwohnen = /public.kfw.de/.test(window.location.href);
    const kosten_erfassen_gbnd = document.getElementById(
      "wizard_form:idNewBuildingSection:idBegNwgBndReceiptForPurposeSection:idAddReceiptEntryButton"
    );

    if (urlBNDWohnen && kosten_erfassen_bnd != null) {
      rechnungsdatenEingebenBND(kosten_erfassen_bnd, rechnungen);
    } else if (urlBNDNichtwohnen && kosten_erfassen_gbnd != null) {
      rechnungsdatenEingebenGBND(kosten_erfassen_gbnd, rechnungen);
    } else {
      console.log("nicht auf der Richtigen Seite");
    }
  }

  async function rechnungsdatenEingebenBND(kosten_erfassen_bnd, rechnungen) {
    // Funktion für die Eingabe bei Wohngebäuden
    for (item of rechnungen) {
      // Knopf "Konsten erfassen" drücken
      kosten_erfassen_bnd.click();

      // Knopf "Umgesetzte Maßnahme" setzen
      let massnahme = document.getElementById(
        "editReceiptDialog:editReceiptForm:purposeKey:selectField"
      );
      massnahme.children[item[0]].setAttribute("selected", "selected");

      // Knopf "Rechnungsaussteller" setzen
      let rechnungsa = document.getElementById(
        "editReceiptDialog:editReceiptForm:rechnungsaussteller:inputField"
      );
      rechnungsa.value = item[1];

      // Knopf "Rechnungsnummer" setzen
      let rechnungsn = document.getElementById(
        "editReceiptDialog:editReceiptForm:rechnungsnummer:inputField"
      );
      rechnungsn.value = item[2];

      // Knopf "Rechnungsdatum" setzen
      let rechnungsd = document.getElementById(
        "editReceiptDialog:editReceiptForm:rechnungsdatum:inputField"
      );
      rechnungsd.value = item[3];

      // Knopf "Förderfähige Rechnungsposition(en)" setzen
      let rechnungsp = document.getElementById(
        "editReceiptDialog:editReceiptForm:rechnungsposition:inputField"
      );
      rechnungsp.value = item[4];

      // Knopf "Förderfähiger Rechnungsbetrag in EUR" setzen
      let rechnungsb = document.getElementById(
        "editReceiptDialog:editReceiptForm:rechnungsbetrag:inputField"
      );
      rechnungsb.value = item[5];

      // Knopf "Weiter" drücken
      let weiter = document.getElementById(
        "editReceiptDialog:editReceiptForm:confirmReceiptButton"
      );
      weiter.click();
    }
  }

  async function rechnungsdatenEingebenGBND(kosten_erfassen_gbnd, rechnungen) {
    // Funktion für die Eingabe bei Nichtwohngebäuden
    const fachplanung_erfassen_gbnd = document.getElementById(
      "wizard_form:idEligiblePlanningAndSupervisionSection:idBegNwgBndReceiptForPurposeSection:idAddReceiptEntryButton"
    );
    let kostentbody;
    let massnahmeAnzeige;
    let massnahmeAuswahl;
    let rechnungsa;
    let rechnungsn;
    let rechnungsd;
    let rechnungsp;
    let rechnungsb;
    let weiter;

    for (item of rechnungen) {
      if (item[0] == "4") {
        // Knopf "Beleg-Eintrag hinzufügen" im Bereich Fachplanung und Baubegleitung drücken
        fachplanung_erfassen_gbnd.click();

        await delay(1000);

        //Knopf mit Stift drücken um Rechnungseingabe zu starten
        kostentbody = document.getElementsByTagName("tbody")[2];
        stift = kostentbody.lastChild.children[6].lastChild.children[0].click();

        massnahmeAnzeige =
          kostentbody.lastChild.children[0].children[0].children[1].children[0]
            .children[2];
        massnahmeAnzeige.click();

        let selectonemenu;
        for (let div of document.getElementsByClassName(
          "ui-selectonemenu-panel"
        )) {
          if (div.style.display === "block") {
            selectonemenu = div;
            break;
          }
        }
        massnahmeAuswahl =
          selectonemenu.children[0].children[0].children[item[0]];

        rechnungsa =
          kostentbody.lastChild.children[1].children[0].children[1].children[0];

        rechnungsn =
          kostentbody.lastChild.children[2].children[0].children[1].children[0];

        rechnungsd =
          kostentbody.lastChild.children[3].children[0].children[1].children[0]
            .children[0];

        rechnungsp =
          kostentbody.lastChild.children[4].children[0].children[1].children[0];

        rechnungsb =
          kostentbody.lastChild.children[5].children[0].children[1].children[0];

        weiter =
          kostentbody.lastChild.children[6].children[0].children[1].children[0];
      } else {
        // Knopf "Beleg-Eintrag hinzufügen" beim Effizienzgebäude drücken
        kosten_erfassen_gbnd.click();

        await delay(1000);

        //Knopf mit Stift drücken um Rechnungseingabe zu starten
        kostentbody = document.getElementsByTagName("tbody")[1];
        stift = kostentbody.lastChild.children[6].lastChild.children[0].click();

        massnahmeAnzeige =
          kostentbody.lastChild.children[0].children[0].children[1].children[0]
            .children[2];
        massnahmeAnzeige.click();

        let selectonemenu;
        for (let div of document.getElementsByClassName(
          "ui-selectonemenu-panel"
        )) {
          if (div.style.display === "block") {
            selectonemenu = div;
            break;
          }
        }
        massnahmeAuswahl =
          selectonemenu.children[0].children[0].children[item[0]];

        rechnungsa =
          kostentbody.lastChild.children[1].children[0].children[1].children[0];

        rechnungsn =
          kostentbody.lastChild.children[2].children[0].children[1].children[0];

        rechnungsd =
          kostentbody.lastChild.children[3].children[0].children[1].children[0]
            .children[0];

        rechnungsp =
          kostentbody.lastChild.children[4].children[0].children[1].children[0];

        rechnungsb =
          kostentbody.lastChild.children[5].children[0].children[1].children[0];

        weiter =
          kostentbody.lastChild.children[6].children[0].children[1].children[0];
      }

      // Knopf "förderfähige Maßnahme" setzen
      // item[0] kann folgendes annehmen:
      // 1 = Neubau, 2 = Sanierung, 3 = Einzelmaßnahme, 4 = Fachplanung+Baubegleitung, 5 = Nachhaltigkeitszertifizierung
      massnahmeAuswahl.click();
      // Knopf "Rechnungsaussteller" setzen
      rechnungsa.value = item[1];
      // Knopf "Rechnungsnummer" setzen
      rechnungsn.value = item[2];
      // Knopf "Rechnungsdatum" setzen
      rechnungsd.value = item[3];
      // Knopf "Förderfähige Rechnungsposition(en)" setzen
      rechnungsp.value = item[4];
      // Knopf "Förderfähiger Rechnungsbetrag in EUR" setzen
      rechnungsb.value = item[5].replace("€", "").trim();
      // Knopf "Weiter/Hacken" drücken
      weiter.click();
      await delay(100);
    }
  }

  function rechnungenFormatieren(data) {
    // Rechnungsinput aus Excel in das richtige Format bringen.

    // Inputbeispiel:
    // 1	Unternehmen 1	12345	01.01.2021	alle	65168
    // 2	Huber & Dieterle	RE2021-001	05.06.2023	alle	1234
    //

    // wird zu:

    // [[1, Unternehmen 1, 12345, 01.01.2021, alle, 65168],
    // [2, Huber & Dieterle, RE2021-001, 05.06.2023, alle, 1234]]

    let rechnungen = [];
    let tmp = data.split("\n");
    for (item of tmp) {
      rechnungen.push(item.split("\t"));
    }
    rechnungen.pop();
    return rechnungen;
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "bndToolStarten") {
      let rechnungen = rechnungenFormatieren(message.data);
      kostenseiteBestimmen(rechnungen);
    }
  });
})();
