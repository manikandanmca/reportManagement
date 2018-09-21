$(document).ready(function(){

  var $template = $(".template");
  var increament = 1;
  var title = 1;

  $(".btn-add-panel").on("click", function () {
    var $newPanel = $template.clone();
    $newPanel.find(".collapse").removeClass("in");
    $newPanel.find(".accordion-toggle").attr("href", "#collapse" + (++increament)).text( (++title) + ".Activity, Release Date, Remarks  " );
    $newPanel.find(".panel-collapse").attr("id", "collapse" +increament).addClass("collapse").removeClass("in");
    $form = $('.panel-body').find('form').attr("id", "myForm" + increament);
    var id= "'" + $form[0].id +"'";
    //var id= $form[0].id;
    $("#accordion").append($newPanel.fadeIn()).find("input[type='text']").val("");
    $("#accordion").append($newPanel.fadeIn()).find("textarea").val("");
     
    $("input[type='submit']").click(function() {
      event.stopPropagation();
       $(this).parent("form").submit();
       
    });
    


    
     $('.date').datetimepicker();
  });

  $('.date').datetimepicker();
});



      
           
        



// $('#sbutton').click(function(){
//   $('form[name=myForm]').submit();
// });

// $(".date").on("click", function(e){
//     //console.log(e);
//     //console.log($form.find(".date"));
//   });
   
  // $('.date').each(function(){
  //   $('.date').datetimepicker();
  // });

  // $("input").removeClass("date");
  
