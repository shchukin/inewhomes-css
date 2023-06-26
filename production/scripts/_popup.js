/*
 * Page lock
 */


function lockPage() {

    var documentWidthWithScroll = 0;
    var documentWidthWithoutScroll = 0;
    var scrollWidth = 0;

    var $html = $('html');

    if ( ! $html.hasClass('scroll-lock') ) {
        documentWidthWithScroll = $(window).width();
        $html.addClass('scroll-lock');
        documentWidthWithoutScroll = $(window).width();
        $html.css( 'padding-right', (documentWidthWithoutScroll - documentWidthWithScroll) + 'px' );
    }
}

function unlockPage() {

    var $html = $('html');

    if ( $html.hasClass('scroll-lock') ) {
        $html.css( 'padding-right', '' );
        $html.removeClass('scroll-lock');
    }
}


/*
 * Popup
 */

function popupShow(popup){
    lockPage();
    popup.fadeIn(200);
    popup.scrollTop(0);
}

function popupHide(popup){
    if( ! popup ) {                //in case of Esc or something
        popup = $('.popup');
    }

    popup.fadeOut(200, function(){  //hide popup THEN unlock page
        unlockPage();
    });
}

(function($) {

    /* show popup by handler click */

    $('[data-popup]').on('click', function(event){
        event.preventDefault();
        popupShow( $($(this).data('popup')) );
    });


    /* hide popup by window close click */

    $('.popup__close').on('click', function(event){
        event.preventDefault();
        popupHide( $(this).parents('.popup') );
    });


    /* hide popup by overlay click ( goo.gl/SJG2Hw ) */

    $('.popup').on('click', function(event) {
        if (!$(event.target).closest('.popup__slot').length) {
            popupHide( $('.popup') );
        }
    });


    /* hide popup by Esc press */

    $(document).on('keyup', function(event) {
        if (event.keyCode == 27) {
            popupHide();
        }
    });

})(jQuery);
