class Draggable {
    constructor(domElement, handlerElement) {
      this.domElement = domElement;
      this.handlerElement = handlerElement || domElement;
  
      this.isDragging = false;
      this.startX = 0;
      this.startY = 0;
  
      this.initialize();
    }
  
    initialize() {
      this.handlerElement.addEventListener('mousedown', this.handleMouseDown.bind(this));
      document.addEventListener('mousemove', this.handleMouseMove.bind(this));
      document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }
  
    handleMouseDown(event) {
      this.isDragging = true;
      let clRect=this.domElement.getBoundingClientRect();
      //this.startX=clRect.clientX;
      //this.startX=clRect.clientX;
      this.startX = event.clientX;
      this.startY = event.clientY;
  
      // Prevent text selection during drag
      event.preventDefault();
    }
  
    handleMouseMove(event) {
      if (this.isDragging) {
        const dx = event.clientX - this.startX;
        const dy = event.clientY - this.startY;
  
        const currentX = parseInt(this.domElement.style.left) || 0;
        const currentY = parseInt(this.domElement.style.top) || 0;
        
  
        this.domElement.style.left = `${currentX + dx}px`;
        this.domElement.style.top = `${currentY + dy}px`;
  
        this.startX = event.clientX;
        this.startY = event.clientY;
      }
    }
  
    handleMouseUp() {
      this.isDragging = false;
    }
  }
  

export default Draggable;