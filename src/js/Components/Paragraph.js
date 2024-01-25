import Component from "../Component.js";


class Paragraph extends Component {
    constructor(parentComponent, props = {}) {
        super(parentComponent, 'P',props);
        
        this.dom.classList.add('layout-p-wraper');
        // Create a <p> element
        this.paragraph = document.createElement('p');

        // Set contentEditable attribute to true
        this.paragraph.contentEditable = true;
        this.paragraph.innerHTML = this.props.content || "Write Here";
        this.dom.appendChild(this.paragraph);
        this.alignmentControl();
        this.txtCommonControll();
        this.paragraph.addEventListener('keyup', () => this.updateContent())

    }
    updateContent() {
        this.props.content = this.paragraph.innerHTML.trim().replace(/<br>\s*$/, '');
    }
}

export default Paragraph;