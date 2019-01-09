console.log('class ore load');

class Ore extends AbstractObject {
  constructor(pos) {
    super(pos)
  }
  static aff() {
    console.log('ore aff');
  }
  static def() {
    return super.def('rgba(0,0,0,0.5)', 'ore', '3,0 7,0 10,3 10,7 7,10 3,10 0,7 0,3')
  }
  setSvg() {
    super.setSvg('ore')
  }
  getMove() {
    var move='<animate xlink:href=#object-'+this.getId()+' attributeName="y"  to="400"  dur="0.5s" fill="freeze" class="animation tapis" /> ';
    return move;
  }
}
