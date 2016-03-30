
//Button to top
$(window).scroll(function() {
	if ($(document).scrollTop()>80){
		$('.navbar-container').addClass('shrink');
		$('.hideMenu').addClass('menuwhite');
		$('#svgelem').fadeOut();
	}else{
		$('.navbar-container').removeClass('shrink');
		$('.hideMenu').removeClass('menuwhite');
	}
	
	objectsFadeIn();
})
/*----------------Fade in Menu---------------------------------------------------------------*/


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