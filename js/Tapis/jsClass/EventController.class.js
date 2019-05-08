console.log('class EventController load');

class EventController {
  constructor(manipulator,saver) {
    console.log('eventController constructor');
    this.manipulator = manipulator
    this.saver = saver
    this.init()
    this.initSelector()
    this.bindOnCLick()
    this.bindHover()
    this.checkSave()
  }
  init() {
    var self = this // HACK:
    $("#oneStep").click(self.animOneStep);
    $("#start").click(self.animRepeat);
    this.bindClearAll()
    this.checkSave()
    this.bindAllSaveLoadButtons()
  }
  clearSvg(){
    self.manipulator.removeAllObject()
  }
  checkSave(){
    var listeSave=this.saver.checkSave()
    console.log(listeSave);
    $(".save").addClass('empty')
    $(".load").addClass('notSave')
    $(".supre").addClass('notSave')
    for (var i = 0; i < listeSave.length; i++) {
      $(".save[data-id="+listeSave[i]+"]").removeClass('empty')
      $(".load[data-id="+listeSave[i]+"]").removeClass('notSave')
      $(".supre[data-id="+listeSave[i]+"]").removeClass('notSave')
    }
  }
  bindAllSaveLoadButtons(){
    self=this
    $(function(){
      console.log('bind All');
      self.bindSaveButton()
      self.bindLoadButton()
      self.bindSupreButton()
      self.bindClearAll()
    })

  }
  changeButton(id){
    console.log('toogle');
    $(".save[data-id="+id+"]").toggleClass('empty')
    $(".load[data-id="+id+"]").toggleClass('notSave')
    $(".supre[data-id="+id+"]").toggleClass('notSave')
  }
  unbindAllSaveLoadButton(){
    this.unbindLoadButton()
    this.unbindSaveButton()
    this.unbindSupreButton()
    this.unbindClearAll()
  }
  bindClearAll(){
    $("#clearSvg").click(self.clearSvg);
  }
  unbindClearAll(){
    $("#clearSvg").unbind('click')
  }
  unbindLoadButton(){
    $(".load").unbind('click')
  }
  unbindSaveButton(){
    $(".save").unbind('click')
  }
  unbindSupreButton(){
    $(".supre").unbind('click')
  }
  bindSaveButton(){
    this.unbindSaveButton()
    $(".save.empty").click(function(){
        self.save($(this).attr('data-id'))
    });
  }
  bindLoadButton(){
    this.unbindLoadButton()
    $(".load:not(.notSave)").click(function(){
        self.load($(this).attr('data-id'))
    });
  }
  bindSupreButton(){
    this.unbindSupreButton()
    $(".supre:not(.notSave)").click(function(){
        self.supre($(this).attr('data-id'))
    });
  }

  save(saveName){
    this.saver.save(saveName)
    this.changeButton(saveName)
    this.bindAllSaveLoadButtons()
  }
  load(saveName){
    this.saver.load(saveName)
  }
  supre(saveName){
    this.saver.clearSave(saveName)
    this.changeButton(saveName)
    this.bindAllSaveLoadButtons()
  }
  bindOnCLick() {
    console.log("bindOnCLick");
    var self = this // HACK:
    $("#frame").mousedown(function(event) {
      //console.log("bind");
      self.onClick(event)
    });
  }
  unbindOnCLick(){
    console.log("unbindOnCLick");
    var self = this
    $("#frame").off("mousedown");

  }
  getPosMouse(e) {
    var container = document.getElementById('frame')
    var offset = container.getBoundingClientRect();
    var styles = window.getComputedStyle(container);
    var cursorX = e.clientX - offset.left - parseInt(styles.borderLeftWidth);
    var cursorY = e.clientY - offset.top - parseInt(styles.borderTopWidth);
    //console.log(cursorX, cursorY);
    return {
      x: cursorX,
      y: cursorY
    }
  }
  onClick(event) {
    var posMouse = this.getPosMouse(event);
    console.log(posMouse);
    var pos = this.manipulator.calcPos(posMouse)
    this.manipulator.placeObject(this.manipulator.selected, pos)
  }
  animRepeat(){
    self.unbindOnCLick()
    $("#start").unbind('click')
    $("#oneStep").unbind('click')
    self.unbindAllSaveLoadButton()
    $("#stop").click(self.stopAnim);
    self.anim()
    self.loop =setInterval(self.anim,550)
  }
  animOneStep(){
    $("#oneStep").unbind('click')
    self.unbindAllSaveLoadButton()
    self.anim()
    setTimeout(function(){
      $("#oneStep").click(self.animOneStep);
      self.bindAllSaveLoadButtons()
    },500)

  }
  stopAnim(){
    self.bindOnCLick()
    $("#stop").unbind('click')
    clearInterval(self.loop)
    $("#start").click(self.animRepeat);
    $("#oneStep").click(self.animOneStep)
    self.bindAllSaveLoadButtons()
  }
  anim() {
    self.manipulator.run()
  }
  initSelector() {
    $('.selectorItem:first').addClass('selected')
    this.manipulator.selected = this.manipulator.listeClass[0]
    var manipulator = this.manipulator // HACK:
    $('.selectorItem').click(function(event) {
      manipulator.changeSelector(this)
    });
  }
  bindHover(e) {
    self = this
    $('#frame').hover(function(e) {
      $(this).mousemove(function(event2) {
        $(document).unbind('keypress')
        $(document).keypress(function(e) {
          var touche = String.fromCharCode(e.which);
          console.log(touche);
          var posMouse = self.getPosMouse(event2);
          var pos = self.manipulator.calcPos(posMouse)
          console.log(pos);
          if (touche == 't') {
            self.manipulator.changeUrlDef(pos)
          }
          else if (touche == 'r') {
            self.manipulator.rotateObject(pos)
          }
          else if (touche == 'x') {
            self.manipulator.removeObjectOnClick(pos)
          }
        });
      });
      $('h1').css('background', 'violet');
    }, function() {
      $(document).unbind('mousemove')
      $(document).unbind('keypress')
      $('h1').css('background', '');
    });

  }

}
