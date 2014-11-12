'use strict';

/**
 * @ngdoc function
 * @name askingWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the askingWebApp
 */
angular.module('askingWebApp')
  .constant('askingUrl', 'https://asking.herokuapp.com/answer')
  //.constant('askingUrl', 'fakeanswer.json')
  .controller('MainCtrl', ['$scope', '$resource', 'askingUrl', function ($scope, $resource, askingUrl) {
    var askingResource = $resource(askingUrl);

    $scope.ask = function() {
      askingResource.save(null, {query: $scope.model.question}, function(response) {
        $scope.model.answer = response.answer;
      });
    };
  }]);
