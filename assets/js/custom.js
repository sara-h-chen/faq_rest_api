$(document).ready(function () {

    /*====================================
     CUSTOM SCRIPTS
     ======================================*/

    $('#form-button').click(function () {
        var forSubmission = $('#questiontext');
        var serialized = forSubmission.serialize();
        var formURL = $('#question').attr("action");
        $.ajax({
            url: formURL,
            type: "POST",
            data: serialized,
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
    });


});
