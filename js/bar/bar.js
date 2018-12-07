
var listBar=$(".bar")
for (var i = 0; i < listBar.length; i++) {
  var pourcentage=findPourcentage(listBar.eq(i).attr('class'));
  console.log(pourcentage);
  if (pourcentage>=0 && pourcentage<=100) {
    if (pourcentage<=3 || pourcentage>97) {//no effect if % >97 or <3
      var div=$("<div class='textBar'>"+pourcentage+" %&nbsp</div>")
    }
    else {
      var div=$("<div class='textBar effectBar'>"+pourcentage+" %&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div>")
    }
    listBar.eq(i).append(div);
    console.log(div.attr('padding-right'));
    div.css('width',pourcentage+"%");
  }
}

//compense si %>97

function findPourcentage(elementClass) {
  const regex = /\d+/gm;
  str=elementClass
  let m
  var find;
  while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
          find=match
      });
      return find

  }


}
