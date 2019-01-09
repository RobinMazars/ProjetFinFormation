console.log('class manipulator load');
class Manipulator {
  constructor() {
    this.listeObject = [];
    this.listeClass = [];
    this.grille=new Grille();
    this.bindOnCLick()
  }
  getPosMouse(e) {
        var container =document.getElementById('frame')
        var offset = container.getBoundingClientRect();
        var styles = window.getComputedStyle(container);
        var cursorX = e.clientX - offset.left - parseInt(styles.borderLeftWidth);
        var cursorY = e.clientY - offset.top - parseInt(styles.borderTopWidth);
        console.log(cursorX,cursorY);
        return {
          x: cursorX,
          y: cursorY
        }
      }
  bindOnCLick() {
    var manipulator=this // HACK:
    $("#frame").click(function(event) {
      console.log("bind");
      manipulator.onClick(event)
    });
  }
  onClick(event){
    var posMouse = this.getPosMouse(event);
    this.calcPos(posMouse)
  }
  calcPos(posMouse){

    var x=Math.floor(posMouse.x / this.grille.caseWidth);
    var y=Math.floor(posMouse.y / this.grille.caseHeight);
    x=x*this.grille.caseWidth
    y=y*this.grille.caseHeight

    var direction='0'
    var pos= new Position(x.toString(),y.toString(),direction);
    console.log(pos);
    this.placeObject(Tapis,pos)
  }
  placeObject(type,pos){
    var object =new type(pos)
    console.log(object);
    this.writeObject(object)
    refresh()
  }
  writeObject(object) {
    var svg = object.getSvg();
    $("#svg").append(svg);
  }
  writeAll() {
    for (var i = 0; i < this.listeObject.length; i++) {
      this.writeObject(this.listeObject[i]);
    }
    refresh();
  }
  animAll() {
    $(".animation").remove();
    for (var i = 0; i < this.listeClass.length; i++) {
      if (typeof this.listeClass[i].getAnimation === 'function') {
        var animation = this.listeClass[i].getAnimation();
        $("#svg").append(animation);
      }
    }
    refresh();
  }
  moveAll() {
    for (var i = 0; i < this.listeObject.length; i++) {
      if (typeof this.listeObject[i].getMove === 'function') {
        var move =this.listeObject[i].getMove();
        console.log(move);
        $("#svg").append(move);
      }
    }
    refresh();
  }
  addObject(object) {
    this.listeObject.push(object);
  }
  setListeClass(listeClass) {
    this.listeClass = listeClass;
  }
  writeDef() {
    for (var i = 0; i < this.listeClass.length; i++) {
      var def = this.listeClass[i].def()
      $("#svg").prepend(def)
    }
    refresh()
  }

}
