//init
var canvas = new Canvas();
//initBind
$("#canvas").css('background', 'red');
$("#canvas").mousedown(function(event) {
  mouseDown(event);
});
$("#color").change(function(event) {
  console.log($(this).val())
  canvas.pen.setColor($(this).val())
});

function mouseDown(e){
  console.log('mousedown');
  canvas.startDrawLine(e)
  $("#canvas").mousemove(function(event) {
    canvas.continueDrawLine(event)
    $("#canvas").unbind('mousedown');
  });
  $("#canvas").mouseup(function(event) {
    mouseUp(event);
  });
  $("#canvas").mouseout(function(event) {
    mouseUp(event);
  });

}
function mouseUp(e){
  console.log('mouseup');
  canvas.endDrawLine()
  $("#canvas").unbind('mousemove');
  $("#canvas").unbind()
  $("#canvas").mousedown(function(event) {
    $("#canvas").unbind()
    mouseDown(event);
  });

}
