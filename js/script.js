
var searchBtn = $('.searchBtn');
var featureImage = $('#hotelPic');
var results = $('#searchResults');
var featureHotel = $('#hotelFeature');
var featurePrice = $('#featPrice');
var featureInfo = $('#featureInfo');
var featureRating = $('#featStars');
var searchResults = $('#searchResults');
var openTripKey = "5ae2e3f221c38a28845f05b65de00eb741183a537516c87362491f72";

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
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

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });
});

var hotelElCards = document.querySelectorAll(".card")
console.log(hotelElCards)
for (i=0; i<hotelElCards.length; i++){
    hotelElCards[i].children[0].addEventListener("click", function(event){
        event.preventDefault();
        $("#main-page").attr("style", "display:none")
        $("#single-hotel").attr("style", "display:block")
        console.log(event.currentTarget.id)
        var hotelNum = event.currentTarget.id
        console.log(sessionStorage.getItem("hotelName" + hotelNum))
        $("#new-title").text(sessionStorage.getItem("hotelName" + hotelNum))
        $("#new-subT").text(sessionStorage.getItem("hotelLoc" + hotelNum))
    })
}

// // event listener for clicking on tabs
// $("single-overview").text(sessionStorage.getItem("hotelPrice" + hotelNum))
// $("single-price").text(sessionStorage.getItem("hotelPrice" + hotelNum))
// $("single-price").text(sessionStorage.getItem("hotelPrice" + hotelNum))
// $("single-price").text(sessionStorage.getItem("hotelPrice" + hotelNum))
// $("single-price").text(sessionStorage.getItem("hotelPrice" + hotelNum))

function searchFunc() {
    var city = $('#search').val();
    console.log(city)
    fetch('https://api.opentripmap.com/0.1/en/places/geoname?name=' + city + '&apikey=' + openTripKey)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            objectsList(data);
        })
}

function objectsList(coordinates) {

    var longitude = coordinates.lon.toString();
    var latitude = coordinates.lat.toString();

    fetch('https://api.opentripmap.com/0.1/en/places/radius?radius=1600&lon=' + longitude + '&lat=' + latitude + '&kinds=cultural&limit=5&apikey=' + openTripKey)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            objectProperties(data);
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
            console.log(data);
            for (let i = 1; i < 6; i++) {
                var hotelName = data.result[i].hotel_name
                var hotelPrice = "$" + data.result[i].price_breakdown.all_inclusive_price
                var hotelLoc = data.result[i].address + ", " + data.result[i].city_name_en
                var hotelRating = data.result[i].review_score + "/10"
                var hotelPic = data.result[i].max_1440_photo_url
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
            }
        })   
}

function objectProperties(destination) {

    function getXid() {
        for (var i = 0; i < destination.features.length; i++) {

            var xid = destination.features[i].properties.xid

            fetch('https://api.opentripmap.com/0.1/en/places/xid/' + xid + '?apikey=' + openTripKey)
                .then(response => response.json())
                .then(function (data) {
                    console.log(data);
                    var activityName = data.name
                    var activityLoc = data.address.neighbourhood + ", " + data.address.city
                    console.log(activityName);
                    console.log(activityLoc);
            }) 
        } 
    }


    getXid();
};

searchBtn.click(function () { searchFunc() });

