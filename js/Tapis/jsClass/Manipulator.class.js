console.log('class manipulator load');
class Manipulator {
  placeObject(object){
    var svg = object.getSvg();
    $("#svg").append(svg)
    refresh();
  }
}
