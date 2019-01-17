console.log('class DomController load');
class DomController {
  constructor() {
    this.nbrSaveButton=10
    this.findMainContainer()
    this.creatAll()
    console.log('endDomController');
  }
  findMainContainer(){
    this.mainContainer=$("#containerSvg")
  }
  creatAll(){
    var sousSection=this.createSousSection()
    var animationButton=this.creationAnimationButton()
    this.mainContainer.append(sousSection)
    this.mainContainer.append(animationButton)
  }
  creationAnimationButton(){
    var div =this.creationDomElement('div','animationButton')
    var start=this.creationDomElement('button','start','Start')
    var stop=this.creationDomElement('button','stop','Stop')
    var oneStep=this.creationDomElement('button','oneStep','One Step')
    start.attr('type', 'button');
    stop.attr('type', 'button');
    oneStep.attr('type', 'button');
    div.append(start)
    div.append(stop)
    div.append(oneStep)
    return div
  }
  creationSaveLoadButton(){
    var loadSave=this.creationDomElement('div','loadSave')
    var load=this.creationDomElement('div','load-buttons')
    var save=this.creationDomElement('div','save-buttons')
    for (var i = 0; i < this.nbrSaveButton; i++) {
      var buttonSave = this.creationDomElement('button',null,'Save n°'+parseInt(i+1),'save')
      buttonSave.attr('type', 'button');
      var buttonLoad = this.creationDomElement('button',null,'Load n°'+parseInt(i+1),'load')
      buttonLoad.attr('type', 'button');
      save.append(buttonSave)
      load.append(buttonLoad)
    }
    loadSave.append(save)
    loadSave.append(load)
    return loadSave
  }
  createSousSection(){
    var sousSection=this.creationDomElement('div','sousSection')
    var loadSave=this.creationSaveLoadButton()

    var frame=this.creationDomElement('div','frame')
    var svg=this.creationDomElement('svg','svg')
    sousSection.append(loadSave)
    frame.append(svg)
    sousSection.append(frame)
    return sousSection

  }
  creationDomElement(type,id=null,html=null,classe=null){
    var element =$("<"+type+"></"+type+">")
    if (html!=null) {
      element.html(html)
    }
    if (id != null) {
      element.attr('id', id);
    }
    if (classe !=null) {
      element.addClass(classe)
    }
    return element
  }
}
