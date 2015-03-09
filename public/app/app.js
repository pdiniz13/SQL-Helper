/**
 * Created by ppp on 3/9/2015.
 */
angular.module('sql', [
  'ngRoute',
  'sql.controller',
  'ui.router',
  'ngFx'
])
  .config(function($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index");
    $stateProvider
      .state('index', {
        templateUrl: '../templates/index.html',
        controller: 'SqlController',
        url: '/index'
      })
  });