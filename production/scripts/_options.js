(function($) {

    $('.options__handler').on('click', function () {
        $('html').toggleClass('filter-active');
        $('html').removeClass('search-visible-on-mobile'); /* Either filters or search */
    });

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
            $('html').removeClass('filter-active');
        }
    });


    /* Close by clicking outside ( goo.gl/SJG2Hw ) */

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.options').length) {
            $('html').removeClass('filter-active');
        }
    });

})(jQuery);
