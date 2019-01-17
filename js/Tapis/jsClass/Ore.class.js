console.log('class ore load');

class Ore extends AbstractObject {
  constructor(pos) {
    super(pos)
    this.setSvg()
  }
  static getClassName() {
    return 'Ore'
  }
  getClassNameFromObject(){
    return 'Ore'
  }
  static aff() {
    console.log('ore aff');
  }
  static def() {
    return super.def('rgba(0,0,0,0.5)', 'ore', 'M3 0 L7 0 L 10 3 L 10 7 L 7 10 L 3 10 L 0 7 L 0 3')
  }
  getClass() {
    return Ore
  }
  setSvg() {
    super.setSvg('ore')
  }
  getMove(direction, distanceX, distanceY) {
    if (direction.axe == 'x') {
      var posInit = this.pos.x;
      var axe = 'x'
      if (direction.signe == '+') {
        var posFinal = (parseInt(posInit) + distanceX).toString()
      } else {
        var posFinal = (parseInt(posInit) - distanceX).toString()
      }
    } else {
      var posInit = this.pos.y;
      var axe = 'y'
      if (direction.signe == '+') {
        var posFinal = (parseInt(posInit) + distanceY).toString()
      } else {
        var posFinal = (parseInt(posInit) - distanceY).toString()
      }
    }
    var move = '<animate xlink:href=#object-' + this.getId() + ' attributeName=' + axe + '  from =' + posInit + ' to=' + posFinal + ' fill="freeze" dur="0.5s" class="animation tapis" /> ';
    return {svg:move,posFinal:posFinal};
  }
}
