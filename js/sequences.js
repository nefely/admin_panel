$(document).ready(function(){
	
	/*folder toggle*/
	$('.settings_user_navigation ul > li').addClass('collapsed');
	$('.settings_user_navigation ul > li > ul').slideUp(0); 

	
	$('body').delegate('.settings_user_navigation ul li button' , 'click' , function(){
		$(this).parent('li').children('ul').slideToggle(100);
		$('.settings_user_navigation ul li button').parent('li').removeClass('current_folder');
		$(this).parent('li').not('.sequence_folder').toggleClass('collapsed').not('.collapsed').addClass('current_folder');
		$(this).parent('li.sequence_folder').addClass('current_folder');
		 if ( $(this).parent('li.sequence_folder').hasClass('current_folder') ) {
		 	var data_folder_id = $(this).attr("data-folder-id");
			$('.settings_user_table_body').css('display', 'none');
			$('.settings_user_table_body[data-folder-id="'+ data_folder_id +'"]').css('display','block');
		} else {
			$('.settings_user_table_body').css('display', 'none');
			$('.settings_user_table_body[data-folder-id="empty"]').css('display','block');
		}
	});

	/*$('body').delegate('.settings_user_navigation ul > li.sequence_folder > button' , 'click' , function(){
		var data_folder_id = $(this).attr("data-folder-id");
		$('.settings_user_table_body').css('display', 'none');
		$('.settings_user_table_body[data-folder-id="'+ data_folder_id +'"]').css('display','block');
	})*/

	/*folder add*/
	/*create new folder*/
	$('.add_folder_pop_up_create_new_table_ul').fadeOut();
	$('.main_sequences_work_space_add_folder button').click(function(){
		$('.add_folder_pop_up_input input').val("");
		$('.add_folder_pop_up_create_new_table_ul').fadeIn();
	});
	/*create new folder save*/
	var string = ""
	$('.add_folder_pop_up_save button').click(function(){
		string = $('.add_folder_pop_up_input input').val();

		if (string == "") {
			string = "Folder"
		}

		if ( $('.settings_user_navigation ul > li').hasClass('current_folder') ) {
			$('.script_add_folder > li').children('button').children('span').html(string)
			.parent('button').parent('li').clone().appendTo($('.settings_user_navigation ul > li.current_folder > ul'))
		} else {
			$('.script_add_folder > li').children('button').children('span').html(string)
			.parent('button').parent('li').clone().appendTo($('.settings_user_navigation > ul'))
		}

		$('.add_folder_pop_up_create_new_table_ul').fadeOut();
	});
	/*create new folder close*/
	$('.add_folder_pop_up_close').click(function(){
		$('.add_folder_pop_up_input input').val("");
		$('.add_folder_pop_up_create_new_table_ul').fadeOut();
	});
	
	/*table*/

	/*play / paused*/
	$('body').delegate(".settings_user_table_ul > li:nth-child(2) > div.settings_status > button.play" , "click" , function(){
		$(this).parent('div.settings_status').removeClass('paused');
	});
	$('body').delegate(".settings_user_table_ul > li:nth-child(2) > div.settings_status > button.pause" , "click" , function(){
		$(this).parent('div.settings_status').addClass('paused');
	});

	/*delete*/
	$('body').delegate('.settings_user_table_ul > .edit .campaigns_table_ul_delete' , 'click' , function(){
		var data_key = $(this).closest('.settings_user_table_ul').attr('data-key');
		$(this).closest('.settings_user_table_ul').remove();
	});

	/*dublicate*/
	$('body').delegate('.settings_user_table_ul > .edit .campaigns_table_ul_dublicate' , 'click' , function(){
		var data_key = $(this).closest('.settings_user_table_ul').attr('data-key');
		$(this).closest('.settings_user_table_ul').clone().prependTo($(this).closest('.settings_user_table_body'));
	});

	/*edit*/
	$('body').delegate('.settings_user_table_ul > .edit .campaigns_table_ul_edit' , 'click' , function(){
		var data_folder_id = $(this).closest('.settings_user_table_body').attr('data-folder-id');
		var data_key = $(this).closest('.settings_user_table_ul').attr('data-key');
		window.location = location + "sequence.html?data_folder_id=" + data_folder_id + "&data_key=" + data_key ;
	});

	

	/*filter on campaigns input*/
	$('.main_sequences_work_space_search input').on('input' , function(){
	    filter_campaigns_input_func('.main_sequences_work_space_search  input' , ".settings_user_content");
	})
	var filter_campaigns_input_func = function(input , ul) {
	    var input_text = $(input).val().toLowerCase();
	    var input_text_length = $(input).val().length;
	    $(ul).find('.settings_user_table_body').children('ul').each(function(){
	    	if ( ($(this).attr('data-key') !== 'empty_li') &&  ($(this).attr('data-key') !== 'template_li')) {
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
	    	}
	        
	    });
	}


	/*тут*/
	$('.add_new_flow_pop_up').fadeOut(0)

	/*create new*/
	$('.settings_user_content_add_something .new_sequence').click(function(){
		$('.add_new_flow_pop_up').fadeIn(300);
	});

	/*close button in add new flow pop up*/
	$('.add_new_flow_pop_up .add_new_flow_pop_up_close').click(function(){
		$('.add_new_flow_pop_up').fadeOut(300);
	})

	/*create button in add new flow pop up*/
	$('.add_new_flow_pop_up .add_flow_pop_up_create').click(function(){
		$('.add_new_flow_pop_up').fadeOut(300);

		/*var data_folder_id = 'undefined_id';
		var data_key = 'undefined_key';
		window.location = location + "sequence.html?data_folder_id=" + data_folder_id + "&data_key=" + data_key ;*/
	})


});