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
           box.innerHTML = '<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 ' + content[i].topic.toLowerCase() + '"><div class="topic-wrapper"><h4> ' + content[i].question + '</h4><h5>'+ content[i].answer + '</h5></div></div>';
           //console.log(box.innerHTML);
           document.getElementById("topics-div").appendChild(box);
           // .isotope('insert', box);

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


    });
});
