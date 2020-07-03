$(document).ready(function(){

	/*при нажиманні на li підкатегорії +condition створювати новий блок фільтрації і вибір категорії і підкатегорії створеного блоку фільтра*/
	$('.campaign_add_condition_dropdown li ul li').click(function(){
		var group_filter_value_class = $(this).attr('class');
		
		$('.add_new_condition_block_script .campaign_filter_condition_container').clone().insertBefore($('.campaign_add_condition'));
		$('.campaign_add_condition').addClass('active');
		
		$('.campaign_filters_condition .campaign_filter_condition_container:eq(-1) .group_filter .group_filter_value').text($(this).parent('ul').parent('li').children('p').text()).attr('data-value', $(this).parent('ul').parent('li').children('p').attr('data-value'));
		$('.campaign_filters_condition .campaign_filter_condition_container:eq(-1) .sub_group_filter .sub_group_value').text($(this).text()).attr('data-value', $(this).attr('data-value'));
		
		$('.campaign_filters_condition .campaign_filter_condition_container:eq(-1) .group_filter').addClass('group_was_chosen');
		
		$('.campaign_filters_condition .campaign_filter_condition_container:eq(-1) .sub_group_filter').children('ul').children('li').css('display','none');
		$('.campaign_filters_condition .campaign_filter_condition_container:eq(-1) .sub_group_filter').children('ul').children('li.'+group_filter_value_class).css('display','flex');
	});

	/*видалити блок фільтрації*/
	$('body').delegate('.campaign_filter_condition_container_close', 'click', function(){
		$(this).parent('div').remove();
		/*провірка чи є активні фільтри чи ні , щоб робити або не робити кнопку великою*/
		if( $(".campaign_filters_condition > div").is(".campaign_filter_condition_container") ) {
		} else {
			$('.campaign_add_condition').removeClass('active');
		}
	});

	/* сховати / показати список фільтраці категорії або підкатегорії */
	$('body').delegate('.campaign_filter_condition_container > .group_filter > p' , "click" , function(){
		$(this).parent('.group_filter').children("ul").toggleClass('filter_activated');
	});
	$('body').delegate('.campaign_filter_condition_container > .group_filter > .filter_activated > li' , "click" , function(){
		$(this).closest('.group_filter').children("ul").toggleClass('filter_activated');
	});
	/* не показувати список підкатегорії коли категорія не вибрана */
	$('body').delegate('.campaign_filter_condition_container > .sub_group_filter > p' , "click" , function(){
		if (  $(this).parent('.sub_group_filter').parent('.campaign_filter_condition_container').children('.group_filter').hasClass('group_was_chosen')) {
			$(this).parent('.sub_group_filter').children("ul").toggleClass('filter_activated');
		}
	});
	$('body').delegate('.campaign_filter_condition_container > .sub_group_filter > .filter_activated > li' , "click" , function(){
		if (  $(this).closest('.sub_group_filter').parent('.campaign_filter_condition_container').children('.group_filter').hasClass('group_was_chosen')) {
			$(this).closest('.sub_group_filter').children("ul").toggleClass('filter_activated');
		}
	});

	/* зробити вибрану категорію або підкатегорію фільра сірою і поставити на початок списку */
	$('body').delegate('.campaign_filter_condition_container > div > ul > li' , "click" , function(){
		$(this).parent('ul').parent('div').children('p').text( $(this).text() ).attr('data-value', $(this).attr('data-value'));
		$(this).parent('ul').children('li').css('order', '2').css('background', 'var(--w)');
		$(this).css('order', '1').css('background', 'var(--light)');
	});

	$('.campaign_filters_condition').fadeOut();
	/* сховати / показати БЛОКИ і кнопку для додавання блоків фільтрації */
	$('.campaigns_filter_container .campaigns_filter').click(function(){
		$('.campaign_filters_condition').fadeToggle();
	});

	/* сховати список фільтраці підкатегорії поки не буде вибрана категорія */
	$('.sub_group_filter > ul > li').fadeOut();

	/*вибір правильної підкатегорії відповідно до категорії
	скидування значень підкатегорії коли вибираєш категорію*/
	$('body').delegate('.group_filter > ul > li', 'click' , function(){
		var group_filter_value_class = $(this).attr('class');

		/*скрити всі пдкатегорії як не належать активній категорії і показати ті - які належать*/
		$(this).parent('ul').parent('.group_filter').parent('.campaign_filter_condition_container').children('.sub_group_filter').children('ul')
		.children('li').css('display','none');
		$(this).parent('ul').parent('.group_filter').parent('.campaign_filter_condition_container').children('.sub_group_filter').children('ul')
		.children('li.'+group_filter_value_class).css('display','flex');

		$(this).parent('ul').parent('.group_filter').addClass('group_was_chosen');
		$(this).parent('ul').parent('.group_filter').parent('.campaign_filter_condition_container').children('.sub_group_filter').children('p').text($('.add_new_condition_block_script .campaign_filter_condition_container .sub_group_filter .sub_group_value').text() ).attr('data-value', 'null');
	});

	/*edit / dublicate / delete li*/

	/*delete*/
	$('body').delegate('.campaigns_table_ul > .edit > ul > li > button.campaigns_table_ul_delete' ,'click', function(){
		$(this).parent('li').parent('ul').parent('.edit').parent('.campaigns_table_ul').remove()
		reinit_filter();
	})
	/*dublicate*/
	$('body').delegate('.campaigns_table_ul > .edit > ul > li > button.campaigns_table_ul_dublicate' , 'click' , function(){
		$(this).parent('li').parent('ul').parent('.edit').parent('.campaigns_table_ul').clone().insertAfter($(this).parent('li').parent('ul').parent('.edit').parent('.campaigns_table_ul'))
		reinit_filter();
		/*тут треба буде ще змінити data-id параметер ul-ки яка буде створюватися*/
	});

	/*edit*/
	/*popup close*/
	$('.campaign_pop_up_create_new_campaign_container_close, .campaign_pop_up_save_button > button').click(function(){
		$('.campaign_pop_up_create_new_campaign').fadeOut();
	});


	/*сховати попап спочатку*/ 
	$('.campaign_pop_up_create_new_campaign').fadeOut(0);

	var data_key = 0;
	var current_name = "";
	var push_title = "";
	var target_link = "";
	var push_description = ""
	var current_img_src = "";
	var current_language = "";
	var current_language_value = "";
	var current_group = "";
	var current_group_value = "";

	/*виклик попапа нового*/
	$('body').delegate('.main_cramps button.new_campaign' , 'click' , function(){
		$('.campaign_pop_up_create_new_campaign').fadeIn();
		data_key = 0;
		current_name = "";
		push_title = "";
		target_link = "";
		push_description = ""
		current_img_src = "";
		current_language = "Select Language:";
		current_language_value = "undefined";
		current_group = "Select Group:";
		current_group_value = "undefined";
		/*name*/
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_name input').val(current_name);
		/*push_title*/
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_push_title input').val(push_title);
		/*target_link*/
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_target_link input').val(target_link);
		/*push_description*/
		$('.campaign_pop_up_create_new_campaign .inputs_right .campaign_pop_up_input_campaign_description textarea').val(push_description);
		/*img*/
		$('.campaign_pop_up_create_new_campaign .inputs_right .campaign_pop_up_input_campaign_img img').attr('src', current_img_src);
		/*language*/
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language select > option').removeAttr('selected');
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-selected').text(current_language);
		/*$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-selected').attr('value' , current_language_value);*/
		/*group*/			
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups select > option').removeAttr('selected');
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-selected').text(current_group);
		/*$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-selected').attr('value' , current_group_value);*/
		/*same as select fix*/
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-items > div').removeClass('same-as-selected');
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-items > div').removeClass('same-as-selected');
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-items > div[value="'+current_group_value+'"]').addClass('same-as-selected');
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-items > div[value="'+current_language_value+'"]').addClass('same-as-selected');
		$('.campaign_pop_up_save_button button').removeClass('editOldTable');
		$('.campaign_pop_up_save_button button').addClass('addNewTable');
	});
	
	/*виклик попапа з параметрами*/
	$('body').delegate('.campaigns_table ul > li:nth-child(9) ul li button.campaigns_table_ul_edit' , 'click' , function(){
		
		$('.campaign_pop_up_create_new_campaign').fadeIn();

		data_key = 0;
		current_name = "";
		push_title = "";
		target_link = "";
		push_description = ""
		current_img_src = "";
		current_language = "Select Language:";
		current_language_value = "undefined";
		current_group = "Select Group:";
		current_group_value = "undefined";

		data_key = $(this).parent('li').parent('ul').parent('li').parent('ul').attr('data-key');
		current_name = $(this).parent('li').parent('ul').parent('li').parent('.campaigns_table ul').children('li:nth-child(1)').children('p').text();
		current_img_src = $(this).parent('li').parent('ul').parent('li').parent('.campaigns_table ul').children('li:nth-child(2)').children('img').attr('src');
		current_language = $(this).parent('li').parent('ul').parent('li').parent('.campaigns_table ul').children('li:nth-child(7)').children('p').text();
		current_language_value = $(this).parent('li').parent('ul').parent('li').parent('.campaigns_table ul').children('li:nth-child(7)').children('p').attr('data-language');
		current_group = $(this).parent('li').parent('ul').parent('li').parent('.campaigns_table ul').children('li:nth-child(8)').children('p').text();
		current_group_value = $(this).parent('li').parent('ul').parent('li').parent('.campaigns_table ul').children('li:nth-child(8)').children('p').attr('data-group');

		/*name*/
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_name input').val(current_name);
		/*img*/
		$('.campaign_pop_up_create_new_campaign .inputs_right .campaign_pop_up_input_campaign_img img').attr('src', current_img_src);
		/*language*/
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language select > option').removeAttr('selected');
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-selected').text(current_language);
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-selected').attr('value' , current_language_value);
		/*group*/			
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups select > option').removeAttr('selected');
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-selected').text(current_group);
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-selected').attr('value' , current_group_value);
	
		/*same as select fix*/
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-items > div').removeClass('same-as-selected');
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-items > div').removeClass('same-as-selected');
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-items > div[value="'+current_group_value+'"]').addClass('same-as-selected');
		$('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-items > div[value="'+current_language_value+'"]').addClass('same-as-selected');

		$('.campaign_pop_up_save_button button').removeClass('addNewTable');
		$('.campaign_pop_up_save_button button').addClass('editOldTable');
	})

	/*клік в попапі по кнопці save (edit)*/ 
	$('body').delegate(".campaign_pop_up_save_button button.editOldTable","click",function(){
		/*name*/
		$('.campaigns_table ul[data-key="'+data_key+'"]').children('li:nth-child(1)').children('p').text($('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_name input').val())
		/*img*/
		$('.campaigns_table ul[data-key="'+data_key+'"]').children('li:nth-child(2)').children('img').attr('src', $('.campaign_pop_up_create_new_campaign .inputs_right .campaign_pop_up_input_campaign_img img').attr('src'));
		/*language*/
		$('.campaigns_table ul[data-key="'+data_key+'"]').attr('data-language', $('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-selected').attr('value'));
		$('.campaigns_table ul[data-key="'+data_key+'"]').children('li:nth-child(7)').children('p').text( $('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-selected').text());
		$('.campaigns_table ul[data-key="'+data_key+'"]').children('li:nth-child(7)').children('p').attr('data-language', $('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-selected').attr('value'));
		/*group*/
		$('.campaigns_table ul[data-key="'+data_key+'"]').attr('data-group', $('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-selected').attr('value'));
		$('.campaigns_table ul[data-key="'+data_key+'"]').children('li:nth-child(8)').children('p').text( $('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-selected').text());
		$('.campaigns_table ul[data-key="'+data_key+'"]').children('li:nth-child(8)').children('p').attr('data-group', $('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-selected').attr('value'));
		reinit_filter();
	});

	/*клік в попапі по кнопці save (add)*/ 
	$('body').delegate(".campaign_pop_up_save_button button.addNewTable","click",function(){
		/*key*/
		/*там де undefined треба буде передати унікальний ключик таблиці ------------------------>*/
		var data_key = "undefined";
		$('.template_to_create_new_campaign > .campaigns_table_ul').clone().attr('data-key', data_key).prependTo($('.campaigns_table_body'));
		/*name*/
		$('.campaigns_table ul[data-key="'+data_key+'"]').children('li:nth-child(1)').children('p').text($('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_name input').val())
		/*img*/
		$('.campaigns_table ul[data-key="'+data_key+'"]').children('li:nth-child(2)').children('img').attr('src', $('.campaign_pop_up_create_new_campaign .inputs_right .campaign_pop_up_input_campaign_img img').attr('src'));
		/*language*/
		$('.campaigns_table ul[data-key="'+data_key+'"]').attr('data-language', $('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-selected').attr('value'));
		$('.campaigns_table ul[data-key="'+data_key+'"]').children('li:nth-child(7)').children('p').text( $('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-selected').text());
		$('.campaigns_table ul[data-key="'+data_key+'"]').children('li:nth-child(7)').children('p').attr('data-language', $('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_language .select-selected').attr('value'));
		/*group*/
		$('.campaigns_table ul[data-key="'+data_key+'"]').attr('data-group', $('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-selected').attr('value'));
		$('.campaigns_table ul[data-key="'+data_key+'"]').children('li:nth-child(8)').children('p').text( $('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-selected').text());
		$('.campaigns_table ul[data-key="'+data_key+'"]').children('li:nth-child(8)').children('p').attr('data-group', $('.campaign_pop_up_create_new_campaign .inputs_left .campaign_pop_up_input_campaign_groups .select-selected').attr('value'));
		reinit_filter();
		
		/*тут ще треба дописати на інші поля типу текст / таргет лінк / пуш тайтл*/
	});


	/* обрахування довжини строки текстареї*/
	$('.campaign_pop_up_create_new_campaign_inputs .campaign_pop_up_input_campaign_description textarea').on('input' , function(){
		var length_textarea = $(this).val().length + 1;
		var length_limit = 240;
		var result = length_limit - length_textarea ; 
		$(this).parent('.campaign_pop_up_input_campaign_description').children('p').children('span').text( result );
		if ( result < 0 ) {
			$(this).parent('.campaign_pop_up_input_campaign_description').children('p').children('span').addClass('error');
		} else {
			$(this).parent('.campaign_pop_up_input_campaign_description').children('p').children('span').removeClass('error');
		}
	});

	/*input file*/
	$('.campaign_pop_up_input_campaign_icon .campaign_pop_up_input_campaign_icon_absolute input').on('input' , function(){
		$(this).parent('.campaign_pop_up_input_campaign_icon_absolute').children('.download_img').children('img').attr("src" , $(this).val())
	});


/*filter on block / input */
/*filter on campaigns filter_block*/
$('body').delegate('.campaigns_filter_container .campaign_filters_condition' , 'click' , function(){
    filter_campaigns_block_func();
});
var filter_campaigns_block_func = function() {
    $('.campaigns_container .campaigns_table .campaigns_table_body > ul').removeClass("filtered_on_group");
    $('.campaigns_container .campaigns_table .campaigns_table_body > ul').removeClass("filtered_on_language");
    var block_func_array = [];
    $('.campaigns_filter_container .campaign_filters_condition .campaign_filter_condition_container').each(function(){
        var group = $(this).find('p.group_filter_value').attr("data-value");
        var sub_group = $(this).find('p.sub_group_value').attr('data-value');
        if (group == "group") {
            block_func_array.push({"group": sub_group},)
        }
        if (group == "language") {
            block_func_array.push({"language": sub_group},)
        }
    });
    console.log(block_func_array)
    for (i in block_func_array) {
        if ( Object.keys(block_func_array[i]).indexOf( 'group' ) != -1 ) {
            $('.campaigns_container .campaigns_table .campaigns_table_body > ul').addClass("filtered_on_group")
        }
        if ( Object.keys(block_func_array[i]).indexOf( 'language' ) != -1 ) {
            $('.campaigns_container .campaigns_table .campaigns_table_body > ul').addClass("filtered_on_language")
        }
    }
    for (i in block_func_array) {
        if ( Object.keys(block_func_array[i]) == "group") {
            $('.campaigns_container .campaigns_table .campaigns_table_body > ul[data-group="'+Object.values(block_func_array[i])+'"]')
            .removeClass('filtered_on_group');
        }
        if ( Object.keys(block_func_array[i]) == "language") {
            $('.campaigns_container .campaigns_table .campaigns_table_body > ul[data-language="'+Object.values(block_func_array[i])+'"]')
            .removeClass('filtered_on_language');
        }
    }
    if ( $('.campaigns_filter_container .campaign_filters_condition .campaign_filter_condition_container').length == 0 ){
        $('.campaigns_container .campaigns_table .campaigns_table_body > ul').removeClass("filtered_on_group")
        $('.campaigns_container .campaigns_table .campaigns_table_body > ul').removeClass("filtered_on_language")
    }
}

/*filter on campaigns input*/
$('.campaigns_filter_container .campaigns_search input').on('input' , function(){
    filter_campaigns_input_func('.campaigns_filter_container .campaigns_search input' , ".campaigns_table");
})
var filter_campaigns_input_func = function(input , ul) {
    var input_text = $(input).val().toLowerCase();
    var input_text_length = $(input).val().length;
    $(ul).find('.campaigns_table_body').children('ul').each(function(){
        var ul_id_campaign_name = $(this).children('.name').children('p').text().toLowerCase();
        if( ul_id_campaign_name.indexOf(input_text)+1 > 0 ) {
            $(this).css('display' , 'flex');
        }
        else if (input_text == "")  {
            $(this).css('display' , 'flex');
        }
        else {
            $(this).css('display' , 'none');
        }
    });
}
/*reinit filter input and block*/
var reinit_filter = function(){
   filter_campaigns_block_func();
   filter_campaigns_input_func('.campaigns_filter_container .campaigns_search input' , ".campaigns_table");
}

});