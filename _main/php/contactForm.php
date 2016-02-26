<?php
	$name=$subject=$email=$telephone=$message="";
	$error=$nameError=$telephoneError=$subjectError=$emailError=$messageError=$generalError="";
	$success=false;
	//$secret="6LdInRcTAAAAAKbVYq_joBkF2z9lhr_fkHgMjw-I";
	
	
	$to="contactforpi@gmail.com";
	$header="Personal contact formular";
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		if(empty($_POST["name"])){
			$nameError="Name is required!";
		}else{
			$name=test_input($_POST["name"]);
			if(!preg_match("/^[a-zA-Z0-9 ]*$/",$name)){
				$nameError="Only letters,numbers and white space allowed";
			}
		}
		if(empty($_POST["telephone"])){
			$telephoneError="Subject is required!";
		}else{
			$telephone=test_input($_POST["telephone"]);
			if(!preg_match("/^[0-9 ]*$/",$telephone)){
				$telephoneError="Only numbers and white space allowed";
			}
		}
		if(empty($_POST["email"])){
			$emailError="Email is required!";
		}else{
			$email=test_input($_POST["email"]);
			if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
				$emailError="Invalid email format";
			}
		}
		if(empty($_POST["subject"])){
			$subjectError="Subject is required!";
		}else{
			$subject=test_input($_POST["subject"]);
			if(!preg_match("/^[a-zA-Z0-9 ]*$/",$subject)){
				$subjectError="Only letters,numbers and white space allowed";
			}
		}
		if(empty($_POST["textarea"])){
			$messageError="Message is required!";
		}else{
			$message=test_input($_POST["textarea"]);
		}
		if(!empty($_POST["contactUnlivingUsers"])){
			$generalError="This is un-trusted user!";
		}
		/*
		if(empty($_POST["g-recaptcha-response"])){
			$generalError="Please use re-captcha for security reasons!";
		}else{
			$captcha=($_POST["g-recaptcha-response"]);
			$response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);
			$decoded_response = json_decode($response);
			if ($decoded_response->success){
				$success="Email was send successfully";
			}
		}
		*/
	}else{
		echo $generalError="Error: method to send data is not POST!";
	}
	
	function test_input($data){
		$badchars=array("(",")","{","}",":",";","$","/","<",">");
		
		$data=str_ireplace($badchars,"",$data);
		$data=trim($data);
		$data=stripslashes($data);
		$data=strip_tags($data);
		$data=htmlspecialchars($data);
		return $data;
	}
	$header = "From: ".$email;
	
	if(($nameError!="") || ($emailError!="") || ($telephoneError!="") || ($subjectError!="") || ($messageError!="") || ($generalError!="")){
		$error=array("nameError"=>$nameError,"emailError"=>$emailError,"telephoneError"=>$telephoneError,"subjectError"=>$subjectError,"messageError"=>$messageError,"generalError"=>$generalError);
		$success=false;
	}else{
		$send = mail($to,$subject,$message,$header);
		if($send){
			$success=True;
		}else{
			$generalError=("Error: send message fail with status: ".$send);
			$error['generalError']=$generalError;
		}
	}
	echo (json_encode(array("success"=>$success,"error"=>$error)));
	
?>