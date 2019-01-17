//il faut refresh la div container pour start l'animation,pas de besoin pour l'arreter

function rngDir() {
  var dir = rand(0, 1);
  if (dir == 0) {
    dir = "x"
  } else {
    dir = "y"
  }
  var dist = rand(-100, 100)
  console.log(dist);
  return {
    dir: dir,
    dist: dist
  }
}
function rngAnim() {
  $("#rngAnim").remove()
  var rng = rngDir()
  $("#svg").append('<animate xlink:href="#tapis-1" attributeName=' + rng['dir'] + '  to=' + rng['dist'] + '  dur="1s" fill="freeze" id="rngAnim" /> ')
  $("#frame").html($("#frame").html());
}
//init bind

// $("#frame").hover(function() {
//   $('h1').css('background', 'red');
//   $(document).keypress(function(e) {
//     var touche = String.fromCharCode(e.which);
//     console.log(touche);
//   });
// }, function() {
//   $('h1').css('background', '');
//   $(document).unbind('keypress')
//
// });

//first get script pour include util.js qui contient le multi include
$.getScript("./../../js/Tapis/jsClass/util.js", function() {
  //liste des class a include
  var script_arr = [
    'AbstractObject.class.js',
    'Position.class.js',
    'Tapis.class.js',
    'Ore.class.js',
    'Manipulator.class.js',
    'Grille.class.js',
    'EventController.class.js',
    'SaveManipulator.class.js',
    'DomController.class.js'

  ];
  $.getMultiScripts(script_arr, "./../../js/Tapis/jsClass/").done(function() {
    $( window ).on( "load", function() {
      var listeClass = [Tapis, Ore];
      manipulator = new Manipulator(listeClass);
      var pos1 = new Position(0, 0, 0)
      var pos2 = new Position(100, 100, 1)
      var pos3 = new Position(150, 150, 0)
      var pos5 = new Position(150, 150, 0)
      var pos4 = new Position(450, 450)
      var h = new Tapis(pos1);
      var h2 = new Tapis(pos2,'left');
      var h3 = new Ore(pos5);
      var h4 = new Tapis(pos3, 'right');
      manipulator.addObject(h)
      manipulator.addObject(h2)
      manipulator.addObject(h3)
      manipulator.addObject(h4)
      manipulator.writeAll()
      grille=new Grille()
    });

  });
});
