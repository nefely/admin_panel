$(document).ready(function() {

    /*get true value of screen (without browser adress bar)*/
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    $(window).on('orientationchange resize', function() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

	$('.nav_menu li:eq(4) > a').click(function(e){
		e.preventDefault();
	})

    $('.main_cramps a[disabled]').click(function(e){
        e.preventDefault();
    })


});