# Block Editor Overview

The Block Editor is a robust web development tool that simplifies the creation of dynamic and customizable HTML layouts. Developed with HTML, CSS, and JavaScript, it empowers web developers to efficiently construct content-rich pages.

## Installation
```bash
   npm i @aponahmed/blockeditor --save-dev
```

## Uses
```javascript
import layoutBuilder from '@aponahmed/blockeditor';

let LayoutBuilder = new layoutBuilder(document.getElementById("customAreaBuilder"), document.getElementById("layoutData"));

LayoutBuilder.addTemplate({
    icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="25" height="25" rx="0.5" fill="white" stroke="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19 17.5C19 17.7761 18.7761 18 18.5 18H3.5C3.22386 18 3 17.7761 3 17.5V17.5C3 17.2239 3.22386 17 3.5 17H18.5C18.7761 17 19 17.2239 19 17.5V17.5Z" fill="black" fill-opacity="0.6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 19.5C22 19.7761 21.7761 20 21.5 20H3.5C3.22386 20 3 19.7761 3 19.5V19.5C3 19.2239 3.22386 19 3.5 19H21.5C21.7761 19 22 19.2239 22 19.5V19.5Z" fill="#555555"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15 21.5C15 21.7761 14.7761 22 14.5 22H3.5C3.22386 22 3 21.7761 3 21.5V21.5C3 21.2239 3.22386 21 3.5 21H14.5C14.7761 21 15 21.2239 15 21.5V21.5Z" fill="#555555"/><rect x="14" y="3" width="9" height="11" fill="#D3D3D3"/><rect x="3" y="3" width="8" height="2" rx="1" fill="#626262"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.5C12 7.77614 11.7761 8 11.5 8H3.5C3.22386 8 3 7.77614 3 7.5V7.5C3 7.22386 3.22386 7 3.5 7H11.5C11.7761 7 12 7.22386 12 7.5V7.5Z" fill="#BBBBBB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11 9.5C11 9.77614 10.7761 10 10.5 10H3.5C3.22386 10 3 9.77614 3 9.5V9.5C3 9.22386 3.22386 9 3.5 9H10.5C10.7761 9 11 9.22386 11 9.5V9.5Z" fill="#BBBBBB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 11.5C12 11.7761 11.7761 12 11.5 12H3.5C3.22386 12 3 11.7761 3 11.5V11.5C3 11.2239 3.22386 11 3.5 11H11.5C11.7761 11 12 11.2239 12 11.5V11.5Z" fill="#BBBBBB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 13.5C10 13.7761 9.77614 14 9.5 14H3.5C3.22386 14 3 13.7761 3 13.5V13.5C3 13.2239 3.22386 13 3.5 13H9.5C9.77614 13 10 13.2239 10 13.5V13.5Z" fill="#BBBBBB"/></svg>`,
    json: `[{"type":"Area","width":100,"direction":"row","childs":[{"width":50,"direction":"column","type":"Area","childs":[{"type":"H","align":"left","more":{"customClass":""},"content":"Write Here your Heading"},{"type":"P","align":"left","more":{"customClass":""},"content":"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. "}],"more":{"customClass":"","styles":{}}},{"width":50,"direction":"row","type":"Area","childs":[],"more":{"customClass":"","styles":{}}}],"more":{"customClass":"","styles":{}}},{"type":"Area","width":100,"direction":"row","childs":[{"type":"P","align":"left","more":{"customClass":""},"content":"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. "}],"more":{"customClass":"","styles":{}}}]`
})
LayoutBuilder.addTemplate({
    icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="25" height="25" rx="0.5" fill="white" stroke="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19 17.5C19 17.7761 18.7761 18 18.5 18H3.5C3.22386 18 3 17.7761 3 17.5V17.5C3 17.2239 3.22386 17 3.5 17H18.5C18.7761 17 19 17.2239 19 17.5V17.5Z" fill="black" fill-opacity="0.6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 19.5C22 19.7761 21.7761 20 21.5 20H3.5C3.22386 20 3 19.7761 3 19.5V19.5C3 19.2239 3.22386 19 3.5 19H21.5C21.7761 19 22 19.2239 22 19.5V19.5Z" fill="#555555"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15 21.5C15 21.7761 14.7761 22 14.5 22H3.5C3.22386 22 3 21.7761 3 21.5V21.5C3 21.2239 3.22386 21 3.5 21H14.5C14.7761 21 15 21.2239 15 21.5V21.5Z" fill="#555555"/><rect x="14" y="3" width="9" height="11" fill="#D3D3D3"/><rect x="3" y="3" width="8" height="2" rx="1" fill="#626262"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.5C12 7.77614 11.7761 8 11.5 8H3.5C3.22386 8 3 7.77614 3 7.5V7.5C3 7.22386 3.22386 7 3.5 7H11.5C11.7761 7 12 7.22386 12 7.5V7.5Z" fill="#BBBBBB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11 9.5C11 9.77614 10.7761 10 10.5 10H3.5C3.22386 10 3 9.77614 3 9.5V9.5C3 9.22386 3.22386 9 3.5 9H10.5C10.7761 9 11 9.22386 11 9.5V9.5Z" fill="#BBBBBB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 11.5C12 11.7761 11.7761 12 11.5 12H3.5C3.22386 12 3 11.7761 3 11.5V11.5C3 11.2239 3.22386 11 3.5 11H11.5C11.7761 11 12 11.2239 12 11.5V11.5Z" fill="#BBBBBB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 13.5C10 13.7761 9.77614 14 9.5 14H3.5C3.22386 14 3 13.7761 3 13.5V13.5C3 13.2239 3.22386 13 3.5 13H9.5C9.77614 13 10 13.2239 10 13.5V13.5Z" fill="#BBBBBB"/></svg>`,
    json: `[{"type":"Area","width":100,"direction":"row","childs":[{"width":50,"direction":"column","type":"Area","childs":[{"type":"H","align":"left","more":{"customClass":""},"content":"Write Here your Heading"},{"type":"P","align":"left","more":{"customClass":""},"content":"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. "}],"more":{"customClass":"","styles":{}}},{"width":50,"direction":"row","type":"Area","childs":[],"more":{"customClass":"","styles":{}}}],"more":{"customClass":"","styles":{}}},{"type":"Area","width":100,"direction":"row","childs":[{"type":"P","align":"left","more":{"customClass":""},"content":"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. "}],"more":{"customClass":"","styles":{}}}]`
})

LayoutBuilder.init();
```

## JSON to HTML Building Reference with PHP and JavaScript
   - PHP [PHP-Client-for-Block-Editor](https://github.com/AponAhmed/PHP-Client-for-Block-Editor)
  ```bash 
   composer require aponahmed/blockeditor-php-client
  ```
   - JS [JS-Client-for-Block-Editor](https://github.com/AponAhmed/JS-Client-for-Block-Editor)
  ```bash 
   npm i @aponahmed/blockeditor-js-client
  ```

## Demo
A quick preview [Codepen](https://codepen.io/apon22/full/abXPPyB)

## Key Components

1. **Component**
   - The foundational building block for various elements within the editor.
   - Subclasses include specialized components like `Column`, `Heading`, `List`, and `Paragraph`.

2. **Column**
   - Facilitates the creation of column-based layouts.
   - Allows for flexible structuring of content within an area.

3. **Heading**
   - Generates heading elements, offering a straightforward way to incorporate titles and headers into the editor.

4. **List**
   - Enables the integration of lists, providing a structured and organized approach to displaying content.

5. **Paragraph**
   - Allows for the inclusion of text paragraphs, supporting rich content creation with a WYSIWYG editor.

6. **Area**
   - Serves as a container for organizing and managing components.
   - Supports features like resizing, directional changes, and context menus for enhanced user interaction.

7. **ComponentRegistry**
   - Streamlines the process of managing and accessing various components.
   - Promotes modularity and extensibility.

8. **DOMBuilder**
   - Acts as a utility for constructing and manipulating HTML elements.
   - Provides a clean and efficient way to generate dynamic content.

## Features

- **Modularity**
  - Components can be easily added or removed, promoting a modular and scalable approach to building layouts.

- **Customization**
  - Allows customization of individual components through properties, such as custom classes, padding, background, border, and border radius.

- **Context Menus**
  - Provide quick access to actions like creating new areas, inserting components, deleting areas, changing direction, resizing, and accessing properties.

- **Resizable Layouts**
  - Users can dynamically resize areas, enhancing the flexibility of the editor in adapting to various content needs.

- **Component Browser**
  - A convenient component browser facilitates the insertion of new components, streamlining the development process.

## Extensibility

The Block Editor's design emphasizes extensibility, allowing developers to enhance and customize its functionality.

- **Component Customization**
  - Developers can extend existing components or create new ones to suit specific project requirements.

- **Event Handling**
  - Custom event handling allows developers to respond to user interactions and extend the editor's behavior.

## Usage

Developers can leverage the Block Editor to effortlessly construct and customize web page layouts. Whether it's creating simple text paragraphs or intricate column-based designs, the editor offers a user-friendly interface for efficient content creation.

## Conclusion

With its comprehensive set of classes and features, the Block Editor represents a powerful tool for web developers seeking a flexible and intuitive solution for building dynamic and visually appealing web pages.
