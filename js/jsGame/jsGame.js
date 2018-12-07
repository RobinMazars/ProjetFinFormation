//init
var canvas = new Canvas();
//initBind
$("#canvas").css('background', 'red');
$("#canvas").mousedown(function(event) {
  mouseDown();
});
$("#color").change(function(event) {
  console.log($(this).val())
  canvas.pen.setColor($(this).val())
});

function mouseDown(){
  console.log('mousedown');
  canvas.startDrawLine(event)
  $("#canvas").mousemove(function(event) {
    canvas.continueDrawLine(event)
    $("#canvas").unbind('mousedown');
  });
  $("#canvas").mouseup(function(event) {
    mouseUp();
  });
  $("#canvas").mouseout(function(event) {
    mouseUp();
  });

}
function mouseUp(){
  console.log('mouseup');
  canvas.endDrawLine()
  $("#canvas").unbind('mousemove');
  $("#canvas").unbind()
  $("#canvas").mousedown(function(event) {
    $("#canvas").unbind()
    mouseDown();
  });

}
