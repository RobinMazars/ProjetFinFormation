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
    this.checkSave()
    this.bindSaveButton()
    this.bindLoadButton()
  }
  checkSave(){
    var listeSave=this.saver.checkSave()
    console.log(listeSave);
    $(".save").addClass('empty')
    $(".load").addClass('notSave')
    for (var i = 0; i < listeSave.length; i++) {
      $(".save[data-id="+listeSave[i]+"]").removeClass('empty')
      $(".load[data-id="+listeSave[i]+"]").removeClass('notSave')
    }
  }
  changeButton(id){
    $(".save[data-id="+id+"]").removeClass('empty')
    $(".load[data-id="+id+"]").removeClass('notSave')
    this.manipulator.EventController
  }
  bindLoadButton(){
    this.unbindLoadButton()
    $(".load:not(.notSave)").click(function(){
        self.load($(this).attr('data-id'))
    });
  }
  unbindLoadButton(){
    $(".load:not(.notSave)").unbind('click')
  }
  unbindSaveButton(){
    $(".save.empty").unbind('click')
  }
  bindSaveButton(){
    this.unbindSaveButton()
    $(".save.empty").click(function(){
        self.save($(this).attr('data-id'))
    });
  }
  save(saveName){
    self.saver.save(saveName)
    self.changeButton(saveName)
  }
  load(saveName){
    self.saver.load(saveName)
  }
  bindOnCLick() {
    var self = this // HACK:
    $("#frame").click(function(event) {
      //console.log("bind");
      self.onClick(event)
    });
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
    var pos = this.manipulator.calcPos(posMouse)
    this.manipulator.placeObject(this.manipulator.selected, pos)
  }
  animRepeat(){
    $("#start").unbind('click')
    $("#oneStep").unbind('click')
    $("#stop").click(self.stopAnim);
    self.anim()
    self.loop =setInterval(self.anim,550)
  }
  animOneStep(){
    $("#oneStep").unbind('click')
    self.anim()
    setTimeout(function(){
      $("#oneStep").click(self.animOneStep);
    },500)

  }
  stopAnim(){
    $("#stop").unbind('click')
    clearInterval(self.loop)
    $("#start").click(self.animRepeat);
    $("#oneStep").click(self.animOneStep)
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
