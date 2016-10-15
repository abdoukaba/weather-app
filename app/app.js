'use strict';

// Declare app level module which depends on views, and components
angular.module('compucorpWeatherExercise', [
    'ngRoute',
    'compupcorp.weather',
    'ui.bootstrap',
    'ngGeolocation'

])
        .constant("weatherConfig", {
            appid: "36546e1db8f2ce25a5cd956090793f91",
            urls: {
                googleAddress: "//maps.googleapis.com/maps/api/geocode/json",
                openWeatherMap: "http://api.openweathermap.org/data/2.5/weather"

            }
        })
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.otherwise({redirectTo: '/weather'});
            }])
        .filter('cToF', function () {
            return function (input) {
                var numInput = parseFloat(input);
                if(isNaN(numInput)){
                    return '';
                }

                return numInput * 9/5 + 32;
            };
        });
