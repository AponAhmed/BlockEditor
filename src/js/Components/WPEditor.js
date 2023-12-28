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
                value: this.html,
            });
            // Optionally, you can access the editor instance if needed
            const editorElement = document.getElementById(this.editorId);
            console.log(this.editorId);
            // Listen for events or do any additional setup if needed
            editorElement.addEventListener('input', () => {
                // Handle input events
                console.log('input');
            });
        }, 100);


        // You can now use the initialized editor as needed
    }
}