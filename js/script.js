// var city = 'Pittsburgh'
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

fetch("https://travel-places.p.rapidapi.com/", {
	"method": "POST",
	"headers": {
		"content-type": "application/json",
		"x-rapidapi-host": "travel-places.p.rapidapi.com",
		"x-rapidapi-key": "2fd27d63f8msh0f4bac2c647e6d2p1ab48cjsnd297a64b1499"
	},
	"body": {
		"query": "{ getPlaces(categories:[\"NATURE\"],lat:37,lng:-122,maxDistMeters:50000) }",
		"variables": {}
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});