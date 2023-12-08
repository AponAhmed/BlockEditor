import Component from "../Component.js";

class Paragraph extends Component {
    constructor(parentComponent) {
        super(parentComponent, 'P');
        this.dom = document.createElement('div');
        this.dom.classList.add('layout-p-wraper');
        // Create a <p> element
        this.paragraph = document.createElement('p');
        // Set contentEditable attribute to true
        this.paragraph.contentEditable = true;
        this.paragraph.innerText = "Write Here";
        this.dom.appendChild(this.paragraph);
        this.paragraph.addEventListener('keyup', () => this.updateContent())
    }

    updateContent() {
        this.props.content = this.paragraph.innerHTML.trim();
    }

}

export default Paragraph;