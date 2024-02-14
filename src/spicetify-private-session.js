// CSS Selectors
const SELECTORS = {
  PRIVATE_SESSION_INDICATOR: "button.main-noConnection-button",
  MAIN_MENU: "div.main-topBar-topbarContentRight > button.main-userWidget-boxCondensed ",
  MENU_ITEM_LABEL: "span",
  MENU_ITEM_BUTTON: "div.main-userWidget-dropDownMenu > ul > li > button"
};

// Maximum retry count for HTML element-based functions 
const RETRY_LIMIT = 5;

// Waiting time in milliseconds between retries
const WAIT_MS = 300;

// Retry function
const retry = (action, retryLimit, onError) => {
  const tryAction = (retryCount) => {
    if (retryCount >= retryLimit) {
      onError(`Retry limit (${retryLimit}) exceeded.`);
      return;
    }
    action(retryCount);
  };
  setTimeout(() => tryAction(0), WAIT_MS);
};

// Function to open menu and start private session
const openMenuAndStartPrivate = (count) => {
  if (count > RETRY_LIMIT) {
    console.error(`Failed to open menu and start private session after ${RETRY_LIMIT} attempts.`);
    return;
  }

  const mainMenuBtn = document.querySelector(SELECTORS.MAIN_MENU);
  if (mainMenuBtn !== null) {
    mainMenuBtn.click();
    startPrivate(0);
  } else {
    setTimeout(() => openMenuAndStartPrivate(count + 1), WAIT_MS);
  }
};

// Function to start private session
const startPrivate = (count) => {
  if (count > RETRY_LIMIT) {
    console.error(`Failed to start private session after ${RETRY_LIMIT} attempts.`);
    return;
  }

  const elements = document.querySelectorAll(SELECTORS.MENU_ITEM_BUTTON);
  const menuButtons = Array.from(elements);

  if (menuButtons.length > 0) {
    for (const btn of menuButtons) {
      const mb = btn;
      const labelTxt = mb.querySelector(SELECTORS.MENU_ITEM_LABEL)?.textContent;

      if (labelTxt === "Private session") {
        mb.click();
        return;
      }
    }
  }

  // Retry if menu items not found
  setTimeout(() => startPrivate(count + 1), WAIT_MS);
};

// Initialization function
const init = (condition, callback) => {
  if (condition()) {
    callback();
  } else {
    setTimeout(() => init(condition, callback), WAIT_MS);
  }
};

// Main function
init(() => Spicetify.Platform, () => {
  const privateSessionIndicator = document.querySelector(SELECTORS.PRIVATE_SESSION_INDICATOR);
  if (!privateSessionIndicator) {
    openMenuAndStartPrivate(0);
  } else {
    console.log(`Already in Private Session`);
  }
});
