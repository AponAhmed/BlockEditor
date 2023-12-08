class Component {
    constructor(parent = {}, type) {
        this.type = type;
        this.parentArea = parent;
        this.props = { type: this.type };
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
}

export default Component;