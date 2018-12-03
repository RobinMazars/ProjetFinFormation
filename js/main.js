//bind event/////////////////////
$("nav ul li a").hover(function() {
  if ($(window).width() > 780) {
    $(this).css('background', 'red');
    $(this).css('color', 'white');
  }
}, function() {
  $(this).css('background', '');
  $(this).css('color', '');
});

//resize event
// window.addEventListener('resize', function(event){
//   console.log("resize");
// });
