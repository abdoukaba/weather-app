'use strict';

describe('myApp.weather module', function() {

  beforeEach(module('myApp.weather'));

  describe('weather controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var weatherCtrl = $controller('WeatherCtrl');
      expect(weatherCtrl).toBeDefined();
    }));

  });
});