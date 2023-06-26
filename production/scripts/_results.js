(function($) {

    $('.results__handler').on('click', function () {
        $('html').toggleClass('map-active')
    });

    // $('.switch, .filter').on('click', function () {
    //     $('.results__loading').addClass('results__loading--active');

    //     setTimeout(function () {
    //         $('.results__loading').removeClass('results__loading--active');
    //     }, 1000 );
    // });

})(jQuery);
