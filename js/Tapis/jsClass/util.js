
$.getMultiScripts = function(arr, path) {
    var _arr = $.map(arr, function(scr) {
        return $.getScript( (path||"") + scr );
    });

    _arr.push($.Deferred(function( deferred ){
        $( deferred.resolve );
    }));

    return $.when.apply($, _arr);
}
console.log("util.js");

function refresh(element="#frame") {
 $(element).html($(element).html());
}

function rand(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
