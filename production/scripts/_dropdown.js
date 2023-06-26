(function($) {

    /* if dropdown is too close to the right edge then shift it */
    function checkOffset($dropdown) {
        $menu = $dropdown.children('.dropdown__menu');
        $menu.css('margin-left', 0); /* reset for measurements */
        var offset = $(window).width() - ($menu.offset().left + $menu.outerWidth());
        if (offset < 20) {
            $menu.css('margin-left', (offset - 20) + 'px');
        } else {
            $menu.css('margin-left', 0);
        }
    }

    $('.dropdown__handler').on('click', function () {

        $dropdown = $(this).parent('.dropdown');

        /* If dropdown is not opened yet */
        if( ! $dropdown.hasClass('dropdown--expanded') ) {

            /* Close the rest of them */
            $('.dropdown--expanded').removeClass('dropdown--expanded');

            /* Open this one */
            $dropdown.addClass('dropdown--expanded');

            checkOffset($dropdown);
        }

        /* Otherwise, we clicked already opened one */
        else {
            /* close it */
            $dropdown.removeClass('dropdown--expanded');
        }
    });


    $(window).on('resize', function () {
        $('.dropdown--expanded').each(function () {
            checkOffset($(this));
        });
    });


    /* Close by Esc */

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
            $('.dropdown--expanded').removeClass('dropdown--expanded');
        }
    });


    /* Close by clicking outside ( goo.gl/SJG2Hw ) */

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.dropdown').length) {
            $('.dropdown--expanded').removeClass('dropdown--expanded');
        }
    });


})(jQuery);
