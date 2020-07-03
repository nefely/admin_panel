$(document).ready(function(){
	
	$('.generate_link_button').click(function(){
		const save_page_link = $('.save_page_link input').val();
		const category = $('#category').val();
		const source = $('#source').val();
		const tag = $('#tag').val();
		var final_link = "";
		if( save_page_link.indexOf('?') > -1 ) {
			final_link = save_page_link + "&category=" + category + "&source=" + source + "&tag=" + tag
			$('.save_page_final_link input').val(final_link);
		} else {
			final_link = save_page_link + "?category=" + category + "&source=" + source + "&tag=" + tag
			$('.save_page_final_link input').val(final_link);
		}
	});

	$('.save_page_final_link button').click(function() {
		$('.save_page_final_link input').focus().select();
		document.execCommand('copy');
	});

});