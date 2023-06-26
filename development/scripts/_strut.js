(function($) {

    $('.strut__action').on('click', function (event) {
        event.preventDefault();
        $(this).parents('.strut').addClass('strut--loading-in-progress');

        var timeout = setTimeout(function () {
            $('.strut--loading-in-progress').removeClass('strut--loading-in-progress');
            clearTimeout(timeout);
        }, 3000);
    });

})(jQuery);
