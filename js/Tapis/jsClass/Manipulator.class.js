console.log('class manipulator load');
class Manipulator {
  constructor(listeClass,grille) {
    this.listeObject = [];
    this.listeClass = listeClass;
    this.writeDef()
    this.grille = new Grille();
    this.regroup()
    this.addSelector()
    this.eventController = new EventController(this)
  }
  addSelector() {
    $("<div id='selector'> </div>").insertAfter("#frame")
    for (var i = 0; i < this.listeClass.length; i++) {
      var className = this.listeClass[i].getClassName();
      console.log(className);
      $("#selector").append(("<button type='button' class='selectorItem'>" + className + "</button>"));
    }
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
    var classes = this.listeClass;
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].haveMultipleDef()) {
        console.log('in');
        console.log(classes[i].def());
        for (var j = 0; j < classes[i].def().length; j++) {
          var def =classes[i].def()[j]
          $("#svg").prepend(def)
        }
      } else {
        console.log('out');
        var def = classes[i].def()
        $("#svg").prepend(def)
      }

    }
  }
  findObject(position){
    console.log('position rechercher '+position.x);
    var find =null
    for (var i = 0; i < this.listeObject.length; i++) {
      console.log('pos.x = '+this.listeObject[i].pos.x)
      var x= this.listeObject[i].pos.x
      var y= this.listeObject[i].pos.y
      if (x==position.x && y==position.y) {
        console.log('match');
        var find=this.listeObject[i]
        break
      }
    }
    return find
  }
  changeUrlDef(pos){
    var object = this.findObject(pos)
    if (object != null ) {
      console.log(object.getId());
      console.log(object.type);
      var classObject = object.getClass()
      if (classObject.haveMultipleDef()) {
        var nextType =classObject.nextType(object.type)
        console.log(nextType);
        object.type=nextType
        $("#object-"+object.getId()).attr('fill', 'url(#Tapis-'+nextType+')');
        refresh()
      }
      else {
        console.log('object à un seul type');
      }

    }
    else {
      console.log("pas d'object trouvé");
    }



  }
}
