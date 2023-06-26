(function($) {

    var coordinates = [];
    var currentSection = {};
    var $menuLinks = $('.menu__link.anchor');

    function init() {

        coordinates.length = 0; /* if re-init */

        $($menuLinks).each(function () {
            currentSection = {};
            currentSection.anchor = $(this);
            currentSection.target = $( $(this).attr('href') );
            currentSection.start = Math.trunc(currentSection.target.offset().top) - ( $(this).attr('data-anchor-gap') ? + $(this).attr('data-anchor-gap') : 0 );
            coordinates.push(currentSection);
        });

        for( var i = 0 ; i < coordinates.length - 1 ; i++ ) {
            coordinates[i].end = coordinates[i+1].start - 1;
        }
        coordinates[coordinates.length - 1].end = currentSection.target.offset().top + currentSection.target.outerHeight();
    }


    function menuCurrent() {
        var scrolled = $(window).scrollTop();
        for( var i = 0 ; i < coordinates.length ; i++ ) {
            if( scrolled >= coordinates[i].start && scrolled < coordinates[i].end ) {
                $('.menu__link--current').removeClass('menu__link--current');
                coordinates[i].anchor.addClass('menu__link--current');
                return;
            } else {
                $('.menu__link--current').removeClass('menu__link--current');
            }
        }
    }

    if ($menuLinks.length) {
        $(window).on('load',init);
        $(window).on('scroll', init);

        $(window).on('load',menuCurrent);
        $(window).on('scroll', menuCurrent);
    }

})(jQuery);
