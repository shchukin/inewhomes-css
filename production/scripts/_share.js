(function($) {
    $(function() {

        var $share = $('.share');
        var $shareHandler = $('.share__handler');

        function shareTopEdge() {

            /* Check indentation from above */
            var offsetTop = $shareHandler.offset().top - $(window).scrollTop();

            if( offsetTop < 80) {
                $share.addClass('share--to-bottom');
            } else {
                $share.removeClass('share--to-bottom');
            }
        }


        if( $share.length ) {

            $shareHandler.on('click', function (event) {
                event.preventDefault();
                if( ! $share.hasClass('share--visible')) {
                    $share.toggleClass('share--visible');
                    shareTopEdge();
                } else {
                    $share.removeClass('share--visible');
                }
            });

            $(window).on('resize', shareTopEdge);
            $(window).on('scroll', shareTopEdge);
            $(document).ready(shareTopEdge);
        }


        /* Close by Esc */

        $(document).on('keyup', function(event) {
            if (event.keyCode === 27) {
                $share.removeClass('share--visible');
            }
        });


        /* Close by clicking outside ( goo.gl/SJG2Hw ) */

        $(document).on('click touchend', function(event) {
            if (!$(event.target).closest($share).length) {
                $share.removeClass('share--visible');
            }
        });

    });
})(jQuery);

