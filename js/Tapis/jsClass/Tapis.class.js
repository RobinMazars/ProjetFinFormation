console.log('class tapis load');
class Tapis extends AbstractObject {
  constructor(pos) {
    super(pos)
    this.idMyself()
    this.setSvg(pos)
  }
  static getDef() {
    var def = super.getDef('blue')
    return def;
  }
  idMyself() {
    if (Tapis.id == undefined) {
      Tapis.id = 1;
    } else {
      Tapis.id++;
    }
    console.log(Tapis.id);
  }
  aff2() {
    console.log('pos=' + this.pos);
  }
  setSvg(pos) {

    this.svg = '<rect id="tapis-'+Tapis.id+'" width="100" height="100" x=' + pos.x + '  y=' + pos.y + ' fill="url(#star2)"/>'
  }
  getSvg() {
    return this.svg
  }
}
