(function ($) {

    const complexRating = $(".complex__rating");

    complexRating.rateYo({
        starWidth: '25px',
        numStars: 5,
        maxValue: 5,
        fullStar: true
    }).on("rateyo.set", function (e, data) {
        complexRating.rateYo("option", "readOnly", true)
    });



    const companyRating = $(".company__rating");

    companyRating.rateYo({
        starWidth: '25px',
        numStars: 5,
        maxValue: 5,
        fullStar: true
    }).on("rateyo.set", function (e, data) {
        companyRating.rateYo("option", "readOnly", true)
    });

})(jQuery);
