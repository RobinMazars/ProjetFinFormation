console.log('class AbstractObject load');
class AbstractObject {
  constructor(pos) {
    this.pos=pos;
  }
  static getDef(color='red'){
    var def=$("<defs></defs>");
    var patern=$('<pattern id="star2" viewBox="0,0,10,10" width="10%" height="10%">')
    var image=('<polygon fill='+color+' points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2"/>')
    patern = patern.html(image)
    def = def.append(patern)
    return def;

  }


  aff(){
    console.log("AbstractObject");
  }
}
