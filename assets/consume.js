$(document).ready(function() {
    $.ajax({
        url: "http://community.dur.ac.uk/sara.h.chen/faq2016/topics.php"
    }).then(function(data) {
       var container = document.createElement('div');
       container.innerHTML = '<div class="col-sm-6 col-md-3 topic"><a href="#" class="thumbnail">' + data.topics.join('</a></div><div class="col-sm-6 col-md-3 topic"><a href="#" class="thumbnail">') + '</a></div>';
       document.body.appendChild(container);
    });
});
