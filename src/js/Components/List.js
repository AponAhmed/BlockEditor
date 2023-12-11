import Component from "../Component.js";

const listTypeIcons = {
    ul: '<svg  height="16" width="16" viewBox="0 0 512 512"><path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/></svg>',
    ol: '<svg  height="16" width="16" viewBox="0 0 512 512"><path d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>',
};

class List extends Component {
    constructor(parentComponent, props = { listType: "ul" }) {
        super(parentComponent, 'List');
        this.props = { ...this.props, ...props };
        this.dom.classList.add('layout-list-wrapper');

        this.initList();

        // Initialize the list with provided items or an empty array
        this.props.items = this.props.items || ["List Item"];
        this.renderItems();

        this.listTypeControll();
        this.linkControl();
    }
    initList() {
        if (this.hasOwnProperty('list')) {
            this.list.remove();
        }
        // Create a list element (ul or ol)
        this.list = document.createElement(this.props.listType || 'ul');
        this.list.contentEditable = true;
        this.dom.appendChild(this.list);
        this.list.addEventListener('keydown', (event) => this.handleKeyDown(event));
        this.list.addEventListener('input', () => this.updateItems());
    }

    RemovelistTypeChanger() {
        const exel = this.dom.querySelector('.sub-control');
        if (exel) {
            exel.remove();
        }
    }

    listTypeControll() {
        this.addAction({
            label: listTypeIcons[this.props.listType],
            attr: {
                title: "List Type"
            },
            handler: (e) => {
                let btn = e.target;
                this.RemovelistTypeChanger();
                this.updateItems();

                const listStypeUi = document.createElement('ul');
                listStypeUi.classList.add('sub-control');

                // Define heading options
                const headingOptions = ['ul', 'ol'];
                headingOptions.forEach((option) => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = listTypeIcons[option];
                    listItem.addEventListener('click', () => this.listTypeChange(option, btn));
                    listStypeUi.appendChild(listItem);
                });
                this.dom.appendChild(listStypeUi);
            }
        });
    }

    listTypeChange(type, btn) {
        this.props.listType = type;
        btn.innerHTML = listTypeIcons[type];
        this.initList();
        this.renderItems();
        this.RemovelistTypeChanger();
    }

    renderItems() {
        // Clear existing items
        this.list.innerHTML = '';
        // Create list items and append them to the list
        this.props.items.forEach(itemText => {
            const listItem = document.createElement('li');
            listItem.contentEditable = true;
            listItem.innerHTML = itemText || "List Item";
            this.list.appendChild(listItem);
        });
    }

    updateItems() {
        // Update the items array based on the current content of list items
        this.props.items = Array.from(this.list.children).map(item => item.innerHTML.trim().replace(/<br>\s*$/, ''));
    }

    handleKeyDown(event) {
        this.updateItems();
    }
}

export default List;