const http = require("http");
const port = process.env.PORT || 3000;
var cities = ["Moscow,RU", "Yoshkar-Ola,RU", "Kazan,RU", "Denver,US"];
const server = http.createServer(function (request, response) {
	var request = require("request");
	response.write("<html lang='ru'><head><meta charset='UTF-8'></head><body><div id='container'");
	for (var i = 0; i < cities.length; i++) {
		var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cities[i] + "&appid=fdd41f5237e2a4152a14d0715f43c545&units=metric";
		request(url, function (err, res, body) {
			var data = JSON.parse(body);
			response.write("<h4>" + 'Город: ' + data['name'] + "</h4>");
			response.write("<h2>" + 'Температура: ' + data.main['temp'] + "</h2>");
			response.write("<h2>" + 'Влажность: ' + data.main['humidity'] + "</h2>");
			response.write("<h2>" + 'Скорость ветра: ' + data.wind['speed'] + ' м/с' + "</h2><br>");
		});
	}
	response.write("</div></body></html>");
}).listen(port);