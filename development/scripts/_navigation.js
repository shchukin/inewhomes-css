(function ($) {

    $('.navigation__toggle').on('click', function () {
        $('html').toggleClass('navigation-expanded');
    });

    $('.navigation__overlay').on('click', function () {
        $('html').removeClass('navigation-expanded');
    });

    $(document).on('keyup', function (event) {
        if (event.keyCode === 27) {
            $('html').removeClass('navigation-expanded');
            $('.navigation__parent').removeClass('navigation__parent-active');
        }
    });


    /* Dropdowns */
    $('.navigation__show-submenu').on('click', function () {
        $(this).parents('.navigation__item').toggleClass('navigation__item--expanded');
    });

})(jQuery);
