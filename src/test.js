// fetch("https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi?country=ALL&keyword=radio&genre=ALL", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "bc056006f2msh3b35a2de07ea1b5p1bdf3djsnf66e3c9e1dca",
// 		"x-rapidapi-host": "30-000-radio-stations-and-music-charts.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });

// const http = require("https");

// const options = {
// 	"method": "GET",
// 	"hostname": "30-000-radio-stations-and-music-charts.p.rapidapi.com",
// 	"port": null,
// 	"path": "/rapidapi?country=ALL&keyword=radio&genre=ALL",
// 	"headers": {
// 		"x-rapidapi-key": "bc056006f2msh3b35a2de07ea1b5p1bdf3djsnf66e3c9e1dca",
// 		"x-rapidapi-host": "30-000-radio-stations-and-music-charts.p.rapidapi.com",
// 		"useQueryString": true
// 	}
// };

// const req = http.request(options, function (res) {
// 	const chunks = [];

// 	res.on("data", function (chunk) {
// 		chunks.push(chunk);
// 	});

// 	res.on("end", function () {
// 		const body = Buffer.concat(chunks);
// 		console.log(body.toString());
// 	});
// });

// req.end();