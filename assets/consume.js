$(document).ready(function() {
    $.ajax({
        url: "http://community.dur.ac.uk/sara.h.chen/faq2016/faqs.php"
    }).then(function(data) {
        var content = data.faqs;
        /** CREATE ID FOR FILTERING TOPICS **/
        var topics = [];
       //console.log(data.faqs);
       //console.log(content);
       for (var i=0; i < data.faqs.length; i++) {

           /** FETCH FAQ SECTION **/
           //console.log(content[i].question);
           var box = document.createElement('div');
           box.className += "col-xs-12 col-sm-4 col-md-4 col-lg-4 "
           box.className += content[i].topic.toLowerCase();
           box.innerHTML = '<div class="topic-wrapper"><h4> ' + content[i].question + '</h4><h5>'+ content[i].answer + '</h5></div>';
           //console.log(box.innerHTML);
           document.getElementById("topics-div").appendChild(box);

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


    })
    .then(function() {
        var $container = $('#topics-div');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $container.css({top: 100})

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
            $container.css({top: 100})
            if ($("#all_topics").hasClass('active')) {
                $("#hidden-button").hide(300);
            } else if (!$("#hidden-button").is(":visible")) {
                console.log("I should appear now!");
                $("#hidden-button").show(300);
            }
            return false;
        });
    });

});
