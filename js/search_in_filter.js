$(document).ready(function(){
	var searchInDropdown = function( element_selector ){
	$(element_selector).delegate($(this) ,"mouseover",function(){
	    $(document).bind("keydown", (e)=> {
	         for ( var i = 0 ; i < $(this).parent().children().length ; i++ ){
		         var text = $(this).parent().children().eq(i).text().charAt(0).toLowerCase();
		         var fulltext = $(this).parent().children().eq(i).text().toLowerCase();
		         if (e.key == text){
			        var scrollHeight = $(this).parent().children().eq(i).offset().top - $(this).parent().children().offset().top;
			        console.log(scrollHeight);
			        $(this).parent().animate({scrollTop:scrollHeight}, 300);
			        break;
		         }
	         }
	    });
	}).delegate($(this) ,"mouseout", function(){
	    $(document).unbind("keydown");
	});
	};
	/*випадаючий список в кнопці*/
	searchInDropdown('.campaign_filters_condition .campaign_add_condition .campaign_add_condition_dropdown > li > ul > li');
	searchInDropdown('.sequence_filters_condition .sequence_add_condition .sequence_add_condition_dropdown > li > ul > li');
	/*добавленні блоки фільтрації*/
	$('.campaign_add_condition .campaign_add_condition_dropdown li ul li').click(function(){
		searchInDropdown('.campaign_filters_condition .campaign_filter_condition_container .group_filter > ul > li');
		searchInDropdown('.campaign_filters_condition .campaign_filter_condition_container .sub_group_filter > ul > li');
	});
	setTimeout(function(){
		searchInDropdown('.campaign_filters_condition .campaign_filter_condition_container .group_filter > ul > li');
		searchInDropdown('.campaign_filters_condition .campaign_filter_condition_container .sub_group_filter > ul > li');
	} , 500);
	$('.sequence_add_condition .sequence_add_condition_dropdown li ul li').click(function(){
		searchInDropdown('.sequence_filters_condition .sequence_filter_condition_container .sequence_group_filter > ul > li');
		searchInDropdown('.sequence_filters_condition .sequence_filter_condition_container .sub_sequence_group_filter > ul > li');
	});
	setTimeout(function(){
		searchInDropdown('.sequence_filters_condition .sequence_filter_condition_container .sequence_group_filter > ul > li');
		searchInDropdown('.sequence_filters_condition .sequence_filter_condition_container .sub_sequence_group_filter > ul > li');
	} , 500);
	/*кастомний селект*/
	setTimeout(function(){
		searchInDropdown('.custom-select .select-items > div');
	} , 500)
})