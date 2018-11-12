//Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {
    $scope.city = cityService.city;

    $scope.hours = $routeParams.hours || 2;

    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast', {
        callback: "JSON_CALLBACK"
    }, {get: {method: "JSONP"}})
    // Separete file with keyForecast value
    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city,
        cnt: $scope.hours,
        APPID: keyForecast
    });

    $scope.convertToCelsius = function (degK) {
        return Math.round((degK - 273.15) * 100) / 100;
    };
    $scope.convertToDate = function (dt) {
        return new Date(dt * 1000);
    }
}]);