/* global $ */

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

    function newQuestionsProcessor(response) {
      if (response.questions.filter(function(q) {return !!q.question;}).length) {
        // Move the current questions to the answers queue
        angular.forEach($scope.model.questions, function(question) {
          $scope.model.answers.push(question);
        });

        // Add the new questions to the question queue
        $scope.model.questions = response.questions;

      } else if (response.contextUrl) {
        $resource(response.contextUrl).get(newQuestionsProcessor);
      }
    }

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
      };
    };

    $scope.ask = function() {
      var params = {},
        question = $scope.model.questions[0];
      if (question && question.userInput) {
        params[question.parameterName || 'query'] = question.userInput;
        askingResource.save(null, $.param(params), newQuestionsProcessor);
      }
    };

    $scope.reset();
  }]);
