console.log('class ore load');

class Ore extends AbstractObject {
  constructor(pos) {
    super(pos)
    this.setSvg()
  }
  static aff() {
    console.log('ore aff');
  }
  static def() {
    return super.def('rgba(0,0,0,0.5)', 'ore', 'M3 0 L7 0 L 10 3 L 10 7 L 7 10 L 3 10 L 0 7 L 0 3')
  }
  setSvg() {
    super.setSvg('ore')
  }
  getMove(axe,from,to){
    var move = '<animate xlink:href=#object-' + this.getId() + ' attributeName=' + axe + '  from =' + from + ' to=' + to + ' fill="freeze" dur="0.5s" class="animation tapis" /> ';
    return move
  }
}
