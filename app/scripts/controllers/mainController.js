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

    $scope.reset = function() {
      $scope.model = {
        questions: [
          {
            question: 'Wat kan ik voor u betekenen?',
            parameterName: 'query',
            userInput: ''
          }
        ],
        answers: []
      }
    };

    $scope.ask = function() {
      if ($scope.model.userInput) {
        var question = $scope.model.questions.shift();
        askingResource.save(null, $.param(question.parameterName, question.userInput), function(response) {
          angular.each(response.questions, function(question) {

          });
          $scope.model.answers.push(question);
          $scope.model.question = '';
        });
      }
    };

    $scope.reset();
  }]);
