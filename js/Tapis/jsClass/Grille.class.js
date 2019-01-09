console.log('class Grille load');

class Grille {
  constructor(nbrCaseWidth='10',nbrCaseHeight="10") {
    this.width=$("#svg").width()
    this.height=$("#svg").height()
    var height =$("svg").height()
    var group=$("<g id='grille'></g>")
    this.nbrCaseWidth=nbrCaseWidth
    this.nbrCaseHeight=nbrCaseHeight
    var caseWidth=this.width/nbrCaseWidth;
    this.caseWidth=caseWidth
    var caseHeight=this.height/nbrCaseHeight;
    this.caseHeight=caseHeight
    for (var i = 0; i <=this.nbrCaseHeight; i++) {
        var posStart={};
        posStart.x=0
        posStart.y=i*this.caseHeight
        var posEnd={};
        posEnd.x=this.width
        posEnd.y=i*this.caseHeight
        var svg =this.svgLine(posStart,posEnd)
        group.append(svg)

    }
    for (var i = 0; i <=this.nbrCaseWidth; i++) {
        var posStart={};
        posStart.x=i*this.caseWidth
        posStart.y=0
        var posEnd={};
        posEnd.x=i*this.caseWidth
        posEnd.y=this.height
        var svg =this.svgLine(posStart,posEnd)
        group.append(svg)
    }
    $("svg").append(group)
  }
  svgLine(posStart,posEnd,color='black',width='2'){
    return '<line x1='+posStart.x+' y1='+posStart.y+' x2='+posEnd.x+' y2='+posEnd.y+' style="stroke:'+color+';stroke-width:'+width+'" />'
  }
}
