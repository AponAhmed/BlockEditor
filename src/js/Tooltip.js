import DOMBuilder from "./DomBuilder";
import "../styles/tooltip.scss";

export class Tooltip {
    constructor({ ...args }) {
        this.item = args.item || {};
        this.position = args.position || 'right';
        this.text = args.text || false;
        this.bg = args.bg || "#1a1f30";
        this.color = args.color || "#fff";
        this.init();
        this.exrect = {};
        this.extraMargin = 10;
    }

    init() {
        let el = new DOMBuilder();
        this.tooltip = el.create('div').class('tooltip-container');
        el = new DOMBuilder();
        this.tooltipTitle = el.create('div').class('tooltip-title');
        el = new DOMBuilder();
        this.tooltipArrow = el.create('span').class('tooltip-arrow');

        this.tooltip.append(this.tooltipArrow.element);
        this.tooltip.append(this.tooltipTitle.element);

        this.item.addEventListener('mouseover', (e) => {
            this.showTooltip(this.item, e);
        });
        this.item.addEventListener('mouseout', () => {
            this.removeTooltip();
        });
    }

    removeTooltip() {
        let tooltip = document.querySelector('.tooltip-container');
        if (tooltip) {
            tooltip.remove();
        }
    }

    positionSet(item) {
        if (!this.position) {
            if (item.hasAttribute('data-position')) {
                // data attribute doesn't exist
                this.position = item.dataset.position;
            }
        }


        this.tooltipArrow.element.removeAttribute('class');
        this.tooltipArrow.element.removeAttribute('style');
        this.tooltipArrow.class('tooltip-arrow');


        if (this.position === 'right') {
            this.tooltipArrow.element.style.borderRightColor = this.bg;
            this.tooltip.element.style.left = this.exrect.left + this.exrect.width + this.extraMargin + 'px';
            this.tooltipArrow.class('arrow-left');
            let cntrT = (this.exrect.height - this.tooltipRect.height) / 2;
            this.tooltip.element.style.top = this.exrect.top + cntrT + 'px';
        } else if (this.position === 'left') {
            this.tooltipArrow.element.style.borderLeftColor = this.bg;
            this.tooltip.element.style.left = this.exrect.left - (this.tooltipRect.width + this.extraMargin) + 'px';
            this.tooltipArrow.class('arrow-right');
            let cntrT = (this.exrect.height - this.tooltipRect.height) / 2;
            this.tooltip.element.style.top = this.exrect.top + cntrT + 'px';

        } else if (this.position === 'top') {
            this.tooltipArrow.element.style.borderTopColor = this.bg;
            this.tooltipArrow.class('arrow-bottom');
            let top = this.exrect.top - (this.exrect.height + this.extraMargin);
            let left = this.exrect.left + ((this.exrect.width - this.tooltipRect.width) / 2);
            this.tooltip.element.style.top = top + 'px';
            this.tooltip.element.style.left = left + 'px';
        } else {
            this.tooltipArrow.element.style.borderBottomColor = this.bg;
            this.tooltipArrow.class('arrow-top');
            let top = this.exrect.top + (this.exrect.height + this.extraMargin);
            let left = this.exrect.left + ((this.exrect.width - this.tooltipRect.width) / 2);
            this.tooltip.element.style.top = top + 'px';
            this.tooltip.element.style.left = left + 'px';
        }
    }

    colorSet(item) {
        if (item.hasAttribute('data-bg')) {
            this.bg = item.dataset.bg;
        } else {
            this.bg = '#1a1f30';
        }
        this.tooltip.element.removeAttribute('style');

        this.tooltip.element.style.backgroundColor = this.bg;
    }

    showTooltip(item, e) {
        if (!this.text) {
            this.text = item.title;
        }
        this.tooltipTitle.html(this.text);
        this.exrect = item.getBoundingClientRect();
        document.querySelector('body').appendChild(this.tooltip.element);
        this.colorSet(item);
        this.tooltipRect = this.tooltip.element.getBoundingClientRect();
        this.positionSet(item);
    }

    all(selector = ".tooltip") {
        this.items = document.querySelectorAll(selector);
        this.items.forEach((item) => {
            this.item = item;
            this.item.addEventListener('mouseover', (e) => {
                let citem = item;
                this.showTooltip(citem, e);
            });
            this.item.addEventListener('mouseout', () => {
                this.removeTooltip();
            });
        })
    }
}
