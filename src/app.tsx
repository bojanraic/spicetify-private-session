const PRIVATE_SESSION_INDICATOR_SELECTOR: string = "button.main-noConnection-button";
const MAIN_MENU_SELECTOR: string = "button.main-userWidget-boxCondensed";
const MAIN_MENU_ITEMS_SELECTOR: string = ".main-contextMenu-menuItem";
const MENU_ITEM_LABEL_SELECTOR: string = ".main-contextMenu-menuItemLabel";
const MENU_ITEM_BUTTON_SELECTOR: string = "button.main-contextMenu-menuItemButton";
const PRIVATE_SESSION_MENU_ITEM_TEXT: string = "Private session";

(async () => {
    const init: (condition: () => boolean, callback: () => void) => void = (condition, callback) => condition() ? callback() : setTimeout(() => init(condition, callback), 250);
    init(() => Spicetify.Platform, () => {
        if (!(document.querySelector(PRIVATE_SESSION_INDICATOR_SELECTOR) as HTMLButtonElement)) {
            const mainMenuBtn = (document.querySelector(MAIN_MENU_SELECTOR) as HTMLButtonElement);
            mainMenuBtn.click();
            const menuItems = Array.from(document.querySelectorAll(MAIN_MENU_ITEMS_SELECTOR));
            for (const item of menuItems) {
              const labelTxt = item.querySelector(MENU_ITEM_LABEL_SELECTOR)?.textContent;
              if (labelTxt === PRIVATE_SESSION_MENU_ITEM_TEXT) {
                const privateSessionMenuItem = item.querySelector(MENU_ITEM_BUTTON_SELECTOR) as HTMLButtonElement;
                privateSessionMenuItem.click();
                break;
              }
            }
        }
    });
})();