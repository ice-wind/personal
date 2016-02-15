/*-----------------init-----------------*/
$(document).ready(function(){
	
	$('.btnToTop').on("click",function(){
      $('html, body').animate({scrollTop : 0},800);
      return false;
   });
   
   $(window).scroll(function(){
      if ($(this).scrollTop() > 120) {
         $('.btnToTop').fadeIn();
      } else {
         $('.btnToTop').fadeOut();
      }
   });
   
});
