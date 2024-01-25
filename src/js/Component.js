import ColorPicker from "./ColorPicker";
import DOMBuilder from "./DomBuilder";
import Draggable from "./Draggable";
import colorPicker from 'tui-color-picker'; /* ES6 */
import 'tui-color-picker/dist/tui-color-picker.css';
import { Tooltip } from "./Tooltip";

const IconsSet = {
    remove: '<svg height="16" width="14" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>',
    left: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6.5C3 5.11929 4.11929 4 5.5 4H26.5C27.8807 4 29 5.11929 29 6.5C29 7.88071 27.8807 9 26.5 9H5.5C4.11929 9 3 7.88071 3 6.5Z" fill="#333333"/><path d="M3 16.5C3 15.1193 4.11929 14 5.5 14H12.5C13.8807 14 15 15.1193 15 16.5V16.5C15 17.8807 13.8807 19 12.5 19H5.5C4.11929 19 3 17.8807 3 16.5V16.5Z" fill="#333333"/><path d="M3 26.5C3 25.1193 4.11929 24 5.5 24H20.5C21.8807 24 23 25.1193 23 26.5C23 27.8807 21.8807 29 20.5 29H5.5C4.11929 29 3 27.8807 3 26.5Z" fill="#333333"/></svg>',
    center: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6.5C3 5.11929 4.11929 4 5.5 4H26.5C27.8807 4 29 5.11929 29 6.5V6.5C29 7.88071 27.8807 9 26.5 9H5.5C4.11929 9 3 7.88071 3 6.5V6.5Z" fill="#333333"/><path d="M10 16.5C10 15.1193 11.1193 14 12.5 14H19.5C20.8807 14 22 15.1193 22 16.5V16.5C22 17.8807 20.8807 19 19.5 19H12.5C11.1193 19 10 17.8807 10 16.5V16.5Z" fill="#333333"/><path d="M5 26.5C5 25.1193 6.11929 24 7.5 24H24.5C25.8807 24 27 25.1193 27 26.5V26.5C27 27.8807 25.8807 29 24.5 29H7.5C6.11929 29 5 27.8807 5 26.5V26.5Z" fill="#333333"/></svg>',
    justify: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6.5C3 5.11929 4.11929 4 5.5 4H26.5C27.8807 4 29 5.11929 29 6.5V6.5C29 7.88071 27.8807 9 26.5 9H5.5C4.11929 9 3 7.88071 3 6.5V6.5Z" fill="#333333"/><path d="M3 16.5C3 15.1193 4.11929 14 5.5 14H26.5C27.8807 14 29 15.1193 29 16.5V16.5C29 17.8807 27.8807 19 26.5 19H5.5C4.11929 19 3 17.8807 3 16.5V16.5Z" fill="#333333"/><path d="M3 26.5C3 25.1193 4.11929 24 5.5 24H26.5C27.8807 24 29 25.1193 29 26.5V26.5C29 27.8807 27.8807 29 26.5 29H5.5C4.11929 29 3 27.8807 3 26.5V26.5Z" fill="#333333"/></svg>',
    right: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6.5C3 5.11929 4.11929 4 5.5 4H26.5C27.8807 4 29 5.11929 29 6.5V6.5C29 7.88071 27.8807 9 26.5 9H5.5C4.11929 9 3 7.88071 3 6.5V6.5Z" fill="#333333"/><path d="M17 16.5C17 15.1193 18.1193 14 19.5 14H26.5C27.8807 14 29 15.1193 29 16.5V16.5C29 17.8807 27.8807 19 26.5 19H19.5C18.1193 19 17 17.8807 17 16.5V16.5Z" fill="#333333"/><path d="M8 26.5C8 25.1193 9.11929 24 10.5 24H26.5C27.8807 24 29 25.1193 29 26.5V26.5C29 27.8807 27.8807 29 26.5 29H10.5C9.11929 29 8 27.8807 8 26.5V26.5Z" fill="#333333"/></svg>',
    link: '<svg height="16" width="20" viewBox="0 0 640 512"><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>',
    unlink: '<svg height="16" width="20" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L489.3 358.2l90.5-90.5c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114l-96 96-31.9-25C430.9 239.6 420.1 175.1 377 132c-52.2-52.3-134.5-56.2-191.3-11.7L38.8 5.1zM239 162c30.1-14.9 67.7-9.9 92.8 15.3c20 20 27.5 48.3 21.7 74.5L239 162zM116.6 187.9L60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5l61.8-61.8-50.6-39.9zM220.9 270c-2.1 39.8 12.2 80.1 42.2 110c38.9 38.9 94.4 51 143.6 36.3L220.9 270z"/></svg>',
    bold: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 29C6.44772 29 6 28.5523 6 28V4C6 3.44772 6.44772 3 7 3H16.2618C18.199 3 19.8089 3.29622 21.0916 3.88867C22.3831 4.47266 23.3473 5.27246 23.9843 6.28809C24.63 7.30371 24.9529 8.45475 24.9529 9.74121C24.9529 10.7992 24.7435 11.7048 24.3246 12.458C23.9058 13.2028 23.3429 13.8079 22.6361 14.2734C21.9598 14.7188 21.2076 15.0441 20.3796 15.2493C20.3138 15.2656 20.267 15.3243 20.267 15.3921V15.3921C20.267 15.4696 20.3277 15.5333 20.4049 15.5393C21.3064 15.6091 22.1723 15.8896 23.0026 16.3809C23.8839 16.8887 24.6038 17.6081 25.1623 18.5391C25.7208 19.4701 26 20.5957 26 21.916C26 23.2617 25.664 24.472 24.9921 25.5469C24.3202 26.6133 23.308 27.4554 21.9555 28.0732C20.603 28.6911 18.9014 29 16.8508 29H7ZM10.856 24.0645C10.856 24.6167 11.3037 25.0645 11.856 25.0645H16.0785C17.8412 25.0645 19.1108 24.7386 19.8874 24.0869C20.6728 23.4268 21.0654 22.5804 21.0654 21.5478C21.0654 20.7777 20.8691 20.0837 20.4764 19.4658C20.0838 18.8395 19.5253 18.3486 18.801 17.9932C18.0768 17.6292 17.2129 17.4473 16.2094 17.4473H11.856C11.3037 17.4473 10.856 17.895 10.856 18.4473V24.0645ZM10.856 13.0576C10.856 13.6099 11.3037 14.0576 11.856 14.0576H15.6597C16.4974 14.0576 17.2522 13.9095 17.9241 13.6133C18.596 13.3086 19.1239 12.8812 19.5079 12.3311C19.9005 11.7725 20.0969 11.1123 20.0969 10.3506C20.0969 9.34342 19.7304 8.514 18.9974 7.8623C18.2731 7.21061 17.1955 6.88476 15.7644 6.88476H11.856C11.3037 6.88476 10.856 7.33248 10.856 7.88476V13.0576Z" fill="#333333"/></svg>',
    more: '<svg height="16" width="20" viewBox="0 0 512 512"><circle cx="256" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><circle cx="416" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><circle cx="96" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>',
    color: '<svg width="32" class="color-tool" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.7899 22.0135C10.5254 22.802 9.78677 23.3333 8.95512 23.3333V23.3333C7.62058 23.3333 6.68658 22.0143 7.12975 20.7555L13.2624 3.33585C13.5441 2.53546 14.3003 2 15.1489 2H17.0879C17.9361 2 18.6921 2.53506 18.9741 3.33503L25.1153 20.755C25.5591 22.0138 24.6252 23.3333 23.2904 23.3333V23.3333C22.4593 23.3333 21.721 22.8025 21.4562 22.0146L16.2279 6.45397C16.2121 6.40679 16.1679 6.375 16.1181 6.375V6.375C16.0683 6.375 16.0241 6.40682 16.0082 6.45403L10.7899 22.0135ZM10.4826 16.5208C10.4826 15.6636 11.1775 14.9688 12.0347 14.9688H20.1806C21.0377 14.9688 21.7326 15.6636 21.7326 16.5208V16.5208C21.7326 17.378 21.0377 18.0729 20.1806 18.0729H12.0347C11.1775 18.0729 10.4826 17.378 10.4826 16.5208V16.5208Z" fill="#333333"/><path class="currentColor" d="M5 28C5 26.8954 5.89543 26 7 26H25C26.1046 26 27 26.8954 27 28V29C27 30.1046 26.1046 31 25 31H7C5.89543 31 5 30.1046 5 29V28Z" fill="#686868"/></svg>'
};

const componentFullName = {
    'H': "Heading",
    'P': "Paragraph",
}

class Component {
    constructor(parent = {}, type, props) {
        this.type = type;
        this.parentArea = parent;
        this.domBuilder = new DOMBuilder();
        this.props = { type: this.type };
        this.props = { ...this.props, ...props };
        this.moreProps = this.props.more || { customClass: "" };

        this.actions = [];
        this.initDom();
        this.actionDomObj = {};
        this.actionDom = this.domBuilder.create('div')
            .event('mouseover', () => {
                if (!this.dom.classList.contains('component-highlight'))
                    this.dom.classList.add('component-highlight');

            }).event('mouseout', () => {
                if (this.dom.classList.contains('component-highlight'))
                    this.dom.classList.remove('component-highlight');

            }).class("control-section").getElement();

        // Create a remove button as a common action
        this.addAction({
            label: this.geticon('remove'),
            attr: { title: 'Remove ' + this.getComponentName(), class: 'component-action-btn component-remove-btn' },
            handler: () => this.remove(),
        });
        this.updateActions();
    }

    updateData() {

        if (this.hasOwnProperty('updateContent')) {
            this.updateContent();
        }
        this.parentArea.updateData();
    }

    getComponentName() {
        if (componentFullName.hasOwnProperty(this.type)) {
            return componentFullName[this.type];
        }
        return this.type;
    }

    initDom() {
        let dom = this.domBuilder.create('div').class('component-wrapper');
        this.dom = dom.getElement();
        if (!this.props.hasOwnProperty('align')) {
            this.props.align = 'left';
        }


        if (this.moreProps.hasOwnProperty('customClass')) {
            // Assuming this.moreProps.customclass contains multiple classes separated by spaces
            let customClasses = this.moreProps.customClass.split(' ');
            // Filter out empty classes
            customClasses = customClasses.filter(function (className) {
                return className.trim() !== ''; // Remove leading and trailing spaces and check if not empty
            });
            // Add each non-empty class to the element
            customClasses.forEach((className) => {
                this.dom.classList.add(className);
            });
        }


        this.dom.style.textAlign = this.props.align;

        let timeoutId;
        this.dom.addEventListener('keyup', () => {
            // Clear any existing timeout
            clearTimeout(timeoutId);
            // Set a new timeout for 1000 milliseconds (1 second)
            timeoutId = setTimeout(() => {
                this.updateData();
            }, 1000);
        });
    }

    addAction(action) {
        // Add an action to the list
        this.actions.push(action);
        // Update the component with the new action
        this.updateActions();
    }
    getProps() {
        this.props.more = this.moreProps;
        if (this.hasOwnProperty('getPropsChild')) {
            this.getPropsChild();
        }
        return this.props;
    }
    remove() {
        if (this.parentArea) {
            this.parentArea.components = this.parentArea.components.filter(component => component !== this);
        }
        this.dom.remove();
        this.updateData();
    }
    updateActions() {
        this.actionDom.innerHTML = ''; // Clear existing content
        // Add each action to the component
        this.actions.forEach(action => {
            const actionButton = this.domBuilder.create('div', action.label, true).class('component-action-btn').class(`action-${action.indx}`);
            new Tooltip({ item: actionButton.element, position: 'left' });
            if (action.hasOwnProperty('indx')) {
                this.actionDomObj[action.indx] = actionButton.getElement();
            }
            if (action.hasOwnProperty('attr')) {
                actionButton.attr(action.attr);
            }
            actionButton.event('click', action.handler);
            this.actionDom.appendChild(actionButton.getElement());

        });
        //More control
        const moreControll = this.domBuilder.create('div', this.geticon('more'), true)
            .class('component-action-btn').class('component-more-control').attr({ title: "More Customize on " + this.getComponentName() });
        moreControll.event('click', this.moreOptionControl);
        this.actionDom.appendChild(moreControll.getElement());

        this.dom.appendChild(this.actionDom);
    }

    moreOptionControl = () => {
        this.propertyWindow = this.domBuilder.create("div").class(['layout-window']).element;
        let head = this.domBuilder.create("div").class('window-header-head').getElement();
        head.appendChild(this.domBuilder.create("div", this.getComponentName() + " Properties").class('header-title').getElement());
        head.appendChild(this.domBuilder.create("label", "&times;", true).class('remove-layout-window').event('click', () => {
            this.removePropertyWindow();
        }).getElement());
        this.propertyWindow.appendChild(head);
        new Draggable(this.propertyWindow, head);
        //Default properties for all Components

        let classProps = this.domBuilder.create('div').class('property-container').element;
        classProps.appendChild(this.domBuilder.create('label', 'Custom Class').element);
        classProps.appendChild(this.domBuilder.create('input')
            .event('keyup', (e) => {
                this.moreProps.customClass = e.target.value;
            }).attr({ type: "text" }).value(this.moreProps.customClass).class('property-input').element);


        this.propertyWindow.appendChild(classProps);
        //this.moreProps
        //Custom Properties for individual Components
        if (this.hasOwnProperty('individualProperties')) {
            let customProperties = this.domBuilder.create("div").class('individual-properties').element;
            customProperties.appendChild(this.individualProperties.call());
            this.propertyWindow.appendChild(customProperties);
        }

        this.dom.appendChild(this.propertyWindow);
    }

    removePropertyWindow = () => {
        if (this.hasOwnProperty('propertyWindow'))
            this.propertyWindow.remove();
        this.updateData();
    }

    geticon(name) {
        return IconsSet[name];
    }
    /**
     * Alignment
     */
    alignmentControl() {
        this.addAction({
            label: this.geticon(this.props.align),
            attr: { title: 'Change ' + this.getComponentName() + " Alignment" },
            indx: 'alignment',
            handler: (e) => {
                let btn = e.target;
                // Close the heading changer
                const exHChanger = this.dom.querySelector('.sub-control');
                if (exHChanger) {
                    exHChanger.remove();
                }

                const alignChanger = document.createElement('ul');
                alignChanger.classList.add('sub-control');

                // Define heading options
                const headingOptions = ['left', 'center', 'justify', 'right'];
                headingOptions.forEach((option) => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = this.geticon(option);
                    listItem.addEventListener('click', (e) => {
                        this.parentArea.hideActionBar(e);
                        this.changeAlign(option, btn)
                    });
                    alignChanger.appendChild(listItem);
                });
                this.dom.appendChild(alignChanger);
            }
        });
    }

    changeAlign(align, btn) {
        btn.innerHTML = this.geticon(align);
        this.dom.style.textAlign = align;
        this.props.align = align;
        const subControl = this.dom.querySelector('.sub-control');
        if (subControl) {
            subControl.remove();
            this.updateData();
        }
    }


    txtCommonControll() {
        this.selectedObject = {};
        this.selectedText = "";
        this.ceretElm = null;
        document.addEventListener("selectionchange", () => {
            let selectedObject = document.getSelection();
            let selectedStr = selectedObject.toString();
            if (selectedStr.length > 0) {// && selectedObject.type=="Caret"
                this.selectedText = selectedStr;
                this.selectedObject.anchorNode = selectedObject.anchorNode;
                this.selectedObject.anchorOffset = selectedObject.anchorOffset;
                this.selectedObject.focusOffset = selectedObject.focusOffset;
                // Make a copy of the Selection object
            }
        });

        //this.dom.addEventListener('click', (e) => {
        // Assuming this.dom is your container element
        const editableElements = this.dom.querySelectorAll('[contenteditable="true"]');

        editableElements.forEach((editableElement) => {
            editableElement.addEventListener('click', (e) => {
                this.ceretElm = e.target;
                //Current Color
                const computedStyles = window.getComputedStyle(this.ceretElm);
                const colorPropertyValue = computedStyles.getPropertyValue('color');
                let colorToolSvgCurr = this.actionDomObj.color.querySelector('svg .currentColor');
                if (colorPropertyValue) {
                    colorToolSvgCurr.style.fill = colorPropertyValue;
                }

                if (this.ceretElm instanceof HTMLAnchorElement) {
                    this.actionDomObj.link.innerHTML = this.geticon('unlink');
                } else {
                    this.actionDomObj.link.innerHTML = this.geticon('link');
                }

                if (this.ceretElm.tagName.toLowerCase() === 'strong') {
                    this.actionDomObj.bold.classList.add('unbold');
                } else {
                    if (this.actionDomObj.bold.classList.contains('unbold')) {
                        this.actionDomObj.bold.classList.remove('unbold');
                    }
                }

            });
        });
        this.boldControl();
        this.colorControl();
        this.linkControl();
    }


    colorControl() {
        // this.colorpickerContainer = document.createElement('div');
        // this.dom.appendChild(this.colorpickerContainer);
        this.addAction({
            label: this.geticon('color'),
            indx: 'color',
            attr: { title: 'Add color in ' + this.getComponentName() },
            handler: (e) => {
                this.parentArea.hideActionBar(e);

                const apicker = new ColorPicker(this.dom, {
                    okCallback: (c) => {
                        //console.log(this.ceretElm, this.selectedText);
                        if (this.selectedText == "" && this.ceretElm != null) {//&& this.ceretElm.tagName.toLowerCase() != 'p'
                            this.ceretElm.style.color = c;
                            //console.log(this.ceretElm, this.selectedText);
                        } else {
                            if (this.selectedText != "") {
                                // Create the link and replace the selected text
                                let elm = this.selectedObject.anchorNode.parentElement;
                                if (!elm) {
                                    apicker.removeUi();
                                } else {
                                    let txtNode = this.selectedObject.anchorNode.nodeValue;
                                    let modifiedTextNode = this.replaceSubstringInRange(txtNode, `<span style='color:${c}'>${this.selectedText}</span>`, this.selectedObject.anchorOffset, this.selectedObject.focusOffset);

                                    elm.innerHTML = elm.innerHTML.replace(txtNode, modifiedTextNode);

                                }
                            }

                        }
                        this.selectedText = ""
                        this.selectedObject = {};
                        this.updateData();
                    }
                });

            }
        });

    }

    /**
     * Bold Controller
     */
    boldControl() {
        this.addAction({
            label: this.geticon('bold'),
            indx: 'bold',
            attr: { title: 'Add Bold in ' + this.getComponentName() },
            handler: (e) => {
                if (this.ceretElm && this.ceretElm.tagName.toLowerCase() === 'strong') {
                    let parent = this.ceretElm.parentNode;
                    const linkText = this.ceretElm.textContent;
                    const textNode = document.createTextNode(linkText);
                    // Replace the anchor tag with its text content
                    parent.replaceChild(textNode, this.ceretElm);
                    return;
                } else if (this.selectedText) {
                    this.parentArea.hideActionBar(e);
                    // Create the link and replace the selected text
                    let elm = this.selectedObject.anchorNode.parentElement;
                    let txtNode = this.selectedObject.anchorNode.nodeValue;
                    let modifiedTextNode = this.replaceSubstringInRange(txtNode, `<strong>${this.selectedText}</strong>`, this.selectedObject.anchorOffset, this.selectedObject.focusOffset);

                    elm.innerHTML = elm.innerHTML.replace(txtNode, modifiedTextNode);
                    this.selectedText = ""
                    this.selectedObject = {};

                } else {
                    console.log("Please Select a Text");
                }
                this.updateData();
            }
        });
    }

    /**
     * Link Add or remove button
     */
    linkControl() {
        //Link 
        this.addAction({
            label: this.geticon('link'),
            indx: 'link',
            attr: { title: 'Add Link in ' + this.getComponentName() },
            handler: (e) => {
                if (this.ceretElm && this.ceretElm instanceof HTMLAnchorElement) {
                    let parent = this.ceretElm.parentNode;
                    const linkText = this.ceretElm.textContent;
                    const textNode = document.createTextNode(linkText);
                    // Replace the anchor tag with its text content
                    parent.replaceChild(textNode, this.ceretElm);

                    this.updateData();
                    return;
                }

                if (this.selectedText) {
                    this.createLinkWindow();
                    // // Add event listener for the OK button
                    const okButton = this.linkWindow.querySelector('#okButton');
                    const cancelBtn = this.linkWindow.querySelector('#cancelBtn');
                    const newWindowCheckbox = this.linkWindow.querySelector("#newWindowCheckbox");
                    cancelBtn.addEventListener('click', (e) => {
                        this.parentArea.hideActionBar(e);
                        this.selectedText = "";
                        this.selectedObject = {};
                        this.linkWindow.remove();

                    });

                    okButton.addEventListener('click', (e) => {
                        this.parentArea.hideActionBar(e);
                        const linkInput = this.linkWindow.querySelector('#linkInput');
                        const linkUrl = linkInput.value;
                        // Create the link and replace the selected text
                        let elm = this.selectedObject.anchorNode.parentElement;

                        let txtNode = this.selectedObject.anchorNode.nodeValue;
                        let modifiedTextNode = this.replaceSubstringInRange(txtNode, this.createLink(linkUrl, newWindowCheckbox.checked), this.selectedObject.anchorOffset, this.selectedObject.focusOffset);

                        elm.innerHTML = elm.innerHTML.replace(txtNode, modifiedTextNode);
                        //elm.innerHTML = this.replaceSubstringInRange(fullHtml, this.createLink(linkUrl, newWindowCheckbox.checked), this.selectedObject.anchorOffset, this.selectedObject.focusOffset);

                        this.linkWindow.remove();
                        this.selectedText = ""
                        this.selectedObject = {};

                        this.updateData();
                    });
                } else {
                    console.log("Please Select a Text");
                }
            },
        });
    }

    replaceSubstringInRange(originalString, replacement, startIndex, endIndex) {
        // Ensure startIndex is smaller than endIndex
        if (startIndex > endIndex) {
            [startIndex, endIndex] = [endIndex, startIndex];
        }
        return originalString.substring(0, startIndex) + replacement + originalString.substring(endIndex);
    }

    createLinkWindow() {
        this.linkWindow = document.createElement('div');
        this.linkWindow.classList.add('ui-link-window');
        this.linkWindow.innerHTML = `
                <div class="ui-link-window-content">
                    <div class='ui-link-window-url'>
                        <label for="linkInput">Link URL:</label>
                        <input type="text" id="linkInput" value="http://" />
                    </div>
                    <div class="ui-link-window-new-window">
                        <input type="checkbox" id="newWindowCheckbox" />
                        <label for="newWindowCheckbox">Open in new window</label>
                    </div>
                </div>
                <div class="ui-link-window-footer">
                    <button id="okButton">OK</button>
                    <button id="cancelBtn">Cencel</button>
                </div>
        `;
        this.dom.appendChild(this.linkWindow);
    }

    createLink(linkUrl, newWindow = false) {

        const newLink = `<a href="${linkUrl}" ${newWindow ? 'target="_blank"' : ''}>${this.selectedText}</a>`;
        return newLink;
    }

}

export default Component;