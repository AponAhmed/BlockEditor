import Component from "../Component.js";

export default class WPEditor extends Component {
    constructor(parentComponent = {}, props = {}) {
        super(parentComponent, 'Editor');

        this.props = { ...this.props, ...props };

        this.name = this.generateUniqueId("editor");
        this.html = this.props.content || "<p>Default Text</p>";

        this.dom = document.createElement('div');
        this.dom.classList.add('editor');
        this.editorId = `${this.name}_editor`; // Unique ID for the editor
        const textarea = document.createElement('textarea');
        textarea.id = this.editorId;
        this.dom.appendChild(textarea);
    }

    generateUniqueId(prefix = 'id') {
        const timestamp = new Date().getTime().toString(16); // Convert timestamp to hexadecimal
        const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string

        return `${prefix}_${timestamp}_${randomString}`;
    }

    update() {
        if (this.parentArea) {
            this.parentArea.updateData();
        }
    }

    initializeWPEditor() {
        const editorSettings = {
            tinymce: {
                wpautop: true,
                plugins: 'wordpress,wpautoresize,wpeditimage,wpgallery,wplink,wpdialogs',
                toolbar1: 'formatselect,bold,italic,bullist,numlist,blockquote,alignleft,aligncenter,alignright,link,wp_adv',
                toolbar2: 'strikethrough,hr,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help',
                toolbar3: '',
                toolbar4: '',
            },
            quicktags: true,
            mediaButtons: true,
        };




        setTimeout(() => {
            wp.editor.initialize(this.editorId, {
                ...editorSettings,
                value: this.html,  // Set initial content here
            });

            // Access the TinyMCE editor instance
            const editorElement = tinymce.editors[this.editorId];

            setTimeout(() => {
                // Set the initial content
                editorElement.setContent(this.html);
            }, 100);

            // Listen for keydown events
            editorElement.on('keydown', (event) => {
                // Handle keydown events
                this.props.content = editorElement.getContent();
                this.update();
                // Optionally, update this.data or perform other actions based on key press
            });
        }, 100);
    }
}