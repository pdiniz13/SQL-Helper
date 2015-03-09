/**
 * Created by ppp on 3/9/2015.
 */
angular.module('sql.controller', [])
  .controller('SqlController', ['$scope', function ($scope) {

  }])
  .factory('Tables', ['$scope', function($scope) {
    var tables = {};
    return {
      tables: tables
    };
  }]);