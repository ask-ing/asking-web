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
  .controller('MainCtrl', ['$scope', '$resource', 'askingUrl', function ($scope, $resource, askingUrl) {
    var askingResource = $resource(askingUrl);

    $scope.answers = [];

    $scope.ask = function() {
      var question = $scope.model.question;
      askingResource.save(null, $.param({query: question}), function(response) {
        $scope.answers.push({question: question, answer: response.answer});
      });
    };
  }]);
