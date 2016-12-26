/**
 * Created by jrvh15 on 26/12/16.
 */
$(document).ready(function() {

    /*================================
      GENERATE LIST TO POPULATE TABLE
     ===============================*/

    $.ajax({
       url: "/topics.php"
    }).then(function(data) {
        data = JSON.parse(data);
        var content = data.topics;
        // console.log(content);
        for (var i=0; i < data.topics.length; i++) {
            var box = document.createElement('tr');
            box.innerHTML = '<td>' + content[i] + '</td><td class="delete-row"><a href="#" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Delete</a></td>';
            document.getElementById('tableOfTopics').appendChild(box);
        }
    });

    $.ajax({
        url: "/assets/queryscript.php"
    }).then(function(data) {
        var content = data.open_tickets;
        console.log(content);
        for (var i=0; i <= data.topics.length; i++) {
            // console.log(content[i]);
            var box = document.createElement('tr');
            box.innerHTML = '<td>' + content[i] + '</td><td class="delete-row"><a href="#" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Delete</a></td>';
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