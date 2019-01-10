console.log('class ore load');

class Ore extends AbstractObject {
  constructor(pos) {
    super(pos)
  }
  static getClassName(){
    return 'Ore'
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
    var posInit=this.pos.y;
    var posFinal=(parseInt(posInit)+50).toString()
    var move='<animate xlink:href=#object-'+this.getId()+' attributeName="y"  from ='+posInit+' to='+posFinal+'  dur="0.5s" fill="freeze" class="animation tapis" /> ';
    return move;
  }
}
