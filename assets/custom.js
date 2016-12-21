$(document).ready(function() {

/*====================================
BACKDROP SLIDESHOW SCRIPTS
======================================*/
$.vegas('slideshow', {
backgrounds: [
{ src: 'assets/img/1.jpg', fade: 1000, delay: 9000 },
{ src: 'assets/img/2.jpg', fade: 1000, delay: 9000 },
]
})('overlay', {
/** SLIDESHOW OVERLAY IMAGE **/
src: 'assets/img/06.png'

/*====================================
FILTER FUNCTIONALITY SCRIPTS
======================================*/
// FIX TO WORK ON BUTTON ITSELF
$(window).load(function () {
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


});
