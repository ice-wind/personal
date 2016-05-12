$(document).ready(function(){
/*--------------------------Document ready set up properties------------------------*/
	
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

		$(this).children('.titleHoverIn').addClass('titleScale');
	},function(){
		$(this).children('.titleHoverIn').removeClass('titleScale');
	});
	
	
});

$(window).scroll(function() {
	if(scrollOn($('.progress'))){
		$('.progress-bar-language_sk').css('width','100%');
		$('.progress-bar-language_eng').css('width','70%');
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