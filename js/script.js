var city = $("#search").val();
var searchBtn = $('.searchBtn');
var featureImage = $('#hotelPic');
var results = $('#searchResults');
var featureHotel = $('#hotelFeature');
var featurePrice = $('#featPrice');
var featureInfo = $('#featureInfo');
var featureRating = $('#featStars');
var searchResults = $('#searchResults');
var openTripKey = "5ae2e3f221c38a28845f05b65de00eb741183a537516c87362491f72";
var bookingKey = "2fd27d63f8msh0f4bac2c647e6d2p1ab48cjsnd297a64b1499";
var pageLength = 5;
var lon;
var lat;
var offset = 0;
var count;

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

// fetch("https://booking-com.p.rapidapi.com/v1/hotels/locations?name=" + city + "&locale=en-gb", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "booking-com.p.rapidapi.com",
// 		"x-rapidapi-key": "2fd27d63f8msh0f4bac2c647e6d2p1ab48cjsnd297a64b1499"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });

// function apiGet(method, query) {
//     return new Promise(function (resolve, reject) {
//         var otmAPI =
//             "https://api.opentripmap.com/0.1/en/places/" + method + "?apikey=" + openTripKey;
//         if (query !== undefined) {
//             otmAPI += "&" + query;
//         }
//         fetch(otmAPI)
//             .then(response => response.json())
//             .then(data => resolve(data))
//         console.log(data)
//             .catch(function (err) {
//                 console.log("Fetch Error :-S", err);
//             });
//     });
// }

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

    console.log(latitude)
    console.log(longitude)

    fetch('https://api.opentripmap.com/0.1/en/places/radius?radius=1600&lon=' + longitude + '&lat=' + latitude + '&kinds=cultural&apikey=' + openTripKey)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
            objectProperties(data);
        })
}

function objectProperties(destination) {

    function getXid() {
        for (var i=0; i<destination.features.length; i++) {
            console.log(destination.features[i].properties.xid)

            var xid = destination.features[i].properties.xid

            fetch('https://api.opentripmap.com/0.1/en/places/xid/' + xid + '?apikey=' + openTripKey)
                .then(response => response.json())
                .then(function(data) {
                    // objectProperties(data);
                    console.log(data);
                })
        }
    }

    getXid();
};

searchBtn.click(function () {searchFunc()});
// searchBtn.click("searchBtn", function (event) {
//     var name = document.getElementByClass("input-group").value;
//     console.log(name)
//     apiGet("geoname", "name=" + name).then(function (data) {
//         let message = "Name not found";
//         if (data.status == "OK") {
//             message = data.name + ", " + getCountryName(data.country);
//             lon = data.lon;
//             lat = data.lat;
//             firstLoad();
//         }
//         document.getElementById("info").innerHTML = `${message}`;
//     });
//     event.preventDefault();
// });

// function firstLoad() {
//     apiGet(
//         "radius",
//         `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
//     ).then(function (data) {
//         count = data.count;
//         offset = 0;
//         document.getElementById(
//             "info"
//         ).innerHTML += `<p>${count} objects with description in a 1km radius</p>`;
//         loadList();
//     });
// }

// function loadList() {
//     apiGet(
//         "radius",
//         `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
//     ).then(function (data) {
//         var list = document.getElementById("list");
//         list.innerHTML = "";
//         data.forEach(item => list.appendChild(createListItem(item)));
//         var nextBtn = document.getElementById("next_button");
//         if (count < offset + pageLength) {
//             nextBtn.style.visibility = "hidden";
//         } else {
//             nextBtn.style.visibility = "visible";
//             nextBtn.innerText = `Next (${offset + pageLength} of ${count})`;
//         }
//     });
// }

// function createListItem(item) {
//     var a = document.createElement("a");
//     a.className = "list-group-item list-group-item-action";
//     a.setAttribute("data-id", item.xid);
//     a.innerHTML = `<h5 class="list-group-item-heading">${item.name}</h5>
//               <p class="list-group-item-text">${getCategoryName(item.kinds)}</p>`;

//     a.addEventListener("click", function () {
//         document.querySelectorAll("#list a").forEach(function (item) {
//             item.classList.remove("active");
//         });
//         this.classList.add("active");
//         let xid = this.getAttribute("data-id");
//         apiGet("xid/" + xid).then(data => onShowPOI(data));
//     });
//     return a;
// }

// function onShowPOI(data) {
//     var poi = document.getElementById("poi");
//     poi.innerHTML = "";
//     if (data.preview) {
//         poi.innerHTML += `<img src="${data.preview.source}">`;
//     }
//     poi.innerHTML += data.wikipedia_extracts
//         ? data.wikipedia_extracts.html
//         : data.info
//             ? data.info.descr
//             : "No description";

//     poi.innerHTML += `<p><a target="_blank" href="${data.otm}">Show more at OpenTripMap</a></p>`;
// }

// document
//     .getElementById("next_button")
//     .addEventListener("click", function () {
//         offset += pageLength;
//         loadList();
//     });