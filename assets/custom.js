$(document).ready(function() {

/*===============================
BACKGROUND 3D STYLE
=================================*/

$(".bg").interactive_bg({
    strength: 25,
    scale: 1.00,
    animationSpeed: "120ms",
    contain: true,
    wrapContent: false
});

/*====================================
FILTER FUNCTIONALITY SCRIPTS
======================================*/
// FIX TO WORK ON BUTTON ITSELF
/*$(window).load(function () {
var $container = $('#topics-div');
$container.isotope({
filter: '*',
animationOptions: {
duration: 750,
easing: 'linear',
queue: false
}
});
$('.categories a').click(function () {
$('.categories .active').removeClass('active');
$(this).addClass('active');
var selector = $(this).attr('data-filter');
$container.isotope({
filter: selector,
animationOptions: {
duration: 750,
easing: 'linear',
queue: false
}
});
return false;
});

});

*/
});
