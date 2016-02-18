/*-----------------init-----------------*/
$(document).ready(function(){
	
	$('.btnToTop').on("click",function(){
      $('html, body').animate({scrollTop : 0},800);
      return false;
   });
   
   $(window).scroll(function(){
      if ($(this).scrollTop() > 120) {
         $('.btnToTop').fadeIn();
		 $('.leftMenuLine').animate({opacity:1},200);
		 $('.leftMenu').addClass('shiftToTop');
      } else {
         $('.btnToTop').fadeOut();
		 $('.leftMenuLine').animate({opacity:0},30);
		  $('.leftMenu').removeClass('shiftToTop');
      }
   });
/*---------------scroll to selected section---------------*/
	
	$('.sectionOne').on('click',function(){
		var section = $('#sectionOne').offset();
		$('html,body').animate({scrollTop:section.top},800);
		return false;
	});
	$('.sectionTwo').on('click',function(){
		var section = $('#sectionTwo').offset();
		$('html,body').animate({scrollTop:section.top},800);
		return false;
	});
   
  
    $(".path1").attr("stroke","red");
});
