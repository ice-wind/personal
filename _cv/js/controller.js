$(document).ready(function(){
	$('.circle').hover(function(){
		$(this).children('i').css('color','#679cb9');
	},function(){
		$(this).children('i').css('color','grey');
	});
	
	$('.box').hover(function(){
		$(this).children('p').css('opacity','0');
	},function(){
		$(this).children('p').css('opacity','1');
	});
	
	$('.box').hover(function(){

		$(this).children('.titleHoverIn').addClass('abc');
	},function(){
		$(this).children('.titleHoverIn').removeClass('abc');
	});
	
	
});

$(window).scroll(function() {
	if(scrollOn($('.progress'))){
		$('.progress-bar-language').css('width','80%');
	}
	
	
		
	
})

function scrollOn(element){
	var bottomOfObject = (element).outerHeight()+(element).offset().top;
	var bottomOfWindow = $(window).height() + $(window).scrollTop();
	if(bottomOfObject<bottomOfWindow){
		return true;
	}else{
		return false;
	}
}