import ImageBrowser from "./ImageBrowser.js";

export default class WPImageBrowser extends ImageBrowser {
  constructor(parentComponent = {}, props = {}) {
    super(parentComponent, props);
  }

  openMediaUploader() {
    const mediaUploader = wp.media({
      title: "Select Image",
      multiple: false,
      library: {
        type: "image",
      },
      button: {
        text: "Select",
      },
    });

    mediaUploader.on("select", () => {
      const attachment = mediaUploader
        .state()
        .get("selection")
        .first()
        .toJSON();
      this.props.src = attachment.url;
      this.props.id = attachment.id;
      this.width = attachment.width || this.width; // update width if available
      this.height = attachment.height || this.height; // update height if available
      this.handleImageSelection(attachment.url);
      this.updateDimensions();
    });

    mediaUploader.open();
  }
}
