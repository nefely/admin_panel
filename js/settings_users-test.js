/*тут є функція ресетів permission які я дописував до докер версії*/
$(document).ready(function(){

	/*duplicate user*/
	/*$('body').delegate(".settings_user_table_ul li.edit ul li button.campaigns_table_ul_duplicate ", "click", function(){
		$(this).parent('li').parent('ul').parent('li').parent('ul').clone().insertAfter($(this).parent('li').parent('ul').parent('li').parent('ul')).attr('data-key', "undefined");
	})*/
	/*delete user*/
	$('body').delegate(".settings_user_table_ul li.edit ul li button.campaigns_table_ul_delete ", "click", function(){
		/*там де undefined передати треба новий ключик*/
		const element = $(this).parent('li').parent('ul').parent('li').parent('ul');
		const id = element.attr('data-key');
		$.ajax({
			url: url.get("remove"),
			type:"POST",
			data: JSON.stringify({
				id: parseInt(id),
			}),
			headers: {
				'Authentication':token,
				'Content-Type':'application/json; charset=utf-8'
			},
			dataType:"json",
			success: function (data) {
				if(data.status) {
					element.remove();
				}
				else {
					if(data.message != undefined) {
						alert(data.message);
					}
					else {
						alert("Undefined error.");
					}
				}
			},
			error: function () {
				alert('Connection to server refused.');
			}
		});
	});

	var reset = function(){
		$('#campaigns .campaigns_filter .filter_group').remove();
		$('#campaigns .campaigns_filter .filter_all_groups').css("display" , 'none');

		$('#campaigns .campaigns_filter .filter_campaign').remove();
		$('#campaigns .campaigns_filter .filter_all_campaigns').css("display" , 'none');

		$('#sequences .sequences_filter .filter_sequences').remove();
		$('#sequences .sequences_filter .filter_all_sequences').css("display" , 'none');

		$('#categories .category_filter .filter_category').remove();
		$('#categories .category_filter .filter_all_categories').css("display" , 'none');

		$('#traffic_sources .traffic_filter .filter_traffic').remove();
		$('#traffic_sources .traffic_filter .filter_all_traffic').css("display" , 'none');

		$('#campaigns-list > ul').removeClass('checked').find('input').removeAttr('checked');
		$('#groups-list > ul').removeClass('checked').find('input').removeAttr('checked');
		$('#sequence-list > ul').removeClass('checked').find('input').removeAttr('checked');
		$('#category-list > ul').removeClass('checked').find('input').removeAttr('checked');
		$('#traffic_sources-list > ul').removeClass('checked').find('input').removeAttr('checked');

		/*name*/
		$('.settings_user_edit_content .settings_user_edit_content_main_name > input').val('');
		/*role*/
		$('.settings_user_edit_content_main_role .custom-select.settings_user_edit_content-select select option[selected="selected"]').attr( "value" , "ROLE_USER");
		$('.settings_user_edit_content_main_role .custom-select.settings_user_edit_content-select select option[selected="selected"]').text("USER");
		$('.settings_user_edit_content_main_role .custom-select.settings_user_edit_content-select .select-selected').attr( "value" , "ROLE_USER");
		$('.settings_user_edit_content_main_role .custom-select.settings_user_edit_content-select .select-selected').text("USER");
		$('.settings_user_edit_content_main_role .custom-select.settings_user_edit_content-select .select-items > div').removeClass('same-as-selected');
		$('.settings_user_edit_content_main_role .custom-select.settings_user_edit_content-select .select-items > div[value="ROLE_USER"]').addClass('same-as-selected');
	}

	/*call edit block with params*/
	$('body').delegate('.settings_user_table_ul li.edit ul li button.campaigns_table_ul_edit' , 'click' , function(){

		reset();

		var role = $(this).closest('.settings_user_table_ul').find('.settings_user_user_role').text();
		var role_value = $(this).closest('.settings_user_table_ul').find('.settings_user_user_role').attr('value');
		var name = $(this).closest('.settings_user_table_ul').find('.settings_user_user_name').text();
		var name_value = $(this).closest('.settings_user_table_ul').find('.settings_user_user_name').attr('value');

		/*name*/
		$('.settings_user_edit_content .settings_user_edit_content_main_name > input').val(name);
		/*role*/
		$('.settings_user_edit_content_main_role .custom-select.settings_user_edit_content-select select option[selected="selected"]').attr( "value" , role_value);
		$('.settings_user_edit_content_main_role .custom-select.settings_user_edit_content-select select option[selected="selected"]').text(role);
		$('.settings_user_edit_content_main_role .custom-select.settings_user_edit_content-select .select-selected').attr( "value" , role_value);
		$('.settings_user_edit_content_main_role .custom-select.settings_user_edit_content-select .select-selected').text(role);
		$('.settings_user_edit_content_main_role .custom-select.settings_user_edit_content-select .select-items > div').removeClass('same-as-selected');
		$('.settings_user_edit_content_main_role .custom-select.settings_user_edit_content-select .select-items > div[value="'+role_value+'"]').addClass('same-as-selected');

		/*$('.settings_user_edit_content_main_role .custom-select.settings_user_edit_content-select select option[selected="selected"]').text(role);*/
		/*???*/
		console.log(role , role_value)

		var state = [];
		$(this).closest('.settings_user_table_ul').children('.user-permissions').children('div').each(function(){
			var data_type = $(this).attr('data-type');
			var data_id = $(this).attr('data-id');
			var add_obj = {data_type , data_id}
			state.push( add_obj );
		});
		//console.log("state" , state);
		for ( i in state ) {
			switch ( state[i].data_type ) {

				case "Campaign":
					$('#campaigns-list > ul[data-key="'+state[i].data_id+'"] input[type=checkbox]').attr('checked' , true);
					break;

				case "Group":
					$('#groups-list > ul[data-key="'+state[i].data_id+'"] input[type=checkbox]').attr('checked' , true);
					break;

				case "Sequences":
					$('#sequence-list > ul[data-key="'+state[i].data_id+'"] input[type=checkbox]').attr('checked' , true);
					break;

				case "Category":
					$('#category-list > ul[data-key="'+state[i].data_id+'"] input[type=checkbox]').attr('checked' , true);
					break;

				case "TrafficSource":
					$('#traffic_sources-list > ul[data-key="'+state[i].data_id+'"] input[type=checkbox]').attr('checked' , true);
					break;

				default:
					break;
			}
			//console.log(state[i].data_type)
		}

		$('.settings_user_content').css('display', 'none');
		$('.settings_user_edit_content').css('display', 'block').attr('user-key', $(this).parent('li').parent('ul').parent('li').parent('ul').attr('data-key'));

		$('.settings_users_pop_up_table_body > ul > li > p > input').each(function(){
			if ( $(this).is(':checked') ) {
				$(this).parent('p').parent('li').parent('ul').addClass('checked')
			} else {
				$(this).parent('p').parent('li').parent('ul').removeClass('checked')
			}
		});
		savePermissionsFilterOnClick( 'filter_campaign', 'campaigns_filter');
		savePermissionsFilterOnClick( 'filter_group', 'campaigns_filter');
		savePermissionsFilterOnClick( 'filter_sequences', 'sequences_filter');
		savePermissionsFilterOnClick( 'filter_category', 'category_filter');
		savePermissionsFilterOnClick( 'filter_traffic', 'traffic_filter');
	});

	/*call edit block without params*/
	$('body').delegate('.settings_user_content_add_user' , 'click' , function(){

		reset();
		$('.settings_user_content').css('display', 'none');
		$('.settings_user_edit_content').css('display', 'block');
		$('.settings_user_edit_content').css('display', 'block').removeAttr('data-key');
	});

	$('body').delegate('.settings_user_edit_content_close button' , 'click' , function(){
		$('.settings_user_edit_content').css('display', 'none').removeAttr('user-key');
		$('.settings_user_content').css('display', 'block');
	});

	/*tabs*/
	$('.settings_user_edit_content_tabs_triger ul li').click(function(){
		$('.settings_user_edit_content_tabs_triger ul li').removeClass('active');
		$(this).addClass('active');
		$('.settings_user_edit_content_tabs_block > ul > li').css('display', 'none');
		$('.settings_user_edit_content_tabs_block > ul > li#'+$(this).attr('id')+'').css('display', 'block');
	});

	/*permissions*/
	$('.settings_users_pop_up_container').hide();

	/*delete permissions*/
	$('body').delegate('.filter_active > ul > li > button.permission_delete', 'click', function(){
		var data_key = $(this).parent('li').attr('data-key'); /*here fix*/
		switch ( $(this).parent('li').attr('class') ) {
			case "filter_all_campaigns":
				var this_class = 'filter_campaign';
				$('.settings_users_pop_up_container > .'+this_class+' .settings_users_pop_up_table_body > ul')
					.removeClass('checked').children('li').children('p').children('input').removeAttr('checked');
				$(this).parent('li').removeAttr('style');
				$(this).parent('li.filter_all_campaigns').css('display', 'none');
				$('.campaigns_filter > ul > li.filter_campaign').remove();
				break;

			case "filter_all_groups":
				var this_class = 'filter_group';
				$('.settings_users_pop_up_container > .'+this_class+' .settings_users_pop_up_table_body > ul')
					.removeClass('checked').children('li').children('p').children('input').removeAttr('checked');
				$(this).parent('li').removeAttr('style');
				$(this).parent('li.filter_all_groups').css('display', 'none');
				$('.campaigns_filter > ul > li.filter_group').remove();
				break;

			case "filter_all_sequences":
				var this_class = 'filter_sequences';
				$('.settings_users_pop_up_container > .'+this_class+' .settings_users_pop_up_table_body > ul')
					.removeClass('checked').children('li').children('p').children('input').removeAttr('checked');
				$(this).parent('li').removeAttr('style');
				$(this).parent('li.filter_all_sequences').css('display', 'none');
				$('.sequences_filter > ul > li.filter_sequences').remove();
				break;

			case "filter_all_categories":
				var this_class = 'filter_category';
				$('.settings_users_pop_up_container > .'+this_class+' .settings_users_pop_up_table_body > ul')
					.removeClass('checked').children('li').children('p').children('input').removeAttr('checked');
				$(this).parent('li').removeAttr('style');
				$(this).parent('li.filter_all_categories').css('display', 'none');
				$('.category_filter > ul > li.filter_category').remove();
				break;

			case "filter_all_traffic":
				var this_class = 'filter_traffic';
				$('.settings_users_pop_up_container > .'+this_class+' .settings_users_pop_up_table_body > ul')
					.removeClass('checked').children('li').children('p').children('input').removeAttr('checked');
				$(this).parent('li').removeAttr('style');
				$(this).parent('li.filter_all_traffic').css('display', 'none');
				$('.traffic_filter > ul > li.filter_traffic').remove();
				break;

			default :
				var this_class = $(this).parent('li').attr('class');
				var this_data_key = $(this).parent('li').attr('data-key');
				$('.settings_users_pop_up_container > .'+this_class+' .settings_users_pop_up_table_body > ul[data-key="'+data_key+'"]')
					.removeClass('checked').children('li').children('p').children('input').removeAttr('checked');
				$(this).parent('li').remove();
				break;
		}

		/*перерисовка вибраних фыльтрів*/
		/*switch (this_class) {
			case "filter_campaign" :
				savePermissionsFilterOnClick( this_class , 'campaigns_filter');
				break;
			case "filter_group" :
				savePermissionsFilterOnClick( this_class , 'campaigns_filter');
				break;
			case "filter_sequences" :
				savePermissionsFilterOnClick( this_class , 'sequences_filter');
				break;
			case "filter_category" :
				savePermissionsFilterOnClick( this_class , 'category_filter');
				break;
			case "filter_traffic" :
				savePermissionsFilterOnClick( this_class , 'traffic_filter');
				break;
			default :
		}*/

	});

	$('.settings_users_pop_up_table_body > ul > li > p > input').each(function(){
		if ( $(this).is(':checked') ) {
			$(this).parent('p').parent('li').parent('ul').addClass('checked')
		} else {
			$(this).parent('p').parent('li').parent('ul').removeClass('checked')
		}
	});

	$('body').delegate('.settings_users_pop_up_table_body > ul > li > p > input' , 'input' , function() {
		if ( $(this).is(':checked') ) {
			$(this).parent('p').parent('li').parent('ul').addClass('checked');
			$(this).attr('checked' , true);
		} else {
			$(this).parent('p').parent('li').parent('ul').removeClass('checked');
			$(this).removeAttr('checked');
		}
	});

	/*close pop up*/
	$('.settings_users_pop_up .settings_users_pop_up_top .settings_users_pop_up_top_close button').click(function() {
		$('.settings_users_pop_up_container').hide();
		$('.settings_users_pop_up').removeClass('settings_users_pop_up_active');
	});

	/*open pop up*/
	var openPopUpOnClick = function(openPopUpBtnClass) {
		switch (openPopUpBtnClass) {
			case "add_campaigns" :
				popUpClass = "filter_campaign" ;
				$('.settings_users_pop_up_container').show();
				$('.settings_users_pop_up_container > .'+popUpClass).addClass('settings_users_pop_up_active');
				break ;
			case "add_groups" :
				popUpClass = "filter_group" ;
				$('.settings_users_pop_up_container').show();
				$('.settings_users_pop_up_container > .'+popUpClass).addClass('settings_users_pop_up_active');
				break ;
			case "add_sequences" :
				popUpClass = "filter_sequences" ;
				$('.settings_users_pop_up_container').show();
				$('.settings_users_pop_up_container > .'+popUpClass).addClass('settings_users_pop_up_active');
				break ;
			case "add_categories" :
				popUpClass = "filter_category" ;
				$('.settings_users_pop_up_container').show();
				$('.settings_users_pop_up_container > .'+popUpClass).addClass('settings_users_pop_up_active');
				break ;
			case "add_traffics" :
				popUpClass = "filter_traffic" ;
				$('.settings_users_pop_up_container').show();
				$('.settings_users_pop_up_container > .'+popUpClass).addClass('settings_users_pop_up_active');
				break ;
			default :
		}
	}
	$('.filter_button button').click(function(){
		var openPopUpBtnClass = $(this).attr('class');
		openPopUpOnClick(openPopUpBtnClass)
	});

	/*set all checked campaigns / groups / sequences / categories / traffic sources to actice filter*/
	var setPermissionsFilterOnLoad = function( popUpClass , filterUlClass  ){
		if ( $('.settings_users_pop_up_container > .'+popUpClass+' .settings_users_pop_up_table .settings_users_pop_up_table_body > ul').length > 0 ){
			$('.settings_users_pop_up_container > .'+popUpClass+' .settings_users_pop_up_table .settings_users_pop_up_table_body > ul.checked').each(function(){
				var text = $(this).children('li:eq(0)').children('p').text();
				var key = $(this).attr('data-key');

				switch (filterUlClass) {
					case "campaigns_filter" :

						switch (popUpClass) {

							case "filter_campaign" :
								var group =  $(this).children('li:eq(7)').children('p').text();
								var group_value =  $(this).children('li:eq(7)').children('p').attr('group-value');
								var lang =  $(this).children('li:eq(6)').children('p').text();
								var lang_value =  $(this).children('li:eq(6)').children('p').attr('lang-value');
								$('.'+filterUlClass+' > ul > li.filter_template').clone().removeClass('filter_template').prependTo('.'+filterUlClass+' > ul')
									.attr('data-key', key).addClass(popUpClass).children('p')
									.text(text+" | "+group+" | "+lang)
									.parent('li')
									.attr('group-value' , group_value)
									.attr('lang-value' , lang_value);
								break;

							case "filter_group" :
								var group =  $(this).children('li:eq(0)').children('p').text();
								var group_value =  $(this).children('li:eq(0)').children('p').attr('group-value');
								$('.'+filterUlClass+' > ul > li.filter_template').clone().removeClass('filter_template').prependTo('.'+filterUlClass+' > ul')
									.attr('data-key', key).addClass(popUpClass).children('p')
									.text(text)
									.parent('li')
									.attr('group-value' , group_value);
								break;

							default :
						}

						break;

					case "sequences_filter" :
						$('.'+filterUlClass+' > ul > li.filter_template').clone().removeClass('filter_template').prependTo('.'+filterUlClass+' > ul')
							.attr('data-key', key).addClass(popUpClass).children('p').text(text);
						break;

					case "category_filter" :
						$('.'+filterUlClass+' > ul > li.filter_template').clone().removeClass('filter_template').prependTo('.'+filterUlClass+' > ul')
							.attr('data-key', key).addClass(popUpClass).children('p').text(text);
						break;

					case "traffic_filter" :
						$('.'+filterUlClass+' > ul > li.filter_template').clone().removeClass('filter_template').prependTo('.'+filterUlClass+' > ul')
							.attr('data-key', key).addClass(popUpClass).children('p').text(text);
						break;
					default :
				}
			});

			/*провірка чи всі вибран чи ні  і відповідно групувати їх або ні*/
			if ( $('.settings_users_pop_up_container > .'+popUpClass+' .settings_users_pop_up_table .settings_users_pop_up_table_body > ul.checked').length ===
				$('.settings_users_pop_up_container > .'+popUpClass+' .settings_users_pop_up_table .settings_users_pop_up_table_body > ul').length ) {
				console.log(popUpClass +' - all element ARE checked');

				switch (popUpClass) {
					case "filter_campaign" :
						var filterUlClass = "campaigns_filter";
						$('.'+filterUlClass+' > ul > li.filter_campaign').css('display', 'none');
						$('.'+filterUlClass+' > ul > li.filter_all_campaigns').css('display', 'flex');
						break;

					case "filter_group" :
						var filterUlClass = "campaigns_filter";
						$('.'+filterUlClass+' > ul > li.filter_group').css('display', 'none');
						$('.'+filterUlClass+' > ul > li.filter_all_groups').css('display', 'flex');
						break;

					case "filter_sequences" :
						var filterUlClass = "sequences_filter";
						$('.'+filterUlClass+' > ul > li.filter_sequences').css('display', 'none');
						$('.'+filterUlClass+' > ul > li.filter_all_sequences').css('display', 'flex');
						break;

					case "filter_category" :
						var filterUlClass = "category_filter";
						$('.'+filterUlClass+' > ul > li.filter_category').css('display', 'none');
						$('.'+filterUlClass+' > ul > li.filter_all_categories').css('display', 'flex');
						break;

					case "filter_traffic" :
						var filterUlClass = "traffic_filter";
						$('.'+filterUlClass+' > ul > li.filter_traffic').css('display', 'none');
						$('.'+filterUlClass+' > ul > li.filter_all_traffic').css('display', 'flex');
						break;

					default :
				}

			} else {
				console.log(popUpClass +' - all element ARE NOT checked');
				switch (popUpClass) {
					case "filter_campaign" :
						var filterUlClass = "campaigns_filter";
						$('.'+filterUlClass+' > ul > li.filter_campaign').removeAttr('style');
						$('.'+filterUlClass+' > ul > li.filter_all_campaigns').css('display', 'none');
						break;

					case "filter_group" :
						var filterUlClass = "campaigns_filter";
						$('.'+filterUlClass+' > ul > li.filter_group').removeAttr('style');
						$('.'+filterUlClass+' > ul > li.filter_all_groups').css('display', 'none');
						break;

					case "filter_sequences" :
						var filterUlClass = "sequences_filter";
						$('.'+filterUlClass+' > ul > li.filter_sequences').removeAttr('style');
						$('.'+filterUlClass+' > ul > li.filter_all_sequences').css('display', 'none');
						break;

					case "filter_category" :
						var filterUlClass = "category_filter";
						$('.'+filterUlClass+' > ul > li.filter_category').removeAttr('style');
						$('.'+filterUlClass+' > ul > li.filter_all_categories').css('display', 'none');
						break;

					case "filter_traffic" :
						var filterUlClass = "traffic_filter";
						$('.'+filterUlClass+' > ul > li.filter_traffic').removeAttr('display');
						$('.'+filterUlClass+' > ul > li.filter_all_traffic').css('display', 'none');
						break;
				}

			}
		}
	} /*setPermissionsFilterOnLoad end*/
	/*campaigns*/
	setPermissionsFilterOnLoad( 'filter_campaign', 'campaigns_filter');
	setPermissionsFilterOnLoad( 'filter_group', 'campaigns_filter');
	/*sequences*/
	setPermissionsFilterOnLoad( 'filter_sequences', 'sequences_filter');
	/*category*/
	setPermissionsFilterOnLoad( 'filter_category', 'category_filter');
	/*traffic source*/
	setPermissionsFilterOnLoad( 'filter_traffic', 'traffic_filter');


	/*save and set on active permission filter table*/
	var savePermissionsFilterOnClick = function(popUpClass , filterUlClass){
		$('.'+filterUlClass+' > ul > li.'+popUpClass).remove();
		setPermissionsFilterOnLoad( popUpClass, filterUlClass);
	}

	$('.settings_users_pop_up_table_btn_add button').click(function(){
		var popUpClass = $(this).attr('class');
		var filterUlClass = "";
		switch (popUpClass) {
			case "filter_campaign" :
				filterUlClass = "campaigns_filter" ;
				break ;
			case "filter_group" :
				filterUlClass = "campaigns_filter" ;
				break ;
			case "filter_sequences" :
				filterUlClass = "sequences_filter" ;
				break ;
			case "filter_category" :
				filterUlClass = "category_filter" ;
				break ;
			case "filter_traffic" :
				filterUlClass = "traffic_filter" ;
				break ;
			default :
		}
		savePermissionsFilterOnClick(popUpClass, filterUlClass);
		$('.settings_users_pop_up_container').hide();
		$('.settings_users_pop_up').removeClass('settings_users_pop_up_active');
	});

	/*add all*/
	$('.filter_button button').click(function(){
		var all_button_class = $(this).attr('class');
		switch (all_button_class) {
			case "add_all_groups" :
				var popUpClass = 'filter_group';
				var filterClass = "campaigns_filter";
				$('.settings_users_pop_up_container').hide();
				$('.settings_users_pop_up').removeClass('settings_users_pop_up_active');
				$('.settings_users_pop_up_container > .'+popUpClass+' .settings_users_pop_up_table .settings_users_pop_up_table_body > ul').addClass('checked').children('li').children('p').children('input[type="checkbox"]').attr('checked', "true");
				savePermissionsFilterOnClick( popUpClass , filterClass);
				/*var popUpClass = 'filter_campaign';
				$('.settings_users_pop_up_container > .'+popUpClass+' .settings_users_pop_up_table .settings_users_pop_up_table_body > ul').addClass('checked').children('li').children('p').children('input[type="checkbox"]').attr('checked', "true");
				savePermissionsFilterOnClick( popUpClass , filterClass);*/
				break ;
			case "add_all_sequences" :
				var popUpClass = 'filter_sequences';
				var filterClass = "sequences_filter";
				$('.settings_users_pop_up_container').hide();
				$('.settings_users_pop_up').removeClass('settings_users_pop_up_active');
				$('.settings_users_pop_up_container > .'+popUpClass+' .settings_users_pop_up_table .settings_users_pop_up_table_body > ul').addClass('checked').children('li').children('p').children('input[type="checkbox"]').attr('checked', "true");
				savePermissionsFilterOnClick( popUpClass , filterClass);
				break ;
			case "add_all_categories" :
				var popUpClass = 'filter_category';
				var filterClass = "category_filter";
				$('.settings_users_pop_up_container').hide();
				$('.settings_users_pop_up').removeClass('settings_users_pop_up_active');
				$('.settings_users_pop_up_container > .'+popUpClass+' .settings_users_pop_up_table .settings_users_pop_up_table_body > ul').addClass('checked').children('li').children('p').children('input[type="checkbox"]').attr('checked', "true");
				savePermissionsFilterOnClick( popUpClass , filterClass);
				break ;
			case "add_all_traffics" :
				var popUpClass = 'filter_traffic';
				var filterClass = "traffic_filter";
				$('.settings_users_pop_up_container').hide();
				$('.settings_users_pop_up').removeClass('settings_users_pop_up_active');
				$('.settings_users_pop_up_container > .'+popUpClass+' .settings_users_pop_up_table .settings_users_pop_up_table_body > ul').addClass('checked').children('li').children('p').children('input[type="checkbox"]').attr('checked', "true");
				savePermissionsFilterOnClick( popUpClass , filterClass);
				break ;
			default :
		}

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

	/*filter on campaigns filter_block*/
	$('body').delegate('.settings_users_pop_up.filter_campaign .campaign_filters_condition' , 'click' , function(){
		filter_campaigns_block_func();
	});
	var filter_campaigns_block_func = function() {
		$('.settings_users_pop_up.filter_campaign .settings_users_pop_up_table_body > ul').removeClass("filtered_on_group")
		$('.settings_users_pop_up.filter_campaign .settings_users_pop_up_table_body > ul').removeClass("filtered_on_language")
		var block_func_array = [];
		$('.settings_users_pop_up.filter_campaign .campaign_filters_condition .campaign_filter_condition_container').each(function(){
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
				$('.settings_users_pop_up.filter_campaign .settings_users_pop_up_table_body > ul').addClass("filtered_on_group")
			}
			if ( Object.keys(block_func_array[i]).indexOf( 'language' ) != -1 ) {
				$('.settings_users_pop_up.filter_campaign .settings_users_pop_up_table_body > ul').addClass("filtered_on_language")
			}
		}
		for (i in block_func_array) {
			if ( Object.keys(block_func_array[i]) == "group") {
				$('.settings_users_pop_up.filter_campaign .settings_users_pop_up_table_body > ul[data-group="'+Object.values(block_func_array[i])+'"]')
					.removeClass('filtered_on_group');
			}
			if ( Object.keys(block_func_array[i]) == "language") {
				$('.settings_users_pop_up.filter_campaign .settings_users_pop_up_table_body > ul[data-language="'+Object.values(block_func_array[i])+'"]')
					.removeClass('filtered_on_language');
			}
		}
		if ( $('.settings_users_pop_up.filter_campaign .campaign_filters_condition .campaign_filter_condition_container').length == 0 ){
			$('.settings_users_pop_up.filter_campaign .settings_users_pop_up_table_body > ul').removeClass("filtered_on_group")
			$('.settings_users_pop_up.filter_campaign .settings_users_pop_up_table_body > ul').removeClass("filtered_on_language")
		}
	}

	/*filter on campaigns input*/
	$('.settings_users_pop_up.filter_campaign .settings_users_pop_up_top_search input').on('input' , function(){
		filter_campaigns_input_func('.settings_users_pop_up.filter_campaign .settings_users_pop_up_top_search input' , ".filter_campaign")
	})
	var filter_campaigns_input_func = function(input , ul) {
		var input_text = $(input).val().toLowerCase();
		var input_text_length = $(input).val().length;
		$('.settings_users_pop_up'+ul).find('.settings_users_pop_up_table_body').children('ul').each(function(){
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

	/*filter on groups input*/
	$('.settings_users_pop_up.filter_group .settings_users_pop_up_top_search input').on('input' , function(){
		filter_group_input_func('.settings_users_pop_up.filter_group .settings_users_pop_up_top_search input' , ".filter_group")
	})
	var filter_group_input_func = function(input , ul) {
		var input_text = $(input).val().toLowerCase() ;
		var input_text_length = $(input).val().length;
		$('.settings_users_pop_up'+ul).find('.settings_users_pop_up_table_body').children('ul').each(function(){
			var ul_id_group_name = $(this).children('li').children('p').attr('group-value').toLowerCase();
			if( ul_id_group_name.indexOf(input_text)+1 > 0 ) {
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

	/*filter on sequences input*/
	$('.settings_users_pop_up.filter_sequences .settings_users_pop_up_top_search input').on('input' , function(){
		filter_sequence_input_func('.settings_users_pop_up.filter_sequences .settings_users_pop_up_top_search input' , ".filter_sequences")
	})
	var filter_sequence_input_func = function(input , ul) {
		var input_text = $(input).val().toLowerCase() ;
		var input_text_length = $(input).val().length;
		$('.settings_users_pop_up'+ul).find('.settings_users_pop_up_table_body').children('ul').each(function(){
			var ul_id_sequence_name = $(this).children('li').children('p').attr('data-value').toLowerCase();
			if( ul_id_sequence_name.indexOf(input_text)+1 > 0 ) {
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

	/*filter on categories input*/
	$('.settings_users_pop_up.filter_category .settings_users_pop_up_top_search input').on('input' , function(){
		filter_category_input_func('.settings_users_pop_up.filter_category .settings_users_pop_up_top_search input' , ".filter_category")
	})
	var filter_category_input_func = function(input , ul) {
		var input_text = $(input).val().toLowerCase() ;
		var input_text_length = $(input).val().length;
		$('.settings_users_pop_up'+ul).find('.settings_users_pop_up_table_body').children('ul').each(function(){
			var ul_id_category_name = $(this).children('li').children('p').attr('data-value').toLowerCase();
			if( ul_id_category_name.indexOf(input_text)+1 > 0 ) {
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

	/*filter on traffic sources input*/
	$('.settings_users_pop_up.filter_traffic  .settings_users_pop_up_top_search input').on('input' , function(){
		filter_traffic_sources_input_func('.settings_users_pop_up.filter_traffic  .settings_users_pop_up_top_search input' , ".filter_traffic ")
	})
	var filter_traffic_sources_input_func = function(input , ul) {
		var input_text = $(input).val().toLowerCase() ;
		var input_text_length = $(input).val().length;
		$('.settings_users_pop_up'+ul).find('.settings_users_pop_up_table_body').children('ul').each(function(){
			var ul_id_traffic_source_name = $(this).children('li').children('p').attr('data-value').toLowerCase();
			if( ul_id_traffic_source_name.indexOf(input_text)+1 > 0 ) {
				$(this).css('display' , 'flex');
			}
			else if (input_text == "")  {
				$(this).css('display' , 'flex');
			}
			else {
				$(this).css('display' , 'none');
			}
		});
	};
	/*create new user ajax*/
	$('.settings_user_edit_content_save_button   > button').click(function (e) {
		let btn = $(this);
		//btn.attr('disabled', 'disabled');
		let permissions = [];
		if($('#campaigns .filter_all_groups').css('display') != 'none') {
			$('#groups-list > ul').each(function () {
				permissions.push({
					entity_id: $(this).attr('data-key'),
					entity_class: 'Group',
					permissions_mask: ['VIEW']
				})
			})
		}
		else {
			$('#campaigns li').each(function () {
				if($(this).css('display') != 'none' && !Number.isNaN(parseInt($(this).attr('data-key')))) {
					let _class = $(this).attr('class').replace('filter_', '');
					permissions.push({
						entity_id: $(this).attr('data-key'),
						entity_class: _class.charAt(0).toUpperCase() + _class.substr(1),
						permissions_mask: ['VIEW']
					})
				}
			});
		}
		if($('#sequences .filter_all_sequences').css('display') != 'none') {
			$('#sequences-list > ul').each(function () {
				permissions.push({
					entity_id: $(this).attr('data-key'),
					entity_class: 'Sequence',
					permissions_mask: ['VIEW']
				})
			})
		}
		else {
			$('#sequences li').each(function () {
				if ($(this).css('display') != 'none' && !Number.isNaN(parseInt($(this).attr('data-key')))) {
					permissions.push({
						entity_id: $(this).attr('data-key'),
						entity_class: 'Sequence',
						permissions_mask: ['VIEW']
					})
				}
			});
		}
		if($('#categories .filter_all_categories').css('display') != 'none') {
			$('#category-list > ul').each(function () {
				permissions.push({
					entity_id: $(this).attr('data-key'),
					entity_class: 'Category',
					permissions_mask: ['VIEW']
				})
			})
		}
		else
		{
			$('#categories li').each(function () {
				if($(this).css('display') != 'none' && !Number.isNaN(parseInt($(this).attr('data-key')))) {
					permissions.push({
						entity_id: $(this).attr('data-key'),
						entity_class: 'Category',
						permissions_mask: ['VIEW']
					})
				}
			});
		}
		if($('#traffic_sources .filter_all_traffic').css('display') != 'none') {
			$('#traffic_sources-list > ul').each(function () {
				permissions.push({
					entity_id: $(this).attr('data-key'),
					entity_class: 'TrafficSource',
					permissions_mask: ['VIEW']
				})
			})
		}
		else {
			$('#traffic_sources li').each(function () {
				if ($(this).css('display') != 'none' && !Number.isNaN(parseInt($(this).attr('data-key')))) {
					permissions.push({
						entity_id: $(this).attr('data-key'),
						entity_class: 'TrafficSource',
						permissions_mask: ['VIEW']
					})
				}
			});
		}
		const user_id = btn.closest('div.settings_user_edit_content').attr('user-key');
		let type = "add";
		let update = false;
		let data = {
				name: $('.settings_user_edit_content_main_name > input').val(),
				password: $('.settings_user_edit_content_main_password > input').val(),
				role: $('.settings_user_edit_content_main_role option:selected').attr('value'),
				user_entity_permissions: permissions
		};
		if(user_id != undefined)
		{
			type = "update";
			update = true;
			let to_add = [];
			let to_remove = [];
			function ifPermissionExist(permissions, entity_id, entity_class)
			{
				for(let i = 0; i < permissions.length; i++)
				{
					if(permissions[i].entity_id == entity_id && permissions[i].entity_class == entity_class)
					{
						return true;
					}
				}
				return false;
			}
			permissions.forEach(function (item) {
				if($('ul.settings_user_table_ul[data-key="'+user_id+'"] div.user-permission[data-id="'+item.entity_id+'"][data-type="'+item.entity_class+'"]').length < 1)
				{
					to_add.push({
						entity_id: item.entity_id,
						entity_class: item.entity_class,
						permissions_mask: item.permissions_mask
					})
				}
			});
			$('ul.settings_user_table_ul[data-key="'+user_id+'"] div.user-permission').each(function (index) {
				const entity_id = $(this).attr('data-id');
				const entity_class = $(this).attr('data-type');
				const id = $(this).attr('data-key');
				if(!ifPermissionExist(permissions, entity_id, entity_class))
				{
					to_remove.push({
						id: id,
						entity_class: entity_class,
					})
				}
			});
			data = {
				id: user_id,
				name: $('.settings_user_edit_content_main_name > input').val(),
				password: $('.settings_user_edit_content_main_password > input').val(),
				role: $('.settings_user_edit_content_main_role option:selected').attr('value'),
				user_entity_permissions:
					{
						add: to_add,
						remove: to_remove
					}
			};
		}
		$.ajax({
			url: url.get(type),
			type:"POST",
			data: JSON.stringify(data),
			headers: {
				'Authentication':token,
				'Content-Type':'application/json; charset=utf-8'
			},
			dataType:"json",
			success: function (data) {
				if(data.status) {
					if(update) {
						$('ul.settings_user_table_ul[data-key='+data.entity.id+']').find('p.settings_user_user_name').attr('value', data.entity.username).text(data.entity.username);
						$('ul.settings_user_table_ul[data-key='+data.entity.id+']').find('p.settings_user_user_role').attr('value', data.entity.roles[0]).text((data.entity.roles[0]).substr(5));
					}
					else {
						$('.settings_user_table_body').prepend('<ul class="settings_user_table_ul" data-key="'+data.entity.id+'"><li data-id="'+data.entity.id+'"><p class="settings_user_user_name" value="'+data.entity.username+'">'+data.entity.username+'</p></li><li><p class="settings_user_user_role" value="'+data.entity.roles[0]+'">'+(data.entity.roles[0]).substr(5)+'</p></li><li class="edit"><i class="fas fa-ellipsis-v"></i><ul><li><button class="campaigns_table_ul_edit">Edit</button></li><li><button class="campaigns_table_ul_duplicate">Duplicate</button></li><li><button class="campaigns_table_ul_delete">Delete</button></li></ul></li><div class="user-permissions" style="display: none"></div></ul>');
					}
					const permissions_block = $('ul.settings_user_table_ul[data-key='+data.entity.id+']').find('div.user-permissions');
					let user_entity_permissions = data.entity.user_entity_permissions;
					permissions_block.html('');
					for (let [key, item] of Object.entries(user_entity_permissions)) {
						permissions_block.append('<div class="user-permission" data-key="'+item.id+'" data-type="'+item.entity_class+'" data-id="'+item.entity_id+'"></div>');
					}
					$('.settings_user_edit_content').css('display', 'none').removeAttr('user-key');
					$('.settings_user_content').css('display', 'block');
				}
				else {
					if(data.message != undefined) {
						alert(data.message);
					}
					else {
						alert("Undefined error.");
					}
				}
				btn.removeAttr('disabled');
			},
			error: function () {
				alert('Connection to server refused.');
				btn.removeAttr('disabled');
			}
		});
	})

});