console.log('class manipulator load');
class Manipulator {
  constructor() {
    this.listeObject = [];
    this.listeClass = [];
  }

  placeObject(object) {
    var svg = object.getSvg();
    $("#svg").append(svg);
  }
  placeAll() {
    for (var i = 0; i < this.listeObject.length; i++) {
      this.placeObject(this.listeObject[i]);
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
  placeDef() {
    for (var i = 0; i < this.listeClass.length; i++) {
      var def = this.listeClass[i].def()
      $("#svg").prepend(def)
    }
    refresh()
  }

}
