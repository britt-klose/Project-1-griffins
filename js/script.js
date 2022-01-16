
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

function searchFunc(city) {
    var city = $("#search").val();
    fetch('https://api.opentripmap.com/0.1/en/places/geoname?name=' + city + '&apikey=' + openTripKey)
        .then(data => data.json())
        .then(function (response) {
            console.log(response)
        })
}
searchBtn.click(searchFunc);

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