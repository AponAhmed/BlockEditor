import Component from "../Component.js";

export default class ImageBrowser extends Component {
    constructor(name) {
        super(name, 'Image');
        this.dom = document.createElement('div');
        this.dom.classList.add('layout-image');
        this.openMediaUploader();
    }

    openMediaUploader() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', (event) => this.handleFileSelection(event));
        input.click();
    }

    handleFileSelection(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                this.handleImageSelection(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    }

    handleImageSelection(imageUrl) {
        console.log('Selected Image URL:', imageUrl);
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        this.dom.appendChild(imageElement);
    }
}