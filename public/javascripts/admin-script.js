$(document).ready(function(){
  var display = "not visible";
  var width = window.width;
  $(window).resize(function() {
    if ($(window).width() > 720) {
      $(".side-bar").css("left", "0px");
    } else {
      $(".side-bar").css("left", "-400px");
    }
  });
  $("i.menu-icon").click(function() {
    if (display === "not visible") {
      $(".side-bar").css({
        "left": "0px",
        "z-index": "100",
        "transition": "all 0.3s"
      });
      display = "visible";
    } else {
      $(".side-bar").css({
        "left": "-400px",
        "z-index": "100",
        "transition": "all 0.3s"
      });
      display = "not visible";  
    }
  });
});