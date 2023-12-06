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
const init = (condition: { (): any; (): any; }, callback: { (): void; (): void; }) => {
    if (condition()) {
        callback();
    } else {
        setTimeout(() => init(condition, callback), 150);
    }
};

// starts private session from main menu 
const startPrivateSession = () => {
    const elements = document.querySelectorAll(SELECTORS.MENU_ITEM_BUTTON);
    const menuButtons = Array.from(elements);

    if (menuButtons.length > 0) {
        for (const btn of menuButtons) {
            const mb = btn as HTMLButtonElement;
            const labelTxt = mb.querySelector(SELECTORS.MENU_ITEM_LABEL)?.textContent;

            if (labelTxt === LABELS.PRIVATE_SESSION_MENU_ITEM) {
                mb.click();
                break;
            }
        }
    } else {
        setTimeout(startPrivateSession, 50);
    }
};

// Main function
(async () => {
    init(() => Spicetify.Platform, () => {
        if (!(document.querySelector(SELECTORS.PRIVATE_SESSION_INDICATOR) as HTMLButtonElement)) {
            const mainMenuBtn = (document.querySelector(SELECTORS.MAIN_MENU) as HTMLButtonElement);
            mainMenuBtn.click();
            startPrivateSession();
        }
    });
})();
