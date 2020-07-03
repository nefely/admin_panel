$(document).ready(function(){

/*delete*/
$('body').delegate('.settings_table_ul li button.delete', 'click' , function(){
	$(this).parent('li').parent('.settings_table_ul').remove()
});
/*make input active*/
$('body').delegate('.settings_table_ul li:first-child input', 'click' , function(){
	$('.settings_table_ul li:first-child').removeClass('active');
	$(this).parent('div').parent('li').addClass('active');
	$('.settings_table_ul li:first-child input').each(function(){
		$(this).val($(this).attr('value'));
		console.log('1111');
	});
});
/*save in table*/
$('body').delegate('.settings_table_ul li:first-child button.save' , 'click' , function(){
	$(this).parent('div').children('input').attr("value" , $(this).parent('div').children('input').val());
	$('.settings_table_ul li:first-child').removeClass('active');
	console.log('2222');
});

/*create new table ul*/
$('.settings_pop_up_create_new_table_ul').fadeOut();
$('.settings_content_add_something button').click(function(){
	$('.settings_pop_up_create_new_table_ul_container_input input').val("");
	$('.settings_pop_up_create_new_table_ul').fadeIn();
});
/*create new table ul save*/
var string = ""
$('.settings_pop_up_create_new_table_ul_container_save button').click(function(){
	string = $('.settings_pop_up_create_new_table_ul_container_input input').val();
	$('.template_to_create_new_table_ul .settings_table_ul').clone().prependTo($('.settings_table_body')).children('li').children('div').children('input').val(string).attr('value', string);
	$('.settings_pop_up_create_new_table_ul').fadeOut();
});
/*create new table ul close*/
$('.settings_pop_up_create_new_table_ul_container_close').click(function(){
	$('.settings_pop_up_create_new_table_ul_container_input input').val("");
	$('.settings_pop_up_create_new_table_ul').fadeOut();
});



});