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
  $("#svg").append('<animate xlink:href="#orange-circle" attributeName='+rng['dir']+'  to='+rng['dist']+'  dur="1s" fill="freeze" id="circ-anim"/> ')
  $("#frame").html($("#frame").html());
}
$("#start").click(rngAnim);
$("#stop").click(unAnim);
