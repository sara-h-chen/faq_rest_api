/**
 * MAKE AJAX SUBMISSION
 */
$("#question").submit(function (e) {
    var postData = $(this).serialize();
    console.log(postData);
    var formURL = $(this).attr("action");
    var inst = $('[data-remodal-id=modal]').remodal();
    $.ajax({
        url: formURL,
        type: "POST",
        data: postData,
        success: function (data, textStatus, jqXHR) {
            $('#ResponseModal').innerHTML = '<p> ' + data + ': ' + textStatus + ' </p>';
            inst.open();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#ResponseModal').innerHTML = '<h4> ' + data + ': ' + textStatus + ' </h4>';
            inst.open();
        }
    });
    $(document).on('closing', '.remodal', function() {
        inst.destroy();
    });
    e.preventDefault();
    e.unbind(); // Unbinding stops multiple form submissions
});

$("#question").submit();