(function($) {

    /* Scroll carousel by click on controls */

    $(document).ready(function () {

        $('.carousel__control').on('click', function () {

            var $carousel = $(this).parents('.carousel');

            if( ! $carousel.hasClass('carousel--being-scrolled-by-arrow') ) {

                var $scrollContainer = $carousel.find('.carousel__container');
                var scrolled = $scrollContainer.scrollLeft();
                var toScroll = Math.ceil($carousel.data('step') * ( $carousel.find('.carousel__item:first-child()').outerWidth() + parseInt( $carousel.find('.carousel__item:first-child()').css('margin-right'), 10) ) );
                var scrollCoordinate = 0;

                scrollCoordinate = $(this).hasClass('carousel__control--next') ? scrolled + toScroll : scrolled - toScroll;

                $carousel.addClass('carousel--being-scrolled-by-arrow');

                $scrollContainer.animate({
                    scrollLeft: scrollCoordinate
                }, 500, function () {
                    arrowsVisibility($scrollContainer);
                    $carousel.removeClass('carousel--being-scrolled-by-arrow');
                });
            }
        });

    });



    /* Show / hide arrows */

    function arrowsVisibility($carouselContainer) {

        /* Prev */
        if( $carouselContainer.scrollLeft() === 0) {
            $carouselContainer.siblings('.carousel__control--prev').prop('disabled', true).addClass('carousel__control--disabled');
        } else {
            $carouselContainer.siblings('.carousel__control--prev').prop('disabled', false).removeClass('carousel__control--disabled');
        }

        /* Next */
        var RibbonWidth = 0;

        $carouselContainer.find('.carousel__item').each(function () {
            RibbonWidth += $(this).outerWidth() + parseInt( $(this).css('margin-right'), 10 );
        });

        if( $carouselContainer.scrollLeft() >= Math.ceil(RibbonWidth - $carouselContainer.outerWidth() ) - 1 ) {
            $carouselContainer.siblings('.carousel__control--next').prop('disabled', true).addClass('carousel__control--disabled');
        } else {
            $carouselContainer.siblings('.carousel__control--next').prop('disabled', false).removeClass('carousel__control--disabled');
        }
    }

    /* Disable arrows on scroll */
    $(document).ready(function () {

        $('.carousel__container').on('scroll', function () {
            arrowsVisibility( $(this) );
        });
    });

    /* Disable arrows on page resize */
    $(window).on('resize', function () {
        $('.carousel__container').each(function () {
            arrowsVisibility( $(this) );
        })
    });

    /* Disable arrows on page load */
    $(document).ready(function () {
        $('.carousel__container').each(function () {
            arrowsVisibility( $(this) );
        })
    });



    /* Init / disable carousel */

    function initCarousel($carousel) {

        var RibbonWidth = 0;

        $carousel.find('.carousel__item').each(function () {
            RibbonWidth += $(this).outerWidth();
        });

        if ( $carousel.find('.carousel__container').outerWidth() < RibbonWidth ) {
            $carousel.addClass('carousel--initialized');
        } else {
            $carousel.removeClass('carousel--initialized');
        }
    }

    /* Init on resize */
    $(window).on('resize', function () {
        $('.carousel').each(function () {
            initCarousel( $(this) );
        })
    });

    /* Init on page load */
    $(document).ready(function () {
        $('.carousel').each(function () {
            initCarousel( $(this) );
        })
    });

})(jQuery);
