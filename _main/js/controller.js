
//Button to top
$(window).scroll(function() {
	if ($(document).scrollTop()>80){
		$('.navbar-container').addClass('shrink');
		$('.changeColor').addClass('menuwhite');
		$('#svgelem').fadeOut();
		$('.icon-bar').css('background-color','grey');
		$('.navbar-brand').find('img').css('opacity','1');
	}else{
		$('.navbar-container').removeClass('shrink');
		$('.changeColor').removeClass('menuwhite');
		$('.icon-bar').css('background-color','antiquewhite');
	}
	
	objectsFadeIn();
	
	if(scrollOn($('.progress'))){
		console.log('progress');
		$('.progress-bar-language').css('width','80%');
	}
})
/*----------------Smooth scrolling on scroll spy---------------------------------------------------------------*/
$(document).ready(function(){
	$('body').scrollspy({target:'.scrollclass',offset:65});
	// Add scrollspy to <body>

	// Add smooth scrolling to all links inside a navbar
	$("#myNavbar a").on('click', function(event){

	  // Prevent default anchor click behavior
	  event.preventDefault();

	  // Store hash (#)
	  var hash = this.hash;

	  // Using jQuery's animate() method to add smooth page scroll
	  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area (the speed of the animation)
	  $('html, body').animate({
		scrollTop: $(hash).offset().top
	  }, 800, function(){

		// Add hash (#) to URL when done scrolling (default click behavior)
		window.location.hash = hash;
	  });
	});
/*-------------------------------------Project  BOX anim------------------------------------------------*/
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
/*-------------------------------------SKILLS------------------------------------------------*/
/*------------------------------------Progress bars------------------------------------------*/


function scrollOn(element){
var bottomOfObject = (element).outerHeight()+(element).offset().top;
var bottomOfWindow = $(window).height() + $(window).scrollTop();
if(bottomOfObject<bottomOfWindow){
	return true;
}else{
	return false;
}
}

/*---------------Fade in all object which have objectFadeIn class when scrolled on-----------*/
function objectsFadeIn(){
	$('.objectFadeIn').each(function(){
		
		var bottomOfObject = $(this).outerHeight() + $(this).offset().top;
		var bottomOfWindow = $(window).height() + $(window).scrollTop();
		
		if(bottomOfObject<bottomOfWindow){
			$(this).animate({'opacity':'1'},600);
		}
	});
	
}

$('#contactForm').submit(function(e){
	$('#contactForm button').prop('disabled', true);
	$('#btnSendContact').button('loading');
	$('.contactSpiner').css('display','block');
	e.preventDefault();
	var contactForm = $('#contactForm');
	if($('.unlivingField').val()===''){
		console.log(contactForm[0].checkValidity());
		if(!contactForm[0].checkValidity()){
			resetLoadingSpin();
		}else{
			console.log('JS validate');
			if(contactFormValidate()){

				$.ajax({
					method:'POST',
					dataType:"json",
					url:'php/contactForm.php',
					data:$('#contactForm').serialize(),
					success:function(response){
						console.log(response);
						if(response.success==true){
							$("#modalEmailSuccess").modal('show');
							resetContactForm();
						}else{
							if((nameError=response.error.nameError)!=""){
								console.log('Name error :'+nameError);
								$('.nameNote').removeClass('sr-only');
							}
							if((emailError=response.error.emailError)!=""){
								console.log('Email error:'+emailError);
								$('.emailNote').removeClass('sr-only');
							}
							if((telephoneError=response.error.telephoneError)!=""){
								$('.telephoneNote').removeClass('sr-only');
								console.log('Telephone number error: '+telephoneError);
							}
							if((subjectError=response.error.subjectError)!=""){
								console.log('Subject error: '+subjectError);
								$('.subjectNote').removeClass('sr-only');
							}
							if((messageError=response.error.messageError)!=""){
								console.log('Message error: '+messageError);
								$('.messageNote').removeClass('sr-only');
							}
							if((generalError=response.error.generalError)!=""){
								console.log('General error: '+generalError);
								$('.generalNote').removeClass('sr-only');
							}
						}
					},
					complete:function(){
						resetLoadingSpin();
					},
				})
			} else{
				resetLoadingSpin();
			}
		}
	}
});

function contactFormValidate(){
	var name=$('.imputName').val();
	var email=$('.imputEmail').val();
	var subject=$('.imputSubject').val();
	var telephone=$('.imputTelephone').val();
	var message=$('.imputMessage').val();
	var formValid = true;
	var emailPattern = /([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	var textPattern = /^[a-zA-Z0-9]$/;
	var numberPattern = /^[0-9]$/;
	
	console.log (name);
	if((name.length>20)||(name.length<=2)||(textPattern.test(name))){
		$('.nameNote').removeClass('sr-only');
		formValid = false;
		console.log('name');
	}
	if((email==='')||(email.length>35)||(email.length<3)||(!emailPattern.test(email))){
		$('.emailNote').removeClass('sr-only');
		formValid = false;
		console.log('email');
		console.log((email===''));
		console.log((email.length>35)||(email.length<3));
		console.log(emailPattern.test(email));
		console.log('email');
	}
	if((subject.length>35)||(textPattern.test(subject))){
		$('.subjectNote').removeClass('sr-only');
		formValid = false;
		console.log('sub');
	}
	if((telephone.length>16)||(numberPattern.test(telephone))){
		$('.telephoneNote').removeClass('sr-only');
		formValid = false;
		console.log('tel');
	}
	return formValid;
}

function resetLoadingSpin(){
	$('.contactSpiner').css('display','none');
	$('#contactForm button').prop('disabled',false);
	$('#btnSendContact').button('reset');
}
$('.btnReset').on('click',function(){
	resetContactForm();
});
function resetContactForm(){
	$('.input-group').removeClass('has-error has-success');
	$('.form-control-feedback').removeClass('glyphicon-warning-sign glyphicon-ok');
	$('.contactForm input,textarea').val('');
	$('.generalNote, .messageNote, .subjectNote, .telephoneNote, .emailNote, .nameNote').addClass('sr-only');
}
 
/*------------------Validate user input in contact form on change-------------------------*/
/*------------'has-error'  'has-success'      are colors----------------------------------*/ 
/*------------'glyphicon-warning-sign' 'glyphicon-ok'  are icons ------------------------ */
$('#contactForm input').change(function(){
	if(this.checkValidity()){
		$(this).parent().removeClass('has-error').addClass('has-success');
		$($(this).parent()[0].nextElementSibling).removeClass('glyphicon-warning-sign').addClass('glyphicon-ok');
	}else{
		$(this).parent().removeClass('has-success').addClass('has-error');
		$($(this).parent()[0].nextElementSibling).removeClass('glyphicon-ok').addClass('glyphicon-warning-sign');
	}
});


/*------------------DOCUMENT READY----------------------*/
$(document).ready(function() {
	/*---------------Prevent submit form hit enter------*/
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  
});