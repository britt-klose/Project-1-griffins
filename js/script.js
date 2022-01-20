var searchBtn = $('.searchBtn');
var openTripKey = "5ae2e3f221c38a28845f05b65de00eb741183a537516c87362491f72";

document.addEventListener('DOMContentLoaded', () => {

    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');
        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    document.addEventListener('keydown', (event) => {
        const e = event || window.event;
        if (e.keyCode === 27) {
            closeAllModals();
        }
    });
});

var hotelElCards = document.querySelectorAll(".card")

for (i = 0; i < hotelElCards.length; i++) {
    hotelElCards[i].children[0].addEventListener("click", function (event) {
        event.preventDefault();
        $("#main-page").attr("style", "display:none")
        $("#single-hotel").attr("style", "display:block")
        var hotelNum = event.currentTarget.id
        $("#new-title").text(sessionStorage.getItem("hotelName" + hotelNum))
        $("#new-subT").text(sessionStorage.getItem("hotelLoc" + hotelNum))
        $("#pricing").text(sessionStorage.getItem("hotelPrice" + hotelNum))
        $("#picture").attr("src", sessionStorage.getItem("hotelPic" + hotelNum))
        $("#url").attr("href", sessionStorage.getItem("URL" + hotelNum))
    })
}

function searchFunc() {
    var city = $('#search').val();
    fetch('https://api.opentripmap.com/0.1/en/places/geoname?name=' + city + '&apikey=' + openTripKey)
        .then(response => response.json())
        .then(function (data) {
            objectsList(data);
        })
}

function objectsList(coordinates) {

    var longitude = coordinates.lon.toString();
    var latitude = coordinates.lat.toString();

    fetch('https://api.opentripmap.com/0.1/en/places/radius?radius=1600&lon=' + longitude + '&lat=' + latitude + '&kinds=cultural&limit=5&apikey=' + openTripKey)
        .then(response => response.json())
        .then(function (data) {
            for (let i = 0; i < 5; i++) {
                var activityName = data.features[i].properties.name
                var activityDist = data.features[i].properties.dist.toFixed(2) + " meters"
                $("#activity" + i).html(activityName)
                $("#distance" + i).html(activityDist)
            }
        })
    fetch("https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=popularity&longitude=" + longitude + "&latitude=" + latitude + "&locale=en-us&room_number=1&units=imperial&adults_number=2&filter_by_currency=USD&checkin_date=2022-07-01&checkout_date=2022-07-02", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "booking-com.p.rapidapi.com",
            "x-rapidapi-key": "2fd27d63f8msh0f4bac2c647e6d2p1ab48cjsnd297a64b1499"
        }
    })
        .then(response => response.json())
        .then(function (data) {
            for (let i = 1; i < 6; i++) {
                var hotelName = data.result[i].hotel_name
                var hotelPrice = "$" + data.result[i].price_breakdown.all_inclusive_price
                var hotelLoc = data.result[i].address + ", " + data.result[i].city_name_en
                var hotelRating = data.result[i].review_score + "/10"
                var hotelPic = data.result[i].max_1440_photo_url
                var hotelURL = data.result[i].url
                $("#hotel" + i).children("div").children(".media-content").children(".title").html(hotelName)
                $("#hotel" + i).children("div").children(".media-content").children(".subtitle").html(hotelPrice + "/night")
                $("#hotel" + i).children(".content").children("p").html(hotelLoc)
                $("#hotel" + i).children(".content").children("div").html(hotelRating)
                $("#hotel" + i).siblings("div").children("figure").children("img").attr("src", hotelPic)
                sessionStorage.setItem("hotelName" + [i], hotelName)
                sessionStorage.setItem("hotelPrice" + [i], hotelPrice)
                sessionStorage.setItem("hotelLoc" + [i], hotelLoc)
                sessionStorage.setItem("hotelRating" + [i], hotelRating)
                sessionStorage.setItem("hotelPic" + [i], hotelPic)
                sessionStorage.setItem("URL" + [i], hotelURL)
            }
        })
}

searchBtn.click(function () { searchFunc() });