//Controllers
weatherApp.controller('homeController', ['$scope','$location', 'cityService', function ($scope, $location, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });
    
    $scope.submit = function () {
        $location.path('/forecast');
    };
}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams', 'cityService', 'weatherService', function ($scope, $routeParams, cityService, weatherService) {
    $scope.city = cityService.city;

    $scope.hours = $routeParams.hours || 2;


    // Separete file with keyForecast value
    $scope.weatherResult = weatherService.GetWeather($scope.city, $scope.hours);

    $scope.convertToCelsius = function (degK) {
        return Math.round((degK - 273.15) * 100) / 100;
    };
    $scope.convertToDate = function (dt) {
        return new Date(dt * 1000);
    }
}]);