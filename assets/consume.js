$(document).ready(function() {
    $.ajax({
        url: "http://community.dur.ac.uk/sara.h.chen/faq2016/topics.php"
    }).then(function(data) {
       var container = document.createElement('div');
       container.innerHTML = '<div>' + data.topics.join('</div><div>') + '</div>';
       document.body.appendChild(container);
    });
});
