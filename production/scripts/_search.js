(function($) {

    $('.search__show').on('click', function () {
        $('html').addClass('search-visible-on-mobile');
        $('html').removeClass('filter-active'); /* either filters or search */
        $('.search__input').focus();
    });

    $('.search__hide').on('click', function () {
        $('html').removeClass('search-visible-on-mobile');
    });


    /* Close search by Esc */

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
            $('html').removeClass('search-visible-on-mobile');
            $('html').removeClass('search-dropped-on-desktops');
        }
    });


    /* Close by clicking outside ( goo.gl/SJG2Hw ) */

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.search').length) {
            $('html').removeClass('search-visible-on-mobile');
            $('html').removeClass('search-dropped-on-desktops');
        }
    });



    $('.search__input').on('focus', function () {
        $('html').addClass('search-dropped-on-desktops');
    });

    $('.search__input').on('input', function () {
        if( $(this).val().length ) {
            $('.search').addClass('search--filled');
        } else {
            $('.search').removeClass('search--filled');
        }
    });



    /* On the main page: */

    $('.page-with-jumbotron .search__input').on('focus', function () {
        $('html').addClass('search-visible-on-mobile');
    });


    /* On the search page: */

    $('.search-page .search__input').on('focus', function () {
        $('html').addClass('search-visible-on-mobile');
    });



    /* Cleartype */

    $('.search__cleartype').on('click', function () {
        $('.search__input').val('');
    });


    /* Filters */

    $('.search__action').on('click', function () {
        if (!$(this).hasClass('search__action--current')) {
            $('.search__action--current').removeClass('search__action--current');
            $(this).addClass('search__action--current');
        }
    });


})(jQuery);
