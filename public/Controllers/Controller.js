/**
 * Created by ppp on 3/9/2015.
 */
angular.module('sql.controller', [])

  .controller('SqlController', ['$scope', 'Tables' , function($scope, Tables) {
    $scope.name = '';
    $scope.columns = [{id: 'col1'}];
    $scope.tables = Tables.tables;
    $scope.contains = '';
    $scope.depends = '';
    $scope.addNewCol = function() {
      var newItemNo = $scope.columns.length + 1;
      $scope.columns.push({'id': 'col' + newItemNo});
    };    $scope.removeLastCol = Tables.removeLastCol;
    $scope.removeLastCol = function() {
      $scope.columns.pop();
    };
    $scope.addNewTable = function(){
      Tables.addNewTable($scope.name, $scope.columns, $scope.contains, $scope.depends);
      $scope.name = '';
      $scope.columns = [{id: 'col1'}];
      $scope.tables = Tables.tables;
    };
    $scope.updateDependency = function(){
      $scope.depends= $scope.tableName1.name;
    };
    $scope.updateContains = function(){
      $scope.contains = $scope.tableName.name;
    };
  }])
  .factory('Tables', function() {
    var tables = [];
    var addNewTable = function(name, columns, contains, depends) {
      columns.push({name: name+"Id"});
      if (contains === '' && depends !== ''){
        columns.push({name: depends+'Id'+'(FK)'})
      }
      else if (contains !== '' && depends === ''){
        for (var x= 0, count = tables.length; x < count; x++){
          if (depends === tables[x].name){
            tables[x].columns.push({name: contains + "Id"+'(FK)'});
          }
        }
      }
      else if (contains !== '' && depends !== ''){
       tables.push({name: contains+name, columns:[{name: contains+name+"Id"}, {name: contains + "Id"+'(FK)'}, {name: name + "Id"+'(FK)'}]})
      }

      tables.push({name: name, columns: columns});
    };

    return {
      tables: tables,
      addNewTable: addNewTable
    }
  });