/**
 * Created by ppp on 3/9/2015.
 */
angular.module('sql.controller', [])

  .controller('SqlController', ['$scope', 'Tables' , function($scope, Tables) {
    $scope.name = '';
    $scope.columns = [{id: 'col1'}];
    $scope.tables = Tables.tables;
    $scope.addNewCol = function() {
      var newItemNo = $scope.columns.length + 1;
      $scope.columns.push({'id': 'col' + newItemNo});
    };    $scope.removeLastCol = Tables.removeLastCol;
    $scope.removeLastCol = function() {
      $scope.columns.pop();
    };
    $scope.addNewTable = function(){
      Tables.addNewTable($scope.name, $scope.columns);
      $scope.name = '';
      $scope.columns = [{id: 'col1'}];
      $scope.tables = Tables.tables;
    };
    $scope.updateDependency = function(){
      console.log($scope.tableName1.name);
    };
    $scope.updateContains = function(){
      console.log($scope.tableName.name);
    };
  }])
  .factory('Tables', function() {
    var tables = [];
    var addNewTable = function(name, columns) {
      columns.push({name: name+"Id"});
      tables.push({name: name, columns: columns});
    };

    return {
      tables: tables,
      addNewTable: addNewTable
    }
  });