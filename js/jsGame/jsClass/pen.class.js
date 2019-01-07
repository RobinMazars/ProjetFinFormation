class Pen {
  constructor(color='black',width='5') {
    this.color=color;
    this.width=width;
  }
  setColor(newColor){
    this.color=newColor
  }
  setWidth(newWidth){
    this.width=newWidth
  }
  getColor(){
    return this.color
  }
  getWidth(){
    return this.width
  }
  getPos(e,canvas) {
        var offset = canvas.getBoundingClientRect();
        var styles = window.getComputedStyle(canvas);
        var cursorX = e.clientX - offset.left - parseInt(styles.borderLeftWidth);
        var cursorY = e.clientY - offset.top - parseInt(styles.borderTopWidth);
        return {
          x: cursorX,
          y: cursorY
        }
      }

}
