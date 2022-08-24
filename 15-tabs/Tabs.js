class Tabs {
  #rootEl;

  static CLASS_BTN = "tabs-btn";
  static CLASS_BTN_CURRENT = "tabs-btn-current";
  static CLASS_CONTENT = "tabs-content";
  static CLASS_SHOW = "show";
  static CLASS_ITEM = "tabs-item";

  constructor(rootEl) {
    this.#rootEl = rootEl;

    this.addStyles();
    this.addEvents();
  }

  addStyles() {
    for (const tabsEl of this.#rootEl.children) {
      tabsEl.classList.add(Tabs.CLASS_ITEM);
      const [buttonEl, contentEl] = tabsEl.children;

      buttonEl.classList.add(Tabs.CLASS_BTN);
      contentEl.classList.add(Tabs.CLASS_CONTENT);
    }
  }

  addEvents() {
    this.#rootEl.addEventListener("click", this.onRootElClick.bind(this));
  }

  onRootElClick(e) {
    const tabsEl = e.target;

    if (tabsEl.classList.contains(Tabs.CLASS_BTN)) {
      this.toggleContent(tabsEl);
      tabsEl.classList.add(Tabs.CLASS_BTN_CURRENT);
    }
  }

  toggleContent(tabsEl) {
    const shownContentEl = this.findshownContentEl();
    const currentContentEl = this.findCurrentContentEl(tabsEl);
    const currentButtons = this.findCurrentButtons();

    if (
      shownContentEl &&
      currentButtons &&
      shownContentEl !== currentContentEl
    ) {
      this.hideContent(shownContentEl, currentButtons);
    }

    currentContentEl.classList.toggle(Tabs.CLASS_SHOW);
  }

  findshownContentEl() {
    return this.#rootEl.querySelector(`.${Tabs.CLASS_SHOW}`);
  }

  findCurrentContentEl(tabsEl) {
    return tabsEl
      .closest(`.${Tabs.CLASS_ITEM}`)
      .querySelector(`.${Tabs.CLASS_CONTENT}`);
  }

  findCurrentButtons() {
    return this.#rootEl.querySelector(`.${Tabs.CLASS_BTN_CURRENT}`);
  }

  hideContent(contentEl, buttonEl) {
    contentEl.classList.remove(Tabs.CLASS_SHOW);
    buttonEl.classList.remove(Tabs.CLASS_BTN_CURRENT);
  }
}

export default Tabs;
