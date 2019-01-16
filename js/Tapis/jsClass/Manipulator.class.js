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
    this.listeObjectChange = []
    this.affListeObject()
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
    var objectOnPlace = this.findObject(pos)
    if (objectOnPlace == null || type.getClassName() != objectOnPlace.getClass().getClassName()) {
      var object = new type(pos)
      //console.log(object);
      this.addObject(object)
      this.writeObject(object)
      refresh("#figureGrp")
    }
  }
  writeObject(object) {
    var classe = object.getClass().getClassName()
    var svg = object.getSvg();
    if (classe == 'Tapis') {
      $("#figureGrpDown").append(svg);
    } else {
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
  calcDirection(type, direction) {
    if (type == 'forward') {
      return direction
    }
    if (type == 'left') {
      if (direction == 0) {
        return 3
      } else {
        return direction - 1
      }
    }
    if (type == 'right') {
      return (direction + 1) % 4
    }
  }
  calcMove(direction) {
    if (direction == 0) {
      return {
        axe: 'y',
        signe: '-'
      }
    } else if (direction == 1) {
      return {
        axe: 'x',
        signe: '+'
      }
    } else if (direction == 2) {
      return {
        axe: 'y',
        signe: '+'
      }
    } else {
      return {
        axe: 'x',
        signe: '-'
      }
    }
  }
  moveAll() {
    for (var i = 0; i < this.listeObject.length; i++) {
      if (typeof this.listeObject[i].getMove === 'function') {
        var tapisUnder = this.findObject(this.listeObject[i].pos,Ore)

        if (tapisUnder != null) {
          console.log('tapisUnder '+tapisUnder.getId());
          console.log(tapisUnder.type);

          console.log('tapisUnder direction '+tapisUnder.pos.direction);
          var moveDirection = this.calcDirection(tapisUnder.type,
            tapisUnder.pos.direction)

          console.log("direction move "+moveDirection);
          var direction = this.calcMove(moveDirection)
          console.log(direction);

          var move = this.listeObject[i].getMove(direction, this.grille.caseWidth, this.grille.caseHeight)
          $("#animationGrp").append(move.svg);
          console.log(this.listeObjectChange);

          this.listeObjectChange.push({
            object: this.listeObject[i],
            posFinal: move.posFinal,
            axe: direction.axe,
            index: i
          })
        }
      }
    }
  }
  rewriteAll() {
    console.log('rewrite time');
    var liste = this.listeObjectChange
    console.log(this.listeObjectChange.length);
    for (var i = 0; i < liste.length; i++) {
      this.rewriteObject(liste[i].object, liste[i].posFinal, liste[i].axe, liste[i].index)
    }
    this.listeObjectChange=[]
    refresh("#figureGrp")
  }
  rewriteObject(object, posFinal, axe, index) {

    var id = object.getId()
    console.log('rewriteObject with id '+id);
    $("#object-" + id).remove()
    if (axe == 'x') {
      object.pos.x = parseInt(posFinal)
    } else {
      object.pos.y = parseInt(posFinal)
    }
    this.affListeObject()
    object.setSvg()
    this.writeObject(object)
  }
  run() {
    $(".animation").remove();
    this.animAll()
    this.moveAll()
    console.log(this.listeObjectChange);
    refresh()
    var _this = this
    setTimeout(function() { _this.rewriteAll(); }, 500);
  }
  addObject(object) {
    this.listeObject.push(object);
  }
  affListeObject(){
    console.log("liste------");
    for (var i = 0; i < this.listeObject.length; i++) {
      console.log("object--");
      console.log("x:"+this.listeObject[i].pos.x)
      console.log("y:"+this.listeObject[i].pos.y)
      console.log("--");
    }
    console.log("------");
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
  findObject(position, excludeType = 'Default') {
    var find = null
    console.log('position rechercher x'+position.x);
    console.log('position rechercher y'+position.y);
    for (var i = 0; i < this.listeObject.length; i++) {
      // console.log('------object-----');
      var x = this.listeObject[i].pos.x
      var y = this.listeObject[i].pos.y

      console.log('id '+this.listeObject[i].getId());
      console.log('x '+x);
      console.log('y '+y);
      console.log('-----------');
      if (x == position.x && y == position.y && excludeType != this.listeObject[i].getClass()) {
        var find = this.listeObject[i]
        console.log('match');
        console.log('id find ' + find.getId());
        break
      }

    }
    return find
  }
  rotateObject(pos) {
    var object = this.findObject(pos, Ore)
    if (object != null) {
      var queryObject = $("#object-" + object.getId())
      console.log(queryObject.attr('transform'));
      var actualDegree = findDigit(queryObject.attr('transform'))
      var newDegree = (parseInt(actualDegree) + 90) % 360;
      queryObject.attr('transform', 'rotate(' + newDegree + ')');
      object.pos.direction = (object.pos.direction + 1) % 4
      refresh('#figureGrp')

    }
  }
  changeUrlDef(pos) {
    var object = this.findObject(pos, Ore)
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
