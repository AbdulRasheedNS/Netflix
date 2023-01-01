<?php
$(function(){
    
  $(".closeBtn").click(function(){
    $($(this).data("target")).fadeOut(500);
  });

});
?>