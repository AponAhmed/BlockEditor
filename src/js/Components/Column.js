import Component from "../Component.js";
import Area from "../Area.js";

const ColumnIcon = {
    '100': `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="m39.0625 14h-30.0625v20.0938h30.0625zm-30.0625-2c-1.10457 0-2 .8954-2 2v20.0938c0 1.1045.89543 2 2 2h30.0625c1.1046 0 2-.8955 2-2v-20.0938c0-1.1046-.8954-2-2-2z"></path></svg>`,
    '50|50': `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z"></path></svg>`,
    '33|66': `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z"></path></svg>`,
    '66|33': `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z"></path></svg>`,
    '33|33|33': `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"></path></svg>`,
    '25|50|25': `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z"></path></svg>`
}

class Column extends Component {
    constructor(parentComponent, props = {}) {
        super(parentComponent, 'Column', props);
        this.components = [];
        this.dom.classList.add('layout-column-wraper');
        this.columnDom = this.domBuilder.create('div').class('column-wrapper').getElement();
        if (!this.props.hasOwnProperty('childs') || this.props.childs == '') {
            this.OpenOrientationChoser();
        } else {
            this.renderExistingColumns();
        }
        this.dom.appendChild(this.columnDom);
    }

    getPropsChild = function () {
        let childs = [];
        if (this.components.length > 0) {
            this.components.forEach(c => {
                childs.push(c.getProps());//here
            });
        }
        this.props.childs = childs;
    }

    removeColumnOrientationChoser() {
        const exel = this.dom.querySelector('.column-orientation-choser');
        if (exel) {
            exel.remove();
        }
    }

    OpenOrientationChoser() {
        // Close the heading changer
        this.removeColumnOrientationChoser();

        let Oientations = ['100', '50|50', '33|66', '66|33', '33|33|33', '25|50|25'];
        let choser = this.domBuilder.create('div').class('column-orientation-choser').getElement();

        Oientations.forEach((option) => {
            let icoSvg = ColumnIcon[option];
            choser.appendChild(this.domBuilder.create('div', icoSvg, true).attr({ title: option }).event('click', (e) => {
                this.initColumns(option);
            }).class('orient').getElement());
        });
        this.dom.appendChild(choser);
    }

    initColumns(orient) {
        const cols = orient.split("|");
        cols.forEach(column => {
            let area = new Area({ width: column });
            area.setParent(this);
            this.components.push(area);
            this.columnDom.appendChild(area.dom);
        });
        this.removeColumnOrientationChoser();
    }

    renderExistingColumns() {
        this.props.childs.forEach(c => {
            let area = new Area(c);
            area.setParent(this);
            this.components.push(area);
            this.columnDom.appendChild(area.dom);
        });
    }

}

export default Column;