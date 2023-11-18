var first = undefined;
var cloned = [];
var maxID = 10000;
var write_cookie = false ;
curr_sequence = {
	id: 808080,
}
$(document).ready(function(){
	/*sequence block workspace*/
	/*open edit block workspace*/
	/*$('.settings_user_content_add_something.sequence_block button.edit').click(function(){
		$('.settings_user_content_add_something').removeClass('work_space_active');
		$('.settings_user_content_add_something.sequence_edit_block').addClass('work_space_active');
		$('.main_work_space').removeClass('work_space_active')
		$('.main_work_space.sequence_block').addClass('work_space_active');
	});*/
	/*open settings block workspace*/
	$('.settings_user_content_add_something.sequence_edit_block button.setting').click(function(){
		/*navigation*/
		$('.settings_user_content_add_something').removeClass('work_space_active');
		$('.settings_user_content_add_something.sequence_settings_block').addClass('work_space_active');
		/*workspace*/
		$('.main_work_space').removeClass('work_space_active')
		$('.main_work_space.sequence_settings_block').addClass('work_space_active');
	});

	/*edit block workspace*/
	/*publish*/
	/*$('.settings_user_content_add_something.sequence_edit_block button.publish').click(function(){
		$('.settings_user_content_add_something').removeClass('work_space_active');
		$('.settings_user_content_add_something.sequence_block').addClass('work_space_active');
		$('.main_work_space').removeClass('work_space_active')
		$('.main_work_space.sequence_block').addClass('work_space_active');
	});*/

	/*settings block workspace*/
	/*save*/
	/*$('.settings_user_content_add_something.sequence_settings_block button.save').click(function(){
		$('.settings_user_content_add_something').removeClass('work_space_active');
		$('.settings_user_content_add_something.sequence_block').addClass('work_space_active');
		$('.main_work_space').removeClass('work_space_active')
		$('.main_work_space.sequence_block').addClass('work_space_active');
	});*/

	$('.settings_user_content_add_something.sequence_settings_block  button.back').click(function(){
		/*navigation*/
		$('.settings_user_content_add_something').addClass('work_space_active');
		$('.settings_user_content_add_something.sequence_settings_block').removeClass('work_space_active');
		/*workspace*/
		$('.main_work_space').addClass('work_space_active')
		$('.main_work_space.sequence_settings_block').removeClass('work_space_active');
	});


	/*filter script*/
	/*при нажиманні на li підкатегорії +condition створювати новий блок фільтрації і вибір категорії і підкатегорії створеного блоку фільтра*/
	$('.sequence_add_condition_dropdown li ul li').click(function(){  
		var sequence_group_filter_value_class = $(this).attr('class');

		$('.add_new_condition_block_script_with_param .sequence_filter_condition_container').clone().insertBefore($('.sequence_add_condition'));
		$('.sequence_add_condition').addClass('active');
		$('.sequence_targeting_filter_block > .sequence_filters_condition_title').addClass('active');

		$('.sequence_filters_condition .sequence_filter_condition_container:eq(-1) .sequence_group_filter .sequence_group_filter_value').text($(this).parent('ul').parent('li').children('p').text()).attr('data-value', $(this).parent('ul').parent('li').children('p').attr('data-value'));
		$('.sequence_filters_condition .sequence_filter_condition_container:eq(-1) .sub_sequence_group_filter .sub_sequence_group_value').text($(this).text()).attr('data-value', $(this).attr('data-value'));

		$('.sequence_filters_condition .sequence_filter_condition_container:eq(-1) .sequence_group_filter').addClass('group_was_chosen');

		$('.sequence_filters_condition .sequence_filter_condition_container:eq(-1) .sub_sequence_group_filter').children('ul').children('li').css('display','none');
		$('.sequence_filters_condition .sequence_filter_condition_container:eq(-1) .sub_sequence_group_filter').children('ul').children('li.'+sequence_group_filter_value_class).css('display','flex');
	
		count_user()
	});

	/*видалити блок фільтрації*/
	$('body').delegate('.sequence_filter_condition_container_close', 'click', function(){
		$(this).parent('div').remove();
		/*провірка чи є активні фільтри чи ні , щоб робити або не робити кнопку великою*/
		if( $(".sequence_filters_condition > div").is(".sequence_filter_condition_container") ) {
		} else {
			$('.sequence_add_condition').removeClass('active');
			$('.sequence_targeting_filter_block > .sequence_filters_condition_title').removeClass('active');
		}
		count_user()
	});

	/* сховати / показати список фільтраці категорії або підкатегорії */
	$('body').delegate('.sequence_filter_condition_container > .sequence_group_filter' , "click" , function(){
		$(this).children("ul").toggleClass('filter_activated');
	});
	/* не показувати список підкатегорії коли категорія не вибрана */
	$('body').delegate('.sequence_filter_condition_container > .sub_sequence_group_filter' , "click" , function(){
		if (  $(this).parent('.sequence_filter_condition_container').children('.sequence_group_filter').hasClass('group_was_chosen')) {
			$(this).children("ul").toggleClass('filter_activated');
		}
	});

	/* зробити вибрану категорію або підкатегорію фільра сірою і поставити на початок списку */
	$('body').delegate('.sequence_filter_condition_container > div > ul > li' , "click" , function(){
		$(this).parent('ul').parent('div').children('p').text( $(this).text() ).attr('data-value', $(this).attr('data-value'));
		$(this).parent('ul').children('li').css('order', '2').css('background', 'var(--w)');
		$(this).css('order', '1').css('background', 'var(--light)');
		count_user();
	});

	/* сховати список фільтраці підкатегорії поки не буде вибрана категорія */
	$('.sub_sequence_group_filter > ul > li').fadeOut();

	/*вибір правильної підкатегорії відповідно до категорії
	скидування значень підкатегорії коли вибираєш категорію*/
	$('body').delegate('.sequence_group_filter > ul > li', 'click' , function(){
		var sequence_group_filter_value_class = $(this).attr('class');

		/*скрити всі пдкатегорії як не належать активній категорії і показати ті - які належать*/
		$(this).parent('ul').parent('.sequence_group_filter').parent('.sequence_filter_condition_container').children('.sub_sequence_group_filter').children('ul')
			.children('li').css('display','none');
		$(this).parent('ul').parent('.sequence_group_filter').parent('.sequence_filter_condition_container').children('.sub_sequence_group_filter').children('ul')
			.children('li.'+sequence_group_filter_value_class).css('display','flex');

		$(this).parent('ul').parent('.sequence_group_filter').addClass('group_was_chosen');
		$(this).parent('ul').parent('.sequence_group_filter').parent('.sequence_filter_condition_container').children('.sub_sequence_group_filter').children('p').text($('.add_new_condition_block_script_with_param .sequence_filter_condition_container .sub_sequence_group_filter .sub_sequence_group_value').text() ).attr('data-value', 'null');
	});

	/*is / is not*/
	$('body').delegate('.separator_tag > ul', 'click', function(){
		var data_tag_condition = $(this).attr('data-tag-condition');
		if (data_tag_condition == "is") {
			$(this).attr('data-tag-condition', 'is_not');
			var data_tag_condition = "is_not";
			$(this).children('li').removeClass("active");
			$(this).children('li[data-tag-condition="'+data_tag_condition+'"]').addClass('active');
		} else {
			$(this).attr('data-tag-condition', 'is');
			var data_tag_condition = "is";
			$(this).children('li').removeClass("active");
			$(this).children('li[data-tag-condition="'+data_tag_condition+'"]').addClass('active');
		}
		count_user()
	});

	/*показ подкатегорії вже існуючих блоків при загрузці а такоє is / is not*/
	setTimeout(function(){
		$('.sequence_filters_condition .sequence_filter_condition_container').each(function(){
			var sequence_group_filter_value = $(this).children('.sequence_group_filter').children('.sequence_group_filter_value').attr('data-value');
			$(this).children('.sub_sequence_group_filter').children('ul').children('li.'+sequence_group_filter_value).css('display', 'flex');
			var data_tag_condition = $(this).children('.div_separator').children('.separator_tag').children('ul').attr('data-tag-condition');
			$(this).children('.div_separator').children('.separator_tag').children('ul').children('li[data-tag-condition="'+data_tag_condition+'"]').addClass('active');
		});
	},1000);

	/*slider button*/
	if ( $('.sequence_opt_in_filter_block .sequence_opt_in_filter_container input').prop('checked') ) {
		$('.sequence_opt_in_filter_block .sequence_opt_in_filter_container input').parent('.sequence_opt_in_filter_container').children('.slide_button').addClass('checked')
	} else {
		$('.sequence_opt_in_filter_block .sequence_opt_in_filter_container input').parent('.sequence_opt_in_filter_container').children('.slide_button').removeClass('checked')
	}
	$('.sequence_opt_in_filter_block .sequence_opt_in_filter_container input').on('change', function(){
		if ( $(this).prop('checked') ) {
			$(this).parent('.sequence_opt_in_filter_container').children('.slide_button').addClass('checked')
		} else {
			$(this).parent('.sequence_opt_in_filter_container').children('.slide_button').removeClass('checked')
		}
	});

	/*radio button*/
	if ( $('#shedule_rb').prop('checked') ) {
		$('.table_only_for_shedule').fadeIn(0)
	} else {
		$('.table_only_for_shedule').fadeOut(0)
	}
	$('.sequence_scheduling_filter ul > li > div > input').each(function(){
		if ( $(this).prop('checked') ) {
			$(this).parent('div').children('.radio_btn').addClass('checked')
		} else {
			$(this).parent('div').children('.radio_btn').removeClass('checked')
		}
	});
	$('.sequence_scheduling_filter ul > li > div > input').on('change', function(){
		
		/*тут*/
		/*if ( $(this).prop('checked') ) {
			$('.sequence_scheduling_filter ul > li > div > input').parent('div').children('.radio_btn').removeClass('checked')
			$(this).parent('div').children('.radio_btn').addClass('checked');
		} else {
			$('.sequence_scheduling_filter ul > li > div > input').parent('div').children('.radio_btn').removeClass('checked')
			$(this).parent('div').children('.radio_btn').removeClass('checked');
		}*/

		$('.sequence_scheduling_filter ul > li > div > input').removeAttr('checked').parent('div').children('.radio_btn').removeClass('checked')
		$(this).attr('checked' , 'checked').parent('div').children('.radio_btn').addClass('checked');

		//

		if ( $('#shedule_rb').prop('checked') ) {
			$('.table_only_for_shedule').fadeIn(0)
		} else {
			$('.table_only_for_shedule').fadeOut(0)
		}
	});

	/*targeting*/
	if ( $('.sequence_filters_condition > .sequence_filter_condition_container').length > 0 ) {
		$('.sequence_filters_condition_title').addClass('active')
	} else {
		$('.sequence_filters_condition_title').removeClass('active')
	}

	/*time from/to*/
	function selectOnChange() {
		var option_selected = $('.time_range select option:selected').attr('value') ;
		if (option_selected == "any_time") {
			$('.table_only_for_shedule_time_from_to').fadeOut(0);
		} else {
			$('.table_only_for_shedule_time_from_to').fadeIn(0);
		}
	}
	selectOnChange()
	$('body').delegate('.time_range .select-items div' , 'click' , selectOnChange )





	/*popyp*/
	/*permissions*/
	$('.campaign_choose_pop_up_container').fadeOut();

	/*тут*/
	/*$('.campaign_choose_pop_up_table_body > ul > li > p > input').each(function(){
		if ( $(this).is(':checked') ) {
			$(this).parent('p').parent('li').parent('ul').addClass('checked')
		} else {
			$(this).parent('p').parent('li').parent('ul').removeClass('checked')
		}
	});*/
	//

	/*$('body').delegate('.campaign_choose_pop_up_table_body > ul > li > p > input' , 'input' , function() {
		if ( $(this).is(':checked') ) {
			$(this).parent('p').parent('li').parent('ul').addClass('checked')
		} else {
			$(this).parent('p').parent('li').parent('ul').removeClass('checked')
		}
	});*/

	/*close pop up*/
	/*$('.campaign_choose_pop_up .campaign_choose_pop_up_top .campaign_choose_pop_up_top_close button').click(function() {
		$('.campaign_choose_pop_up_container').fadeOut();
		$('.campaign_choose_pop_up').removeClass('campaign_choose_pop_up_active');
	});*/

	$('.sequence_edit_block button.choose').click(function(){
		$('.campaign_choose_pop_up_container').fadeIn();
		$('.filter_campaign').fadeIn()
	});

	/*campaigns filter*/
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
	$('body').delegate('.campaign_filter_condition_container > .group_filter' , "click" , function(){
		$(this).children("ul").toggleClass('filter_activated');
	});
	/* не показувати список підкатегорії коли категорія не вибрана */
	$('body').delegate('.campaign_filter_condition_container > .sub_group_filter' , "click" , function(){
		if (  $(this).parent('.campaign_filter_condition_container').children('.group_filter').hasClass('group_was_chosen')) {
			$(this).children("ul").toggleClass('filter_activated');
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


	/*pop up create campaign*/
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

	$('.sequence_edit_block button.create').click(function(){
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
	});

	$('.campaign_pop_up_create_new_campaign_container_close, .campaign_pop_up_save_button > button').click(function(){
		$('.campaign_pop_up_create_new_campaign').fadeOut();
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
});

$('document').ready(function() {
	/*тут*/
	$(".drag_block").each(function() {
		$(this).draggable({
			containment: $(this).parent(),
			drag: function() {
				document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
				line_draw();
				$('.drag_block').removeClass('active');
				$(this).addClass('active');
			},
			stop: function() {
				var id_el = $(this).attr('id');
				var left_el = $("#"+id_el).css('left');
				var top_el = $("#"+id_el).css('top');
				if ( write_cookie === true) {
					$.cookie(curr_sequence.id+'_'+id_el, JSON.stringify({left: left_el, top: top_el}) , { expires : 9999 });
				}
			}
		}).css("position", "absolute");
	});
	//
	var scale = 1;
	$('.drag_and_canvas_wrapper').on("mousewheel", function(event) {
		scale += event.deltaY < 1 ? -0.05 : 0.05;
		scale = scale < 0.5 ? 0.5 : scale;
		scale = scale > 1 ? 1 : scale;
		$('.drag_and_canvas_wrapper').css('zoom', scale);
		document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
		line_draw();
		event.preventDefault();
	});
	$('#canvas').attr('width', "1940px");
	$('#canvas').attr('height', "1940px");
});

/*filter on block / input */
/*filter on campaigns filter_block*/
$('body').delegate('.campaign_choose_pop_up.filter_campaign .campaign_filters_condition' , 'click' , function(){
	filter_campaigns_block_func();
});
var filter_campaigns_block_func = function() {
	$('.campaign_choose_pop_up.filter_campaign .campaign_choose_pop_up_table_body > ul').removeClass("filtered_on_group")
	$('.campaign_choose_pop_up.filter_campaign .campaign_choose_pop_up_table_body > ul').removeClass("filtered_on_language")
	var block_func_array = [];
	$('.campaign_choose_pop_up.filter_campaign .campaign_filters_condition .campaign_filter_condition_container').each(function(){
		var group = $(this).find('p.group_filter_value').attr("data-value");
		var sub_group = $(this).find('p.sub_group_value').attr('data-value');
		if (group == "group") {
			block_func_array.push({"group": sub_group},)
		}
		if (group == "language") {
			block_func_array.push({"language": sub_group},)
		}
	});
	for (i in block_func_array) {
		if ( Object.keys(block_func_array[i]).indexOf( 'group' ) != -1 ) {
			$('.campaign_choose_pop_up.filter_campaign .campaign_choose_pop_up_table_body > ul').addClass("filtered_on_group")
		}
		if ( Object.keys(block_func_array[i]).indexOf( 'language' ) != -1 ) {
			$('.campaign_choose_pop_up.filter_campaign .campaign_choose_pop_up_table_body > ul').addClass("filtered_on_language")
		}
	}
	for (i in block_func_array) {
		if ( Object.keys(block_func_array[i]) == "group") {
			$('.campaign_choose_pop_up.filter_campaign .campaign_choose_pop_up_table_body > ul[data-group="'+Object.values(block_func_array[i])+'"]')
				.removeClass('filtered_on_group');
		}
		if ( Object.keys(block_func_array[i]) == "language") {
			$('.campaign_choose_pop_up.filter_campaign .campaign_choose_pop_up_table_body > ul[data-language="'+Object.values(block_func_array[i])+'"]')
				.removeClass('filtered_on_language');
		}
	}
	if ( $('.campaign_choose_pop_up.filter_campaign .campaign_filters_condition .campaign_filter_condition_container').length == 0 ){
		$('.campaign_choose_pop_up.filter_campaign .campaign_choose_pop_up_table_body > ul').removeClass("filtered_on_group")
		$('.campaign_choose_pop_up.filter_campaign .campaign_choose_pop_up_table_body > ul').removeClass("filtered_on_language")
	}
}

/*filter on campaigns input*/
$('.campaign_choose_pop_up.filter_campaign .campaign_choose_pop_up_top input').on('input' , function(){
	filter_campaigns_input_func('.campaign_choose_pop_up.filter_campaign .campaign_choose_pop_up_top input' , ".filter_campaign");
})
var filter_campaigns_input_func = function(input , ul) {
	var input_text = $(input).val().toLowerCase();
	var input_text_length = $(input).val().length;
	$(ul).find('.campaign_choose_pop_up_table_body').children('ul').each(function(){
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
	filter_campaigns_input_func('.campaign_choose_pop_up.filter_campaign .campaign_choose_pop_up_top input' , ".filter_campaign");
}

/*робимо локальну копія всіх компаній*/
var createCampaignCopy = [];
var createCampaignCopyFunction = function() {
	createCampaignCopy = [];
	createCampaignCopy = JSON.parse(JSON.stringify(allCampaign));
}
createCampaignCopyFunction();

/*робимо компію з копію тільки тих що вибрані для відрисовки*/
var campaignArrayChecked = [];
var createCampaignArrayCheckedFunction = function() {
	campaignArrayChecked = [];
	for (i in createCampaignCopy) {
		if (createCampaignCopy[i].checked == true) {
			campaignArrayChecked.push(createCampaignCopy[i]);
		}
	}
}
createCampaignArrayCheckedFunction();

var choouse_campaign_clone_and_render = function() {
	$('.campaign_choose_pop_up_table > .campaign_choose_pop_up_table_body > ul').remove();
	var i = 0 ;
	for (i in createCampaignCopy) {
		$('.choose_campaign_script_block > ul').clone().prependTo('.campaign_choose_pop_up_table_body')
			.attr('data-key', createCampaignCopy[i].data_key)
			.attr('data-db-id', createCampaignCopy[i].db_id)
			.attr('data-group', createCampaignCopy[i].group_value)
			.attr('data-language', createCampaignCopy[i].lang_value);
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+'] > .name > p').text(createCampaignCopy[i].camp_name);
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+'] > .photo > img').attr('src' , createCampaignCopy[i].img);
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+'] > .views > p').text(createCampaignCopy[i].views);
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+'] > .clicks > p').text(createCampaignCopy[i].clicks);
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+'] > .ctr > p').text(createCampaignCopy[i].ctr + "%");
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+'] > .leads > p').text(createCampaignCopy[i].leads);
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+'] > .language > p').text(createCampaignCopy[i].lang);
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+'] > .language > p').attr('data-value' , createCampaignCopy[i].lang_value);
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+'] > .group > p').text(createCampaignCopy[i].group);
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+'] > .group > p').attr('group-value' , createCampaignCopy[i].group_value);
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+'] > .group > p').css('display', 'flex');
		if( createCampaignCopy[i].checked == true ) {
			write_cookie = true;
			$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+'] input[type="checkbox"]').prop('checked' , true)
			$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+']').addClass('checked');
		} else {
			$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+'] > input[type="checkbox"]').prop('checked' , false)
			$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[i].data_key+']').removeClass('checked');
		}
	}
	reinit_filter()
}
choouse_campaign_clone_and_render()

let clone_and_render = function() {
	$('.drag_and_canvas_wrapper > .drag_block').remove();
	var i = 0;
	for (i in campaignArrayChecked) {
		$('.drag_block_script_block > .drag_block').clone().appendTo('.drag_and_canvas_wrapper').attr('id', campaignArrayChecked[i].id).attr('data-key', campaignArrayChecked[i].data_key);
		$('.drag_block#' + campaignArrayChecked[i].id + ' .drag_block_title .campaign_name_bold').text(campaignArrayChecked[i].camp_name);
		$('.drag_block#' + campaignArrayChecked[i].id + ' .drag_block_title .push_title').text(campaignArrayChecked[i].title);
		$('.drag_block#' + campaignArrayChecked[i].id + ' .drag_block_img img').attr('src', campaignArrayChecked[i].img);
		$('.drag_block#' + campaignArrayChecked[i].id + ' .drag_block_stats .views > div').text(campaignArrayChecked[i].views);
		$('.drag_block#' + campaignArrayChecked[i].id + ' .drag_block_stats .clicks > div').text(campaignArrayChecked[i].clicks);
		$('.drag_block#' + campaignArrayChecked[i].id + ' .drag_block_stats .ctr > div > span').text(campaignArrayChecked[i].ctr);
		$('.drag_block#' + campaignArrayChecked[i].id + ' .drag_block_stats .leads > div').text(campaignArrayChecked[i].leads);
		$('.drag_block#' + campaignArrayChecked[i].id + ' .timer_view .time_value').attr('value', campaignArrayChecked[i].time.value);
		$('.drag_block#' + campaignArrayChecked[i].id + ' .timer_view .time_unit').attr('value', campaignArrayChecked[i].time.unit);
		if ( campaignArrayChecked[i].start_step == true ) {
			$('.drag_block#' + campaignArrayChecked[i].id + ' .drag_block_btn .starting_step').removeAttr('style');
			$('.drag_block#' + campaignArrayChecked[i].id + ' .drag_block_timer').css('display', 'none');
			$('.drag_block#' + campaignArrayChecked[i].id + ' .drag_block_btn .make_as_first').css('display', 'none');
			first = campaignArrayChecked[i].data_key;
		}
		if ( campaignArrayChecked[i].start_step == false ) {
			$('.drag_block#' + campaignArrayChecked[i].id + ' .drag_block_btn .starting_step').css('display' , 'none');
			$('.drag_block#' + campaignArrayChecked[i].id + ' .drag_block_timer').removeAttr('style');
			$('.drag_block#' + campaignArrayChecked[i].id + ' .drag_block_btn .make_as_first').removeAttr('style')
		}

		/*coordinate*/
		if (($.cookie(curr_sequence.id+"_"+campaignArrayChecked[i].id) !== null) && ($.cookie(curr_sequence.id+"_"+campaignArrayChecked[i].id) !== undefined)) {
            $('.drag_block#' + campaignArrayChecked[i].id)
            .css('left' , JSON.parse($.cookie(curr_sequence.id+"_"+campaignArrayChecked[i].id)).left)
            .css('top' , JSON.parse($.cookie(curr_sequence.id+"_"+campaignArrayChecked[i].id)).top)
        } else {
            $('.drag_block#'+campaignArrayChecked[i].id)
            .css('left',i*270+30+'px')
            .css('top','50px')
        }

	}
}
clone_and_render();

var line_draw = function() {
	for (i in campaignArrayChecked) {
		if ((campaignArrayChecked[i].connection.from !== "") && (campaignArrayChecked[i].connection.to !== "")) {
			if (($('#' + campaignArrayChecked[i].connection.from + '').length) && ($('#' + campaignArrayChecked[i].connection.to + '').length)) {
				var el_from = $('#' + campaignArrayChecked[i].connection.from + '');
				var el_to = $('#' + campaignArrayChecked[i].connection.to + '');
				var c = document.getElementById("canvas");
				var ctx = c.getContext("2d");
				ctx.strokeStyle = "#a97fff";
				ctx.lineWidth = 2;
				var el1_left = el_from.position().left + 190;
				var el1_top = el_from.position().top + 112;
				var el2_left = el_to.position().left - 30;
				var el2_top = el_to.position().top + 112;
				var gradient = ctx.createLinearGradient(el1_left, el1_top, el2_left, el2_top);
				gradient.addColorStop("0", "#736dff");
				gradient.addColorStop("1.0", "#a97fff");
				ctx.strokeStyle = gradient;
				ctx.beginPath();
				ctx.moveTo(el1_left, el1_top);
				ctx.bezierCurveTo((el1_left + 50), (el1_top), (el2_left - 50), (el2_top), (el2_left), (el2_top));
				ctx.stroke();
			}
		}
	}
}
/*тут*/
/*setTimeout(function() {
    document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
    line_draw();
}, 100);*/
//

$('body').delegate('.timer_view button', 'click', function() {
	$(this).closest('.drag_block_timer').addClass('accept_editing')
});
$('body').delegate('.timer_changer button', 'click', function() {
	$(this).closest('.drag_block_timer').removeClass('accept_editing')
});
/*apply change*/
$('body').delegate('.time_change', 'click', function() {
	let time = "";
	let unit = "";
	time = $(this).closest('.timer_view').children('.time_value').attr('value');
	unit = $(this).closest('.timer_view').children('.time_unit').attr('value');
	$(this).closest('.drag_block_timer').children('.timer_changer').children('.time_value').attr('value', time);
	$(this).closest('.drag_block_timer').children('.timer_changer').children('.time_unit').children('.select-selected').attr('value', unit).text(unit);
	$(this).closest('.drag_block_timer').children('.timer_changer').children('.time_unit').children('.select-items').children('div').removeClass('same-as-selected');
	$(this).closest('.drag_block_timer').children('.timer_changer').children('.time_unit').children('.select-items').children('div[value=' + unit + ']').addClass('same-as-selected');
});
/*save time*/
$('body').delegate('.time_save', 'click', function() {
	let value = "";
	let unit = "";
	value = $(this).closest('.timer_changer').children('.time_value').val();
	unit = $(this).closest('.timer_changer').children('.time_unit').children('.select-selected').attr('value');
	/*console.log(value);
    console.log(unit);*/
	$(this).closest('.drag_block_timer').children('.timer_view').children('.time_value').attr('value', value);
	$(this).closest('.drag_block_timer').children('.timer_view').children('.time_unit').attr('value', unit);

	var block_id = $(this).closest('.drag_block').attr('data-key');
	/*for (i in createCampaignCopy) {
        if ( createCampaignCopy[i].id == block_id ) {*/
	createCampaignCopy[block_id].time.unit = unit;
	createCampaignCopy[block_id].time.value = value;
	/*break;*/ /*тут*/
	/*}
}*/
	/*тут*/
	/*createCampaignArrayCheckedFunction();*/
	for (i in campaignArrayChecked) {
		if ( campaignArrayChecked[i].id == block_id ) {
			/*тут*/
			/*campaignArrayChecked[block_id].time.unit = unit;
            campaignArrayChecked[block_id].time.value = value;*/
			campaignArrayChecked[i].time.unit = unit;
			campaignArrayChecked[i].time.value = value;
			//
			break; /*тут*/
		}
	}
	//
});

$('body').delegate('.drag_block', 'click', function() {
	$('.drag_block').removeClass('active');
	$(this).toggleClass('active');
});

/*click on before & after element on dragable block*/
var connect = {
	from: "",
	to: ""
};
$('body').delegate('.drag_block_container > div[data-element="pseudoelement"]', 'click', function() {
	/*тут*/
	/*$('.drag_block_container > div[data-element="pseudoelement"]').removeAttr('data-is-active')*/
	$('.drag_block_container > div[data-is-active="true"]').removeAttr('data-is-active')
	//
	$(this).attr('data-is-active' , true);
	var parent_id = $(this).closest('.drag_block').attr('id');
	var pseudoelement_type = $(this).attr('class');
	if (pseudoelement_type == "before") {
		var parent_id_to = $(this).closest('.drag_block').attr('id');
		var pseudoelement_type_to = $(this).attr('class');
		connect.to = parent_id_to;
		/*console.log(connect);*/
		clean()
	}
	if (pseudoelement_type == "after") {
		var parent_id_from = $(this).closest('.drag_block').attr('id');
		var pseudoelement_type_from = $(this).attr('class');
		connect.from = parent_id_from;
		/*console.log(connect);*/
		clean()
	}

});

var clean = function() {
	if (connect.from === connect.to) {
		/*console.log('repeated element > clean');*/
		connect = {
			from: "",
			to: ""
		};
		/*тут*/
		/*$('.drag_block_container > div[data-element="pseudoelement"]').removeAttr('data-is-active')*/
		$('.drag_block_container > div[data-is-active="true"]').removeAttr('data-is-active')
		//
	} else if ((connect.from !== "") && (connect.to !== "") && (connect.from !== connect.to)) {
		/*тут*/
		for (i in createCampaignCopy) {
			if (createCampaignCopy[i].connection.from == connect.from) {
				createCampaignCopy[i].connection.from = "";
			}
			if (createCampaignCopy[i].connection.to == connect.to) {
				createCampaignCopy[i].connection.to = "";
			}
			if (createCampaignCopy[i].id == connect.from) {
				createCampaignCopy[i].connection.from = connect.from
				createCampaignCopy[i].connection.to = connect.to
			}
		}
		//
		/*тут*/
		/*createCampaignArrayCheckedFunction()*/
		for (i in campaignArrayChecked) {
			if (campaignArrayChecked[i].connection.from == connect.from) {
				campaignArrayChecked[i].connection.from = "";
				/*тут*/
				/*var data_key = campaignArrayChecked[i].data_key;
             createCampaignCopy[data_key].connection.from = "";*/
				//
			}
			if (campaignArrayChecked[i].connection.to == connect.to) {
				campaignArrayChecked[i].connection.to = "";
				/*тут*/
				/*var data_key = campaignArrayChecked[i].data_key;
             createCampaignCopy[data_key].connection.to = ""*/;
				//
			}
			if (campaignArrayChecked[i].id == connect.from) {
				campaignArrayChecked[i].connection.from = connect.from;
				campaignArrayChecked[i].connection.to = connect.to;
				/*тут*/
				/*var data_key = campaignArrayChecked[i].data_key;
             createCampaignCopy[data_key].connection.from = connect.from;
             createCampaignCopy[data_key].connection.to = connect.to;*/
				//
			}
		}
		//
		document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
		line_draw()
		connect = {
			from: "",
			to: ""
		};
		/*console.log('draw success > clean');*/
		/*тут*/
		/*$('.drag_block_container > div[data-element="pseudoelement"]').removeAttr('data-is-active')*/
		$('.drag_block_container > div[data-is-active="true"]').removeAttr('data-is-active')
		//
	} else {}
}
/*remove connection on PRESS DELETE KEY*/
/*тут*/
function runOnKeys(func, ...codes) {
  let pressed = new Set();
  document.addEventListener('keydown', function(event) {
    pressed.add(event.keyCode);
    for (let keyCode of codes) { // все ли клавиши из набора нажаты?
      if (!pressed.has(keyCode)) {
        return;
      }
    }
    pressed.clear();
    func();
  });
  document.addEventListener('keyup', function(event) {
    pressed.delete(event.keyCode);
  });
}

runOnKeys(() => remove_connection(),91,8);
runOnKeys(() => remove_connection(),46);

var remove_connection = function(e) {
	/*if ((e.keyCode == 46) || (e.keyCode == 8)) {*/
	if (connect.from == "") {
		/*тут*/
		for (i in createCampaignCopy) {
			if (createCampaignCopy[i].connection.to == connect.to) {
				createCampaignCopy[i].connection.to = "";
				createCampaignCopy[i].connection.from = "";
				document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
				line_draw();
			}
		}
		//
		/*тут*/
		for (i in campaignArrayChecked) {
			if (campaignArrayChecked[i].connection.to == connect.to) {
				campaignArrayChecked[i].connection.to = "";
				campaignArrayChecked[i].connection.from = "";
				/*тут*/
				/*var data_key = campaignArrayChecked[i].data_key;
                createCampaignCopy[data_key].connection.to = "";
                createCampaignCopy[data_key].connection.from = "";*/
				//
				document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
				line_draw();
			}
		}
		//
		/*console.log('remove element > clean');*/
		connect = {
			from: "",
			to: ""
		};
	}
	if (connect.to == "") {
		/*тут*/
		for (i in createCampaignCopy) {
			if (createCampaignCopy[i].connection.from == connect.from) {
				createCampaignCopy[i].connection.from = "";
				createCampaignCopy[i].connection.to = "";
				document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
				line_draw();
			}
		}
		//
		/*тут*/
		for (i in campaignArrayChecked) {
			if (campaignArrayChecked[i].connection.from == connect.from) {
				campaignArrayChecked[i].connection.from = "";
				campaignArrayChecked[i].connection.to = "";
				/*тут*/
				/*var data_key = campaignArrayChecked[i].data_key;
                createCampaignCopy[data_key].connection.to = "";
                createCampaignCopy[data_key].connection.from = "";*/
				//
				document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
				line_draw();
			}
		}
		//
		/*console.log('remove element > clean');*/
		connect = {
			from: "",
			to: ""
		};
	}
	/*createCampaignArrayCheckedFunction();*/ /*тут*/
	/*}*/
	$('.drag_block_container > div[data-element="pseudoelement"]').removeAttr('data-is-active')
}
/*тут*/
/*$('html').keyup(function(e) {
	remove_connection(e)
});*/
//


/*duplicate*/
var duplicate = function(id_of_element_to_duplicate) {
	/*тут*/
	/*clean();*/
	//
	/*for (i in createCampaignCopy) {
        if (id_of_element_to_duplicate == createCampaignCopy[i].id) {*/
	/*створення новго обєкту*/
	var clone_element = JSON.parse(JSON.stringify(createCampaignCopy[id_of_element_to_duplicate]))

	maxID++; // new id
	/*тут*/
	/*for (j in createCampaignCopy) {
        if (Number(createCampaignCopy[j].id.replace(/[^-0-9]/gim, '')) >= maxID) {
            maxID = Number(createCampaignCopy[j].id.replace(/[^-0-9]/gim, '')) + 1;
            clone_element.id = "id_" + maxID;
            clone_element.data_key = ''+maxID;
        }
    }*/
	//
	/*сonsole.log('maxID', maxID)*/
	clone_element.connection.from = "";
	clone_element.connection.to = "";
	clone_element.start_step = false;
	clone_element.views = "0";
	clone_element.clicks = "0";
	clone_element.ctr = "0";
	clone_element.leads = '0';
	/*додавання в масив нового елементу*/
	clone_element.id = "id_" + maxID;
	clone_element.data_key = maxID;
	createCampaignCopy[maxID] = clone_element;
	cloned.push(clone_element.data_key);
	/*створення нового елемента окремо (щоб не перестворювати всі)*/
	$('.drag_block_script_block > .drag_block').clone().appendTo('.drag_and_canvas_wrapper').attr('id', clone_element.id).attr('data-key' , clone_element.data_key);
	$('.drag_block#' + clone_element.id + ' .drag_block_title .campaign_name_bold').text(clone_element.camp_name);
	$('.drag_block#' + clone_element.id + ' .drag_block_title .push_title').text(clone_element.title);
	$('.drag_block#' + clone_element.id + ' .drag_block_img img').attr('src', clone_element.img);
	$('.drag_block#' + clone_element.id + ' .drag_block_stats .views > div').text(clone_element.views);
	$('.drag_block#' + clone_element.id + ' .drag_block_stats .clicks > div').text(clone_element.clicks);
	$('.drag_block#' + clone_element.id + ' .drag_block_stats .ctr > div > span').text(clone_element.ctr);
	$('.drag_block#' + clone_element.id + ' .drag_block_stats .leads > div').text(clone_element.leads);
	$('.drag_block#' + clone_element.id + ' .timer_view .time_value').attr('value', clone_element.time.value);
	$('.drag_block#' + clone_element.id + ' .timer_view .time_unit').attr('value', clone_element.time.unit);
	/*перевиклик функції перетягування щоб працювало з новим елементом*/
	/*тут*/
	$(".drag_block").each(function() {
		$(this).draggable({
			containment: $(this).parent(),
			drag: function() {
				document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
				line_draw();
				$('.drag_block').removeClass('active');
				$(this).addClass('active');
			},
			stop: function() {
				var id_el = $(this).attr('id');
				var left_el = $("#"+id_el).css('left');
				var top_el = $("#"+id_el).css('top');
				if ( write_cookie === true) {
					$.cookie(curr_sequence.id+"_"+id_el, JSON.stringify({left: left_el, top: top_el}) , { expires : 9999 });
				}
			}
		}).css("position", "absolute");
	});
	//

	/*фіксити трабли з офом опцій кастом селекта в елементах , які створені за допомогою скріпта*/
	custom_select_fix(clone_element);
	/*ну і виклик функції перерисовки ліній*/
	document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
	line_draw();
	/*}
}*/
	/*тут*/
	/*createCampaignArrayCheckedFunction();*/
	campaignArrayChecked.push(clone_element);
	//
	clean();
	/*тут*/
	/*choouse_campaign_clone_and_render();*/
	$('.choose_campaign_script_block > ul').clone().prependTo('.campaign_choose_pop_up_table_body')
		.attr('data-key', clone_element.data_key)
		.attr('data-db-id', clone_element.db_id)
		.attr('data-group', clone_element.group_value)
		.attr('data-language', clone_element.lang_value);
	$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+'] > .name > p').text(clone_element.camp_name);
	$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+'] > .photo > img').attr('src' , clone_element.img);
	$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+'] > .views > p').text(clone_element.views);
	$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+'] > .clicks > p').text(clone_element.clicks);
	$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+'] > .ctr > p').text(clone_element.ctr + "%");
	$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+'] > .leads > p').text(clone_element.leads);
	$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+'] > .language > p').text(clone_element.lang);
	$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+'] > .language > p').attr('data-value' , clone_element.lang_value);
	$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+'] > .group > p').text(clone_element.group);
	$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+'] > .group > p').attr('group-value' , clone_element.group_value);
	
	if( clone_element.checked == true ) {
		$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+'] input[type="checkbox"]').prop('checked' , true)
		$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+']').addClass('checked');
	} else {
		$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+'] > input[type="checkbox"]').prop('checked' , false)
		$('.campaign_choose_pop_up_table_body > ul[data-key='+clone_element.data_key+']').removeClass('checked');
	}
	reinit_filter(); /*закінчив тут*/
	//
}
$('body').delegate('.drag_block_btn .duplicate', 'click', function() {
	var id_of_element_to_duplicate = $(this).closest('.drag_block').attr('data-key');
	duplicate(id_of_element_to_duplicate)
});

/*delete*/
var delete_func = function(id_of_element_to_delete) {
  /*for (i in createCampaignCopy) {
        if (createCampaignCopy[i].id == id_of_element_to_delete) {*/
  const is_cloned = cloned.indexOf(parseInt(id_of_element_to_delete));
  for(i in campaignArrayChecked) {
    if(campaignArrayChecked[i].data_key == id_of_element_to_delete) {

    /*тут змінни*/
	/*for (j in createCampaignCopy){
		if (createCampaignCopy[j].connection.to == ( "id_" + id_of_element_to_delete) ) {
			createCampaignCopy[j].connection.from = "";
			createCampaignCopy[j].connection.to = "";
		}
	}*/
    //
    campaignArrayChecked.splice(i , 1);
    break;
    }
  };
  if(is_cloned != -1) {
    $('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[id_of_element_to_delete].data_key+']').remove();
    cloned.splice(is_cloned, 1);
    delete createCampaignCopy[id_of_element_to_delete];
  }
  else {
    /*console.log(id_of_element_to_delete);*/
    createCampaignCopy[id_of_element_to_delete].checked = false;
    $('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[id_of_element_to_delete].data_key+']').removeClass("checked");
    $('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[id_of_element_to_delete].data_key+'] input[type="checkbox"]').prop('checked', false);
    /*createCampaignCopy[i] = {};
        createCampaignCopy.splice(i, 1);*/
    createCampaignCopy[id_of_element_to_delete].checked = false;
  }

  $('.drag_block#id_' + id_of_element_to_delete).remove();
  /*console.log(id_of_element_to_delete, " > deleted");*/

  /*for (j in campaignArrayChecked) {
        if (createCampaignCopy[j].connection.from == id_of_element_to_delete) {
            createCampaignCopy[j].connection.from = "";
            createCampaignCopy[j].connection.to = "";
        }
        if (createCampaignCopy[j].connection.to == id_of_element_to_delete) {
            createCampaignCopy[j].connection.from = "";
            createCampaignCopy[j].connection.to = "";
        }
    }*/

  document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
  line_draw();
  /*break;*/ /*тут*/
  /*}
}*/
  /*тут*/
  /*createCampaignArrayCheckedFunction();*/
  /*for(i in campaignArrayChecked) {
        if (campaignArrayChecked[i].id == id_of_element_to_delete) {*/
  /*}
}*/ //


  clean();
  /*тут*/
  /*choouse_campaign_clone_and_render();*/
  reinit_filter();
  //
  /*console.log(createCampaignCopy)*/

  /*тут*/
  isSettingsPermitted()
}

$('body').delegate('.drag_block_btn .delete', 'click', function() {
	var id_of_element_to_delete = $(this).closest('.drag_block').attr('data-key');
	delete_func(id_of_element_to_delete)
})


/*fix custom select function*/
var custom_select_fix = function(clone_element) {
	/*сраний плагін з кастомним селектом вимахується як Троцький тому тут такий сраний код іде*/
	$("#" + clone_element.id + " .select-selected").remove()
	$("#" + clone_element.id + " .select-items").remove()
	var x, i, j, selElmnt, a, b, c;
	var x = $("#" + clone_element.id + " .custom-select");
	for (i = 0; i < x.length; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 1; j < selElmnt.length; j++) {
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.setAttribute('value', selElmnt.options[j].getAttribute('value'));
			c.addEventListener("click", function(e) {
				var y, i, k, s, h;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				h = this.parentNode.previousSibling;
				for (i = 0; i < s.length; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
						s.selectedIndex = i;
						h.innerHTML = this.innerHTML;
						y = this.parentNode.getElementsByClassName("same-as-selected");
						for (k = 0; k < y.length; k++) {
							y[k].removeAttribute("class");
						}
						this.setAttribute("class", "same-as-selected");
						break;
					}
				}
				h.click();
			});
			b.appendChild(c);
			a.setAttribute("value", c.getAttribute('value'));
		}
		x[i].appendChild(b);
		a.addEventListener("click", function(e) {
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		});
	}

	function closeAllSelect(el) {
		var x, y, i, arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("select-selected");
		for (i = 0; i < y.length; i++) {
			if (el == y[i]) {
				arrNo.push(i)
			} else {
				y[i].classList.remove("select-arrow-active");
			}
		}
		for (i = 0; i < x.length; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add("select-hide");
			}
		}
	}
	document.addEventListener("click", closeAllSelect);
	/*тут закінчення сраного коду до сраних кастомних селектів*/
}


/*create campaign*/
/*зберегти  добавити компанію*/
var createCampaign = function(){
	/*for (j in createCampaignCopy) {
        if (Number(createCampaignCopy[j].id.replace(/[^-0-9]/gim, '')) >= maxID) {
            maxID = Number(createCampaignCopy[j].id.replace(/[^-0-9]/gim, '')) + 1;
            var newElementId = "id_" + maxID;
            var new_data_key = maxID;
        }
    }*/
	maxID++;
	var newElementId = "id_" + maxID;
	var new_data_key = maxID;

	var newElementObject = {
		checked: true,
		id: newElementId,
		data_key: new_data_key,
		db_id: new_data_key,
		camp_name: $('.campaign_pop_up_create_new_campaign_container .campaign_pop_up_input_campaign_name input').val(),
		group: $('.campaign_pop_up_create_new_campaign_container .campaign_pop_up_input_campaign_groups .select-selected').text(),
		group_value: $('.campaign_pop_up_create_new_campaign_container .campaign_pop_up_input_campaign_groups .select-selected').attr("value"),
		lang: $('.campaign_pop_up_create_new_campaign_container .campaign_pop_up_input_campaign_language .select-selected').text(),
		lang_value: $('.campaign_pop_up_create_new_campaign_container .campaign_pop_up_input_campaign_language .select-selected').attr("value"),
		title: $('.campaign_pop_up_create_new_campaign_container .campaign_pop_up_input_campaign_push_title input').val(),
		text:  $('.campaign_pop_up_create_new_campaign_container .campaign_pop_up_input_campaign_description textarea').val(),
		img: $('.campaign_pop_up_create_new_campaign_container #cropContainerModal img').attr('src') ,
		views: "0",
		clicks: "0",
		ctr: "0",
		leads: '0',

		connection: {
			from: "",
			to: "",
		},

		time: {
			value: "30",
			unit: "Minutes"
		},
		start_step :  false,
	}
	/*створення нового елемента окремо (щоб не перестворювати всі)*/
	$('.drag_block_script_block > .drag_block').clone().appendTo('.drag_and_canvas_wrapper').attr('id', newElementObject.id).attr('data-key', newElementObject.data_key);
	if (newElementObject.camp_name !== "") {
		$('.drag_block#' + newElementObject.id + ' .drag_block_title .campaign_name_bold').text(newElementObject.camp_name);
	} else {
		newElementObject.camp_name = "Camp Name"
		$('.drag_block#' + newElementObject.id + ' .drag_block_title .campaign_name_bold').text(newElementObject.camp_name);
	}
	if (newElementObject.title !== "") {
		$('.drag_block#' + newElementObject.id + ' .drag_block_title .push_title').text(newElementObject.title);
	} else {
		newElementObject.title = "Title Filler"
		$('.drag_block#' + newElementObject.id + ' .drag_block_title .push_title').text(newElementObject.title);
	}
	if (newElementObject.img !== "") {
		$('.drag_block#' + newElementObject.id + ' .drag_block_img img').attr('src', newElementObject.img);
	} else {
		$('.drag_block#' + newElementObject.id + ' .drag_block_img img').attr('src', newElementObject.img);
	}
	$('.drag_block#' + newElementObject.id + ' .drag_block_stats .views > div').text(newElementObject.views);
	$('.drag_block#' + newElementObject.id + ' .drag_block_stats .clicks > div').text(newElementObject.clicks);
	$('.drag_block#' + newElementObject.id + ' .drag_block_stats .ctr > div > span').text(newElementObject.ctr);
	$('.drag_block#' + newElementObject.id + ' .drag_block_stats .leads > div').text(newElementObject.leads);
	$('.drag_block#' + newElementObject.id + ' .timer_view .time_value').attr('value', newElementObject.time.value);
	$('.drag_block#' + newElementObject.id + ' .timer_view .time_unit').attr('value', newElementObject.time.unit);

	createCampaignCopy[maxID] = newElementObject;

	/*перевиклик функції перетягування щоб працювало з новим елементом*/
	/*тут*/
	$(".drag_block").each(function() {
		$(this).draggable({
			containment: $(this).parent(),
			drag: function() {
				document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
				line_draw();
				$('.drag_block').removeClass('active');
				$(this).addClass('active');
			},
			stop: function() {
				var id_el = $(this).attr('id');
				var left_el = $("#"+id_el).css('left');
				var top_el = $("#"+id_el).css('top');
				if ( write_cookie === true) {
					$.cookie(curr_sequence.id+"_"+id_el, JSON.stringify({left: left_el, top: top_el}) , { expires : 9999 });
				}
			}
		}).css("position", "absolute");
	});
	//
	/*фіксити трабли з офом опцій кастом селекта в елементах , які створені за допомогою скріпта*/
	custom_select_fix(newElementObject);
	/*тут*/
	/*createCampaignArrayCheckedFunction();*/
	campaignArrayChecked.push(newElementObject);
	//
	/*ну і виклик функції перерисовки ліній*/
	document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
	line_draw();
	/*тут*/
	/*choouse_campaign_clone_and_render();*/
	$('.choose_campaign_script_block > ul').clone().prependTo('.campaign_choose_pop_up_table_body')
		.attr('data-key', createCampaignCopy[maxID].data_key)
		.attr('data-db-id', createCampaignCopy[maxID].db_id)
		.attr('data-group', createCampaignCopy[maxID].group_value)
		.attr('data-language', createCampaignCopy[maxID].lang_value);
	$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+'] > .name > p').text(createCampaignCopy[maxID].camp_name)
	$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+'] > .photo > img').attr('src' , createCampaignCopy[maxID].img)
	$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+'] > .views > p').text(createCampaignCopy[maxID].views)
	$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+'] > .clicks > p').text(createCampaignCopy[maxID].clicks)
	$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+'] > .ctr > p').text(createCampaignCopy[maxID].ctr + "%")
	$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+'] > .leads > p').text(createCampaignCopy[maxID].leads)
	$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+'] > .language > p').text(createCampaignCopy[maxID].lang)
	$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+'] > .language > p').attr('data-value' , createCampaignCopy[maxID].lang_value)
	$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+'] > .group > p').text(createCampaignCopy[maxID].group)
	$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+'] > .group > p').attr('group-value' , createCampaignCopy[maxID].group_value)
	if( createCampaignCopy[maxID].checked == true ) {
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+'] input[type="checkbox"]').prop('checked' , true)
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+']').addClass('checked');
	} else {
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+'] > input[type="checkbox"]').prop('checked' , false)
		$('.campaign_choose_pop_up_table_body > ul[data-key='+createCampaignCopy[maxID].data_key+']').removeClass('checked');
	}
	//
	/*console.log("campaign created");*/
	/*тут*/
	isSettingsPermitted();
}
$('.campaign_pop_up_create_new_campaign .campaign_pop_up_save_button button').click(function() {
	createCampaign()
});

$(document).ready(function(){

	/*тут*/
	$('.campaign_choose_pop_up_table_body > ul > li > p > input').each(function(){
		if ( $(this).is(':checked') ) {
			$(this).parent('p').parent('li').parent('ul').addClass('checked')
		} else {
			$(this).parent('p').parent('li').parent('ul').removeClass('checked')
		}
	});
	//

	/*тут*/
	/*var localCopyArray = JSON.parse(JSON.stringify(createCampaignCopy))*/
	//
	var localCopyArray = [];
	$('.sequence_edit_block .choose').click(function(){
		localCopyArray = JSON.parse(JSON.stringify(createCampaignCopy))
		window.localCopyArray = localCopyArray;
		/*тут баг , після закриття поп апа і повторного відкриття не відображає правильно чекнуті компанії*/
		/*for (i in localCopyArray) {
			if( localCopyArray[i].checked == true ) {
				$('.campaign_choose_pop_up_table_body > ul[data-key='+localCopyArray[i].data_key+'] input[type="checkbox"]').prop('checked' , true)
				$('.campaign_choose_pop_up_table_body > ul[data-key='+localCopyArray[i].data_key+']').addClass('checked');
			} else {
				$('.campaign_choose_pop_up_table_body > ul[data-key='+localCopyArray[i].data_key+'] > input[type="checkbox"]').prop('checked' , false)
				$('.campaign_choose_pop_up_table_body > ul[data-key='+localCopyArray[i].data_key+']').removeClass('checked');
			}
		}*/
		/*або більш оптимізований варіант*/

		/*тут*/
		$('.campaign_choose_pop_up_table_body > ul > input[type="checkbox"]').removeAttr('checked')
		$('.campaign_choose_pop_up_table_body > ul').removeClass('checked');
		//
		for ( i in campaignArrayChecked ) {
			if( campaignArrayChecked[i].checked == true ) {
				$('.campaign_choose_pop_up_table_body > ul[data-key='+campaignArrayChecked[i].data_key+'] input[type="checkbox"]').prop('checked' , true)
				$('.campaign_choose_pop_up_table_body > ul[data-key='+campaignArrayChecked[i].data_key+']').addClass('checked');
			} else {
				$('.campaign_choose_pop_up_table_body > ul[data-key='+campaignArrayChecked[i].data_key+'] > input[type="checkbox"]').prop('checked' , false)
				$('.campaign_choose_pop_up_table_body > ul[data-key='+campaignArrayChecked[i].data_key+']').removeClass('checked');
			}
		}
	});
	$('body').delegate('.campaign_choose_pop_up_table_body > ul > li > p > input' , 'input' , function() {
		var parent_data_key = $(this).closest('ul').attr('data-key');
		/*console.log(parent_data_key);*/
		for (i in localCopyArray ) {
			if (localCopyArray[i].data_key == parent_data_key ) {
				if ( $(this).is(':checked') ) {
					localCopyArray[i].checked = true;
					$(this).parent('p').parent('li').parent('ul').addClass('checked');
				} else {
					localCopyArray[i].checked = false;
					$(this).parent('p').parent('li').parent('ul').removeClass('checked');
				}
			}
		}
	});
	/*close pop up*/
	$('.campaign_choose_pop_up .campaign_choose_pop_up_top .campaign_choose_pop_up_top_close button').click(function() {
		localCopyArray = JSON.parse(JSON.stringify(createCampaignCopy))
		$('.campaign_choose_pop_up_container').fadeOut();
		$('.campaign_choose_pop_up').removeClass('campaign_choose_pop_up_active');
	});
	$('.campaign_choose_pop_up .campaign_choose_pop_up_table_btn_add button.filter_campaign').click(function() {
		for(i in cloned) {
			if($('.campaign_choose_pop_up_table_body > ul[data-key='+cloned[i]+'] input[type="checkbox"]').prop('checked') == false) {

				/*тут змінни*/
				/*for (j in localCopyArray){
					if (localCopyArray[j].connection.to == ( "id_" + cloned[i]) ) {
						localCopyArray[j].connection.from = "";
						localCopyArray[j].connection.to = "";
					}
				}*/
				//

				$('.campaign_choose_pop_up_table_body > ul[data-key='+cloned[i]+']').remove();
				delete localCopyArray[cloned[i]];
			}
		}
		createCampaignCopy = JSON.parse(JSON.stringify(localCopyArray));
		$('.campaign_choose_pop_up_container').fadeOut();
		$('.campaign_choose_pop_up').removeClass('campaign_choose_pop_up_active');
		createCampaignArrayCheckedFunction();
		clone_and_render();

		/*тут*/
		/*for (i in createCampaignCopy) {
			custom_select_fix(createCampaignCopy[i]);
		}*/
		for (i in campaignArrayChecked) {
			custom_select_fix(campaignArrayChecked[i]);
		}
		//

		document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
		line_draw();

		$(".drag_block").each(function() {
			$(this).draggable({
				containment: $(this).parent(),
				drag: function() {
					document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
					line_draw();
					$('.drag_block').removeClass('active');
					$(this).addClass('active');
				},
				stop: function() {
					var id_el = $(this).attr('id');
					var left_el = $("#"+id_el).css('left');
					var top_el = $("#"+id_el).css('top');
					if ( write_cookie === true) {
						$.cookie(curr_sequence.id+"_"+id_el, JSON.stringify({left: left_el, top: top_el}) , { expires : 9999 });
					}
				}
			}).css("position", "absolute");
		});
		
		/*тут*/
		isSettingsPermitted();
	});

	/*make as first block*/
	/*тут*/
	/*var make_as_first_block = function(){
	    for ( i in createCampaignCopy ) {
	        if ( createCampaignCopy[i].start_step == true ) {
	            $('.drag_block#' + createCampaignCopy[i].id + ' .drag_block_btn .starting_step').removeAttr('style');
	            $('.drag_block#' + createCampaignCopy[i].id + ' .drag_block_timer').css('display', 'none');
	            $('.drag_block#' + createCampaignCopy[i].id + ' .drag_block_btn .make_as_first').css('display', 'none');
	        }
	        if ( createCampaignCopy[i].start_step == false ) {
	            $('.drag_block#' + createCampaignCopy[i].id + ' .drag_block_btn .starting_step').css('display' , 'none');
	            $('.drag_block#' + createCampaignCopy[i].id + ' .drag_block_timer').removeAttr('style');
	            $('.drag_block#' + createCampaignCopy[i].id + ' .drag_block_btn .make_as_first').removeAttr('style')
	        }
	    }
	}*/
	//

	$('body').delegate('.drag_block .make_as_first' , 'click' , function(){
		var parent_id = $(this).closest('.drag_block').attr('data-key');
		/*console.log(parent_id);*/
		if(first == undefined) {
			createCampaignCopy[parent_id].start_step = true;
			first = parent_id;
			$('.drag_block#id_' + parent_id + ' .drag_block_btn .starting_step').removeAttr('style');
			$('.drag_block#id_' + parent_id + ' .drag_block_timer').css('display', 'none');
			$('.drag_block#id_' + parent_id + ' .drag_block_btn .make_as_first').css('display', 'none');
		}
		else {
			/*тут була помилка*/
			/*createCampaignCopy[first].start_step = false;
			createCampaignCopy[parent_id].start_step = true;
			$('.drag_block#id_' + first + ' .drag_block_btn .starting_step').css('display' , 'none');
			$('.drag_block#id_' + first + ' .drag_block_timer').removeAttr('style');
			$('.drag_block#id_' + first + ' .drag_block_btn .make_as_first').removeAttr('style');
			$('.drag_block#id_' + parent_id + ' .drag_block_btn .starting_step').removeAttr('style');
			$('.drag_block#id_' + parent_id + ' .drag_block_timer').css('display', 'none');
			$('.drag_block#id_' + parent_id + ' .drag_block_btn .make_as_first').css('display', 'none');
			first = parent_id;*/
			if (createCampaignCopy[first] !== undefined) {
				createCampaignCopy[first].start_step = false;
				$('.drag_block#id_' + first + ' .drag_block_btn .starting_step').css('display' , 'none');
				$('.drag_block#id_' + first + ' .drag_block_timer').removeAttr('style');
				$('.drag_block#id_' + first + ' .drag_block_btn .make_as_first').removeAttr('style');
			}
			createCampaignCopy[parent_id].start_step = true;
			$('.drag_block#id_' + parent_id + ' .drag_block_btn .starting_step').removeAttr('style');
			$('.drag_block#id_' + parent_id + ' .drag_block_timer').css('display', 'none');
			$('.drag_block#id_' + parent_id + ' .drag_block_btn .make_as_first').css('display', 'none');
			first = parent_id;
			//
		}
		/*for ( i in createCampaignCopy ) {
            if( createCampaignCopy[i].id == parent_id ){
                createCampaignCopy[i].start_step = true ;

                $('.drag_block#' + createCampaignCopy[i].id + ' .drag_block_btn .starting_step').removeAttr('style');
                $('.drag_block#' + createCampaignCopy[i].id + ' .drag_block_timer').css('display', 'none');
                $('.drag_block#' + createCampaignCopy[i].id + ' .drag_block_btn .make_as_first').css('display', 'none');
                //
            } else {
                createCampaignCopy[i].start_step = false

                $('.drag_block#' + createCampaignCopy[i].id + ' .drag_block_btn .starting_step').css('display' , 'none');
                $('.drag_block#' + createCampaignCopy[i].id + ' .drag_block_timer').removeAttr('style');
                $('.drag_block#' + createCampaignCopy[i].id + ' .drag_block_btn .make_as_first').removeAttr('style')
                //
            }
        }*/
		/*тут*/
		/*make_as_first_block()*/
		//
		/*createCampaignArrayCheckedFunction()*/
	});

	/*тут*/
	document.getElementById("canvas").getContext("2d").clearRect(0, 0, $('.drag_and_canvas_wrapper').width(), $('.drag_and_canvas_wrapper').height());
	line_draw();
	//

});

/*var arr_filter = {
	category: [] ,
	country : [],
	traffic_source : [],
	tag : [],
	user : [],
}*/

/*filter count*/
var count_user = function(){
	var all_filter = {
		category: [] ,
		country : [],
		traffic_source : [],
		tag : [],
		user : [],
	}
	$('.sequence_filters_condition .sequence_filter_condition_container').each(function(){
		var current_filter = {}
		var group = "";
		var sub_group = "";
		var type_filter = false;

		group = $(this).find('.sequence_group_filter_value').attr('data-value');
		sub_group = $(this).find('.sub_sequence_group_value').attr('data-value');

		if ( $(this).find('.separator_tag').children('ul').attr('data-tag-condition') == "is" ) {
			type_filter = true 
		} else {
			type_filter = false 
		}

		switch (group) {
			case "category":
			all_filter.category.push({
				id: sub_group,
				type: type_filter,
			})
			break;

			case "country":
			all_filter.country.push({
				id: sub_group,
				type: type_filter,
			})
			break;

			case "source":
			all_filter.traffic_source.push({
				id: sub_group,
				type: type_filter,
			})
			break;

			case "tag":
			all_filter.tag.push({
				id: sub_group,
				type: type_filter,
			})
			break;

			case "user":
			all_filter.user.push({
				id: sub_group,
				type: type_filter,
			})
			break;

			default:
			break;
		}

	});
	console.log(all_filter)
	/*console.log(all_filter)*/
}
count_user();

/*тут*/
/*make input active*/
$('body').delegate('.breadcrumbs_input input', 'click' , function(){
	$('.breadcrumbs_input').removeClass('active');
	$(this).parent('div').addClass('active');
	$('.breadcrumbs_input input').each(function(){
		$(this).val($(this).attr('value'));
	});
});
/*save in table*/
$('body').delegate('.breadcrumbs_input button.save' , 'click' , function(){
	$(this).parent('div').children('input').attr("value" , $(this).parent('div').children('input').val());
	$('.breadcrumbs_input').removeClass('active');
});


/*тут*/
var isSettingsPermitted = function() {
	if (campaignArrayChecked[0] == undefined) {
		$('.settings_user_content_add_something.sequence_edit_block .setting').attr('disabled' , "disabled");
	} else {
		$('.settings_user_content_add_something.sequence_edit_block .setting').removeAttr('disabled');
	}
}
isSettingsPermitted();

/*input type file on create new campaign pop up*/
$('.campaign_pop_up_input_campaign_icon .campaign_pop_up_input_campaign_icon_absolute input').on('input' , function(){
	$(this).parent('.campaign_pop_up_input_campaign_icon_absolute').children('.download_img').children('img').attr("src" , $(this).val())
});

/*var createObjectTable = function() {
    $(document).ready(function() {
        var objectFromTable = [];
        for (var i = 0; i < $('.campaign_choose_pop_up_table_body > ul').length; i++) {
            if ($('.campaign_choose_pop_up_table_body > ul:eq(' + i + ')').hasClass('checked')) {
                var current_checked = true;
            } else {
                var current_checked = false;
            }
            var current_id = "id_" + $('.campaign_choose_pop_up_table_body > ul:eq(' + i + ')').attr('data-key');
            var current_data_key = $('.campaign_choose_pop_up_table_body > ul:eq(' + i + ')').attr('data-key');
            var current_camp_name = $('.campaign_choose_pop_up_table_body > ul:eq(' + i + ') > li.name > p').text();
            var current_group = $('.campaign_choose_pop_up_table_body > ul:eq(' + i + ') > li.group > p').text();
            var current_group_value = $('.campaign_choose_pop_up_table_body > ul:eq(' + i + ') > li.group > p').attr('group-value');
            var current_lang = $('.campaign_choose_pop_up_table_body > ul:eq(' + i + ') > li.language > p').text();
            var current_lang_value = $('.campaign_choose_pop_up_table_body > ul:eq(' + i + ') > li.language > p').attr('lang-value');
            var current_title = "";
            var current_text = "";
            var current_img = $('.campaign_choose_pop_up_table_body > ul:eq(' + i + ') > li.photo > img').attr('src');
            var current_views = $('.campaign_choose_pop_up_table_body > ul:eq(' + i + ') > li.views > p').text();
            var current_clicks = $('.campaign_choose_pop_up_table_body > ul:eq(' + i + ') > li.clicks > p').text();
            var current_ctr = $('.campaign_choose_pop_up_table_body > ul:eq(' + i + ') > li.ctr > p').text();
            var current_leads = $('.campaign_choose_pop_up_table_body > ul:eq(' + i + ') > li.leads > p').text();
            var current_from = "id_" + $('.campaign_choose_pop_up_table_body > ul:eq(' + i + ')').attr('data-key');
            var current_to = "";
            var current_value = "0";
            var current_unit = "Hours";

            var ArrayElement = {
                checked: current_checked,
                id: current_id,
                data_key: current_data_key,
                camp_name: current_camp_name,
                group: current_group,
                group_value: current_lang_value,
                lang: current_lang,
                lang_value: current_lang_value,
                title: current_title,
                text: current_img,
                img: current_img,
                views: current_views,
                clicks: current_clicks,
                ctr: current_ctr,
                leads: current_leads,
                connection: {
                    from: current_from,
                    to: current_to,
                },
                time: {
                    value: current_value,
                    unit: current_unit
                }
            };

            objectFromTable.push(ArrayElement);
        }
        console.log(objectFromTable)
    });
    Global_();
}
createObjectTable();*/

