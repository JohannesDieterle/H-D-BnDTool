// Credit to "choose_beast.js" from https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {
    /**
     * send a "bndToolStarten" message to the content script
     */
    function bndToolStarten(tabs) {
      const rechnungen = document.getElementById("input");
      browser.tabs.sendMessage(tabs[0].id, {
        command: "bndToolStarten",
        data: rechnungen.value,
      });
    }

    /**
     * Get the active tab,
     * then call "bndToolStarten()"
     */
    if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
      // Ignore when click is not on a button within <div id="popup-content">.
      return;
    }

    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(bndToolStarten);
  });
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 */
browser.tabs
  .executeScript({ file: "/content_scripts/main.js" })
  .then(listenForClicks);
