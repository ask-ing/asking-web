'use strict';

/**
 * @ngdoc function
 * @name askingWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the askingWebApp
 */
angular.module('askingWebApp').factory('askingService', ['$resource', function ($resource) {
  var askingResource = $resource('https://asking.herokuapp.com/answer');
}]);
