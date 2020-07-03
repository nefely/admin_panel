$(document).ready(function(){


	$('.dashboard_card_percent > p').each(function(){
		if( parseInt($(this).html()) >= 0 ) {
			$(this).next( $("i") ).addClass("fas fa-arrow-up");
		} else {
			$(this).next( $("i") ).addClass("fas fa-arrow-down");
		}
	});

	$('.dashboard_graph_filter_list > ul > li').click(function(){
		$('.dashboard_graph_filter_list > ul > li').removeClass('dashboard_graph_filter_list_active');
		$(this).addClass('dashboard_graph_filter_list_active');
	})

});