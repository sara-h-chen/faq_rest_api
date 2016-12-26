/**
 * Created by jrvh15 on 26/12/16.
 */
$(document).ready(function() {
    $.ajax({
        url: "/assets/queryscript.php"
    }).then(function (data) {
        /* FILL SUMMARY ON DASHBOARD */
        var box1 = document.createElement('h3');
        box1.innerHTML = data.tickets;
        document.getElementById("t_pending").appendChild(box1);

        var box2 = document.createElement('h3');
        box2.innerHTML = data.topics;
        document.getElementById("topicNo").appendChild(box2);

        var box3 = document.createElement('h3');
        box3.innerHTML = data.questions;
        document.getElementById("listed_q").appendChild(box3);

        var box4 = document.createElement('h3');
        box4.innerHTML = data.answers;
        document.getElementById("listed_a").appendChild(box4);

    })
});
