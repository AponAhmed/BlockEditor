import Component from "../Component.js";

export default class WPImageBrowser extends Component {
    constructor(parentComponent = {}, props = {}) {
        super(parentComponent, 'Image');
        this.props = { ...this.props, ...props };
        this.width = 200; // default width
        this.height = 150; // default height
        this.dom.classList.add('layout-image');
        this.img = document.createElement('img');
        if (!this.props.hasOwnProperty("src") || this.props.src == "") {
            this.openMediaUploader();
        } else {
            this.handleImageSelection(this.props.src);
        }
      
        this.makeResizable();
    }

    openMediaUploader() {
        const mediaUploader = wp.media({
            title: 'Select Image',
            multiple: false,
            library: {
                type: 'image',
            },
            button: {
                text: 'Select',
            },
        });

        mediaUploader.on('select', () => {
            const attachment = mediaUploader.state().get('selection').first().toJSON();
            this.props.src = attachment.url;
            this.width = attachment.width || this.width; // update width if available
            this.height = attachment.height || this.height; // update height if available
            this.handleImageSelection(attachment.url);
            this.updateDimensions();
        });

        mediaUploader.open();
    }

    updateDimensions() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);

        this.img.width = `${this.width}`;
        this.img.height = `${this.height}`;
        this.img.style.width = `${this.width}px`;
        this.img.style.height = `${this.height}px`;
        this.props.width = this.width;
        this.props.height = this.height;
    }

    makeResizable() {
        const resizePoints = document.createElement('div');
        resizePoints.classList.add('resize-points');
        for (let i = 0; i < 8; i++) {
            const point = document.createElement('div');
            point.addEventListener('mousedown', (event) => this.initResize(event, i));
            point.classList.add('resize-point');
            resizePoints.appendChild(point);
        }
        this.dom.appendChild(resizePoints);
        //end Resize pointers

        this.img.addEventListener('click', (event) => {
            event.stopPropagation();
            this.dom.classList.add('resize');
            // Listen for the delete key press
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Delete') {
                    this.remove();
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (!this.img.contains(event.target)) {
                if (this.dom.classList.contains('resize')) {
                    this.dom.classList.remove('resize');
                }
            }
        });
    }

    initResize(e, index) {
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = this.width;
        const startHeight = this.height;

        const handleResize = (event) => {
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;

            const ratio = startWidth / startHeight;

            switch (index) {
                case 0: // Top left
                    if (Math.abs(dx) / ratio > Math.abs(dy)) {
                        this.width = startWidth - dx;
                        this.height = (startWidth - dx) / ratio;
                    } else {
                        this.height = startHeight - dy;
                        this.width = (startHeight - dy) * ratio;
                    }
                    break;
                case 1: // Top middle
                    this.height = startHeight - dy;
                    break;
                case 2: // Top right
                    if (Math.abs(dx) / ratio > Math.abs(dy)) {
                        this.width = startWidth + dx;
                        this.height = (startWidth + dx) / ratio;
                    } else {
                        this.height = startHeight - dy;
                        this.width = (startHeight - dy) * ratio;
                    }
                    break;
                case 3: // Right middle
                    this.width = startWidth + dx;
                    this.height = startHeight;
                    break;
                case 4: // Bottom right
                    if (Math.abs(dx) / ratio > Math.abs(dy)) {
                        this.width = startWidth + dx;
                        this.height = (startWidth + dx) / ratio;
                    } else {
                        this.height = startHeight + dy;
                        this.width = (startHeight + dy) * ratio;
                    }
                    break;
                case 5: // Bottom middle
                    this.height = startHeight + dy;
                    break;
                case 6: // Bottom left
                    if (Math.abs(dx) / ratio > Math.abs(dy)) {
                        this.width = startWidth - dx;
                        this.height = (startWidth - dx) / ratio;
                    } else {
                        this.height = startHeight + dy;
                        this.width = (startHeight + dy) * ratio;
                    }
                    break;
                case 7: // Left middle
                    this.width = startWidth - dx;
                    this.height = startHeight;
                    break;
            }
            this.updateDimensions();
        };

        const stopResize = () => {
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', stopResize);
        };

        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
    }

    handleImageSelection(imageUrl) {
        this.img.src = imageUrl;
        this.dom.appendChild(this.img);
    }
}