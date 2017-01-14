$(document).ready(function() {
    $.ajax({
        // url: "http://localhost:8000/faqs.php"
        /* UNCOMMENT FOR MIRA */
        url: "http://community.dur.ac.uk/sara.h.chen/faq2016/faqs.php"
    }).then(function(data) {
        var content = data.faqs;
        /* CREATE ID FOR FILTERING TOPICS */
        var topics = [];
       for (var i=0; i < data.faqs.length; i++) {

           /* FETCH FAQ SECTION */
           var box = document.createElement('div');
           box.className += "col-xs-12 col-sm-4 col-md-4 col-lg-4 "
           box.className += content[i].topic.toLowerCase();
           box.innerHTML = '<div class="topic-wrapper"><h4> ' + content[i].question + '</h4><h5>'+ content[i].answer + '</h5></div>';
           document.getElementById("topics-div").appendChild(box);

           /* CREATE BUTTONS FOR TOPICS */
           if (topics.includes((data.faqs[i]).topic)) {
               continue;
           } else {
               var container = document.createElement('a');
               topics.push(data.faqs[i].topic);
               container.innerHTML = '<a href="#" data-topic=' + data.faqs[i].id + ' data-filter=".' + data.faqs[i].topic.toLowerCase() + '" class="btn btn-custom btn-custom-two btn-sm">' + data.faqs[i].topic + '</a>';
               document.getElementById("listOfTopics").appendChild(container);
           }

       }


    })
    .then(function() {
        /* REGEX FOR SEARCH BAR */
        var qsRegex;
        var buttonFilter;

        var $container = $('#topics-div');
        $container.isotope({
            filter: function () {
                var $this = $(this);
                var searchResult = qsRegex ? $this.text().match(qsRegex) : true;
                var buttonResult = buttonFilter ? $this.is(buttonFilter) : true;
                return searchResult && buttonResult;
            },
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $container.css({top: 100})

        active_class_id = undefined;
        $('.categories a').click(function () {
            active_class_id = $(this).attr("data-topic");
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
                $('#navbar').hide(300);
            } else if (!$("#hidden-button").is(":visible")) {
                $("#hidden-button").show(300);
                $('#navbar').show(300);
            }
            return false;
        });

        function searchFilter() {
            qsRegex = new RegExp($quicksearch.val(), 'gi');
            $container.isotope({
                filter: function () {
                    return qsRegex ? $(this).text().match(qsRegex) : true;
                }
            });
        }

        /* USE VALUE OF SEARCH FIELD TO FILTER */
        var $quicksearch = $('#quicksearch').keypress(function (e) {
            if (e.which == 13) {
                searchFilter();
                text = $(this).val();
                topic = active_class_id;
                $.ajax({
                    url: "/?text=" + text + "&topic=" + topic,
                    success: function (data) {
                        document.getElementById("tweets-div").innerHTML = "";
                        positive = data.tweets.positive;
                        negative = data.tweets.negative;
                        console.log(data.tweets);
                        for (var i = 0; i < positive.length; i++) {
                            /* FETCH TWEET SECTION */
                            var box = document.createElement('div');
                            box.className += "col-xs-12 col-sm-4 col-md-4 col-lg-4 "
                            box.innerHTML = '<div class="topic-wrapper"><h4> ' + positive[i].text + '</h4><h5>Sentiment: '+ positive[i].sentiment + '</h5></div>';
                            document.getElementById("tweets-div").appendChild(box);
                        }   
                        for (var i = 0; i < negative.length; i++) {
                            /* FETCH TWEET SECTION */
                            var box = document.createElement('div');
                            box.className += "col-xs-12 col-sm-4 col-md-4 col-lg-4 "
                            box.innerHTML = '<div class="topic-wrapper"><h4> ' + negative[i].text + '</h4><h5>Sentiment: '+ negative[i].sentiment + '</h5></div>';
                            document.getElementById("tweets-div").appendChild(box);
                        }  
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log("failed");
                        console.log(textStatus + ": " + errorThrown);
                    }
                });
            }
        });
    });
});
