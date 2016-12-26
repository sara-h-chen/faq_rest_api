/**
 * Created by jrvh15 on 26/12/16.
 */
$(document).ready(function() {

    /*================================
      GENERATE LIST TO POPULATE TABLE
     ===============================*/

    $.ajax({
       url: "http://community.dur.ac.uk/sara.h.chen/faq2016/topics.php"
    }).then(function(data) {
        var content = data.topics;
        // console.log(content);
        for (var i=0; i < data.topics.length; i++) {
            var box = document.createElement('tr');
            box.innerHTML = '<td>' + content[i] + '</td>';
            document.getElementById('tableOfTopics').appendChild(box);
        }
    });

    /*================================
      SUBMIT TOPIC TO DATABASE
      ==============================*/

    $('#add').click(function(event) {
        var toProcess = $('input[name=topicSpcfd]').val();
        var formURL = $('#addTopic').attr("action");
        var forSubmission = {
            'topic': toProcess
        };

        $.ajax({
            url: formURL,
            type: "POST",
            data: forSubmission.serialize(),
            success: function (textStatus, jqXHR) {
                console.log("passed");
                $('[data-remodal-id=SuccessModal]').remodal().open();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("failed");
                console.log(textStatus + ": " + errorThrown);
                $('[data-remodal-id=FailedModal]').remodal().open();
            }
        });


    })

});