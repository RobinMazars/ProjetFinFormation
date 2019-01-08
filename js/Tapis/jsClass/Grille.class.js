console.log('class Grille load');

class Grille {
  constructor() {
    var width =$("svg").width()
    var height =$("svg").height()
    var group=$("<g></g>")
    var nbrCaseWidth=10;
    var nbrCaseHeight=10;
    var caseWidth=width/nbrCaseWidth;
    var caseHeight=height/nbrCaseHeight;
    for (var i = 0; i <=nbrCaseHeight; i++) {
        var posStart={};
        posStart.x=0
        posStart.y=i*caseHeight
        var posEnd={};
        posEnd.x=width
        posEnd.y=i*caseHeight
        var svg =this.svgLine(posStart,posEnd)
        group.append(svg)

    }
    for (var i = 0; i <=nbrCaseWidth; i++) {
        var posStart={};
        posStart.x=i*caseWidth
        posStart.y=0
        var posEnd={};
        posEnd.x=i*caseWidth
        posEnd.y=height
        var svg =this.svgLine(posStart,posEnd)
        group.append(svg)
    }
    $("svg").append(group)
    this.caseWidth=caseWidth
    this.caseHeight=caseHeight
  }
  svgLine(posStart,posEnd,color='black',width='2'){
    return '<line x1='+posStart.x+' y1='+posStart.y+' x2='+posEnd.x+' y2='+posEnd.y+' style="stroke:'+color+';stroke-width:'+width+'" />'
  }
}
