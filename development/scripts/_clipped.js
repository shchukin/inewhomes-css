(function($) {


    function resize($clipped) {
        if ( ! $clipped.hasClass('clipped--open') ) {
            $clipped.find('.clipped__viewport').css('height', $clipped.attr('data-canonical-height') );
        } else {
            $clipped.find('.clipped__viewport').css('height', $clipped.attr('data-actual-height') );
        }
    }


    function init() {
        $('.clipped').each(function () {

            var $clipped = $(this);
            var height = 0;
            var canonicalHeight = 0;

            /* Reset heights to their defaults before measuring */
            $clipped.addClass('clipped--measurement');

            /* Measure */
            height = $clipped.find('.clipped__content').outerHeight();
            canonicalHeight = parseInt( $clipped.attr('data-canonical-height') );
            $clipped.attr('data-actual-height', height);

            /* Back to what it was before measurement */
            $clipped.removeClass('clipped--measurement');

            /* Do we need to run the whole thing? */
            if( height > canonicalHeight ) {
                $clipped.addClass('clipped--expandable');

                /* Set heights */
                resize($clipped);

            } else {
                $clipped.removeClass('clipped--expandable');
                $clipped.find('.clipped__viewport').css('height', '' );
            }
        });
    }


    $(window).on('resize', init);
    $(window).on('load', init);

    $('.clipped__handler').on('click', function () {
        var $clipped = $(this).parents('.clipped');
        $clipped.toggleClass('clipped--open');
        resize($clipped);
    });

})(jQuery);
