import colorPicker from 'tui-color-picker'; /* ES6 */
import DOMBuilder from './DomBuilder';
import 'tui-color-picker/dist/tui-color-picker.css';

class ColorPicker {
    constructor(domElement, params = {}) {
        this.params = params;
        this.domBuilder = new DOMBuilder();
        this.domElement = domElement;
        this.ui();
        this.color;

    }

    ui() {
        this.colorPickerArea = this.domBuilder.create('div').class('color-picker-area').getElement();
        this.instance = colorPicker.create({ container: this.colorPickerArea });
        let okBtn = this.domBuilder.create('button', 'Ok').class('color-picker-ok').event('click', () => {
            if (this.params.hasOwnProperty('okCallback')) {
                this.params.okCallback(this.color);
            }
            this.removeUi();
        }).getElement();
        this.colorPickerArea.appendChild(okBtn);
        this.instance.on('selectColor', (ev) => {
            this.color = ev.color;
            if (this.params.hasOwnProperty('changeCalback')) {
                this.params.changeCalback(this.color);
            }
        });
        this.domElement.appendChild(this.colorPickerArea);
    }

    removeUi() {
        //this.instance.destroy();
        this.colorPickerArea.remove();
    }

}
export default ColorPicker;