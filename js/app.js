$(function() {
	$('header nav ul > li:first-child').on("click",function(){
		event.preventDefault();
		$(this).siblings().slideToggle();
	});

	$('main').hide().fadeIn(1000);
	// $('.item').on("click", function () { $(".item").fadeOut()});
})
