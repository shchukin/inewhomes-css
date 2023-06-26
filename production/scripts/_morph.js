(function($) {

    $('.morph').each(function () {

        var stateMaxWidth = 0;

        var $morphWidget = $(this);
        var morphWidgetWidth = 0;

        var $morphPlaygroundSelect = $morphWidget.clone().appendTo("body");
        var $morphPlaygroundDiv = $('<div class="' + $morphWidget.attr("class") + '">' + $("option:selected", $morphWidget).text() + '</div>').appendTo('body');

        $morphPlaygroundSelect.removeClass('morph').addClass('hidden-behind morph-clone').attr("aria-hidden","true");
        $morphPlaygroundDiv.removeClass('morph').addClass('hidden-behind morph-clone').attr("aria-hidden","true");

        function measureStateMaxWidth() {
            stateMaxWidth = ( $('.search').outerWidth() - $('.jumbotron__search-menu').outerWidth() - 20 );
            updateMorphWidth();
        }

        function setPlayground() {
            var selectedValue = $("option:selected", $morphWidget).text();
            $morphPlaygroundDiv.html(selectedValue);
            $('option', $morphPlaygroundSelect).text(selectedValue);
        }

        function updateMorphWidth() {
            if (Modernizr.appearance) {
                morphWidgetWidth = Math.ceil($morphPlaygroundDiv.outerWidth()) + 9;
            } else {
                morphWidgetWidth = Math.ceil($morphPlaygroundSelect.outerWidth());
            }

            if( $morphWidget.hasClass('search__state') ) {
                morphWidgetWidth = Math.min(morphWidgetWidth, stateMaxWidth);
            }

            $morphWidget.css('width', morphWidgetWidth);

            /* Inside of search: */
            if ($morphWidget.hasClass('search__state') ) {
                var searchStateRight = parseInt($('.search__state').css('right'), 10);
                $morphWidget.siblings('.search__input').css('border-right', (morphWidgetWidth + searchStateRight + 'px solid transparent'));
                $morphWidget.siblings('.search__cleartype').css('right', (morphWidgetWidth + searchStateRight + 'px'));
            }
        }


        $morphWidget.on('change', function() {
            setPlayground();
            updateMorphWidth();
        });

        $(window).on('resize', measureStateMaxWidth)

        $(window).on('load', measureStateMaxWidth)
        $(window).on('load', setPlayground)
        $(window).on('load', updateMorphWidth)

    });


})(jQuery);
