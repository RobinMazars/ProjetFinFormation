console.log('class tapis load');
class Tapis extends AbstractObject {
  constructor(pos,type='forward') {
    super(pos)
    this.type=type;
    this.setSvg()
  }
  /**
   * creation of the image definition.One by class
   * @return {[type]} [description]
   */
  static def() {
    var listeDef=[]
    self=this;
    var def1 = super.def('blue','Tapis-forward','M5 0 L10 3 L7 3 L7 10 L3 10 L3 3 L 0 3','100%','100%');
    var def2 = super.def('red','Tapis-left','M2 3 Q 7 3 7 10 L3 10 Q 3 7 2 7 L 2 9 L 0 5 L 2 1 M 5 10 L9 12 L7 12 Q7 17 0 17 L0 13 Q3 13 3 12 L1 12','100%','100%');
    var def3= super.def('green','Tapis-right','M7 10 Q 7 7 8 7 L8 9 L 10 5 L8 1 L8 3 Q 3 3 3 10 M 5 10 L9 12 L7 12 Q7 13 10 13 L10 17 Q3 17 3 12 L1 12','100%','100%');
    def2.find('path').attr('transform-origin', '0 10');
    def3.find('path').attr('transform-origin', '10 10');
    listeDef.push(def1);
    listeDef.push(def2);
    listeDef.push(def3);
    //console.log(listeDef);
    return listeDef;
  }
  static haveMultipleDef(){
    return true
  }
  static listeNameDef(){
    return ['forward','left','right']
  }
  static nextType(type){
    var liste = Tapis.listeNameDef()
    //console.log(liste);
    //console.log(type);
    var index = liste.indexOf(type)
    //console.log(index)
    var nextType =liste[(index+1)%liste.length ];
    return nextType

  }
  static getClassName(){
    return 'Tapis'
  }
  getClass(){
    return Tapis
  }
  setSvg(){
    //console.log(this.type);
        super.setSvg('Tapis-'+this.type)
  }
  static getAnimation(){
    var animationListe=[];
    var animation='<animate id="animation-Tapis-forward" xlink:href="#Tapis-forward" attributeName="y"  to="-1"  dur="0.5s" fill="freeze" class="animation tapis" /> ';
    var animation1='<animateTransform xlink:href="#path-Tapis-left" attributeName="transform"  type="rotate" to="-90" dur="0.5s"  class="animation tapis" />';
    var animation2='<animateTransform xlink:href="#path-Tapis-right" attributeName="transform"  type="rotate" to="90" dur="0.5s" class="animation tapis" />';
    animationListe.push(animation)
    animationListe.push(animation1)
    animationListe.push(animation2)
    return animationListe;
  }

  static aff(){
    console.log('tapis aff');
  }

}
