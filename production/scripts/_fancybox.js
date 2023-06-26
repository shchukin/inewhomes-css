(function($) {

    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            'download',
            'close',
        ],
        wheel: false,
        animationEffect: "fade",
        loop: true,
        thumbs: {
            autoStart: true,
            axis: "x"
        },
    });

})(jQuery);