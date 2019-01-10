console.log('class manipulator load');
class Manipulator {
  constructor(listeClass) {
    this.listeObject = [];
    this.listeClass = listeClass;
    this.writeDef()
    this.grille = new Grille();
    this.bindOnCLick()
    this.regroup()
    this.addSelector()
  }
  addSelector() {
    $("<div id='selector'> </div>").insertAfter("#frame")
    for (var i = 0; i < this.listeClass.length; i++) {
      var className = this.listeClass[i].getClassName();
      console.log(className);
      $("#selector").append(("<button type='button' class='selectorItem'>" + className + "</button>"));
    }
    $('.selectorItem:first').addClass('selected')
    this.selected = this.listeClass[0]
    var manipulator = this // HACK:
    $('.selectorItem').click(function(event) {
      manipulator.changeSelector(this)
    });

  }
  changeSelector(selected) {
    $('.selectorItem').removeClass('selected')
    $(selected).addClass('selected')
    for (var i = 0; i < this.listeClass.length; i++) {
      if (this.listeClass[i].getClassName() == $(selected).html()) {
        this.selected = this.listeClass[i]
        break
      }
    }

  }
  regroup() {
    var group = $("<g id='figureGrp'></g>")
    $("#svg").append(group);
    var group = $("<g id='animationGrp'></g>")
    $("#svg").append(group);
  }
  getPosMouse(e) {
    var container = document.getElementById('frame')
    var offset = container.getBoundingClientRect();
    var styles = window.getComputedStyle(container);
    var cursorX = e.clientX - offset.left - parseInt(styles.borderLeftWidth);
    var cursorY = e.clientY - offset.top - parseInt(styles.borderTopWidth);
    //console.log(cursorX, cursorY);
    return {
      x: cursorX,
      y: cursorY
    }
  }
  bindOnCLick() {
    var manipulator = this // HACK:
    $("#frame").click(function(event) {
      //console.log("bind");
      manipulator.onClick(event)
    });
  }
  onClick(event) {
    var posMouse = this.getPosMouse(event);
    var pos = this.calcPos(posMouse)
    this.placeObject(this.selected, pos)
  }
  calcPos(posMouse) {
    var x = Math.floor(posMouse.x / this.grille.caseWidth);
    var y = Math.floor(posMouse.y / this.grille.caseHeight);
    x = Math.floor(x * this.grille.caseWidth)
    y = Math.floor(y * this.grille.caseHeight)
    var direction = '0'
    var pos = new Position(x.toString(), y.toString(), direction);
    return pos;
  }
  placeObject(type, pos) {
    var object = new type(pos)
    //console.log(object);
    this.writeObject(object)
    this.addObject(object)
    refresh("#figureGrp")
  }
  writeObject(object) {
    var svg = object.getSvg();
    $("#figureGrp").append(svg);
  }
  writeAll() {
    for (var i = 0; i < this.listeObject.length; i++) {
      this.writeObject(this.listeObject[i]);
    }
    refresh()
  }
  animAll() {
    for (var i = 0; i < this.listeClass.length; i++) {
      if (typeof this.listeClass[i].getAnimation === 'function') {
        var animation = this.listeClass[i].getAnimation();
        $("#animationGrp").append(animation);
      }
    }
  }
  moveAll() {
    for (var i = 0; i < this.listeObject.length; i++) {
      if (typeof this.listeObject[i].getMove === 'function') {
        var move = this.listeObject[i].getMove();
        //console.log(move);
        $("#animationGrp").append(move);
      }
    }
  }
  run() {
    $(".animation").remove();
    this.moveAll()
    this.animAll()
    refresh()
  }
  addObject(object) {
    this.listeObject.push(object);
  }
  writeDef() {
    for (var i = 0; i < this.listeClass.length; i++) {
      var def = this.listeClass[i].def()
      $("#svg").prepend(def)
    }
  }

}
