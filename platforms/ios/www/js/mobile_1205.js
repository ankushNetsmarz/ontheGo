jQuery.validator.setDefaults({
    errorPlacement: function(error, element) {
        error.appendTo('#invalid-' + element.attr('id'));
    }
});
$.validator.addMethod("telephone", function(value,element){
	var filter=/^[0-9\-\s\+()]+$/;
	if( value!=null &&  value!="" ){
		if(value.match(filter)){
			return true; 
		}else{
			return false;
		}
	}else{
		return true; 
	}
	});
var url ="http://realtyonthego.bb/ws/add/"; 
//var url = "http://localhost/real_estate1/ws/add";
//var url = "http://kdev.in/realestateapp/ws/add";

$(document).ready(function() {	
	var login = $('#login_contents');
	login.validate({
		submitHandler: function(form) {
		},
		rules: {
			email_address: {
				required: true,
				email:true
			},
			password:{
			required:true,
			minlength:4
			}
		},
		messages: {
			email_address: { 
				required:"Please enter the Email Address",
					email:"Email Address not in proper format"
			},
			password: { 
				required:" Please enter Password",
				minlength:"Password should be minimum four characters"
			}
		}
	});
	var forgot = $('#forgot_pswd');
	forgot.validate({
		submitHandler: function(form) {
		},
		rules: {
			forgot_email_address: {
				required: true,
				email:true
			}
		},
		messages: {
			forgot_email_address: { 
				required:"Please enter the Email Address",
					email:"Email Address not in proper format"
			}
		}
	});
	var signup = $('#signup');
	signup.validate({
		submitHandler: function(form) {
		},
		rules: {
			sign_fname: {
				required: true
			},
			/*sign_lname: {
				required: true
			},*/
			sign_telephone:{
				required:true,
				minlength:8,
				telephone: true
			},
			sign_email_address:{
				required:true,
				email:true,
				remote: {
					url: url,
					type: "post",
					data: {
							email_address: function() {
								return $( "#sign_email_address" ).val();
							},
							mode:"CheckEmail"
					}
				}
			},
			sign_password:{
				required:true,
				minlength:4
				
			},
			sign_cpassword:{
				required:true,
				equalTo:"#sign_password"
			}
		},
		messages: {
			sign_fname: { 
				required:"Please enter Firstname"
			},
			/*sign_lname: {
				required: "Please enter Lastname"
			},*/
			sign_telephone:{
				required:"Please enter the Telephone Number",
				minlength:"Telephone Number should be minimum eight digits",
				telephone:"Telephone Number not in proper format"
		},
			sign_email_address: { 
				required:"Please enter the Email Address",
				email:"Email Address not in proper format",
				remote: "Email Address already exist"
			},
			sign_password: { 
				required:"Please enter Password",
				minlength:"Password should be minimum four characters"
			},
			sign_cpassword : { 
				required:"Please enter Confirm Password",
				equalTo:"Confirm password and password should be same"	
			}
		}
	});
	var myaccount = $('#myaccount_form');
	myaccount.validate({
		submitHandler: function(form) {
		},
		rules: {
			my_firstname: {
				required: true
			},
			/*my_lastname: {
				required: true
			},*/
			my_telephone :{
				required:true,
				minlength:8,
				telephone: true
			},
			my_emailaddress:{
				required:true,
				email:true,
				remote: {
					url: url,
					type: "post",
					data: {
						my_emailaddress: function() {
							return $( '#sign_email_address' ).val();
						},
						user_id: function() {
							return $( '#my_user_id' ).val();
						},
						mode:"CheckEmail"
					}
				}
			},
			my_oldpassword:{
				remote:	{
							url: url,
							type: "post",
							data: {
								old_password: function() {
									return $( '#my_oldpassword' ).val();
								},
								user_id: function() {
									return $( '#my_user_id' ).val();
								},
								mode:"OldPassword"
							}
						}
			},
			my_newpassword:{
				required:function() {
					return( $( "#my_oldpassword" ).val() !="" );
				},
				minlength:function() {
					if($( "#my_newpassword" ).val() !=""){
						return 4;
					}
				}
			},
			my_confirmpassword:{
					required:function() {
						return($( "#my_oldpassword" ).val() !="");
					},
				equalTo:"#my_newpassword"
			}
		},
		messages: {
			my_firstname: { 
				required:"Please enter Firstname"
			},
			/*my_lastname: {
				required: "Please enter Lastname"
			},*/
			my_telephone: { 
				required:"Please enter the Telephone Number",
				minlength:"Telephone Number should be minimum eight digits",
				telephone:"Telephone Number not in proper format"
			},
			my_emailaddress: { 
				required:"Please enter the Email Address",
				email:"Email Address not in proper format",
				remote: "Email Address already exist"
			},
			my_oldpassword: { 
				remote:"Password does not match with Old Password"
			},
			my_newpassword: { 
				required:"Please enter New Password",
				minlength:"Password should be minimum four characters"
			},
			my_confirmpassword : { 
				required:"Please enter Confirm Password",
				equalTo:"Confirm password and password should be same"	
			}
		}
	});
	
	var searchform = $('#search_name_form');
	searchform.validate({
		submitHandler: function(form) {
			
		},
		rules: {
			save_search_name:{
				required:true,
				remote: {
					url: url ,
					type: "post",
					data: {
						search_name: function() {
							return $( '#save_search_name' ).val();
						},
						user_id:function() {
							return $( '#lusid' ).val();
						},
						mode:"CheckSearchName"
					}
				}
			}
		},
		messages: {
			save_search_name : { 
				required:"Please enter the Search Name to save",
				remote:"Search name already exist,give new one"
			}
		}
	});
	
		var requesting = $('#req_info');
		requesting.validate({
			submitHandler: function(form) {
			},
			rules: {
				req_emailid: {
					required: true,
					email:true
				},
				telephone_req:{
					required:true,
					minlength:8,
					telephone: true
				},
				description_request:{
					required:true
					}
			},
			messages: {
				req_emailid: { 
					required:"Please enter the Email Address",
						email:"Email Address not in proper format"
				},
				telephone_req: { 
					required:"Please enter the Telephone Number",
					minlength:"Telephone Number should be minimum eight digits",
					telephone:"Telephone Number not in proper format"
				},
				description_request: { 
					required:"Please enter Description"
				}
			}
		});
	$( "#signup_btn" ).click(function() {
		if(signup.valid()){
			mobile_signup();
		}
	});
	$( "#login_btn" ).click(function() {
		if(login.valid()){
			mobile_login();
		}
	});
	$( "#forgot_sub_btn" ).click(function() {
		if(forgot.valid()){
			mobile_forgot();
		}
	});
	$( "#myccount_btn" ).click(function() {
		if(myaccount.valid()){
			myccount_update();
		}
	});
	$( "#search_name_btn" ).click(function() {
		var response;
			if(searchform.valid()){
			$.ajax({
	    	url: url ,
			type: "post",
			data: {
				search_name: function() {
					return $( '#save_search_name' ).val();
				},
				user_id:function() {
					return $( '#lusid' ).val();
				},
				mode:"CheckSearchName"
			},
	        async:false,
	        success:function(data){
	            response = data;
	        }
			
	    });
			
		 if(response == 'true')
	    {   
			 $("#invalid-save_search_name").html("");
			 $( "#popupDialog" ).popup('close');
	    	save_searching();
	    	return true;
	    }
	    else
	    {		
	    	//$("#invalid-save_search_name").html("Search name already exist,give new one");
	    	 return false;
	    }
		 
		
			}
	});
	$( "#req_info_btn" ).click(function() {
		if(requesting.valid()){
			mobile_req__info();
		}
	});
	
});
