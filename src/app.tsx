const MAIN_MENU_SELECTOR: string = "button.main-userWidget-boxCondensed";
const PRIVATE_SESSION_INDICATOR_SELECTOR: string = "button.main-noConnection-button";
const PRIVATE_SESSION_MENU_ITEM_SELECTOR: string = "ul.main-contextMenu-menu > li:nth-last-child(3) > button.main-contextMenu-menuItemButton";

(async () => {
    const init: (condition: () => boolean, callback: () => void) => void = (condition, callback) => condition() ? callback() : setTimeout(() => init(condition, callback), 250);
    init(() => Spicetify.Platform, () => {
        if (!(document.querySelector(PRIVATE_SESSION_INDICATOR_SELECTOR) as HTMLButtonElement)) {
            (document.querySelector(MAIN_MENU_SELECTOR) as HTMLButtonElement)?.click();
            (document.querySelector(PRIVATE_SESSION_MENU_ITEM_SELECTOR) as HTMLButtonElement)?.click();
        }
    });
})();