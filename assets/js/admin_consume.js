/**
 * Created by jrvh15 on 26/12/16.
 */
$(document).ready(function() {
    $.ajax({
        url: "http://community.dur.ac.uk/sara.h.chen/faq2016/assets/queryscript.php"
    }).then(function (data) {
        /* CREATE ID FOR FILTERING TOPICS */
        var topics = [];
        for (var i = 0; i < data.length; i++) {

        var box = document.createElement('p');

            /* FETCH FAQ SECTION */
            // var box = document.createElement('div');
            // box.className += "col-xs-12 col-sm-4 col-md-4 col-lg-4 "
            // box.className += content[i].topic.toLowerCase();
            // box.innerHTML = '<div class="topic-wrapper"><h4> ' + content[i].question + '</h4><h5>' + content[i].answer + '</h5></div>';
            // document.getElementById("topics-div").appendChild(box);
            //
            // /* CREATE BUTTONS FOR TOPICS */
            // if (topics.includes((data.faqs[i]).topic)) {
            //     continue;
            // } else {
            //     var container = document.createElement('a');
            //     topics.push(data.faqs[i].topic);
            //     container.innerHTML = '<a href="#" data-filter=".' + data.faqs[i].topic.toLowerCase() + '" class="btn btn-custom btn-custom-two btn-sm">' + data.faqs[i].topic + '</a>';
            //     document.getElementById("listOfTopics").appendChild(container);
            // }

        }


    })
});
