(function($) {
  $(document).ready(function() {

    //
    // Flickity Complex Carousel
    //
    var $complexCarousel = $('.complex__gallery');

    $complexCarousel.on('staticClick.flickity', function(event, pointer, cellElement, cellIndex) {
      // dismiss if cell was not clicked
      if (!cellElement) {
        return;
      }
      // open fancybox gallery
      openFancyboxGallery($(cellElement).find('.fancybox-item'));
    });

    $complexCarousel.flickity({
      imagesLoaded: true,
      wrapAround: true,
      cellAlign: 'left',
      draggable: true,
      setGallerySize: false,
      contain: true,
      pageDots: false,
      cellSelector: '.gallery__cell',
      lazyLoad: function () {
        var width = $(document).innerWidth();

        if (width <= 425) {
          return 3;
        }

        return 5;
      }()
    });

    //
    // Flickity Unit Carousel
    //
    var $unitCarousel = $('.unit__gallery');

    $unitCarousel.on('staticClick.flickity', function(event, pointer, cellElement, cellIndex) {
      // dismiss if cell was not clicked
      if (!cellElement) {
        return;
      }
      // open fancybox gallery
      openFancyboxGallery($(cellElement).find('.fancybox-item'));
    });

    $unitCarousel.flickity({
      imagesLoaded: true,
      wrapAround: true,
      draggable: true,
      setGallerySize: false,
      contain: true,
      pageDots: false,
      cellSelector: '.gallery__cell',
      lazyLoad: 1
    });


    //
    // Fancybox popup gallery
    //

    // sort array of objects by a property
    var sortObjectsBy = function(field, reverse, primer) {
      var key = primer ? function(x) {
        return primer(x[field])
      } : function(x) {
        return x[field]
      };
      reverse = !reverse ? 1 : -1;
      return function(a, b) {
        return a = key(a),
          b = key(b),
          reverse * ((a > b) - (b > a));
      }
    }

    $('.fancybox-trigger').on('click', function(event) {
      event.preventDefault();
      openFancyboxGallery($(this));
    });

    // Custom click handler
    var openFancyboxGallery = function(clickedElement) {

      var fancyElements = [];

      // create array of fancyBox objects
      $('.fancybox-item').each(function(index) {
        var src = $(this).data('src'),
          order = $(this).data('order'),
          type = $(this).data('type'),
          caption = $(this).data('caption'),
          thumb = $(this).data('thumb');

        fancyElements.push({
          src: type === 'html' ? $(this).prop('outerHTML') : src,
          type: type === 'video' ? '' : type,
          order: order,
          opts: {
            caption: caption,
            thumb: thumb
          }
        });
      });

      // sort the fancybox array of objects by the "order" property
      fancyElements.sort(sortObjectsBy("order", false, function(a) {
        return a;
      }));

      // launch fancybox programmatically
      $.fancybox.open(
        fancyElements, {
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
          clickContent: function(current, event) {
            return false;
          },
        },
        clickedElement.data('order') - 1 // start gallery from the clicked element
      );

    };

  });
})(jQuery);
