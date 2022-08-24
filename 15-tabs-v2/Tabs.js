class Tabs {
  #rootEl;
  #buttonElements;
  #contentElements;
  #activeTabIndex = 0;

  static CLASS_BTN = "tabs-btn";
  static CLASS_BTN_CURRENT = "tabs-btn-current";
  static CLASS_CONTENT = "tabs-content";
  static CLASS_SHOW = "show";

  constructor(rootEl, defaultTabIndex) {
    this.#rootEl = rootEl;
    const [buttonEl, contentEl] = this.#rootEl.children;

    // Вместо HTML коллекции - массив
    this.#buttonElements = Array.from(buttonEl.children);
    this.#contentElements = Array.from(contentEl.children);

    if (defaultTabIndex) {
      this.#activeTabIndex = defaultTabIndex;
    }

    this.addStyles();
    this.addEvents();
    this.showActiveTabByIndex(this.#activeTabIndex);
  }

  addStyles() {
    this.#buttonElements.forEach((button) => {
      button.classList.add(Tabs.CLASS_BTN);
    });
    this.#contentElements.forEach((content) => {
      content.classList.add(Tabs.CLASS_CONTENT);
    });

    // HTML-collection
    // for (const button of this.#buttonElements) {
    //   button.classList.add(Tabs.CLASS_BTN);
    // }
  }

  addEvents() {
    const [buttonEl] = this.#rootEl.children;

    buttonEl.addEventListener("click", this.onButtonElClick.bind(this));
  }

  onButtonElClick(e) {
    const tabsEl = e.target;

    if (tabsEl.classList.contains(Tabs.CLASS_BTN)) {
      const newActiveTabIndex = this.getNavItemElIndex(tabsEl);

      this.hideActiveTab(this.#activeTabIndex);
      this.showActiveTabByIndex(newActiveTabIndex);
    }
  }

  getNavItemElIndex(currentButtonEl) {
    // this.#navElements.indexOf(navEl);

    for (let i = 0; i < this.#buttonElements.length; i++) {
      const buttonEl = this.#buttonElements[i];

      if (buttonEl === currentButtonEl) {
        return i;
      }
    }
  }

  showActiveTabByIndex(index) {
    const navElement = this.#buttonElements[index];
    const contentElement = this.#contentElements[index];

    navElement.classList.add(Tabs.CLASS_BTN_CURRENT);
    contentElement.classList.add(Tabs.CLASS_SHOW);

    this.#activeTabIndex = index;
  }

  hideActiveTab(index) {
    // const navElement = this.#rootEl.querySelector('.' + Tabs.NAV_ITEM_ACTIVE_CLASS);
    // const contentElement = this.#rootEl.querySelector('.' + Tabs.CONTENT_ITEM_ACTIVE_CLASS);

    const navElement = this.#buttonElements[index];
    const contentElement = this.#contentElements[index];

    if (navElement && contentElement) {
      navElement.classList.remove(Tabs.CLASS_BTN_CURRENT);
      contentElement.classList.remove(Tabs.CLASS_SHOW);
    }
  }
}

export default Tabs;
