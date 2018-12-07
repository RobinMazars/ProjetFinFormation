//init
$(".sousMenusListe").hide()
$(".sousMenusListe").find(':first-child').css('border-radius', '10px 10px 0 0');
$(".sousMenusListe").find(':last-child').css('border-radius', '0 0 10px 10px');
$(".sousMenusListe").width(function () {
  var parent=$(this).parent();
  var paddingParentLeft=parseInt(parent.css('padding-left'));
  var paddingParentRight=parseInt(parent.css('padding-right'));
  var positionParentLeft=parent.offset();
  $(this).width(parent.width()-paddingParentRight-paddingParentLeft)
})
//bind event/////////////////////
$("nav ul li").hover(function() {
  if ($(window).width() > 780) {
    $(this).css('background', 'red');
    $(this).children().css('color', 'white');
  }
}, function() {
  $(this).css('background', '');
  $(this).children().css('color', '');
});
$("nav ul li.sousMenusTitle").hover(function() {
$(this).children(".sousMenusListe").show()
}, function() {
  $(this).children(".sousMenusListe").hide()
});
// TODO: implement
//resize event
// window.addEventListener('resize', function(event){
//   console.log("resize");
// });
