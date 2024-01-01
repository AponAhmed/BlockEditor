import "./src/styles/component.css";
import './src/styles/area.css';
import './src/styles/context-menu.css';
import './src/styles/area-actionbar.css';
import "./src/styles/input-styles.css";
import "./src/styles/resize-pointer.css";
import "./src/styles/builder.css";


import Area from './src/js/Area.js';
import DOMBuilder from './src/js/DomBuilder.js';
import { Tooltip } from "./src/js/Tooltip.js";

class layoutBuilder {
    constructor(renderDom, dataDom) {
        this.renderDom = renderDom;
        this.dataDom = dataDom;
        this.builder = new DOMBuilder();
        this.areaDom;
        this.ui = null;
        this.buildUi();
        this.renderDom.appendChild(this.ui);
        this.components = [];

        this.buildExistion().then(() => {
            console.log("Loaded All Components");
        });
        //this.objerver(); //Change Tracker
    }

    buildUi() {
        this.ui = this.builder.create('div').class('ui-creator').element;
        this.areaDom = this.builder.create('div').class('custom-areas').element;
        this.ui.appendChild(this.areaDom);
        let newBtn = this.builder.create('button', `<svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"/></svg>`, true)
            .attr({ type: "button" })
            .class('new-area-btn')
            .event('click', () => {
                this.createNewArea();
            }).element;
        new Tooltip({ item: newBtn, position: 'bottom', text: "Create New Area" });

        this.ui.appendChild(newBtn);

        this.ui.appendChild(this.builder.create('button', "Check Data")
            .attr({ type: "button" })
            .class('data-generate-btn')
            .event('click', () => {
                this.updateData();
            }).element);
    }

    async buildExistion() {
        const data = JSON.parse(this.dataDom.value);
        data.forEach(e => {
            let area = new Area(e);
            area.parentArea = this;
            this.areaDom.appendChild(area.dom);
            this.components.push(area);
        });
    }

    createNewArea() {
        let area = new Area({ type: "Area", width: 100 });
        area.setParent(this);
        this.areaDom.appendChild(area.dom);
        this.components.push(area);
    }

    updateData() {
        console.log('Updating data');
        console.log('--------------------------------');
        let data = [];
        this.components.forEach(e => {
            data.push(e.getProps());
        });
        console.log(data);
        this.dataDom.value = JSON.stringify(data);
        //const myObject = JSON.parse(jsonString);
    }

    removeEmptyProperties(obj) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (obj[prop] === null || obj[prop] === undefined || obj[prop] === '') {
                    delete obj[prop];
                } else if (typeof obj[prop] === 'object') {
                    this.removeEmptyProperties(obj[prop]);
                    if (Object.keys(obj[prop]).length === 0 && obj[prop].constructor === Object) {
                        delete obj[prop];
                    }
                }
            }
        }
    }

    objerver() {
        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = (mutationsList, observer) => {
            // Handle changes here
            for (const mutation of mutationsList) {
                //console.log(mutationsList);
                if (mutation.type === 'attributes') {
                    this.updateData();
                } else if (mutation.type === 'childList') {
                    this.updateData();
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(this.ui, config);
    }

}

new layoutBuilder(document.getElementById("customAreaBuilder"), document.getElementById("layoutData"));

