// Services
weatherApp.service('cityService', function () {
    this.city = "Miami"
});

weatherApp.service('weatherService', ['$resource', function ($resource) {
    this.GetWeather = function (city, hours) {
        var weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast', {
            callback: "JSON_CALLBACK"
        }, {get: {method: "JSONP"}});

        // Separete file with keyForecast value
        return weatherAPI.get({
            q: city,
            cnt: hours,
            APPID: keyForecast
        });
    }
}]);