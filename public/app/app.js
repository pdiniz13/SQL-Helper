/**
 * Created by ppp on 3/9/2015.
 */
angular.module('sql', [
  'sql.controller',
  'ui.router'
])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/create");
    $stateProvider
      .state('create', {
        templateUrl: './templates/create.html',
        controller: 'SqlController',
        url: '/create'
      })
  });