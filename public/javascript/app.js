$(document).ready(function() {
    $("#slides").slides({
        start: 2,
        play: 5000,
        pause: 2500,
        pagination: false,
        generatePagination: false
    });

    $(".fancybox").fancybox({
        autoSize: false,
        height: 350,
        arrows: false,
        padding: 5
    });
});
