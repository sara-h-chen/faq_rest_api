$(document).ready(function () {

    /*====================================
     CUSTOM SCRIPTS
     ======================================*/

    $('#form-button').click(function () {
        console.log('haha');
        blob = {};
        $('#questiontext').serializeArray().map(function(x){blob[x.name] = x.value;});
        $('#questiontext').val("");
        $.ajax({
            type     : "POST",
            cache    : false,
            contentType: "application/json",
            url: $('#question').attr("action"),
            data: JSON.stringify(blob),
            dataType: "json",
            success: function (data) {
                console.log("passed");
                console.log(data);
                $('[data-remodal-id=SuccessModal]').remodal().open();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("failed");
                console.log(textStatus + ": " + errorThrown);
                $('[data-remodal-id=FailedModal]').remodal().open();
            }
        });
    });

    $("#questiontext").keypress(function (e) {
        if(e.which == 13) {
            e.preventDefault();
            $("#form-button")[0].click();
        }
    });


});
