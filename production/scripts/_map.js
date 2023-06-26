//
// Add demo data
//
var response = [{
    id: 1,
    type: 'Point',
    options: {
        lat: 25.94819,
        lng: -80.119917,
        title: 'Porsche Design Tower',
        address: '18555 Collins Ave, Sunny Isles Beach, FL 33160',
        pageUrl: 'complex.html?id=1',
        imageUrl: '../temp/venue-a.jpg',
        type: 'Condo, Townhouse',
        minPrice: '',
        maxPrice: '',
    }
}, {
    id: 2,
    type: 'Point',
    options: {
        lat: 25.934926,
        lng: -80.120972,
        title: 'Muse',
        address: '17141 Collins Ave, Sunny Isles Beach, FL 33160',
        pageUrl: 'complex.html?id=2',
        imageUrl: '../temp/venue-b.jpg',
        type: 'Condo',
        minPrice: '$3,900,000',
        maxPrice: '$6,900,000',
    }
}, {
    id: 3,
    type: 'Point',
    options: {
        lat: 25.947787,
        lng: -80.12022,
        title: 'Turnberry Ocean Club',
        address: '18501 Collins Ave, Sunny Isles Beach, FL 33160',
        pageUrl: 'complex.html?id=3',
        imageUrl: '../temp/venue-c.jpg',
        type: 'Condo',
        minPrice: '',
        maxPrice: '',
    }
}, {
    id: 4,
    type: 'Cluster',
    options: {
        count: 4,
        center: {
            lat: 25.779310275,
            lng: -80.194154575,
        },
        bounds: '{"type":"Polygon","coordinates":[[[-80.1914095,25.765344],[-80.2012582,25.766834],[-80.1886835,25.8019169],[-80.1914095,25.765344]]]}',
    }
}, {
    id: 5,
    type: 'Cluster',
    options: {
        count: 26,
        center: {
            lat: 25.9300515653846,
            lng: -80.1330693269231,
        },
        bounds: '{"type":"Polygon","coordinates":[[[-80.1210381,25.8439538],[-80.1877245,25.9681236],[-80.1194131,25.9788829],[-80.1210381,25.8439538]]]}',
    }
}, {
    id: 6,
    type: 'Cluster',
    options: {
        count: 241,
        center: {
            lat: 25.814727063097408,
            lng: -80.13015747070312,
        },
        bounds: '{"type":"Polygon","coordinates":[[[-80.12981414794922,25.843466294408156],[-80.13015747070312,25.829870108435024],[-80.14801025390625,25.802363957922285],[-80.1339340209961,25.76650366026014],[-80.12397766113281,25.809163825418665],[-80.11985778808594,25.842539331357372],[-80.12981414794922,25.843466294408156]]]}',
    }
}];

var polygon = [
    [25.39614171131381, -79.71817016601564],
    [26.300802009052884, -79.71817016601564],
    [26.300802009052884, -80.63003540039064],
    [25.39614171131381, -80.63003540039064],
];


//
// Add draggable visual blur fix
//
L.Draggable.include({
    _updatePosition() {
        var e = {
            originalEvent: this._lastEvent
        };

        // @event predrag: Event
        // Fired continuously during dragging *before* each corresponding
        // update of the element's position.
        this.fire("predrag", e);
        L.DomUtil.setPosition(
            this._element,
            !L.Browser.retina ? this._newPos.round() : this._newPos
        );

        // @event drag: Event
        // Fired continuously during dragging.
        this.fire("drag", e);
    }
});


//
// Functions
//
function initMap() {

    mapOptions = {
        zoomControl: false,
        attributionControl: false,
        minZoom: 7,
        maxZoom: 20,
    };

    if (L.DomUtil.get('map').innerHTML === '') {
        map = L.map("map", mapOptions).setView([25.849336891707605, -80.17410278320314], 9)
            .on('zoomend moveend', function() {
                sendSearchRequest();
            });

        // init custom zoom
        initZoom();

        L.gridLayer.googleMutant({
            type: 'roadmap',
            styles: [{}]
        }).addTo(map);

        sendSearchRequest();

        if (!markers) {
            markers = L.featureGroup();
            map.addLayer(markers);
        }

        var listingType = getListingType();

        drawPolygon(polygon);

        drawMarkers(response, listingType);

        watchListingType();
        watchFilters();
    }
};

function initZoom() {
    var zoomIn = document.getElementsByClassName('zoom__action--plus')[0];
    var zoomOut = document.getElementsByClassName('zoom__action--minus')[0];

    // zoom in function
    zoomIn.addEventListener('click', function(){
        if(!zoomIn.hasAttribute('disabled')) {
            map.setZoom(map.getZoom() + 1);
        }
    });

    // zoom out function
    zoomOut.addEventListener('click', function(){
        if(!zoomOut.hasAttribute('disabled')) {
            map.setZoom(map.getZoom() - 1);
        }
    });

    // control zoom disabled state
    map.on('zoomend', function() {
        updateZoomDisabled(zoomIn, zoomOut);
    });

    updateZoomDisabled(zoomIn, zoomOut);
}

function updateZoomDisabled(zoomIn, zoomOut) {
    if(map.getZoom() <= map.getMinZoom()) {
        zoomOut.setAttribute('disabled', '');
    } else {
        zoomOut.removeAttribute('disabled');
    }

    if(map.getZoom() >= map.getMaxZoom()) {
        zoomIn.setAttribute('disabled', '');
    } else {
        zoomIn.removeAttribute('disabled');
    }
}

function isLoading(state = false) {
    showTopLoading(state);
    showMapLoading(state);
    showResultsPlaceholder(state);
    showFiltersLoading(state);
}

function showTopLoading(show = false) {
    var loading = document.getElementsByClassName('loading')[0];

    if (show === true) {
        if (window.timeout) {
            clearTimeout(window.timeout);
        }
        window.timeout = setInterval(function() {
            currentWidth = 0;
            currentWidth = parseInt(loading.style.width) + 1;
            loading.style.width = currentWidth + '%';
            if (currentWidth >= 100) {
                if (window.timeout) {
                    clearTimeout(window.timeout);
                }
            }
        }, 5);
    } else {
        if (window.timeout) {
            clearTimeout(window.timeout);
        }
        loading.style.width = 0 + '%';
    }
}

function showMapLoading(show = false) {
    var mapResults = document.getElementsByClassName('map__results')[0];
    var mapResultsActiveClass = 'map__results--active';
    var mapLoading = document.getElementsByClassName('map__loading')[0];
    var mapLoadingActiveClass = 'map__loading--active';

    if (show === true) {
        mapResults.classList.remove(mapResultsActiveClass);
        mapLoading.classList.add(mapLoadingActiveClass);
    } else {
        mapLoading.classList.remove(mapLoadingActiveClass);
        mapResults.classList.add(mapResultsActiveClass);
    }
}

function showFiltersLoading(show = false) {
    var viewHomes = document.getElementsByClassName('options__apply')[0].getElementsByClassName('strut')[0];
    var strutLoadingClass = 'strut--loading-in-progress';

    if (show === true) {
        viewHomes.classList.add(strutLoadingClass);
    } else {
        viewHomes.classList.remove(strutLoadingClass);
    }
}

function showResultsPlaceholder(show = false) {
    var resultsPlaceholder = document.getElementsByClassName('results__placeholder')[0];
    var resultsPlaceholderActiveClass = 'results__placeholder--active';
    var resultsWrapper = document.getElementsByClassName('results__wrapper')[0];
    var resultsWrapperActiveClass = 'results__wrapper--active';

    if (show === true) {
        resultsWrapper.classList.remove(resultsWrapperActiveClass);
        resultsPlaceholder.classList.add(resultsPlaceholderActiveClass);
    } else {
        resultsPlaceholder.classList.remove(resultsPlaceholderActiveClass);
        resultsWrapper.classList.add(resultsWrapperActiveClass);
    }
}

function sendSearchRequest() {

    var listingType = getListingType();

    activeRequestNember = activeRequestNember + 1;
    var currentRequestNumber = activeRequestNember;

    console.log('Request started: ' + currentRequestNumber);

    isLoading(true);

    // Set timeout to emulate request response delay
    setTimeout(function() {
        if (currentRequestNumber === activeRequestNember) {
            console.log('Request finished: ' + currentRequestNumber);

            isLoading(false);

            // Remove old markers
            markers.clearLayers();
            // Add more markers on each draw
            var cycles = 10;
            for (var i = 0; i < cycles; i++) {
                drawMarkers(response, listingType);
            }

        }
    }, 1000);
}

function getRandomPointInBounds(bounds) {
    var x_max = bounds.getEast();
    var x_min = bounds.getWest();
    var y_max = bounds.getSouth();
    var y_min = bounds.getNorth();

    var lat = y_min + (Math.random() * (y_max - y_min));
    var lng = x_min + (Math.random() * (x_max - x_min));

    return [lat, lng];
}

function drawMarkers(response, listingType) {
    // Loop through complexes
    response.forEach(item => {
        if (item.type === 'Point') {
            var marker = getPointMarker(item, listingType);
            markers.addLayer(marker);
        } else if (item.type === 'Cluster') {
            var marker = getClusterMarker(item, listingType);
            markers.addLayer(marker);
        }
    });
};

function drawPolygon(polygonData) {
    polygon = L.polygon(polygonData, {
        color: "#FF492D",
        weight: 3,
        fillOpacity: 0
    }).addTo(map);
    // zoom the map to the polygon
    // map.fitBounds(polygon.getBounds());
};

function getCardLayout(complex) {
    var venueGallery = '<div class="venue__gallery"><div class="venue__preview"><img class="venue__image" src="' + complex.imageUrl + '" alt="' + complex.title + '"></div></div>';
    var venueType = '<div class="venue__type">' + complex.type + '</div>';
    var venueHeading = '<h3 class="venue__heading">' + complex.title + '</h3>';
    var venueAddress = '<div class="venue__address">' + complex.address + '</div>';
    var venueStatus = (complex.minPrice != '') ?
        ('<div class="venue__status venue__status--active">from ' + complex.minPrice + '</div>') :
        ('<div class="venue__status">Sales Pending</div>');
    var venueBody = '<div class="venue__body">' + venueType + venueHeading + venueAddress + venueStatus + '</div>';

    return cardLayout = '<a class="venue venue--map" href="' + complex.pageUrl + '" target="_blank">' + venueGallery + venueBody + '</a>';
};

function isMobileDevice() {
    var isMobile = false; //initiate as false
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    return isMobile;
};

function getPointMarker(item, listingType = 'buy') {
    var iconColor = (listingType === 'rent') ? 'green' : 'blue';
    var icon = getIcon(isMobileDevice(), false, iconColor);
    var iconActive = getIcon(isMobileDevice(), true, iconColor);

    var popupContent = getCardLayout(item.options);
    var popup = getPopup(popupContent);

    return L.marker(getRandomPointInBounds(polygon.getBounds()), {
            icon: icon,
            item: item
        })
        .bindPopup(popup)
        .on({
            mouseover: function(ev) {
                if (!isMobileDevice()) {
                    this.openPopup(this.getLatLng());
                }
            },
            mouseout: function(ev) {
                if (!isMobileDevice()) {
                    this.closePopup(); // Comment this line to prevent popup close for easy popup layout development and testing
                }
            },
            click: function(ev) {
                if (!isMobileDevice()) {
                    window.open(this.options.item.options.pageUrl);
                } else {
                    var popup = this.getPopup();
                    popup.options.maxWidth = 282;
                    popup.update();
                }
            },
            popupopen: function(ev) {
                this.setIcon(iconActive);
            },
            popupclose: function(ev) {
                this.setIcon(icon);
            },
        });
}

function getIcon(mobile = false, active = false, color = 'blue') {

    var className = "map-marker";
    var iconSize = 22;
    var iconActiveSize = 24;
    var iconMobileSize = 24;
    var iconMobileActiveSize = 26;

    if (active) {
        className += ' map-marker--active';
    }

    if (color === 'green') {
        className += ' map-marker--green';
    } else if (color === 'red') {
        className += ' map-marker--red';
    } else {
        className += ' map-marker--blue';
    }

    className = className.trim();

    if (mobile) {
        var iconSize = !active ? iconMobileSize : iconMobileActiveSize;
    } else {
        var iconSize = !active ? iconSize : iconActiveSize;
    }

    return L.divIcon({
        className: className,
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize/2, iconSize/2],
        popupAnchor: [0, 0]
    });
}

function getClusterMarker(item, listingType = 'buy') {

    var polygonColor = '';
    if (listingType === 'rent') {
        polygonColor = '#008a33';
    } else {
        polygonColor = '#0078E8';
    }

    var data = JSON.parse(item.options.bounds);
    var boundLayer = L.geoJSON(data, {
        color: polygonColor,
        weight: 3,
        fillOpacity: 0
    });
    var clusterColor = (listingType === 'rent') ? 'green' : 'blue';

    return L.marker([item.options.center.lat, item.options.center.lng], {
        icon: getClusterIcon(item.options.count, clusterColor),
        item: item,
        boundLayer: boundLayer
    })
    .on({
        mouseover: function(ev) {
            markers.addLayer(this.options.boundLayer);
        },
        mouseout: function(ev) {
            markers.removeLayer(this.options.boundLayer);
        },
        click: function(ev) {
            map.fitBounds(this.options.boundLayer.getBounds());
        }
    });
}

function getClusterIcon(clusterItemsCount, color = 'blue') {
    var clusterIconDiameterSmall = 34;
    var clusterIconDiameterMedium = 40;
    var clusterIconDiameterLarge = 46;

    var clusterClassName = "map-marker-cluster";

    if (color === 'green') {
        clusterClassName += ' map-marker-cluster--green';
    } else if (color === 'red') {
        clusterClassName += ' map-marker-cluster--red';
    } else {
        clusterClassName += ' map-marker-cluster--blue';
    }

    if (clusterItemsCount < 10) {
        clusterClassName = clusterClassName + " map-marker-cluster--small";
        clusterIconSize = [clusterIconDiameterSmall, clusterIconDiameterSmall];
        clusterIconAnchor = [clusterIconDiameterSmall / 2, clusterIconDiameterSmall / 2];
    } else if (clusterItemsCount < 100) {
        clusterClassName = clusterClassName + " map-marker-cluster--medium";
        clusterIconSize = [clusterIconDiameterMedium, clusterIconDiameterMedium];
        clusterIconAnchor = [clusterIconDiameterMedium / 2, clusterIconDiameterMedium / 2];
    } else {
        clusterClassName = clusterClassName + " map-marker-cluster--large";
        clusterIconSize = [clusterIconDiameterLarge, clusterIconDiameterLarge];
        clusterIconAnchor = [clusterIconDiameterLarge / 2, clusterIconDiameterLarge / 2];
    }

    return L.divIcon({
        className: clusterClassName,
        html: clusterItemsCount,
        iconSize: clusterIconSize,
        iconAnchor: clusterIconAnchor,
        popupAnchor: [0, 0]
    });
}

function getPopup(popupContent) {
    return L.responsivePopup({
        className: 'map-popup',
        maxWidth: 200,
        autoPan: false,
        keepInView: true,
        closeButton: false,
        offset: [14, 14],
    }).setContent(popupContent);
}

function watchListingType() {
    $('input[type=radio][name=listing-type]').change(function() {
        sendSearchRequest();
    });
}

function watchFilters() {
    $('.switch, .filter').on('click', function () {
        sendSearchRequest();
    });
}

function getListingType() {
    var radios = document.getElementsByName('listing-type');
    var type = 'buy';

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            var value = radios[i].value;

            if (value === 'buy') {
                type = value;
            } else if (value === 'rent') {
                type = value;
            } else {
                continue;
            }

            // If one checked item is found, skip other items
            break;
        }
    }

    return type;
}


//
// Main block
//
var map;
var markers;
var polygon;
var activeRequestNember = 0;

var resultsMap = document.getElementsByClassName('results__map')[0];
var resultsHandler = document.getElementsByClassName('results__handler')[0];

if (window.getComputedStyle(resultsMap).display !== 'none') {
    initMap();
};

resultsHandler.addEventListener("click", function() {
    initMap();
});
