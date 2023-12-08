import DOMBuilder from "./DomBuilder";

const AlignmentIcon = {
    left: '<svg height="16" width="14" viewBox="0 0 448 512"><path d="M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>',
    center: '<svg height="16" width="14" viewBox="0 0 448 512"><path d="M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z"/></svg>',
    justify: '<svg height="16" width="14" viewBox="0 0 448 512"><path d="M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z"/></svg>',
    right: '<svg height="16" width="14" viewBox="0 0 448 512"><path d="M448 64c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>'
};


class Component {
    constructor(parent = {}, type) {
        this.type = type;
        this.parentArea = parent;
        this.domBuilder = new DOMBuilder();
        this.props = { type: this.type };

        this.actions = [];
        this.initDom();
        this.actionDom = this.domBuilder.create('div').class("control-section").getElement();
        // Create a remove button as a common action
        this.addAction({
            label: '&times;',
            handler: () => this.remove()
        });
        this.updateActions();
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
            const actionButton = this.domBuilder.create('span', action.label, true).class('component-action-btn');
            actionButton.event('click', action.handler);
            this.actionDom.appendChild(actionButton.getElement());
        });
        this.dom.appendChild(this.actionDom);
    }

    geticon(align) {
        return AlignmentIcon[align];
    }

    alignmentControl() {
        this.addAction({
            label: this.geticon(this.props.align),
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
                    listItem.addEventListener('click', () => this.changeAlign(option, btn));
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
}

export default Component;