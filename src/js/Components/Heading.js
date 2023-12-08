import Component from "../Component.js";

class Heading extends Component {
    constructor(parentComponent, props = {}) {
        super(parentComponent, 'H');
        this.props = { ...this.props, ...props };
        this.dom.classList.add('layout-h-wraper');
        // Create a <p> element
        this.currentTag = props.tag || "h1";

        this.tag = document.createElement(this.currentTag);
        // Set contentEditable attribute to true
        this.tag.contentEditable = true;
        this.tag.innerText = props.content || "Write Here";
        this.dom.appendChild(this.tag);
        // Add a control section
        this.addControlSection();
        this.alignmentControl();
        this.tag.addEventListener('keyup', () => this.updateContent())

    }

    changeProp() {
        this.updateContent();
        this.props.tag = this.currentTag;
    }

    addControlSection() {
        this.addAction({
            label: this.currentTag,
            handler: (e) => {
                let btn = e.target;
                // Close the heading changer
                const exHChanger = this.dom.querySelector('.heading-changer');
                if (exHChanger) {
                    exHChanger.remove();
                }

                const headingChanger = document.createElement('ul');
                headingChanger.classList.add('heading-changer');

                // Define heading options
                const headingOptions = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

                headingOptions.forEach((option) => {
                    const listItem = document.createElement('li');
                    listItem.innerText = option;
                    listItem.addEventListener('click', () => this.changeHeading(option, btn));
                    headingChanger.appendChild(listItem);
                });

                this.dom.appendChild(headingChanger);
            }
        });
    }

    changeHeading(newTag, btn) {
        // Change the heading tag
        const newHeading = document.createElement(newTag);
        newHeading.contentEditable = true;
        newHeading.innerText = this.tag.innerText;
        btn.innerHTML = newTag;
        this.currentTag = newTag;

        // Replace the current heading with the new one
        this.dom.replaceChild(newHeading, this.tag);
        this.tag = newHeading;

        // Close the heading changer
        const headingChanger = this.dom.querySelector('.heading-changer');
        if (headingChanger) {
            headingChanger.remove();
        }
        // Update content after changing heading
        this.changeProp();
    }

    updateContent() {
        this.props.content = this.tag.innerHTML.trim();
    }
}
export default Heading;