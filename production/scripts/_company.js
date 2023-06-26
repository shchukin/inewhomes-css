(function($) {

    var $company = $('.company');
    var $companySidebar = $('.company__sidebar');

    if ($company) {
        $company.css('min-height', $companySidebar.outerHeight() + parseInt($companySidebar.css('top'), 10) );
    }

})(jQuery);
