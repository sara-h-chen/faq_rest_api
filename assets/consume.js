$(document).ready(function() {
    $.ajax({
        url: "http://community.dur.ac.uk/sara.h.chen/faq2016/faqs.php"
    }).then(function(data) {
        /** CREATE ID FOR FILTERING TOPICS **/
        var topics = [];
        /* <a href="#" data-filter=".priv" class="btn btn-custom btn-custom-two btn-sm">Privacy and Surveillance</a> */
       console.log(data.faqs);
       for (var i=0; i <= data.faqs.length; i++) {
           if (topics.includes((data.faqs[i]).topic)) {
               continue;
           } else {
               var container = document.createElement('a');
               //console.log("pushed");
               topics.push(data.faqs[i].topic);
               container.innerHTML = '<a href="#" data-filter=".' + data.faqs[i].topic.toLowerCase() + '" class="btn btn-custom btn-custom-two btn-sm">' + data.faqs[i].topic + '</a>';
               document.getElementById("listOfTopics").appendChild(container);
           };
       }
       // topics now contains the array of topics
        // var container = document.createElement('div');
       // container.innerHTML = '<div class="col-sm-6 col-md-3 topic" onclick="disappearing()"><a class="thumbnail">' + data.topics.join('</a></div><div class="col-sm-6 col-md-3 topic" onclick="disappearing()"><a class="thumbnail">') + '</a></div>';
       // document.getElementById("topicList").appendChild(container);
    });
});
