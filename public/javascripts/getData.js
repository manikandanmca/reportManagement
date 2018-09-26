$(document).ready(function(){
  $("#collapse2").on("hide.bs.collapse", function(){
    $(".accordion-toggle").html('<span class="glyphicon glyphicon-minus"></span> Open');
  });
  $("#collapse2").on("show.bs.collapse", function(){
    $(".accordion-toggle").html('<span class="glyphicon glyphicon-plus"></span> Close');
  });
});

