console.log('class manipulator load');
class Manipulator {
  constructor(
    listeClass, grille) {
    this.listeObject = [];
    this.listeClass = listeClass;
    this.writeDef()
    this.grille = new Grille();
    this.regroup()
    this.addSelector()
    this.saver = new SaveManipulator(this)
    this.eventController = new EventController(this, this.saver)
    this.listeObjectChange = []
    //this.affListeObject()
  }
  addSelector() {
    $("<div id='selector'> </div>").insertAfter("#containerFrameControl")
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
  reset(listeObjectLoad) {
    $("#figureGrpUp").empty()
    $("#figureGrpDown").empty()
    this.listeObject = [];
    for (var i = 0; i < listeObjectLoad.length; i++) {
      //console.log(listeObjectLoad[i].classe)
      var classe;
      if (listeObjectLoad[i].classe == 'Tapis') {
        classe = Tapis
        this.placeObject(classe, listeObjectLoad[i].pos)
        //console.log(listeObjectLoad[i].type);
        this.changeUrlDef(listeObjectLoad[i].pos, listeObjectLoad[i].type)

      } else if (listeObjectLoad[i].classe == 'Ore') {
        classe = Ore
        this.placeObject(classe, listeObjectLoad[i].pos)
      }

    }
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
  placeObject(classes, pos) {
    var objectOnPlace = this.findAllObject(pos)
    if (objectOnPlace.length == 0) {
      var object = new classes(pos)
      //console.log(object);
      this.addObject(object)
      this.writeObject(object)
      refresh("#figureGrp")
    } else {
      var already = false;
      for (var i = 0; i < objectOnPlace.length; i++) {
        var object = this.listeObject[objectOnPlace[i]]
        if (object.getClass().getClassName() == classes.getClassName()) {
          //console.log(object.getClass().getClassName(),classes.getClassName());
          already = true
        }
      }
      if (!already) {
        var object = new classes(pos)
        //console.log(object);
        this.addObject(object)
        this.writeObject(object)
        refresh("#figureGrp")
      }
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
  checkCollision(pos, direction) {
    var destination = {}
    var caseHeight = parseInt(this.grille.caseHeight)
    var caseWidth = parseInt(this.grille.caseWidth)
    var collision = false;
    console.log(pos.x);
    console.log(pos.y);
    console.log('dir:' + direction);
    if (direction == 0) {
      console.log('direction prévu:' + 0);
      destination.x = pos.x;
      destination.y = parseInt(pos.y) - caseHeight
    } else if (direction == 1) {
      console.log('direction prévu:' + 1);
      destination.x = parseInt(pos.x) + caseWidth;
      destination.y = pos.y
    } else if (direction == 2) {
      console.log('direction prévu:' + 2);
      destination.x = pos.x;
      destination.y = parseInt(pos.y) + caseHeight
    } else {
      console.log('direction prévu:' + 3);
      destination.x = parseInt(pos.x) - caseWidth;
      destination.y = pos.y
    }
    console.log(destination);
    var listeObjectFind = this.findAllObject(destination)
    console.log(listeObjectFind);
    for (var i = 0; i < listeObjectFind.length; i++) {
      var classes = this.listeObject[listeObjectFind[i]].getClassNameFromObject()
      if (classes == 'Ore') {
        collision = true
        break
      }
    }
    return collision
  }
  moveAll() {
    for (var i = 0; i < this.listeObject.length; i++) {
      if (typeof this.listeObject[i].getMove === 'function') {
        var tapisUnder = this.findObject(this.listeObject[i].pos, Ore)

        if (tapisUnder != null) {
          console.log('tapisUnder ' + tapisUnder.getId());
          console.log(tapisUnder.type);

          console.log('tapisUnder direction ' + tapisUnder.pos.direction);
          var moveDirection = this.calcDirection(tapisUnder.type,
            tapisUnder.pos.direction)
          var collision = this.checkCollision(this.listeObject[i].pos, moveDirection)
          //console.log(collision);
          if (!collision) {
            console.log("direction move " + moveDirection);
            var direction = this.calcMove(moveDirection)
            //console.log(direction);

            var move = this.getMove(this.listeObject[i],direction, this.grille.caseWidth, this.grille.caseHeight)
            //console.log(move);
            //console.log(this.listeObjectChange);
            console.log(move.posFinal);
            var alreadyPlannedPosition=false
            for (var j = 0; j < this.listeObjectChange.length; j++) {
              console.log(this.listeObjectChange[j].posFinal);
              if(this.listeObjectChange[j].posFinal.x ==move.posFinal.x&&
                this.listeObjectChange[j].posFinal.y ==move.posFinal.y
              ){
                alreadyPlannedPosition=true
                break
              }
            }
            if (!alreadyPlannedPosition) {
              $("#animationGrp").append(move.svg);
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
    }
  }
  getMove(object,direction, distanceX, distanceY) {
    var position={}
    if (direction.axe == 'x') {
      var posInit = object.pos.x;
      var axe = 'x'
      position.y=object.pos.y
      if (direction.signe == '+') {
        var posFinal = (parseInt(posInit) + distanceX).toString()
      } else {
        var posFinal = (parseInt(posInit) - distanceX).toString()
      }
      position.x=posFinal
    } else {
      var posInit = object.pos.y;
      var axe = 'y'
      position.x=object.pos.x
      if (direction.signe == '+') {
        var posFinal = (parseInt(posInit) + distanceY).toString()
      } else {
        var posFinal = (parseInt(posInit) - distanceY).toString()
      }
      position.y=posFinal
    }
    var svg=object.getMove(axe,posInit,posFinal)
    return {svg:svg,posFinal:position};

  }
  rewriteAll() {
    console.log('rewrite time');
    var liste = this.listeObjectChange
    //console.log(this.listeObjectChange.length);
    for (var i = 0; i < liste.length; i++) {
      this.rewriteObject(liste[i].object, liste[i].posFinal, liste[i].axe, liste[i].index)
    }
    this.listeObjectChange = []
    refresh("#figureGrp")
  }
  rewriteObject(object, posFinal, axe, index) {
    var id = object.getId()
    console.log('rewriteObject with id ' + id);
    $("#object-" + id).remove()
    if (axe == 'x') {
      object.pos.x = parseInt(posFinal.x)
    } else {
      object.pos.y = parseInt(posFinal.y)
    }
    //this.affListeObject()
    object.setSvg()
    this.writeObject(object)
  }
  run() {
    $(".animation").remove();
    this.animAll()
    this.moveAll()
    //console.log(this.listeObjectChange);
    refresh()
    var _this = this
    setTimeout(function() {
      _this.rewriteAll();
    }, 500);
  }
  addObject(object) {
    this.listeObject.push(object);
  }
  affListeObject() {
    console.log("liste------");
    for (var i = 0; i < this.listeObject.length; i++) {
      console.log("object--");
      console.log("x:" + this.listeObject[i].pos.x)
      console.log("y:" + this.listeObject[i].pos.y)
      console.log("--");
    }
    console.log("------");
  }
  removeObjectOnClick(pos, classes = 'default') {
    var find = this.findAllObject(pos)
    if (find.length > 1) {
      console.log('en attente de code'); //// TODO: implemente ui to choose
    } else if (find.length == 1) {
      console.log('==1');
      this.removeObject(find[0])
    }
    refresh("#figureGrp")
  }
  removeObject(index) {
    var object = this.listeObject[index]
    var id = object.getId()
    $("#object-" + id).remove()
    this.listeObject.splice(index, 1)
  }
  removeAllObject() {
    while (this.listeObject.length != 0) {
      this.removeObject(0)
    }
    refresh("#figureGrp")
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
  findAllObject(position) {
    var find = []
    for (var i = 0; i < this.listeObject.length; i++) {
      var x = this.listeObject[i].pos.x
      var y = this.listeObject[i].pos.y
      if (x == position.x && y == position.y) {
        //console.log(i);
        find.push(i)
      }
    }
    return find
  }

  findObject(position, excludeType = 'Default') {
    var find = null
    //console.log('position rechercher x'+position.x);
    //console.log('position rechercher y'+position.y);
    for (var i = 0; i < this.listeObject.length; i++) {
      // console.log('------object-----');
      var x = this.listeObject[i].pos.x
      var y = this.listeObject[i].pos.y

      //console.log('id '+this.listeObject[i].getId());
      //console.log('x '+x);
      //console.log('y '+y);
      //console.log('-----------');
      if (x == position.x && y == position.y && excludeType != this.listeObject[i].getClass()) {
        var find = this.listeObject[i]
        //console.log('match');
        //console.log('id find ' + find.getId());
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
  changeUrlDef(pos, typeGive = 'None') {
    var object = this.findObject(pos, Ore)
    //console.log(object);
    if (object != null) {
      var classObject = object.getClass()
      if (classObject.haveMultipleDef()) {
        if (typeGive != 'None') {
          nextType = typeGive
        } else {
          var nextType = classObject.nextType(object.type)
        }
        object.type = nextType
        //console.log(nextType);
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
