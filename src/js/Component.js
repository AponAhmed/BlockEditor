import DOMBuilder from "./DomBuilder";
import Draggable from "./Draggable";

const IconsSet = {
    remove: '<svg height="16" width="14" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>',
    left: '<svg height="16" width="14" viewBox="0 0 448 512"><path d="M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>',
    center: '<svg height="16" width="14" viewBox="0 0 448 512"><path d="M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z"/></svg>',
    justify: '<svg height="16" width="14" viewBox="0 0 448 512"><path d="M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z"/></svg>',
    right: '<svg height="16" width="14" viewBox="0 0 448 512"><path d="M448 64c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>',
    link: '<svg height="16" width="20" viewBox="0 0 640 512"><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>',
    unlink: '<svg height="16" width="20" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L489.3 358.2l90.5-90.5c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114l-96 96-31.9-25C430.9 239.6 420.1 175.1 377 132c-52.2-52.3-134.5-56.2-191.3-11.7L38.8 5.1zM239 162c30.1-14.9 67.7-9.9 92.8 15.3c20 20 27.5 48.3 21.7 74.5L239 162zM116.6 187.9L60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5l61.8-61.8-50.6-39.9zM220.9 270c-2.1 39.8 12.2 80.1 42.2 110c38.9 38.9 94.4 51 143.6 36.3L220.9 270z"/></svg>',
    more: '<svg height="16" width="20" viewBox="0 0 512 512"><circle cx="256" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><circle cx="416" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><circle cx="96" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>',
};

const componentFullName = {
    'H': "Heading",
    'P': "Paragraph",
}

class Component {
    constructor(parent = {}, type) {
        this.type = type;
        this.parentArea = parent;
        this.domBuilder = new DOMBuilder();
        this.props = { type: this.type };
        this.moreProps = this.props.more || {};
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
        this.dom.style.textAlign = this.props.align;
    }
    addAction(action) {
        // Add an action to the list
        this.actions.push(action);
        // Update the component with the new action
        this.updateActions();
    }
    getProps() {
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
    }
    updateActions() {
        this.actionDom.innerHTML = ''; // Clear existing content
        // Add each action to the component
        this.actions.forEach(action => {
            const actionButton = this.domBuilder.create('div', action.label, true).class('component-action-btn');
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
        this.updateContent();
        const subControl = this.dom.querySelector('.sub-control');
        if (subControl) {
            subControl.remove();
        }
    }

    /**
     * Link Add or remove button
     */
    linkControl() {
        //Link 
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
        this.dom.addEventListener('click', (e) => {
            this.ceretElm = e.target;
            if (this.ceretElm instanceof HTMLAnchorElement) {
                this.actionDomObj.link.innerHTML = this.geticon('unlink');
            } else {
                this.actionDomObj.link.innerHTML = this.geticon('link');
            }
        })


        this.addAction({
            label: this.geticon('link'),
            indx: 'link',
            attr: { title: 'Add Link in ' + this.getComponentName() },
            handler: (e) => {
                console.log(this.selectedText, this.selectedObject);
                if (this.ceretElm instanceof HTMLAnchorElement) {
                    let parent = this.ceretElm.parentNode;
                    const linkText = this.ceretElm.textContent;
                    const textNode = document.createTextNode(linkText);
                    // Replace the anchor tag with its text content
                    parent.replaceChild(textNode, this.ceretElm);
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
                        console.log(elm.innerHTML);
                        console.log(txtNode);
                        console.log(modifiedTextNode);

                        elm.innerHTML = elm.innerHTML.replace(txtNode, modifiedTextNode);
                        //elm.innerHTML = this.replaceSubstringInRange(fullHtml, this.createLink(linkUrl, newWindowCheckbox.checked), this.selectedObject.anchorOffset, this.selectedObject.focusOffset);

                        this.linkWindow.remove();
                        this.selectedText = ""
                        this.selectedObject = {};
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