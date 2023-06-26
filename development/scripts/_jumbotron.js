(function($) {

    var jumbotronHeight = 0;
    var headerHeight = 0;

    function init() {
        headerHeight = $('.header').outerHeight();
        jumbotronHeight = $('.jumbotron').outerHeight() - headerHeight;
    }

    $(window).on('resize', init)
    $(document).ready(init)


    /* If scrolled till the bottom of the screen, then add .bottom class on the <html> */
    function scrolled() {
        if (document.documentElement.scrollTop > jumbotronHeight + headerHeight / 2 )
        {
            $('html').addClass('jumbotron-scrolled');
        } else {
            $('html').removeClass('jumbotron-scrolled');
        }
    }

    $(window).on('scroll', scrolled)
    $(window).on('load', scrolled)


    /* Buy / rent toggler */

    $('.jumbotron__search-tab').on('click', function () {
        if ( ! $(this).hasClass('jumbotron__search-tab--current') ) {
            $('.jumbotron__search-tab--current').removeClass('jumbotron__search-tab--current');
            $(this).addClass('jumbotron__search-tab--current');
        }
    });


})(jQuery);
