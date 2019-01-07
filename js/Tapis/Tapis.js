//il faut refresh la div container pour start l'animation,pas de besoin pour l'arreter
function anim(){
  $("#svg").append('<animate xlink:href="#orange-circle" attributeName="x" from="50" to="450"  dur="1s"  values="50; 490; 150; 450"  keyTimes="0; 0.7; 0.8; 1" fill="freeze" id="circ-anim"/> ')
  $("#frame").html($("#frame").html());
}

function unAnim() {
  $("#circ-anim").remove()
  //$("#frame").html($("#frame").html());
}
function rand(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
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
  $("#circ-anim").remove()
  var rng=rngDir()
  $("#svg").append('<animate xlink:href="#tapis-1" attributeName='+rng['dir']+'  to='+rng['dist']+'  dur="1s" fill="freeze" /> ')
  $("#frame").html($("#frame").html());
}

//init bind
$("#start").click(rngAnim);
$("#stop").click(unAnim);



//first get script pour include util.js qui contient le multi include
$.getScript( "./../../js/Tapis/jsClass/util.js", function() {
//liste des class a include
  var script_arr = [
      'AbstractObject.class.js',
      'Tapis.class.js',
      'Manipulator.class.js'

  ];
  $.getMultiScripts(script_arr,"./../../js/Tapis/jsClass/").done(function() {
    //code
    //init def
    function test() {
      console.log('test');
    }
    var listeClass =[Tapis]
    for (var i = 0; i < listeClass.length; i++) {

      var def = listeClass[i].getDef()
      $("#svg").prepend(def)
      refresh()
    }
    var pos={'x':'50','y':'50'}
    var pos2={'x':'150','y':'150'}
    var h= new Tapis(pos);
    var h2= new Tapis(pos2);
    manipulator=new Manipulator()
    manipulator.placeObject(h)
    manipulator.placeObject(h2)













  });






});
