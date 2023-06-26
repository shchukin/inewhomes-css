(function($) {

    var total = 4;

    function controlsVisibility(target) {
        if (target === 0) {
            $('.slideshow__control--prev').prop('disabled', true).addClass('slideshow__control--disabled');
        } else {
            $('.slideshow__control--prev').prop('disabled', false).removeClass('slideshow__control--disabled');
        }

        if (target === total - 1) {
            $('.slideshow__control--next').prop('disabled', true).addClass('slideshow__control--disabled');
        } else {
            $('.slideshow__control--next').prop('disabled', false).removeClass('slideshow__control--disabled');
        }
    }

    function slideTo(target) {
        $('.slideshow__item--current').removeClass('slideshow__item--current');
        $('.slideshow__item:nth-child(' + (target + 1) + ')').addClass('slideshow__item--current');
        $('.slideshow__dot--current').removeClass('slideshow__dot--current');
        $('.slideshow__dot:nth-child(' + (target + 1) + ')').addClass('slideshow__dot--current');
        controlsVisibility(target);
    }

    function slideNext() {
        var current = $('.slideshow__item--current').index();
        slideTo( current < total - 1 ? current + 1 : 0 );
    }

    function slidePrev() {
        var current = $('.slideshow__item--current').index();
        slideTo( current > 0 ? current - 1 : total - 1 );
    }


    /* Navigation by time */

    var sliderInterval = setInterval(function () {
        slideNext();
    }, 5000);

    $('.slideshow').on('click', function () {
        clearInterval(sliderInterval);
    });


    /* Navigation by dots */

    $('.slideshow__dot').on('click', function () {
        slideTo( $(this).index() );
        clearInterval(sliderInterval);
    });


    /* Navigation by arrows */

    $('.slideshow__control--next').on('click', function () {
        slideNext();
        clearInterval(sliderInterval);
    });
    $('.slideshow__control--prev').on('click', function () {
        slidePrev();
        clearInterval(sliderInterval);
    });


    /* Navigation by swipes (Hammer library) */

    $('.slideshow:not(.slideshow--scroll-on-mobile)').each(function () {
        var mc = new Hammer( $(this)[0] );
        mc.on("swipeleft", function () {
            slideNext();
            clearInterval(sliderInterval);
        });
        mc.on("swiperight", function () {
            slidePrev();
            clearInterval(sliderInterval);
        });
    });


    /* Navigation by keyboard */

    $(document).on('keyup', function(event) {
        if(event.which === 39) {
            slideNext();
            clearInterval(sliderInterval);
        }
        if(event.which === 37) {
            slidePrev();
            clearInterval(sliderInterval);
        }
    });



    /* Init / disable slideshow */

    function initSlideshow() {
        if ( total > 1 ) {
            $('.slideshow').addClass('slideshow--initialized');
        }
    }

    /* Init on page load */
    $(document).ready(function () {
        initSlideshow();
    });




})(jQuery);
