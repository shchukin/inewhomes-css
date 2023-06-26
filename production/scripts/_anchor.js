(function($) {

    var scrollSpeedPer100ms = 400; /* 400px per 100ms */

    $('.anchor').on('click', function (event) {
        event.preventDefault();

        var $target = $( $(this).attr('href') );
        var scrollDistance = $target.offset().top - $(this).offset().top;
        var animationDuration = Math.max(Math.abs(scrollDistance) / scrollSpeedPer100ms * 100, 300); /* but not less than 300ms so on short distances animation is not too fast */
        var scrollGap = $(this).attr('data-anchor-gap') ? +$(this).attr('data-anchor-gap') : 0;
        var scrollCoordinate = $target.offset().top


        /* Header can be fixed in two cases:
         * • on smartphones and if there is NO .static-head
         * • on desktops and if there is .fixed-head
         * In this case, the scrollCoordinate needs to be reduced by the height of $('.header__panel').outerHeight()
         * Read more about .static-head and .fixed-head here: https://www.notion.so/969306d1b50e4182b9bcc2aaa4480afc */
        if(($(window).width() < 1200 && ! $('html').hasClass('static-head')) ||
           ($(window).width() >= 1200 && $('html').hasClass('fixed-head'))) {
            scrollCoordinate = scrollCoordinate - $('.header__panel').outerHeight();
        }

        if( $target.length ) {
            $('html, body').animate({
                scrollTop: Math.ceil(scrollCoordinate - scrollGap)
            }, animationDuration);
        }
    });

})(jQuery);
