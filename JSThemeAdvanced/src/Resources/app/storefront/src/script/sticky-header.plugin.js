import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from "src/helper/dom-access.helper";
import ViewportDetection from 'src/helper/viewport-detection.helper'; 




export default class Stickyheader extends Plugin {
  static options = {
    cloneElClass: "js-header-main-sticky",
    showOnScrollPosition: 100,
  };

  init() {
    console.info("Plugin Sticky header Loaded");

    this.PluginManager = window.PluginManager;

    this.subscribeViewportEvents();
    if (this.pluginShouldBeActive()) {
      this.initializePlugin();
    }
  }

  subscribeViewportEvents() {
    document.$emitter.subscribe(
      "Viewport/hasChanged", 
      this.update, 
      {scope: this}
    );
  }

  update() {
    console.info('ViewPort Changed');
    if (this.pluginShouldBeActive()) {
      if (this.initialized) return;
      this.initializePlugin();
    } else {
      if (!this.initialized) return;
      this.destroy();
    }
  }

  initializePlugin() {
    this.createElement();
    this.addEventListeners();
    this.reinitializePlugin();
    this.initialized = true;
  }

  destroy() {
    this._navClone.remove();
    this.removeEventListeners();
    this.initialized = false;
  }

  pluginShouldBeActive() {
    if (["XS", "SM", "MD"].includes(ViewportDetection.getCurrentViewport())) {
      return false;
    }

    return true;
  }

  createElement() {
    this._navClone = this.el.cloneNode(true);
    this._navClone.classList.add(this.options.cloneElClass);
    DomAccess.querySelector(this._navClone, ".main-navigation").removeAttribute(
      "id"
    );
    document.body.appendChild(this._navClone);
  }

  addEventListeners() {
    document.addEventListener("scroll", this.onScroll.bind(this));
  }

  removeEventListeners() {
    document.removeEventListener("scroll", this.onScroll.bind(this));

  }

  onScroll() {
    const scrollPosition = document.documentElement.scrollTop;

    if (scrollPosition > this.options.showOnScrollPosition) {
      if (!this._navClone.classList.contains("is--active")) {
        this._navClone.classList.add("is--active");
      }
    } else {
      this._navClone.classList.remove("is--active");
    }
  }

  reinitializePlugin() {
    this.PluginManager.initializePlugin(
      "FlyoutMenu",
      '[data-flyout-menu="true"]'
    );
  }
}