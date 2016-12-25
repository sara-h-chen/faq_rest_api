$(document).ready(function () {

    /*====================================
     SCROLLING SCRIPTS
     ======================================*/

    $('.scroll-me a').bind('click', function (event) { //just pass scroll-me in design and start scrolling
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1200, 'easeInOutExpo');
        event.preventDefault();
    });



    /*====================================
     CUSTOM SCRIPTS
     ======================================*/

    $('#form-button').click(function () {
        // console.log("printed");
        var forSubmission = $('#questiontext');
        var serialized = forSubmission.serialize();
        // console.log(serialized);
        var formURL = $('#question').attr("action");
        // console.log(formURL);
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
                console.log(textStatus + errorThrown);
                $('[data-remodal-id=FailedModal]').remodal().open();
            }
        });
    });

});
