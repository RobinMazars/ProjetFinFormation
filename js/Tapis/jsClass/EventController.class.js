console.log('class EventController load');

class EventController {
  constructor(manipulator) {
    console.log('eventController constructor');
    this.manipulator = manipulator
    this.init()
    this.initSelector()
    this.bindOnCLick()
    this.bindHover()

  }
  init(){
    var self=this // HACK:
    $("#start").click(self.anim);
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
  anim() {
    self.manipulator.run()
  }
  initSelector(){
    $('.selectorItem:first').addClass('selected')
    this.manipulator.selected = this.manipulator.listeClass[0]
    var manipulator = this.manipulator // HACK:
    $('.selectorItem').click(function(event) {
      manipulator.changeSelector(this)
    });
  }
  bindHover(e){
    self=this
    $('#frame').hover(function(e) {
      $(this).mousemove(function(event2) {
        $(document).unbind('keypress')
        $(document).keypress(function(e) {
          var touche = String.fromCharCode(e.which);
          console.log(touche);
          var posMouse = self.getPosMouse(event2);
          var pos = self.manipulator.calcPos(posMouse)
          console.log(pos);
          if (touche == 'r') {
            self.manipulator.changeUrlDef(pos)
          }

        });
      });
      $('h1').css('background', 'violet');
    }, function() {
      $('h1').css('background', '');
    });

  }

}
