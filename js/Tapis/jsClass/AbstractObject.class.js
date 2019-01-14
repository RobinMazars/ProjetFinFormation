console.log('class AbstractObject load');
class AbstractObject {
  constructor(pos) {
    this.pos = pos;
    this.idMyself();
  }
  static def(color = 'red', idName='Default',pattern='M0 0 L0 10 L10 10 L10 0', width='100%', height='100%') {
    var def = $("<defs></defs>");
    var patern = $('<pattern id=' + idName + ' viewBox="0,0,10,10" width='+width+'  height='+height+' >');
    var image = ('<path fill=' + color + ' d="' + pattern + '"/>');
    patern = patern.html(image);
    def = def.append(patern);
    return def;
  }
  static haveMultipleDef(){
    return false
  }
  idMyself() {
    if (AbstractObject.id == undefined) {
      AbstractObject.id = 1;
    } else {
      AbstractObject.id++;
    }
    //console.log(AbstractObject.id);
    this.id = AbstractObject.id;
  }
  setSvg(idDef) {
    var width = 50;
    var height = 50;
    var center = {}
    //console.log(this.pos);
    center.x = parseInt(this.pos.x) + width / 2;
    center.y = parseInt(this.pos.y) + height / 2;
    //console.log("center");
    center.string = center.x + ' ' + center.y;
    var angle = 90 * this.pos.direction;
    this.svg = '<rect id="object-' + this.getId() + '" width=' + width + ' height=' + height + ' x=' + this.pos.x + '  y=' + this.pos.y + ' fill="url(#' + idDef + ')"  transform-origin="' + center.string + '" transform="rotate(' + angle + ')"/>'
  }
  getSvg() {
    return this.svg
  }
  getId() {
    return this.id;
  }
}
