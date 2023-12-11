import Column from "./Components/Column.js";
import Heading from "./Components/Heading.js";
import List from "./Components/List.js";
import Paragraph from "./Components/Paragraph.js";
import ComponentLists from "./ComponentsRegistry.js";


export default class Area {
    constructor(props = {}) {
        this.props = props;
        this.components = [];
        this.type = "Area";
        this.direction = this.props.direction || 'row'; // Default direction is row
        this.width = this.props.width || 50;
        this.dom = document.createElement('div');
        this.dom.classList.add('layout-area');
        this.dom.classList.add('layout-' + this.direction);
        this.parentArea;

        this.contextMenuObject = {
            newArea: { label: "New Area", handler: this.createNewArea },
            components: { label: "Insert Component", handler: false, submenu: ComponentLists },
            deleteArea: { label: "Delete Area", handler: this.remove },
            derectionChanger: { label: `${this.direction == "row" ? "Column" : "Row"} Direction`, handler: this.changeDirection },
            resize: { label: `Resize`, handler: this.resizeTriger },
        }

        this.resizeDimension();
        this.eventSet();
        //Child Elements
        this.setComponents(props);
        this.makeResizable();
        this.updateDimensions();
    }

    setParent(parent) {
        this.parentArea = parent;
    }

    showContextMenu(x, y) {
        const contextMenu = document.createElement('div');
        contextMenu.classList.add('context-menu');
        contextMenu.style.position = 'fixed';
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;

        // Populate the context menu items using this.contextMenuObject
        Object.keys(this.contextMenuObject).forEach((key) => {
            const menuItem = this.contextMenuObject[key];
            const menuItemElement = document.createElement('div');
            if (menuItem.submenu) {
                // If it has a submenu
                menuItemElement.textContent = menuItem.label;
                const subMenu = document.createElement('div');
                subMenu.classList.add('sub-menu');
                menuItem.submenu.forEach((subMenuItem) => {
                    const subMenuItemElement = document.createElement('div');
                    subMenuItemElement.classList.add('sub-context-menu');
                    const lbl = document.createElement('label');
                    lbl.textContent = subMenuItem.label;
                    subMenuItemElement.innerHTML = subMenuItem.hasOwnProperty('icon') ? subMenuItem.icon : '';
                    subMenuItemElement.appendChild(lbl);
                    subMenuItemElement.addEventListener('click', () => {
                        this.insertComponent(subMenuItem.cls);
                        this.removeContextMenu();
                    });
                    subMenu.appendChild(subMenuItemElement);
                });
                menuItemElement.appendChild(subMenu);
            } else {
                // If it doesn't have a submenu
                menuItemElement.textContent = menuItem.label;
                menuItemElement.addEventListener('click', () => {
                    menuItem.handler.call();
                    this.removeContextMenu();
                });
            }

            contextMenu.appendChild(menuItemElement);
        });
        // Append the context menu to the body
        document.body.appendChild(contextMenu);
        // Close the context menu if clicking outside of it
        document.addEventListener('click', (closeEvent) => {
            if (!contextMenu.contains(closeEvent.target)) {
                this.removeContextMenu();
            }
        });
    }

    getProps() { //data model For Database
        this.props.direction = this.direction;
        this.props.type = 'Area';
        let childs = [];
        if (this.components.length > 0) {
            this.components.forEach(c => {
                childs.push(c.getProps());
            });
        }
        this.props.childs = childs;
        return this.props;
    }

    updateDimensions() {
        this.width = Math.round(this.width);
        this.dom.style.width = this.width + "%";
        this.props.width = this.width;
        this.resizeDimensions.innerHTML = this.width + "%";

    }

    resizeDimension() {
        this.resizeDimensions = document.createElement('div');
        this.resizeDimensions.classList.add('resize-dimensions');
    }

    makeResizable() {
        const resizePoints = document.createElement('div');
        resizePoints.classList.add('div-resize-points');
        for (let i = 0; i < 2; i++) {
            const point = document.createElement('div');
            point.addEventListener('mousedown', (event) => this.initResize(event, i));
            point.classList.add('resize-point');
            resizePoints.appendChild(point);
        }
        resizePoints.appendChild(this.resizeDimensions);
        this.dom.appendChild(resizePoints);
        //end Resize pointers
        this.dom.addEventListener('click', (event) => {
            event.stopPropagation();
            this.dom.classList.add('area-selected');
            // Listen for the delete key press
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Delete' && this.dom.classList.contains('area-selected')) {
                    //this.remove();
                }
            });
        });

        document.addEventListener('click', (event) => {
            event.stopPropagation();
            if (this.dom != event.target) {
                const classesToRemove = ['area-selected', 'resize-max', 'resize-min'];
                if (this.dom !== event.target) {
                    classesToRemove.forEach(className => {
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
                    this.width = startWidth - (dx / 8);
                    if (this.width <= 10) {
                        this.dom.classList.add('resize-min');
                        this.width = 10;
                    }
                    if (this.width >= 100) {
                        this.dom.classList.add('resize-max');
                        this.width = 100;
                    }
                    break;
                case 1: // Left middle
                    this.width = startWidth + (dx / 8);
                    if (this.width <= 10) {
                        this.dom.classList.add('resize-min');
                        this.width = 10;
                    }
                    if (this.width >= 100) {
                        this.dom.classList.add('resize-max');
                        this.width = 100;
                    }
                    break;
            }
            this.updateDimensions();
        };
        const stopResize = () => {
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', stopResize);
        };
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
    }

    setComponents(props) {
        if (props.hasOwnProperty('childs') && props.childs.length > 0) {
            props.childs.forEach(c => {
                if (c.type == "Area") {
                    this.createNewArea(c);
                } else if (c.type == "H") {
                    //For Other Components
                    let comObj = new Heading(this, c);
                    this.components.push(comObj);
                    this.dom.appendChild(comObj.dom);
                } else if (c.type == "P") {
                    let comObj = new Paragraph(this, c);
                    this.components.push(comObj);
                    this.dom.appendChild(comObj.dom);
                }
                else if (c.type == "List") {
                    let comObj = new List(this, c);
                    this.components.push(comObj);
                    this.dom.appendChild(comObj.dom);
                }
                else if (c.type == "Column") {
                    let comObj = new Column(this, c);
                    this.components.push(comObj);
                    this.dom.appendChild(comObj.dom);
                } else if (c.type == "Image") {

                }

                // let comObj = new componentClass(this);
                // this.components.push(comObj);
                // if (comObj.type == "Editor") {
                //     this.dom.appendChild(comObj.dom);
                //     comObj.initializeWPEditor();
                // } else {
                //     this.dom.appendChild(comObj.dom);
                // }
            });
        }
    }

    eventSet() {
        // Add a contextmenu event listener to the area's DOM element
        this.dom.addEventListener('contextmenu', (event) => {
            this.removeContextMenu();
            event.preventDefault(); // Prevent the default context menu
            event.stopPropagation(); // Stop the 
            this.showContextMenu(event.clientX, event.clientY); // Display the custom context menu
        });
        this.dom.addEventListener('click', () => {
            this.removeContextMenu(); // Hide the context menu on a regular click
        });

        //All Event will be here 
        // Add mouseover and mouseout event listeners to show/hide the action bar
        this.dom.addEventListener('mouseover', (event) => this.showActionBar(event));
        this.dom.addEventListener('mouseout', (event) => this.hideActionBar(event));
    }

    showActionBar(event) {
        event.stopPropagation(); // Stop the 
        // Disable the action bars of parent areas
        // if (this.parentArea) {
        //     this.parentArea.hideActionBar();
        // }
        // Create and append the action bar
        this.actionBar = document.createElement('div');
        this.actionBar.classList.add('action-bar');

        // Add icons or buttons to the action bar
        const icon1 = document.createElement('span');
        icon1.classList.add('action-icon');
        icon1.innerHTML = '<svg class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"/></svg>';

        const icon3 = document.createElement('span');
        icon3.classList.add('action-icon');
        if (this.direction == 'column') {
            icon3.innerHTML = '<svg width="152" height="117" viewBox="0 0 152 117" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5.5" y="5.5" width="141" height="106" rx="11.5" fill="#D9D9D9" stroke="black" stroke-width="11"/><line x1="50%" x2="50%" y2="110" stroke="black" stroke-width="11"/></svg>';
        } else {
            icon3.innerHTML = '<svg width="152" height="117" viewBox="0 0 152 117" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5.5" y="5.5" width="141" height="106" rx="11.5" fill="#D9D9D9" stroke="black" stroke-width="11"/><line y1="50%" x2="147" y2="50%" stroke="black" stroke-width="11"/></svg>';
        }


        const icon2 = document.createElement('span');
        icon2.classList.add('action-icon');
        icon2.innerHTML = '<svg class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>';

        // Add click event listeners to the icons or buttons
        icon1.addEventListener('click', () => this.createNewArea());
        icon2.addEventListener('click', () => this.remove());
        icon3.addEventListener('click', () => this.changeDirection());

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
        this.direction = this.direction === 'row' ? 'column' : 'row';
        this.dom.classList.toggle(`layout-column`);
        this.contextMenuObject.derectionChanger.label = this.direction === 'row' ? "Column Direction" : "Row Direction";
    }

    remove = () => {
        // Logic to remove the area from the DOM
        if (this.parentArea) {
            this.parentArea.components = this.parentArea.components.filter(component => component !== this);
        }
        this.dom.remove();
    }

    resizeTriger = () => {
        this.dom.classList.toggle('resize');
        if (this.dom.classList.contains('resize')) {
            this.contextMenuObject.resize.label = "Close Resize";
        } else {
            this.contextMenuObject.resize.label = "Resize Area";
        }
    }

    insertComponent(componentClass) {
        let comObj = new componentClass(this);
        this.components.push(comObj);
        if (comObj.type == "Editor") {
            this.dom.appendChild(comObj.dom);
            comObj.initializeWPEditor();
        } else {
            this.dom.appendChild(comObj.dom);
        }
    }

    createNewArea = (object = {}) => {
        const newArea = new Area(object);
        newArea.setParent(this);
        this.components.push(newArea);
        this.dom.appendChild(newArea.dom);
    }

    removeContextMenu() {
        const contextMenu = document.querySelector('.context-menu');
        if (contextMenu) {
            contextMenu.remove();
        }
    }

}