import Heading from "./Components/Heading.js";
import Paragraph from "./Components/Paragraph.js";
import Column from "./Components/Column.js";
import List from "./Components/List.js";
import WPImageBrowser from "./Components/WPImageBrowser.js";
import StaticImageBrowser from "./Components/StaticImageBrowser.js";
import WPEditor from "./Components/WPEditor.js";
import ImageBrowser from "./Components/ImageBrowser.js";

const ComponentIcons = {
  txt: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 9V7.2C8 7.08954 8.08954 7 8.2 7L12 7M16 9V7.2C16 7.08954 15.9105 7 15.8 7L12 7M12 7L12 17M12 17H10M12 17H14"></path></svg>',
  heading:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 7L9 12M9 17V12M9 12L15 12M15 7V12M15 17L15 12"></path></svg>',
  image:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"></rect><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.13968 15.32L8.69058 11.5661C9.02934 11.2036 9.48873 11 9.96774 11C10.4467 11 10.9061 11.2036 11.2449 11.5661L15.3871 16M13.5806 14.0664L15.0132 12.533C15.3519 12.1705 15.8113 11.9668 16.2903 11.9668C16.7693 11.9668 17.2287 12.1705 17.5675 12.533L18.841 13.9634"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.7778 9.33331H13.7867"></path></svg>',
  list: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><line x1="12" x2="19" y1="7" y2="7" stroke="currentColor" stroke-linecap="round" stroke-width="2"></line><line x1="12" x2="19" y1="12" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"></line><line x1="12" x2="19" y1="17" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"></line><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.79999 14L7.79999 7.2135C7.79999 7.12872 7.7011 7.0824 7.63597 7.13668L4.79999 9.5"></path></svg>',
  column:
    '<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z"></path></svg>',
  editor: `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><circle cx="256" cy="256" r="26"/><circle cx="346" cy="256" r="26"/><circle cx="166" cy="256" r="26"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M160 368L32 256l128-112M352 368l128-112-128-112"/></svg>`,
};

let ImageDynamicClass = ImageBrowser; //Default System Image Browser with base 64
if (typeof wp !== "undefined") {
  //Image Browser For WordPress
  ImageDynamicClass = WPImageBrowser;
} else if (typeof static_cms !== "undefined") {
  //Image Browser For Static CMS
  ImageDynamicClass = StaticImageBrowser;
}

const ComponentLists = [
  { type: "H", label: "Heading", icon: ComponentIcons.heading, cls: Heading },
  { type: "P", label: "Paragraph", icon: ComponentIcons.txt, cls: Paragraph },
  {
    type: "Image",
    label: "Image",
    cls: ImageDynamicClass,
    icon: ComponentIcons.image,
  },
  { type: "Column", label: "Column", icon: ComponentIcons.column, cls: Column },
  { type: "List", label: "List", icon: ComponentIcons.list, cls: List },
  {
    type: "Editor",
    label: "Editor",
    cls: WPEditor,
    icon: ComponentIcons.editor,
  },
];

export default ComponentLists;
