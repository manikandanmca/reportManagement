$(document).ready(function(){        
  var $template = $(".template");
  var increament = 2;
  $(".btn-add-panel").on("click", function () {
    var $newPanel = $template.clone();
    $newPanel.find(".collapse").removeClass("in");
    $newPanel.find(".accordion-toggle").attr("href", "#collapse" + (++increament));
    $newPanel.find(".panel-collapse").attr("id", "collapse" +increament).addClass("collapse").removeClass("in");
    $("#accordion").append($newPanel.fadeIn());
  });
});


