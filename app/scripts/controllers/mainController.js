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
  //.constant('askingUrl', 'https://asking.herokuapp.com/validate-card')
  .constant('askingUrl', 'https://asking.herokuapp.com/answer')
  .controller('MainCtrl', ['$scope', '$resource', '$sce', 'askingUrl', function ($scope, $resource, $sce, askingUrl) {
    var askingResource;

    function getAskingResource() {
      if (angular.isUndefined(askingResource)) {
        askingResource = $resource(askingUrl);
      }
      return askingResource;
    }

    function validateQuestion(question) {
        //return !question.regexForAnswerGivenByCustomer || (question.userInput + '').match(question.regexForAnswerGivenByCustomer);
      return !!question.userInput;
    }

    function newQuestionsProcessor(response) {
      if (response.questions.length) {
        // Move the current questions to the answers queue
        angular.forEach($scope.model.questions, function(question) {
          $scope.model.answers.push(question);
        });
        $scope.model.questions.length = 0;

        // Add the new questions to the question queue, or directly to the answer queue if the don't have a parameter name
        angular.forEach(response.questions, function(question) {
          if (question.parameterName) {
            $scope.model.questions.push(question);
          } else if(question.question) {
            question.question = $sce.trustAsHtml(question.question);
            $scope.model.answers.push(question);
          }
        });
      }

      if (response.contextUrl) {
        askingResource = $resource(response.contextUrl);
      }

      if (!$scope.model.questions.length) {
        $resource(response.contextUrl).get(newQuestionsProcessor);
      }
    }

    function firstIncompleteQuestion(questions) {
      return questions.filter(function(question) { return !question.done;}).shift();
    }

    $scope.reset = function() {
      askingResource = undefined;
      getAskingResource().get(function(response) {
        $scope.model = {
          questions: response.questions,
          answers: []
        };
        //$scope.model.questions[0].userInput = 'pas gevonden';
      });
    };

    $scope.ask = function() {
      var questions = $scope.model.questions,
        validatedParams = {},
        currentQuestion = firstIncompleteQuestion(questions);

      if (currentQuestion) {
        currentQuestion.done = validateQuestion(currentQuestion);
        currentQuestion.warning = !currentQuestion.done && currentQuestion.errorMessageForWrongInput;
        if (currentQuestion.done) {
          validatedParams[currentQuestion.parameterName || 'query'] = currentQuestion.userInput;
        }
      }

      if (!firstIncompleteQuestion(questions)) {
        angular.forEach(questions, function(question) {
          validatedParams[question.parameterName || 'query'] = question.userInput;
        });

        getAskingResource().save(null, $.param(validatedParams), newQuestionsProcessor);
      }
    };

    $scope.reset();
  }]);
