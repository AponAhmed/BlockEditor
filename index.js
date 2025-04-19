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

const icons = {
    add: `<svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"/></svg>`,
    template: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M25.75 4.08333H6.25C5.05338 4.08333 4.08333 5.05338 4.08333 6.25V25.75C4.08333 26.9466 5.05338 27.9167 6.25 27.9167H25.75C26.9466 27.9167 27.9167 26.9466 27.9167 25.75V6.25C27.9167 5.05338 26.9466 4.08333 25.75 4.08333ZM6.25 3C4.45507 3 3 4.45507 3 6.25V25.75C3 27.5449 4.45507 29 6.25 29H25.75C27.5449 29 29 27.5449 29 25.75V6.25C29 4.45507 27.5449 3 25.75 3H6.25Z" fill="#808080"/><path d="M17 8C17 7.44772 17.4477 7 18 7H24C24.5523 7 25 7.44772 25 8V15C25 15.5523 24.5523 16 24 16H18C17.4477 16 17 15.5523 17 15V8Z" fill="#434343"/><path d="M7 13C7 12.4477 7.44772 12 8 12H14C14.5523 12 15 12.4477 15 13V15C15 15.5523 14.5523 16 14 16H8C7.44772 16 7 15.5523 7 15V13Z" fill="#555555"/><path d="M7 8C7 7.44772 7.44772 7 8 7H9C9.55228 7 10 7.44772 10 8V9C10 9.55228 9.55228 10 9 10H8C7.44772 10 7 9.55228 7 9V8Z" fill="#727272"/><path d="M12 8C12 7.44772 12.4477 7 13 7H14C14.5523 7 15 7.44772 15 8V9C15 9.55228 14.5523 10 14 10H13C12.4477 10 12 9.55228 12 9V8Z" fill="#727272"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 19.5C22 19.7761 21.7761 20 21.5 20H7.5C7.22386 20 7 19.7761 7 19.5V19.5C7 19.2239 7.22386 19 7.5 19H21.5C21.7761 19 22 19.2239 22 19.5V19.5Z" fill="black" fill-opacity="0.6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M25 21.5C25 21.7761 24.7761 22 24.5 22H7.5C7.22386 22 7 21.7761 7 21.5V21.5C7 21.2239 7.22386 21 7.5 21H24.5C24.7761 21 25 21.2239 25 21.5V21.5Z" fill="#555555"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18 23.5C18 23.7761 17.7761 24 17.5 24H7.5C7.22386 24 7 23.7761 7 23.5V23.5C7 23.2239 7.22386 23 7.5 23H17.5C17.7761 23 18 23.2239 18 23.5V23.5Z" fill="#555555"/></svg>`
};

const templates = [
    {
        icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="25" height="25" rx="0.5" fill="white" stroke="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19 17.5C19 17.7761 18.7761 18 18.5 18H3.5C3.22386 18 3 17.7761 3 17.5V17.5C3 17.2239 3.22386 17 3.5 17H18.5C18.7761 17 19 17.2239 19 17.5V17.5Z" fill="black" fill-opacity="0.6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 19.5C22 19.7761 21.7761 20 21.5 20H3.5C3.22386 20 3 19.7761 3 19.5V19.5C3 19.2239 3.22386 19 3.5 19H21.5C21.7761 19 22 19.2239 22 19.5V19.5Z" fill="#555555"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15 21.5C15 21.7761 14.7761 22 14.5 22H3.5C3.22386 22 3 21.7761 3 21.5V21.5C3 21.2239 3.22386 21 3.5 21H14.5C14.7761 21 15 21.2239 15 21.5V21.5Z" fill="#555555"/><rect x="14" y="3" width="9" height="11" fill="#D3D3D3"/><rect x="3" y="3" width="8" height="2" rx="1" fill="#626262"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.5C12 7.77614 11.7761 8 11.5 8H3.5C3.22386 8 3 7.77614 3 7.5V7.5C3 7.22386 3.22386 7 3.5 7H11.5C11.7761 7 12 7.22386 12 7.5V7.5Z" fill="#BBBBBB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11 9.5C11 9.77614 10.7761 10 10.5 10H3.5C3.22386 10 3 9.77614 3 9.5V9.5C3 9.22386 3.22386 9 3.5 9H10.5C10.7761 9 11 9.22386 11 9.5V9.5Z" fill="#BBBBBB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 11.5C12 11.7761 11.7761 12 11.5 12H3.5C3.22386 12 3 11.7761 3 11.5V11.5C3 11.2239 3.22386 11 3.5 11H11.5C11.7761 11 12 11.2239 12 11.5V11.5Z" fill="#BBBBBB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 13.5C10 13.7761 9.77614 14 9.5 14H3.5C3.22386 14 3 13.7761 3 13.5V13.5C3 13.2239 3.22386 13 3.5 13H9.5C9.77614 13 10 13.2239 10 13.5V13.5Z" fill="#BBBBBB"/></svg>`,
        json: `[{"type":"Area","width":100,"direction":"row","childs":[{"width":50,"direction":"column","type":"Area","childs":[{"type":"H","align":"left","more":{"customClass":""},"content":"Write Here your Heading"},{"type":"P","align":"left","more":{"customClass":""},"content":"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. "}],"more":{"customClass":"","styles":{}}},{"width":50,"direction":"row","type":"Area","childs":[],"more":{"customClass":"","styles":{}}}],"more":{"customClass":"","styles":{}}},{"type":"Area","width":100,"direction":"row","childs":[{"type":"P","align":"left","more":{"customClass":""},"content":"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. "}],"more":{"customClass":"","styles":{}}}]`
    },
    {
        icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1C0 0.447716 0.447715 0 1 0H25C25.5523 0 26 0.447715 26 1V25C26 25.5523 25.5523 26 25 26H1C0.447716 26 0 25.5523 0 25V1Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11 2.5C11 2.77614 10.8881 3 10.75 3H3.25C3.11193 3 3 2.77614 3 2.5V2.5C3 2.22386 3.11193 2 3.25 2H10.75C10.8881 2 11 2.22386 11 2.5V2.5Z" fill="black" fill-opacity="0.6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 4.5C10 4.77614 9.91753 5 9.81579 5H3.18421C3.08247 5 3 4.77614 3 4.5V4.5C3 4.22386 3.08247 4 3.18421 4H9.81579C9.91753 4 10 4.22386 10 4.5V4.5Z" fill="#C0C0C0"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.5C12 6.77614 11.894 7 11.7632 7H3.23684C3.10604 7 3 6.77614 3 6.5V6.5C3 6.22386 3.10604 6 3.23684 6H11.7632C11.894 6 12 6.22386 12 6.5V6.5Z" fill="#C0C0C0"/><path d="M14 2H23V8H14V2Z" fill="#D3D3D3"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 10.5C22 10.7761 21.8881 11 21.75 11H14.25C14.1119 11 14 10.7761 14 10.5V10.5C14 10.2239 14.1119 10 14.25 10H21.75C21.8881 10 22 10.2239 22 10.5V10.5Z" fill="black" fill-opacity="0.6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 12.5C21 12.7761 20.9175 13 20.8158 13H14.1842C14.0825 13 14 12.7761 14 12.5V12.5C14 12.2239 14.0825 12 14.1842 12H20.8158C20.9175 12 21 12.2239 21 12.5V12.5Z" fill="#C0C0C0"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23 14.5C23 14.7761 22.894 15 22.7632 15H14.2368C14.106 15 14 14.7761 14 14.5V14.5C14 14.2239 14.106 14 14.2368 14H22.7632C22.894 14 23 14.2239 23 14.5V14.5Z" fill="#C0C0C0"/><path d="M3 10H12V16H3V10Z" fill="#D3D3D3"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11 18.5C11 18.7761 10.8881 19 10.75 19H3.25C3.11193 19 3 18.7761 3 18.5V18.5C3 18.2239 3.11193 18 3.25 18H10.75C10.8881 18 11 18.2239 11 18.5V18.5Z" fill="black" fill-opacity="0.6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.5C10 20.7761 9.91753 21 9.81579 21H3.18421C3.08247 21 3 20.7761 3 20.5V20.5C3 20.2239 3.08247 20 3.18421 20H9.81579C9.91753 20 10 20.2239 10 20.5V20.5Z" fill="#C0C0C0"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22.5C12 22.7761 11.894 23 11.7632 23H3.23684C3.10604 23 3 22.7761 3 22.5V22.5C3 22.2239 3.10604 22 3.23684 22H11.7632C11.894 22 12 22.2239 12 22.5V22.5Z" fill="#C0C0C0"/><path d="M14 18H23V24H14V18Z" fill="#D3D3D3"/></svg>`,
        json: `[{"type":"Area","width":100,"direction":"row","childs":[{"width":50,"direction":"column","type":"Area","childs":[{"type":"H","align":"left","more":{"customClass":""},"content":"Write Here your Heading","tag":"h2"},{"type":"P","align":"left","more":{"customClass":""},"content":"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."}],"more":{"customClass":"","styles":{}}},{"width":50,"direction":"row","type":"Area","childs":[],"more":{"customClass":"","styles":{}}}],"more":{"customClass":"","styles":{}}},{"type":"Area","width":100,"direction":"row","childs":[{"width":50,"direction":"row","type":"Area","childs":[],"more":{"customClass":"","styles":{}}},{"width":50,"direction":"column","type":"Area","childs":[{"type":"H","align":"left","more":{"customClass":""},"content":"Write Here","tag":"h2"},{"type":"P","align":"left","more":{"customClass":""},"content":"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."}],"more":{"customClass":"","styles":{}}}],"more":{"customClass":"","styles":{}}},{"type":"Area","width":100,"direction":"row","childs":[{"width":50,"direction":"column","type":"Area","childs":[{"type":"H","align":"left","more":{"customClass":""},"content":"Write Here your Heading","tag":"h2"},{"type":"P","align":"left","more":{"customClass":""},"content":"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."}],"more":{"customClass":"","styles":{}}},{"width":50,"direction":"row","type":"Area","childs":[],"more":{"customClass":"","styles":{}}}],"more":{"customClass":"","styles":{}}}]`
    },
    {
        icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1C0 0.447716 0.447715 0 1 0H25C25.5523 0 26 0.447715 26 1V25C26 25.5523 25.5523 26 25 26H1C0.447716 26 0 25.5523 0 25V1Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 15.5C12 15.7761 11.7761 16 11.5 16H3.5C3.22386 16 3 15.7761 3 15.5V15.5C3 15.2239 3.22386 15 3.5 15H11.5C11.7761 15 12 15.2239 12 15.5V15.5Z" fill="#BBBBBB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19 19.5C19 19.7761 18.7761 20 18.5 20H3.5C3.22386 20 3 19.7761 3 19.5V19.5C3 19.2239 3.22386 19 3.5 19H18.5C18.7761 19 19 19.2239 19 19.5V19.5Z" fill="black" fill-opacity="0.6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 21.5C22 21.7761 21.7761 22 21.5 22H3.5C3.22386 22 3 21.7761 3 21.5V21.5C3 21.2239 3.22386 21 3.5 21H21.5C21.7761 21 22 21.2239 22 21.5V21.5Z" fill="#555555"/><path d="M14 3H23V9H14V3Z" fill="#D3D3D3"/><path d="M14 11H23V17H14V11Z" fill="#D3D3D3"/><path d="M3 4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V4C11 4.55228 10.5523 5 10 5H4C3.44772 5 3 4.55228 3 4V4Z" fill="#626262"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.5C12 7.77614 11.7761 8 11.5 8H3.5C3.22386 8 3 7.77614 3 7.5V7.5C3 7.22386 3.22386 7 3.5 7H11.5C11.7761 7 12 7.22386 12 7.5V7.5Z" fill="#BBBBBB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11 9.5C11 9.77614 10.7761 10 10.5 10H3.5C3.22386 10 3 9.77614 3 9.5V9.5C3 9.22386 3.22386 9 3.5 9H10.5C10.7761 9 11 9.22386 11 9.5V9.5Z" fill="#BBBBBB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 11.5C12 11.7761 11.7761 12 11.5 12H3.5C3.22386 12 3 11.7761 3 11.5V11.5C3 11.2239 3.22386 11 3.5 11H11.5C11.7761 11 12 11.2239 12 11.5V11.5Z" fill="#BBBBBB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 13.5C10 13.7761 9.77614 14 9.5 14H3.5C3.22386 14 3 13.7761 3 13.5V13.5C3 13.2239 3.22386 13 3.5 13H9.5C9.77614 13 10 13.2239 10 13.5V13.5Z" fill="#BBBBBB"/></svg>`,
        json: `[{"type":"Area","width":100,"direction":"row","childs":[{"width":50,"direction":"column","type":"Area","childs":[{"type":"H","align":"left","more":{"customClass":""},"content":"Write Here","tag":"h3"},{"type":"P","align":"left","more":{"customClass":""},"content":"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.<br>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."}],"more":{"customClass":"","styles":{}}},{"width":50,"direction":"column","type":"Area","childs":[{"width":100,"direction":"row","type":"Area","childs":[],"more":{"customClass":"","styles":{}}},{"width":100,"direction":"row","type":"Area","childs":[],"more":{"customClass":"","styles":{"margin":"10px 0 0"}}}],"more":{"customClass":"","styles":{}}}],"more":{"customClass":"","styles":{}}},{"type":"Area","width":100,"direction":"row","childs":[{"type":"P","align":"left","more":{"customClass":""},"content":"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."}],"more":{"customClass":"","styles":{}}}]`
    }
];

/**
 * LayoutBuilder Class
 * 
 * A dynamic layout(JSON) builder for HTML using pure JavaScript.
 * 
 * Usage:
 * 1. Import the LayoutBuilder in your project.
 * 2. Inject templates and custom components like `Area` or `Image` using `addTemplate` and `injectComponent`.
 * 3. Call the `init` method to start the builder.
 */

export default class layoutBuilder {
    constructor(renderDom, dataDom) {
        this.renderDom = renderDom;
        this.dataDom = dataDom;
        this.builder = new DOMBuilder();
        this.areaDom;
        this.ui = null;
        this.renderDom.appendChild(this.ui);
        this.components = [];
        this.templates = templates;

        //this.objerver(); //Change Tracker
    }

    addTemplate(template) {
        this.templates.push(template);
    }

    init() {
        this.ui = this.builder.create('div').class('ui-creator').element;
        this.areaDom = this.builder.create('div').class('custom-areas').element;
        this.ui.appendChild(this.areaDom);
        let PrimaryTool = this.builder.create('div').class('ui-primary-tool').element;
        let newBtn = this.builder.create('button', icons.add, true)
            .attr({ type: "button" })
            .class('new-area-btn')
            .event('click', () => {
                this.createNewArea();
            }).element;
        new Tooltip({ item: newBtn, position: 'bottom', text: "Create New Area" });
        let templateBtn = this.builder.create('button', icons.template, true)
            .attr({ type: "button" })
            .class('new-area-btn')
            .event('click', () => {
                this.templateBrowser();
            }).element;
        new Tooltip({ item: templateBtn, position: 'bottom', text: "Quick Templates" });


        PrimaryTool.appendChild(newBtn);
        PrimaryTool.appendChild(templateBtn);

        this.ui.appendChild(PrimaryTool);

        this.ui.appendChild(this.builder.create('button', "Check Data")
            .attr({ type: "button" })
            .class('data-generate-btn')
            .event('click', () => {
                this.updateData();
            }).element);
        //Build Existing Areas
        this.buildExistion().then(() => {
            console.log("Loaded All Components");
        });
    }

    async buildExistion(json = false) {
        if (this.dataDom.value == "") {
            this.dataDom.value = "[]";
        }
        let data = JSON.parse(this.dataDom.value);
        if (json) {
            data = JSON.parse(json);
        }
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

    templateBrowser() {
        this.templatebrowserdom = this.builder.create('div').class('template-browser').element;
        let templateBrowserHeader = this.builder.create('div').class('template-browser-header').element;
        templateBrowserHeader.appendChild(this.builder.create('strong', 'Templates').element);
        templateBrowserHeader.appendChild(this.builder.create('span', '&times;', true).event('click', () => {
            this.templatebrowserdom.remove();
        }).element);
        this.templatebrowserdom.appendChild(templateBrowserHeader);

        let tamplatesWraper = this.builder.create('div').class('template-wraper').element;
        this.templates.forEach(template => {
            let templateElement = this.builder.create('div', template.icon, true).class('template-item');
            templateElement.event('click', () => {
                this.buildExistion(template.json).then(() => {
                    this.templatebrowserdom.remove();
                    this.updateData();
                });
            });
            tamplatesWraper.appendChild(templateElement.element);
        });
        this.templatebrowserdom.appendChild(tamplatesWraper);

        this.ui.appendChild(this.templatebrowserdom);
    }

    updateData() {
        let data = [];
        this.components.forEach(e => {
            data.push(e.getProps());
        });
        this.dataDom.value = JSON.stringify(data);

        let currentTime = new Date().toLocaleTimeString();
        console.log('Updated data at - ' + currentTime);
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
