$(document).ready(function () {

    /*====================================
     SCROLLING SCRIPTS
     ======================================*/

    $('.scroll-me a').bind('click', function (event) { //just pass scroll-me in design and start scrolling
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1200, 'easeInOutExpo');
        event.preventDefault();
    });



    /*====================================
     POPUP IMAGE SCRIPTS
     ======================================*/
    $('.fancybox-media').fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
        helpers: {
            title: {
                type: 'inside'
            }
        }
    });


    /*====================================
     FILTER FUNCTIONALITY SCRIPTS
     ======================================*/
    $(window).on('load', function () {
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



    /*====================================
     CUSTOM SCRIPTS
     ======================================*/


});
