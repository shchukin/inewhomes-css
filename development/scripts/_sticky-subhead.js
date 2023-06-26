(function($) {

    /* Based on:
     * https://stackoverflow.com/questions/16302483/event-to-detect-when-positionsticky-is-triggered/57991537#57991537
     */

    var $stickySubhead = $('.sticky-subhead');

    if($stickySubhead.length) {
        const observer = new IntersectionObserver(
            ([e]) => e.target.classList.toggle('sticky-subhead--sticked', e.intersectionRatio < 1),
            {threshold: [1]}
        );
        observer.observe($stickySubhead[0])
    }

})(jQuery);
