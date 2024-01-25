import Component from "../Component.js";

const listTypeIcons = {
    ul: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 5.11929 11.1193 4 12.5 4H26.5C27.8807 4 29 5.11929 29 6.5V6.5C29 7.88071 27.8807 9 26.5 9H12.5C11.1193 9 10 7.88071 10 6.5V6.5Z" fill="#333333"/><path d="M10 16.5C10 15.1193 11.1193 14 12.5 14H26.5C27.8807 14 29 15.1193 29 16.5V16.5C29 17.8807 27.8807 19 26.5 19H12.5C11.1193 19 10 17.8807 10 16.5V16.5Z" fill="#333333"/><path d="M10 26.5C10 25.1193 11.1193 24 12.5 24H26.5C27.8807 24 29 25.1193 29 26.5V26.5C29 27.8807 27.8807 29 26.5 29H12.5C11.1193 29 10 27.8807 10 26.5V26.5Z" fill="#333333"/><path d="M7 6.5C7 7.88071 5.88071 9 4.5 9C3.11929 9 2 7.88071 2 6.5C2 5.11929 3.11929 4 4.5 4C5.88071 4 7 5.11929 7 6.5Z" fill="#333333"/><path d="M7 16.5C7 17.8807 5.88071 19 4.5 19C3.11929 19 2 17.8807 2 16.5C2 15.1193 3.11929 14 4.5 14C5.88071 14 7 15.1193 7 16.5Z" fill="#333333"/><path d="M7 26.5C7 27.8807 5.88071 29 4.5 29C3.11929 29 2 27.8807 2 26.5C2 25.1193 3.11929 24 4.5 24C5.88071 24 7 25.1193 7 26.5Z" fill="#333333"/></svg>',
    ol: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 5.11929 11.1193 4 12.5 4H26.5C27.8807 4 29 5.11929 29 6.5V6.5C29 7.88071 27.8807 9 26.5 9H12.5C11.1193 9 10 7.88071 10 6.5V6.5Z" fill="#333333"/><path d="M10 16.5C10 15.1193 11.1193 14 12.5 14H26.5C27.8807 14 29 15.1193 29 16.5V16.5C29 17.8807 27.8807 19 26.5 19H12.5C11.1193 19 10 17.8807 10 16.5V16.5Z" fill="#333333"/><path d="M10 26.5C10 25.1193 11.1193 24 12.5 24H26.5C27.8807 24 29 25.1193 29 26.5V26.5C29 27.8807 27.8807 29 26.5 29H12.5C11.1193 29 10 27.8807 10 26.5V26.5Z" fill="#333333"/><path d="M5 5C5.55228 5 6 5.44772 6 6V14.0525C6 14.5758 5.5758 15 5.05252 15V15C4.52924 15 4.10503 14.5758 4.10503 14.0525V7.04677C4.10503 7.02472 4.08715 7.00684 4.0651 7.00684V7.00684C4.05691 7.00684 4.04892 7.00935 4.04221 7.01405L3.21003 7.59608C2.7002 7.95265 2 7.58791 2 6.96577V6.96577C2 6.71594 2.12134 6.48167 2.32539 6.33753L3.95943 5.18323C4.1282 5.06401 4.32976 5 4.5364 5H5Z" fill="#333333"/><path d="M2.63266 28C2.12165 28 1.70739 27.5857 1.70739 27.0747V27.0747C1.70739 26.817 1.8149 26.5709 2.00402 26.3958L4.81392 23.794C5.07812 23.5384 5.29971 23.3082 5.47869 23.1037C5.66051 22.8992 5.79829 22.6989 5.89204 22.5028C5.98579 22.304 6.03267 22.0895 6.03267 21.8594C6.03267 21.6037 5.97443 21.3835 5.85795 21.1989C5.74148 21.0114 5.58239 20.8679 5.38068 20.7685C5.17898 20.6662 4.95028 20.6151 4.6946 20.6151C4.42756 20.6151 4.1946 20.669 3.99574 20.777C3.79687 20.8849 3.64346 21.0398 3.53551 21.2415V21.2415C3.34117 21.6046 3.03972 21.9617 2.62788 21.9617H2.49787C2.01423 21.9617 1.60329 21.5612 1.73698 21.0964C1.80111 20.8734 1.89209 20.6661 2.00994 20.4744C2.26846 20.054 2.63068 19.7287 3.09659 19.4986C3.5625 19.2685 4.09943 19.1534 4.70739 19.1534C5.33239 19.1534 5.87642 19.2642 6.33949 19.4858C6.8054 19.7045 7.16761 20.0085 7.42614 20.3977C7.68466 20.7869 7.81392 21.233 7.81392 21.7358C7.81392 22.0653 7.74858 22.3906 7.6179 22.7117C7.49006 23.0327 7.26136 23.3892 6.93182 23.7813C6.60227 24.1705 6.13778 24.6378 5.53835 25.1832L4.27681 26.4195C4.26875 26.4274 4.2642 26.4382 4.2642 26.4495V26.4495C4.2642 26.4727 4.28301 26.4915 4.30621 26.4915H7.17472C7.59128 26.4915 7.92898 26.8292 7.92898 27.2457V27.2457C7.92898 27.6623 7.59128 28 7.17472 28H2.63266Z" fill="#333333"/></svg>',
};

class List extends Component {
    constructor(parentComponent, props = { listType: "ul" }) {
        super(parentComponent, 'List', props);

        this.dom.classList.add('layout-list-wrapper');
        this.initList();
        // Initialize the list with provided items or an empty array
        this.props.items = this.props.items || ["List Item"];
        this.renderItems();

        this.listTypeControll();
        this.txtCommonControll();
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
                    listItem.addEventListener('click', (e) => {
                        this.parentArea.hideActionBar(e);
                        this.listTypeChange(option, btn)
                    });
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
        this.updateData();
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