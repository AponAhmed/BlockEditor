import ImageBrowser from "./ImageBrowser.js";

export default class StaticImageBrowser extends ImageBrowser {
  constructor(parentComponent = {}, props = {}) {
    super(parentComponent, props);
  }

  openMediaUploader() {
    if (typeof browseMedia === "function") {
      browseMedia((item, browser) => {
        const src = browser.getSrc(false); //Full Size(size as Param)
        this.props.src = src;
        this.props.id = item.id;
        this.setdimensionAuto(this.props.src);
        this.handleImageSelection(src);
        this.updateDimensions();
      });
    } else {
      alert("Not Found media Browser !");
      throw new Error("Not Found media Browser !");
    }
  }
}
