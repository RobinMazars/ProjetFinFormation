$.getMultiScripts = function(arr, path) {
  var _arr = $.map(arr, function(scr) {
    return $.getScript((path || "") + scr);
  });

  _arr.push($.Deferred(function(deferred) {
    $(deferred.resolve);
  }));

  return $.when.apply($, _arr);
}
console.log("util.js");

function refresh(element = "#frame") {
  $(element).html($(element).html());
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function findDigit(string) {
  const regex = /\d+/gm;;
  const str = string
  let m;
  var find;
  while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      m.forEach((match, groupIndex) => {
        find= match;
    });
  }
  return find
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function affTest() {
  console.log('hello there');

}
