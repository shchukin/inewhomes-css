(function($) {

    $('.faq__link').on('click', function (event) {
        event.preventDefault();
        $(this).parents('.faq__item').toggleClass('faq__item--expanded');
    });

})(jQuery);
