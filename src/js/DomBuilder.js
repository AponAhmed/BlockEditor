/**
 * DOMBuilder - A utility class for building and manipulating HTML elements.
 * 
 * @class
 */
export default class DOMBuilder {
    /**
     * Create a new DOMBuilder instance.
     * @constructor
     */
    constructor() {
        this.element = null;
    }

    /**
     * Create a new HTML element with optional content.
     * 
     * @param {string} tagName - The HTML tag name (e.g., 'div', 'p', 'a').
     * @param {string} [content=''] - The optional content for the element.
     * @returns {DOMBuilder} - The current DOMBuilder instance.
     */
    create(tagName, content = '', html = false) {
        this.element = document.createElement(tagName);
        if (content) {
            if (html) {
                this.element.innerHTML = content;
            } else {
                this.element.textContent = content;
            }
        }
        return this;
    }

    /**
     * Set attributes for the current element.
     * 
     * @param {Object} attributes - An object containing attribute key-value pairs.
     * @returns {DOMBuilder} - The current DOMBuilder instance.
     */
    attr(attributes = {}) {
        for (const key in attributes) {
            this.element.setAttribute(key, attributes[key]);
        }
        return this;
    }

    /**
     * Add a class to the current element.
     * 
     * @param {string} className - The class name to add.
     * @returns {DOMBuilder} - The current DOMBuilder instance.
     */
    class(className) {
        this.element.classList.add(className);
        return this;
    }

    /**
     * Add multiple classes to the current element.
     * 
     * @param {string[]} classList - An array of class names to add.
     * @returns {DOMBuilder} - The current DOMBuilder instance.
     */
    classes(classList) {
        if (Array.isArray(classList)) {
            this.element.classList.add(...classList);
        }
        return this;
    }

    /**
     * Set the id attribute for the current element.
     * 
     * @param {string} id - The id value to set.
     * @returns {DOMBuilder} - The current DOMBuilder instance.
     */
    id(id) {
        this.element.id = id;
        return this;
    }

    /**
     * Set the title attribute for the current element.
     * 
     * @param {string} title - The title value to set.
     * @returns {DOMBuilder} - The current DOMBuilder instance.
     */
    title(title) {
        this.element.title = title;
        return this;
    }

    /**
     * Get the created HTML element.
     * 
     * @returns {HTMLElement} - The created HTML element.
     */
    getElement() {
        return this.element;
    }

    /**
     * Append the current element to another element.
     * 
     * @param {HTMLElement} targetElement - The target element to append to.
     * @returns {DOMBuilder} - The current DOMBuilder instance.
     */
    appendTo(targetElement) {
        if (targetElement instanceof HTMLElement) {
            targetElement.appendChild(this.element);
        }
        return this;
    }

    /**
    * Set the value of an input element.
    * 
    * @param {string} value - The value to set.
    * @returns {DOMBuilder} - The current DOMBuilder instance.
    */
    value(value) {
        if (this.element instanceof HTMLInputElement) {
            this.element.value = value;
        }
        return this;
    }

    /**
     * Append one or more elements to the current element.
     * 
     * @param {(HTMLElement|DOMBuilder|HTMLElement[]|DOMBuilder[])} elements - Elements to append.
     * @returns {DOMBuilder} - The current DOMBuilder instance.
     */
    append(elements) {
        if (Array.isArray(elements)) {
            elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    this.element.appendChild(element);
                } else if (element instanceof DOMBuilder) {
                    this.element.appendChild(element.getElement());
                }
            });
        } else if (elements instanceof HTMLElement) {
            this.element.appendChild(elements);
        } else if (elements instanceof DOMBuilder) {
            this.element.appendChild(elements.getElement());
        }
        return this;
    }

    /**
     * Set the source (src) attribute for an image element.
     * Only works when the current element is an image (<img>).
     * 
     * @param {string} src - The source URL for the image.
     * @returns {DOMBuilder} - The current DOMBuilder instance.
     */
    setSrc(src) {
        if (this.element instanceof HTMLImageElement) {
            this.element.src = src;
        }
        return this;
    }

    /**
     * Attach an event listener to the current element.
     * 
     * @param {string} eventName - The name of the event (e.g., 'click', 'change').
     * @param {Function} callback - The callback function to be executed when the event occurs.
     * @returns {DOMBuilder} - The current DOMBuilder instance.
     * @example
     * const builder = new DOMBuilder();
     * const myButton = builder.button('Click me')
     *   .class('my-button')
     *   .appendTo(document.body)
     *   .event('click', () => {
     *     alert('Button clicked!');
     *   });
     */
    event(eventName, callback) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener(eventName, callback);
        }
        return this;
    }

    /**
     * Static method to create a DOMBuilder instance from existing HTML.
     * Preserves event handlers on elements.
     * 
     * @static
     * @param {string} htmlString - The HTML string to parse.
     * @returns {DOMBuilder} - A new DOMBuilder instance with the parsed HTML element.
     */
    static fromHTML(htmlString) {
        const parser = new DOMParser();
        const parsedDocument = parser.parseFromString(htmlString, 'text/html');
        const builder = new DOMBuilder();
        builder.element = parsedDocument.body.firstChild.cloneNode(true); // Cloning with event listeners
        return builder;
    }
}

