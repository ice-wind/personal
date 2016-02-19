/*-----------------init-----------------*/
$(document).ready(function(){
	
	$('.clickAreaToTop').on("click",function(){
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
	$('.btnToBack').hover(function(){
		changeSVGColor('toBack','path','#fff');
	},function(){
		changeSVGColor('toBack','path','#01448f');
	});
	$('.btnToTop').hover(function(){
		changeSVGColor('toTop','path','#fff');
	},function(){
		changeSVGColor('toTop','path','#01448f');
	});
  
    
});

/*--------------------Change SVG image color of strokes---------------------*/
/*-------SVGId    		id of main IMAGE									*/
/*-------SVGElementId   partial id of line,path, etc. inside of image		*/
/*-------color    		demanding color of image							*/
function changeSVGColor(SVGId,SVGElementId,color){
	
	
        var a = document.getElementById(SVGId);
        var svgDoc = a.contentDocument; 
        var delta = svgDoc.getElementById(SVGElementId);
		var svgPaths = svgDoc.getElementsByClassName(SVGElementId);
		for(var i=0;i<svgPaths.length;i++){
			svgPaths[i].style.stroke=color;
		}
    
}