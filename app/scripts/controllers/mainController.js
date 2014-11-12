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

    function newQuestionsProcessor(question) {
      return function(response) {
        if (response.questions.filter(function(q) {return !!q.question;}).length) {
          angular.forEach(response.questions, function(newquestion) {
            $scope.model.questions.push(newquestion);
          });
          $scope.model.answers.push(question);
        } else if (response.contextUrl) {
          console.log('get resource');
          $resource(response.contextUrl).get(newQuestionsProcessor(question));
        }
      };
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
      }
    };

    $scope.ask = function() {
      var params = {},
        question = $scope.model.questions.shift();
      if (question.userInput) {
        params[question.parameterName || 'query'] = question.userInput;
        askingResource.save(null, $.param(params), newQuestionsProcessor(question));
      } else {
        $scope.model.questions.unshift(question);
      }
    };

    $scope.reset();
  }]);
