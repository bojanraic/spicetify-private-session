// Selectors
const SELECTORS = {
  PRIVATE_SESSION_INDICATOR: "button.main-noConnection-button",
  MAIN_MENU: "button.main-userWidget-boxCondensed",
  MENU_ITEM_LABEL: "span.main-contextMenu-menuItemLabel",
  MENU_ITEM_BUTTON: "ul.main-contextMenu-menu > li > button",
};

// Labels
const LABELS = {
  PRIVATE_SESSION_MENU_ITEM: "Private session",
};

// Initialization function
const init = (condition, callback) => {
  if (condition()) {
    callback();
  } else {
    setTimeout(() => init(condition, callback), 200);
  }
};

// Starts private session from the main menu
const startPrivateSession = () => {
  const elements = document.querySelectorAll(SELECTORS.MENU_ITEM_BUTTON);
  const menuButtons = Array.from(elements);

  if (menuButtons.length > 0) {
    for (const btn of menuButtons) {
      const mb = btn;
      const labelTxt = mb.querySelector(SELECTORS.MENU_ITEM_LABEL)?.textContent;

      if (labelTxt === LABELS.PRIVATE_SESSION_MENU_ITEM) {
        mb.click();
        break;
      }
    }
  } else {
    setTimeout(startPrivateSession, 100);
  }
};

// Main function
(async () => {
  init(() => Spicetify.Platform, () => {
    const privateSessionIndicator = document.querySelector(SELECTORS.PRIVATE_SESSION_INDICATOR);

    if (!privateSessionIndicator) {
      const mainMenuBtn = document.querySelector(SELECTORS.MAIN_MENU);
      mainMenuBtn.click();
      startPrivateSession();
    }
  });
})();
