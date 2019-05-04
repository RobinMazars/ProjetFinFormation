console.log('class AbstractObject load');
class AbstractObject {
  constructor(pos) {
    this.pos = pos;
    this.idMyself();
  }
  static def(color = 'red', idName = 'Default', pattern = 'M0 0 L0 10 L10 10 L10 0', width = '100%', height = '100%') {
    var def = $("<defs></defs>");
    var patern = $('<pattern id=' + idName + ' viewBox="0,0,10,10" width=' + width + ' height=' + height + ' >');
    var image = ('<path id=path-'+idName+' fill=' + color + ' d="' + pattern + '"/>');
    patern = patern.html(image);
    def = def.append(patern);
    return def;
  }
  static haveMultipleDef() {
    return false
  }
  idMyself() {
    if (this.constructor.id == undefined) {
      this.constructor.id = 1;
    } else {
      this.constructor.id++;
    }
    //console.log(this.constructor.id);
    this.id = this.constructor.id;
  }
  static getClassName(){
    return this.name
  }
  getClassNameFromObject(){
    return this.constructor.name
  }
  getClass(){
    return this.constructor
  }
  setSvg(idDef) {
    var width = 50;
    var height = 50;
    var origin = {}
    origin = this.getCenter(width, height)

    //console.log(origin.string);
    var angle = 90 * this.pos.direction;
    this.svg = '<rect id="object-' + this.getId() + '" width=' + width + ' height=' + height + ' x=' + this.pos.x + '  y=' + this.pos.y + ' fill="url(#' + idDef + ')"  transform-origin="' + origin.string + '" transform="rotate(' + angle + ')"/>'
  }
  getCenter(width, height) {
    var center = {}
    //console.log(this.pos);
    center.x = parseInt(this.pos.x) + width / 2;
    center.y = parseInt(this.pos.y) + height / 2;
    //console.log("center");
    center.string = center.x + ' ' + center.y;
    return center;
  }
  getBottomLeft(width, height) {
    var coteBottomLeft = {}
    coteBottomLeft.x = parseInt(this.pos.x);
    coteBottomLeft.y = parseInt(this.pos.y) + height;
    coteBottomLeft.string = coteBottomLeft.x + ' ' + coteBottomLeft.y;
    return coteBottomLeft;
  }
  getBottomRight(width, height) {
    var coteBottomRight = {}
    coteBottomRight.x = parseInt(this.pos.x) + width;
    coteBottomRight.y = parseInt(this.pos.y) + height;
    coteBottomRight.string = coteBottomRight.x + ' ' + coteBottomRight.y;
    return coteBottomRight;
  }
  getSvg() {
    return this.svg
  }
  getId() {
    return this.id;
  }
}
