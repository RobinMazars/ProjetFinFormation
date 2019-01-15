console.log('class manipulator load');
class Manipulator {
  constructor(listeClass, grille) {
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
    var subGroup1 = $("<g id='figureGrpDown'></g>")
    var subGroup2 = $("<g id='figureGrpUp'></g>")
    group.append(subGroup1)
    group.append(subGroup2)
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
    if (this.findObject(pos) == null ||type.getClassName() != this.findObject(pos).getClass().getClassName()) {
      var object = new type(pos)
      //console.log(object);
      this.writeObject(object)
      this.addObject(object)
      refresh("#figureGrp")
    }

  }
  writeObject(object) {
    var classe = object.getClass().getClassName()
    var svg = object.getSvg();
    if (classe == 'Tapis') {
      $("#figureGrpDown").append(svg);
    }
    else {
      $("#figureGrpUp").append(svg);
    }

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
        if (typeof animation == 'object') {
          for (var i = 0; i < animation.length; i++) {
            $("#animationGrp").append(animation[i])
          }
        } else {
          $("#animationGrp").append(animation);
        }
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
        //console.log(classes[i].def());
        for (var j = 0; j < classes[i].def().length; j++) {
          var def = classes[i].def()[j]
          $("#svg").prepend(def)
        }
      } else {
        var def = classes[i].def()
        $("#svg").prepend(def)
      }

    }
  }
  findObject(position,excludeType='Default') {
    var find = null
    //console.log('position rechercher x'+position.x);
    //console.log('position rechercher y'+position.y);
    for (var i = 0; i < this.listeObject.length; i++) {
      //console.log('------object-----');
      var x = this.listeObject[i].pos.x
      var y = this.listeObject[i].pos.y
      //console.log('x '+x);
      //console.log('y '+y);
      if (x == position.x && y == position.y && excludeType != this.listeObject[i].getClass()) {
        var find = this.listeObject[i]
        console.log('match');
        break
      }
      //console.log('-----------');
    }
    return find
  }
  rotateObject(pos){
    var object = this.findObject(pos,Ore)
    if (object != null) {
      var queryObject=$("#object-" + object.getId())
      console.log(queryObject.attr('transform'));
      var actualDegree = findDigit(queryObject.attr('transform'))
      var newDegree =(parseInt(actualDegree)+90)%360;
      queryObject.attr('transform', 'rotate('+newDegree+')');
      refresh('#figureGrp')

    }
  }
  changeUrlDef(pos) {
    var object = this.findObject(pos,Ore)
    console.log(object);
    if (object != null) {
      var classObject = object.getClass()
      if (classObject.haveMultipleDef()) {
        var nextType = classObject.nextType(object.type)
        object.type = nextType
        console.log(nextType);
        $("#object-" + object.getId()).attr('fill', 'url(#Tapis-' + nextType + ')');
        refresh("#figureGrp")
      } else {
        console.log('object à un seul type');
      }
    } else {
      console.log("pas d'object trouvé");
    }



  }
}
