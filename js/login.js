$(document).ready(function(){
	const login_error = $('.login_form form').data('error');
	const login_formFormInput = $('.login_form form input');
	const login_formFormDivA = $('.login_form > form > div > a');
	if(login_error !== undefined) {
		login_formFormInput.addClass('incorrect');
		if(login_error === 'Invalid credentials.') {
			login_formFormDivA.addClass('active');
		}
		else {
			login_formFormDivA.addClass('active').text(login_error);
		}
	}
	login_formFormInput.keyup(function(){
		const login_data = { username : $('#username').val() , password : $('#password').val() };
		if ( (login_data.username == '' ) || ( login_data.password == '' ) ){
			$('#_submit').removeClass('active').attr('disabled');
		} 
		if ( (login_data.username !== '' ) && ( login_data.password !== '' ) ){
			$('#_submit').addClass('active').removeAttr('disabled');
		}
	});

});