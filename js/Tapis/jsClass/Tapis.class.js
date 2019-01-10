console.log('class tapis load');
class Tapis extends AbstractObject {
  constructor(pos) {
    super(pos)
  }
  /**
   * creation of the image definition.One by class
   * @return {[type]} [description]
   */
  static def() {
    return super.def('blue','tapis','5,0 10,3 7,3 7,10 3,10 3,3 0,3','50%','100%')
  }
  static getClassName(){
    return 'Tapis'
  }
  setSvg(){
    super.setSvg('tapis')
  }
  static getAnimation(){
    var animation='<animate xlink:href="#tapis" attributeName="y"  to="-1"  dur="0.5s" fill="freeze" class="animation tapis" /> ';
    return animation;
  }

  static aff(){
    console.log('tapis aff');
  }

}
