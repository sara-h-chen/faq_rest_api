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
        //console.log($container);

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

    $.ajax({
        url: "http://community.dur.ac.uk/sara.h.chen/faq2016/faqs.php"
    }).then(function(data) {
        var content = data.faqs;
        /** CREATE ID FOR FILTERING TOPICS **/
        var topics = [];
        //console.log(data.faqs);
        //console.log(content);
        for (var i = 0; i < data.faqs.length; i++) {

            /** FETCH FAQ SECTION **/
                //console.log(content[i].question);
            var box = document.createElement('div');
            box.innerHTML = '<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 ' + content[i].topic.toLowerCase() + '"><div class="topic-wrapper"><h4> ' + content[i].question + '</h4><h5>' + content[i].answer + '</h5></div></div>';
            //console.log(box.innerHTML);
            document.getElementById("topics-div").appendChild(box);
            // $('#topics-div').isotope('appended', box);

            /** CREATE BUTTONS FOR TOPICS **/
            if (topics.includes((data.faqs[i]).topic)) {
                continue;
            } else {
                var container = document.createElement('a');
                //console.log("pushed");
                topics.push(data.faqs[i].topic);
                container.innerHTML = '<a href="#" data-filter=".' + data.faqs[i].topic.toLowerCase() + '" class="btn btn-custom btn-custom-two btn-sm">' + data.faqs[i].topic + '</a>';
                document.getElementById("listOfTopics").appendChild(container);
            }

        }
    }).then(function() {
        var $container = $('#topics-div');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        })
        //console.log($container.isotope);

        $('.categories a').click(function () {
            // console.log('clicked');
            $('.categories .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            console.log(selector);
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            console.log($container.isotope);
            return false;
        });

    });

});
