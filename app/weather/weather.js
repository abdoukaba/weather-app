'use strict';

angular.module('compupcorp.weather', ['ngRoute', 'ngGeolocation'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/weather', {
                    templateUrl: 'weather/weather.html',
                    controller: 'WeatherCtrl'
                });
            }])

        .controller('WeatherCtrl', ['$scope', '$http', '$geolocation', 'weatherConfig', function ($scope, $http, $geolocation, weatherConfig) {
                console.log('weather fired');

                $scope.url = false;
                $scope.loading = false;
                //what their html response looks like:
//                http://api.openweathermap.org/data/2.5/weather?q=losangeles,Ca&mode=html&appid=44db6a862fba0b067b1930da0d769e98

                $scope.useform = 'false';

                $scope.$geolocation = $geolocation;

                // basic usage
                $geolocation.getCurrentPosition().then(function (location) {
                    $scope.location = location;

                    console.log(location, 'location');

                    var coords = location.coords;

                    $scope.useform = 'false';
                    $scope.loading = true;
                    console.log('pos', coords.latitude, coords.longitude);

                    $scope.url = weatherConfig.urls.openWeatherMap + '?lat=' + coords.latitude + '&lon=' + coords.longitude;
                    console.log('url', $scope.url);
                    $scope.getWeather($scope.url);
                }, function (error) {
                    console.log('error hit', error);
                    $scope.error = error.error.message;
                    $scope.useform = 'true';
                });


                //for typeahead autocomplete
                $scope.getLocation = function (val) {
                    $scope.loading = true;
                    $scope.res = {}; //reset to empty out
                    return $http.get(weatherConfig.urls.googleAddress, {
                        params: {
                            address: val,
                            sensor: false
                        }
                    }).then(function (response) {
                        return response.data.results.map(function (item) {
                            $scope.loading = false;
                            return item.formatted_address;
                        });
                    });
                };


                $scope.getWeather = function (url) {
                    $http({
                        method: 'GET',
                        url: url + '&APPID=' + weatherConfig.appid + '&units=metric'
                    }).then(function successCallback(response) {
                        $scope.res = response.data;
                        $scope.loading = false;

                        // this callback will be called asynchronously
                        // when the response is available
                    }, function errorCallback(response) {
                        console.log('resonse errorro callback', response);
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });

                };

                $scope.typeaheadSelect = function () {
                    $scope.url = weatherConfig.urls.openWeatherMap + '?q=' + $scope.q;
                    $scope.getWeather($scope.url);
                };
            }]);