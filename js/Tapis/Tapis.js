//il faut refresh la div container pour start l'animation,pas de besoin pour l'arreter
function anim(){
  manipulator.animAll()
  manipulator.moveAll()
}

function anim2(){
  $(".animation2").remove()
  $("#svg").append('<animate xlink:href="#arrow" attributeName="y"  to="-1"  dur="0.5s" fill="freeze" class="animation2" /> ')
  refresh()
}
function rngDir() {
  var dir=rand(0,1);
  if (dir==0) {
    dir="x"
  }
  else {
    dir="y"
  }
  var dist=rand(-100,100)
  console.log(dist);
  return {dir:dir,dist:dist}
}
function rngAnim() {
  $("#rngAnim").remove()
  var rng=rngDir()
  $("#svg").append('<animate xlink:href="#tapis-1" attributeName='+rng['dir']+'  to='+rng['dist']+'  dur="1s" fill="freeze" id="rngAnim" /> ')
  $("#frame").html($("#frame").html());
}

//init bind
$("#start").click(anim);
$("#stop").click(anim2);



//first get script pour include util.js qui contient le multi include
$.getScript( "./../../js/Tapis/jsClass/util.js", function() {
//liste des class a include
  var script_arr = [
      'AbstractObject.class.js',
      'Position.class.js',
      'Tapis.class.js',
      'Ore.class.js',
      'Manipulator.class.js',
      'Grille.class.js'

  ];
  $.getMultiScripts(script_arr,"./../../js/Tapis/jsClass/").done(function() {
    //code
    //init def
    grille= new Grille()
    var listeClass =[Tapis,Ore];
    manipulator=new Manipulator();
    manipulator.setListeClass(listeClass);
    manipulator.placeDef();

    var pos1=new Position(0,0,0)
    var pos2=new Position(100,100,1)
    var pos3=new Position(150,150,0)

    var h= new Tapis(pos1);
    var h2= new Tapis(pos2);
    var h3= new Ore(pos3);

    manipulator.addObject(h)
    manipulator.addObject(h2)
    manipulator.addObject(h3)

    manipulator.placeAll()













  });






});
