import ColorPicker from "./ColorPicker.js";
import WPEditor from "./Components/WPEditor.js";
import ComponentLists from "./ComponentsRegistry.js";
import DOMBuilder from "./DomBuilder.js";
import Draggable from "./Draggable.js";
import { Tooltip } from "./Tooltip.js";

const ContextIcon = {
  newArea: `<svg viewBox="0 0 512 512"><rect x="128" y="128" width="336" height="336" rx="57" ry="57" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path d="M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24M296 216v160M376 296H216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>`,
  component: `<svg viewBox="0 0 512 512"><rect x="48" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><rect x="288" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><rect x="48" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><rect x="288" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>`,
  delete: `<svg viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>`,
  directionRow: `<svg class="direction-icon" width="152" height="117" viewBox="0 0 152 117" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5.5" y="5.5" width="141" height="106" rx="11.5" fill="#D9D9D9" stroke="black" stroke-width="11"/><line x1="50%" x2="50%" y2="110" stroke="black" stroke-width="11"/></svg>`,
  directionCol: `<svg class="direction-icon" width="152" height="117" viewBox="0 0 152 117" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5.5" y="5.5" width="141" height="106" rx="11.5" fill="#D9D9D9" stroke="black" stroke-width="11"/><line y1="50%" x2="147" y2="50%" stroke="black" stroke-width="11"/></svg>`,
  resize: `<svg  class="ionicon" viewBox="0 0 512 512"><path d="M144 48v272a48 48 0 0048 48h272" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M368 304V192a48 48 0 00-48-48H208M368 368v96M144 144H48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>`,
  properties: `<svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80"/><circle cx="336" cy="128" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="176" cy="256" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="336" cy="384" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>`,
};

export default class Area {
  constructor(props = {}) {
    this.props = props;
    this.components = [];
    this.type = "Area";
    this.direction = this.props.direction || "row"; // Default direction is row
    this.width = this.props.width || 50;
    this.dom = document.createElement("div");
    this.dom.classList.add("layout-area");
    this.dom.classList.add("layout-" + this.direction);
    this.LoaderAnimation();
    this.parentArea;
    this.customProps = this.props.more || { customClass: "" };
    this.styles = this.customProps.styles || {};
    this.setExStyles();
    this.contextMenuObject = {
      newArea: {
        label: "New Area",
        handler: this.createNewArea,
        icon: ContextIcon.newArea,
      },
      components: {
        label: "Insert Component",
        handler: false,
        submenu: ComponentLists,
        icon: ContextIcon.component,
      },
      deleteArea: {
        label: "Delete Area",
        handler: this.remove,
        icon: ContextIcon.delete,
      },
      derectionChanger: {
        label: `${this.direction == "row" ? "Column" : "Row"} Direction`,
        handler: this.changeDirection,
        icon:
          this.direction == "row"
            ? ContextIcon.directionCol
            : ContextIcon.directionRow,
      },
      resize: {
        label: `Resize`,
        handler: this.resizeTriger,
        icon: ContextIcon.resize,
      },
      properties: {
        label: `Properties`,
        handler: this.propertiesWindowinit,
        icon: ContextIcon.properties,
      },
    };

    this.resizeDimension();
    this.eventSet();
    //Child Elements
    this.setComponents(props).then(() => {
      this.LoaderAnimationDom.remove();
    });
    this.makeResizable();
    this.updateDimensions();
    this.newComponentBtn();
  }

  findClassByType(type) {
    const foundComponent = ComponentLists.find(
      (component) => component.type === type
    );
    return foundComponent ? foundComponent.cls : null;
  }

  LoaderAnimation() {
    this.LoaderAnimationDom = document.createElement("div");
    this.LoaderAnimationDom.classList.add("area-loader");
    this.LoaderAnimationDom.classList.add("area-loader-component");
    let innerDiv = document.createElement("div");
    this.LoaderAnimationDom.appendChild(innerDiv);
  }

  newComponentBtn() {
    let btnArea = document.createElement("div");
    btnArea.classList.add("new-component-area");
    let btn = document.createElement("span");
    btn.classList.add("btn-new-component");
    btn.innerHTML = `<svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"></path></svg>`;
    new Tooltip({ item: btn, position: "bottom", text: "Insert element" });
    btnArea.appendChild(btn);
    btn.addEventListener("click", () => {
      this.openComponentBrowser();
    });
    this.dom.appendChild(btnArea);
  }

  openComponentBrowser() {
    this.componentBrowser = document.createElement("div");
    this.componentBrowser.classList.add("component-browser");

    let compBrowserHead = document.createElement("div");
    compBrowserHead.classList.add("comp-browser-head");
    let label = document.createElement("label");
    label.textContent = "Components";
    compBrowserHead.appendChild(label);
    // Add close button
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      this.componentBrowser.remove();
    });

    compBrowserHead.appendChild(closeButton);
    this.componentBrowser.appendChild(compBrowserHead);
    // Add search input

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Filter";
    searchInput.classList.add("component-search-input");
    searchInput.addEventListener("input", () => {
      this.filterComponents(searchInput.value);
    });
    this.componentBrowser.appendChild(searchInput);

    // Container for component items with max height and overflow-y scroll
    const componentContainer = document.createElement("div");
    componentContainer.classList.add("component-container");
    this.componentBrowser.appendChild(componentContainer);

    ComponentLists.forEach((com) => {
      const comElement = document.createElement("div");
      comElement.classList.add("component-item");
      const lbl = document.createElement("label");
      lbl.textContent = com.label;
      comElement.innerHTML = com.hasOwnProperty("icon") ? com.icon : "";
      comElement.appendChild(lbl);
      comElement.addEventListener("click", () => {
        this.componentBrowser.remove();
        this.insertComponent(com.cls);
        this.removeContextMenu();
      });
      componentContainer.appendChild(comElement);
    });

    this.dom.appendChild(this.componentBrowser);
  }

  filterComponents(searchTerm) {
    const components =
      this.componentBrowser.querySelectorAll(".component-item");
    components.forEach((com) => {
      const label = com.querySelector("label").textContent.toLowerCase();
      if (label.includes(searchTerm.toLowerCase())) {
        com.style.display = "flex";
      } else {
        com.style.display = "none";
      }
    });
  }

  setParent(parent) {
    this.parentArea = parent;
  }

  showContextMenu(x, y) {
    const contextMenu = document.createElement("div");
    contextMenu.classList.add("context-menu");
    contextMenu.style.position = "fixed";
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;

    // Populate the context menu items using this.contextMenuObject
    Object.keys(this.contextMenuObject).forEach((key) => {
      const menuItem = this.contextMenuObject[key];
      const menuItemElement = document.createElement("div");
      menuItemElement.classList.add("context-menu-item");
      menuItemElement.innerHTML = menuItem.hasOwnProperty("icon")
        ? menuItem.icon
        : "";
      const lbl = document.createElement("label");
      lbl.textContent = menuItem.label;
      menuItemElement.appendChild(lbl);
      if (menuItem.submenu) {
        const subMenu = document.createElement("div");
        subMenu.classList.add("sub-menu");
        menuItem.submenu.forEach((subMenuItem) => {
          const subMenuItemElement = document.createElement("div");
          subMenuItemElement.classList.add("sub-context-menu");
          const lbl = document.createElement("label");
          lbl.textContent = subMenuItem.label;
          subMenuItemElement.innerHTML = subMenuItem.hasOwnProperty("icon")
            ? subMenuItem.icon
            : "";
          subMenuItemElement.appendChild(lbl);
          subMenuItemElement.addEventListener("click", () => {
            this.insertComponent(subMenuItem.cls);
            this.removeContextMenu();
          });
          subMenu.appendChild(subMenuItemElement);
        });
        menuItemElement.appendChild(subMenu);
      } else {
        // If it doesn't have a submenu
        // menuItemElement.textContent = menuItem.label;
        menuItemElement.addEventListener("click", () => {
          menuItem.handler.call();
          this.removeContextMenu();
        });
      }

      contextMenu.appendChild(menuItemElement);
    });
    // Append the context menu to the body
    document.body.appendChild(contextMenu);
    // Close the context menu if clicking outside of it
    document.addEventListener("click", (closeEvent) => {
      if (!contextMenu.contains(closeEvent.target)) {
        this.removeContextMenu();
      }
    });
  }

  getProps() {
    //data model For Database
    this.props.direction = this.direction;
    this.props.type = "Area";
    let childs = [];
    if (this.components.length > 0) {
      this.components.forEach((c) => {
        childs.push(c.getProps());
      });
    }
    this.props.childs = childs;
    this.props.more = this.customProps;
    this.props.more.styles = this.styles;
    return this.props;
  }

  updateDimensions() {
    this.width = Math.round(this.width);
    this.dom.style.width = this.width + "%";
    this.props.width = this.width;
    this.resizeDimensions.innerHTML = this.width + "%";
  }

  resizeDimension() {
    this.resizeDimensions = document.createElement("div");
    this.resizeDimensions.classList.add("resize-dimensions");
  }

  makeResizable() {
    const resizePoints = document.createElement("div");
    resizePoints.classList.add("div-resize-points");
    for (let i = 0; i < 2; i++) {
      const point = document.createElement("div");
      point.addEventListener("mousedown", (event) => this.initResize(event, i));
      point.classList.add("resize-point");
      resizePoints.appendChild(point);
    }
    resizePoints.appendChild(this.resizeDimensions);
    this.dom.appendChild(resizePoints);
    //end Resize pointers
    this.dom.addEventListener("click", (event) => {
      event.stopPropagation();
      this.dom.classList.add("area-selected");
      // Listen for the delete key press
      document.addEventListener("keydown", (event) => {
        if (
          event.key === "Delete" &&
          this.dom.classList.contains("area-selected")
        ) {
          //this.remove();
        }
      });
    });

    document.addEventListener("click", (event) => {
      event.stopPropagation();
      if (this.dom != event.target) {
        const classesToRemove = ["area-selected", "resize-max", "resize-min"];
        if (this.dom !== event.target) {
          classesToRemove.forEach((className) => {
            if (this.dom.classList.contains(className)) {
              this.dom.classList.remove(className);
            }
          });
        }
        // if (!this.dom.classList.contains("area-selected") && this.dom.classList.contains("resize")) {
        //     this.dom.classList.remove("resize");
        // }
      }
    });
  }

  initResize(e, index) {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = this.width;
    const startHeight = this.height;
    const handleResize = (event) => {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      const ratio = startWidth / startHeight;
      switch (index) {
        case 0: // Right middle
          this.width = startWidth - dx / 8;
          if (this.width <= 10) {
            this.dom.classList.add("resize-min");
            this.width = 10;
          }
          if (this.width >= 100) {
            this.dom.classList.add("resize-max");
            this.width = 100;
          }
          break;
        case 1: // Left middle
          this.width = startWidth + dx / 8;
          if (this.width <= 10) {
            this.dom.classList.add("resize-min");
            this.width = 10;
          }
          if (this.width >= 100) {
            this.dom.classList.add("resize-max");
            this.width = 100;
          }
          break;
      }
      this.updateDimensions();
    };
    const stopResize = () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", stopResize);
    };
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResize);
  }

  async setComponents(props) {
    this.dom.appendChild(this.LoaderAnimationDom);
    //await new Promise(resolve => setTimeout(resolve, 50));

    if (props.hasOwnProperty("childs") && props.childs.length > 0) {
      props.childs.forEach((c) => {
        if (c.type == "Area") {
          this.createNewArea(c);
        } else if (c.type == "Editor") {
          let comObj = new WPEditor(this, c);
          this.dom.appendChild(comObj.dom);
          this.components.push(comObj);
          comObj.initializeWPEditor();
        } else {
          let componentClass = this.findClassByType(c.type);
          let comObj = new componentClass(this, c);
          this.dom.appendChild(comObj.dom);
          this.components.push(comObj);
        }
      });
    } else {
      this.dom.classList.add("no-components");
    }
  }

  eventSet() {
    // Add a contextmenu event listener to the area's DOM element
    this.dom.addEventListener("contextmenu", (event) => {
      this.removeContextMenu();
      event.preventDefault(); // Prevent the default context menu
      event.stopPropagation(); // Stop the
      this.showContextMenu(event.clientX, event.clientY); // Display the custom context menu
    });
    this.dom.addEventListener("click", () => {
      this.removeContextMenu(); // Hide the context menu on a regular click
    });

    //All Event will be here
    // Add mouseover and mouseout event listeners to show/hide the action bar
    //this.dom.addEventListener('mouseover', (event) => this.showActionBar(event));
    //this.dom.addEventListener('mouseout', (event) => this.hideActionBar(event));
  }

  showActionBar(event) {
    event.stopPropagation(); // Stop the
    // Disable the action bars of parent areas
    // if (this.parentArea) {
    //     this.parentArea.hideActionBar();
    // }
    // Create and append the action bar
    this.actionBar = document.createElement("div");
    this.actionBar.classList.add("action-bar");

    // Add icons or buttons to the action bar
    const icon1 = document.createElement("span");
    icon1.classList.add("action-icon");
    icon1.innerHTML =
      '<svg class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"/></svg>';

    const icon3 = document.createElement("span");
    icon3.classList.add("action-icon");
    if (this.direction == "column") {
      icon3.innerHTML = ContextIcon.directionRow;
    } else {
      icon3.innerHTML = ContextIcon.directionCol;
    }

    const icon2 = document.createElement("span");
    icon2.classList.add("action-icon");
    icon2.innerHTML =
      '<svg class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>';

    // Add click event listeners to the icons or buttons
    icon1.addEventListener("click", () => this.createNewArea());
    icon2.addEventListener("click", () => this.remove());
    icon3.addEventListener("click", () => this.changeDirection());

    this.actionBar.appendChild(icon1);
    this.actionBar.appendChild(icon3);
    this.actionBar.appendChild(icon2);

    this.dom.appendChild(this.actionBar);
  }

  hideActionBar(event) {
    event.stopPropagation(); // Stop the
    if (this.actionBar) {
      this.actionBar.remove();
    }
  }

  changeDirection = () => {
    // Logic to toggle direction and update class
    this.direction = this.direction === "row" ? "column" : "row";
    this.dom.classList.toggle(`layout-column`);
    this.contextMenuObject.derectionChanger.label =
      this.direction === "row" ? "Column Direction" : "Row Direction";
    this.contextMenuObject.derectionChanger.icon =
      this.direction == "row"
        ? ContextIcon.directionCol
        : ContextIcon.directionRow;
    this.updateData();
  };

  remove = () => {
    try {
      // Logic to remove the area from the DOM
      if (this.parentArea) {
        this.parentArea.components = this.parentArea.components.filter(
          (component) => component !== this
        );
      }
      this.dom.remove();
      this.updateData();
    } catch (error) {
      console.log(error.message);
    }
  };

  resizeTriger = () => {
    this.dom.classList.toggle("resize");
    if (this.dom.classList.contains("resize")) {
      this.contextMenuObject.resize.label = "Close Resize";
    } else {
      this.contextMenuObject.resize.label = "Resize Area";
      this.updateData();
    }
  };

  insertComponent(componentClass) {
    try {
      let comObj = new componentClass(this);
      this.components.push(comObj);
      if (comObj.type == "Editor") {
        this.dom.appendChild(comObj.dom);
        comObj.initializeWPEditor();
      } else {
        this.dom.appendChild(comObj.dom);
      }

      if (this.dom.classList.contains("no-components")) {
        this.dom.classList.remove("no-components");
      }
    } finally {
      this.updateData();
    }
  }

  updateData() {
    if (this.parentArea) {
      this.parentArea.updateData();
    }
  }

  createNewArea = (object = {}) => {
    try {
      const newArea = new Area(object);
      newArea.setParent(this);
      this.components.push(newArea);
      this.dom.appendChild(newArea.dom);
      if (this.dom.classList.contains("no-components")) {
        this.dom.classList.remove("no-components");
      }
      this.updateData();
    } catch (error) {
      console.log(error);
    }
  };

  showPropertyWindow = () => {
    this.PropertyWindow.classList.toggle("open");
  };

  propertiesWindowinit = () => {
    let domBuilder = new DOMBuilder();
    this.PropertyWindow = domBuilder
      .create("div")
      .class("area-property-window").element;
    this.PropertyWindow.appendChild(
      domBuilder
        .create("div", "&times;", true)
        .event("click", () => {
          this.PropertyWindow.remove();
        })
        .class("property-window-close").element
    );
    let header = domBuilder
      .create("div", "Area Properties")
      .class("property-window-header").element;
    this.PropertyWindow.appendChild(header);
    //{ customClass: '', padding: 0, bg: false, border: false, borderRadius: 0 }
    new Draggable(this.PropertyWindow, header);
    let classProps = domBuilder
      .create("div")
      .class("property-container").element;
    classProps.appendChild(domBuilder.create("label", "Custom Class").element);
    classProps.appendChild(
      domBuilder
        .create("input")
        .event("keyup", (e) => {
          this.customProps.customClass = e.target.value;
          this.updateData();
        })
        .attr({ type: "text" })
        .value(this.customProps.customClass)
        .class("property-input").element
    );

    let paddindProps = domBuilder
      .create("div")
      .class("property-container").element;
    paddindProps.appendChild(domBuilder.create("label", "Padding").element);
    paddindProps.appendChild(
      domBuilder
        .create("input")
        .event("keyup", (e) => {
          this.styles.padding = e.target.value;
          this.dom.style.padding = e.target.value;
          this.updateData();
        })
        .attr({ type: "text" })
        .value(this.styles.hasOwnProperty("padding") ? this.styles.padding : "")
        .class("property-input").element
    );

    let marginProps = domBuilder
      .create("div")
      .class("property-container").element;
    marginProps.appendChild(domBuilder.create("label", "Margin").element);
    marginProps.appendChild(
      domBuilder
        .create("input")
        .event("keyup", (e) => {
          this.styles.margin = e.target.value;
          this.dom.style.margin = e.target.value;
          this.updateData();
        })
        .attr({ type: "text" })
        .value(this.styles.hasOwnProperty("margin") ? this.styles.margin : "")
        .class("property-input").element
    );

    let background = domBuilder
      .create("div")
      .class("property-container").element;
    background.appendChild(domBuilder.create("label", "Background").element);

    let colorPickerdom = domBuilder
      .create("div")
      .event("click", () => {
        new ColorPicker(this.dom, {
          okCallback: (c) => {
            this.styles.background = c;
            this.dom.style.background = c;
            colorPickerdom.style.background = c;
            this.updateData();
          },
        });
      })
      .class("color-picker-selector").element;
    colorPickerdom.style.background = this.styles.background;
    background.appendChild(colorPickerdom);
    // background.appendChild(domBuilder.create('input')
    //     .event('change', (e) => {
    //         this.styles.background = e.target.value;
    //         this.dom.style.background = e.target.value;
    //     }).attr({ type: "color" }).value(this.styles?.background).class('property-input').element);

    this.PropertyWindow.appendChild(classProps);
    this.PropertyWindow.appendChild(background);
    this.PropertyWindow.appendChild(paddindProps);
    this.PropertyWindow.appendChild(marginProps);

    this.dom.appendChild(this.PropertyWindow);
  };

  setExStyles() {
    if (this.styles) {
      for (const propertyName in this.styles) {
        if (this.styles.hasOwnProperty(propertyName)) {
          // Check if the property is a valid CSS property before applying
          // if (this.dom.style.hasOwnProperty(propertyName)) {
          this.dom.style[propertyName] = this.styles[propertyName];
          // } else {
          //     console.warn(`Invalid CSS property: ${propertyName}`);
          // }
        }
      }
    }
  }

  removeContextMenu() {
    const contextMenu = document.querySelector(".context-menu");
    if (contextMenu) {
      contextMenu.remove();
    }
  }
}
