var cachedJSON; //cached version of all the details of the apps
var descriptions;

$(document).ready(function () {
    loadDescriptions();
});

/* ---------- Get descriptions list */

function loadDescriptions () {
    $.getJSON('descriptions.json', function (response) {
        descriptions = response;
        getCachedList();
    });
}

/* ---------- Get cached JSON app list */

function getCachedList () {
    $.getJSON('cached.json', function (response) {
        cachedJSON = response;
        showJSON(cachedJSON);
    });
}

/* ---------- Render HTML from JSON */

function showJSON (json) {
    if ($('#apps').length == 0) {
        var ul = $('<ul id="apps"></ul>');
    } else {
        var ul = $('#apps');
    }

    $.each(json, function (a) {
        var app = json[a]
        ul.append(createAppHtmlNode(app));
    });

    $('.container-fluid').append(ul);
    initSlick();
}

/* Create the node of one app */
function createAppHtmlNode(app) {
    if ($('#' + app.trackId).length == 0) {
        var li = $('<li class="clearfix" id="' + app.trackId + '"></li>');
    } else {
        var li = $('#' + app.trackId);
    }

    var icon = $('<img class="artwork" src="' + app.artworkUrl512 + '">');
    var name = $('<span class="trackName">' + app.trackName + '</span>');
    var ownDescr = $('<p class="ownDescription">' + descriptions[app.trackId].ownDescription + '</p>');

    var screenshots = $('<div class="screenshots"></div>');
    $.each(descriptions[app.trackId].screenshots, function (i, url) {
        var img = $('<img class="screenshot" src="img/' + url + '">');
        screenshots.append(img);
        // console.log("url" + url);
    });

    li.append(icon).append(name).append(ownDescr).append(screenshots);
    return li;
}

/* ---------- Slick carousel in "Center Mode" */

function initSlick () {
    $('.screenshots').slick({
        centerMode: true,
        slide: '.screenshot',
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        arrows: false,
        initialSlide: 0,
        variableWidth: true,
        adaptiveHeight: false,
        autoplay: false,
        edgeFriction: 0.15,
        speed: 200,
        responsive: [
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1
              }
            }
        ]
    });

    $('.screenshots').on('init', function () {
        console.log("Slick initialized");
    }).on('reInit', function () {
        console.log("Slick reinitialized");
    });
}
