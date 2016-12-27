/**
 * Created by jrvh15 on 26/12/16.
 */
$(document).ready(function() {

    /*================================
      GENERATE LIST TO POPULATE TABLE
     ===============================*/

    $.ajax({
       url:"topics.php"
        /* UNCOMMENT FOR MIRA */
        // url: "http://community.dur.ac.uk/sara.h.chen/faq2016/topics.php"
    }).then(function(data) {
        data = JSON.parse(data);
        var content = data.topics;
        // console.log(content);

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
            box.innerHTML = '<td>' + content[i] + '</td><td class="delete-row"><a class="btn btn-danger" href="assets/delete.php?topic=' + content[i].toLowerCase() + '"><span class="glyphicon glyphicon-remove"></span>Delete</a></td>';
            document.getElementById('tableOfTopics').appendChild(box);
        }
    });

    $.ajax({
        url: "assets/queryscript.php"
        /* UNCOMMENT FOR MIRA */
        // url: "http://community.dur.ac.uk/sara.h.chen/faq2016/assets/queryscript.php"
    }).then(function(data) {
        var content = data.open_tickets;
        console.log(content);
        for (var i=0; i < content.length; i++) {
            // console.log(content[i]);
            var box = document.createElement('tr');
            box.innerHTML = '<td>' + content[i] + '</td><td class="delete-row"><a class="btn btn-danger" href="assets/delete.php?id=' + (i+1) + '"><span class="glyphicon glyphicon-remove"></span>Delete</a></td>';
            document.getElementById('open_tickets').appendChild(box);
        }
    });

    /*================================
      SUBMIT TOPIC TO DATABASE
      ==============================*/

    $('#addTopic').on('submit',function(e){
        e.preventDefault();
        // a = $(this).serialize();
        blob = {};
        $(this).serializeArray().map(function(x){blob[x.name] = x.value;});
        console.log(blob);
        $.ajax({
            type     : "POST",
            cache    : false,
            url      : $(this).attr('action'),
            data     : blob,
            success  : function(data) {
                console.log("passed");
                console.log(data);
                $('[data-remodal-id=SuccessModal]').remodal().open();
            },
            error    : function(jqXHR, textStatus, errorThrown) {
                console.log("failed");
                console.log(textStatus + ": " + errorThrown);
                $('[data-remodal-id=FailedModal]').remodal().open();
            }
        });
    });

});
