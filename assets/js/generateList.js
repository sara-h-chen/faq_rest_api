/**
 * Created by jrvh15 on 26/12/16.
 */
$(document).ready(function() {

    /*================================
      GENERATE LIST TO POPULATE TABLE
     ===============================*/

    $.ajax({
        url:"topics.php",
        contentType: "application/json"
        /* UNCOMMENT FOR MIRA */
        // url: "http://community.dur.ac.uk/sara.h.chen/faq2016/topics.php"
    }).then(function(data) {
        var content = data.topics;

        /* ADDS TO DROPDOWN */
        $.each(content, function (i, item) {
            // console.log(item);
            $('#topicSelect').append($('<option>', {
                value: item,
                text : item
            }));
        });

        for (var i=0; i < content.length; i++) {
            var box = document.createElement('tr');
            box.innerHTML = '<td>' + content[i] + '</td><td class="delete-row"><a class="btn btn-danger" href="assets/delete.php?topic=' + content[i].toLowerCase() + '&auth_token=' + $.cookie("auth_token") +'"><span class="glyphicon glyphicon-remove"></span>Delete</a></td>';
            document.getElementById('tableOfTopics').appendChild(box);
        }
    });

    $.ajax({
        url: "assets/queryscript.php",
        contentType: "application/json"
        /* UNCOMMENT FOR MIRA */
        // url: "http://community.dur.ac.uk/sara.h.chen/faq2016/assets/queryscript.php"
    }).then(function(data) {
        var content = data.open_tickets;
        for (var i=0; i < content.length; i++) {
            // console.log(content[i]);
            var box = document.createElement('tr');
            box.innerHTML = '<td>' + content[i].question + '</td><td class="delete-row"><a class="btn btn-danger" href="assets/delete.php?id=' + content[i].id + '&auth_token=' + $.cookie("auth_token") + '"><span class="glyphicon glyphicon-remove"></span>Delete</a></td>';
            document.getElementById('open_tickets').appendChild(box);
        }
    });

});
