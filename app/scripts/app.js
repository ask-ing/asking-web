'use strict';

/**
 * @ngdoc overview
 * @name askingWebApp
 * @description
 * # askingWebApp
 *
 * Main module of the application.
 */
angular
  .module('askingWebApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($httpProvider, $routeProvider) {
    delete $httpProvider.defaults.headers.post['Content-Type']

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
