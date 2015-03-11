/**
 * Created by ppp on 3/9/2015.
 */
angular.module('sql.controller', [])

  .controller('SqlController', ['$scope', 'Tables', function($scope, Tables) {
    $scope.name = '';
    $scope.columns = [{id: 'col1'}];
    $scope.tables = Tables.tables;
    $scope.contains = null;
    $scope.depends = null;
    $scope.sqlString = '';
    $scope.addNewCol = function() {
      var newItemNo = $scope.columns.length + 1;
      $scope.columns.push({'id': 'col' + newItemNo});
    };
    $scope.removeLastCol = Tables.removeLastCol;
    $scope.removeLastCol = function() {
      $scope.columns.pop();
    };
    $scope.addNewTable = function() {
      Tables.addNewTable($scope.name, $scope.columns, $scope.contains, $scope.depends);
      $scope.name = '';
      $scope.columns = [{id: 'col1'}];
      $scope.contains = null;
      $scope.depends = null;
      $scope.tables = Tables.tables;
      $scope.tableName1 = {};
      $scope.tableName = {};
    };
    $scope.updateDependency = function() {
      $scope.depends = $scope.tableName1.name;
    };
    $scope.updateContains = function() {
      $scope.contains = $scope.tableName.name;
    };
    $scope.createSql = function(){
      $scope.sqlString = Tables.createSql();
    }
  }])
  .factory('Tables', function() {
    var tables = [];
    var sqlString = '';
    var addNewTable = function(name, columns, contains, depends) {
      sqlString += "CREATE TABLE " + "`" + name + "` (\n" +
      "`" + name + "Id`" + " INT NOT NULL AUTO_INCREMENT,\n";
      for (var y = 0, newCount = columns.length; y < newCount; y++) {
        sqlString += "`" + columns[y].name + "`" + " VARCHAR(45) NULL, "
      }
      columns.push({name: name + "Id"});
      if (contains === null && depends !== null) {
        sqlString +=  "`"+ depends +"Id` INT NULL,\n";
        sqlString += "PRIMARY KEY (`" + name + "Id`), ";
        sqlString += "INDEX `" + depends + "Id_idx` (`" + depends + "Id` ASC),\n";
        sqlString += "CONSTRAINT `" + depends + "Id`\n";
        sqlString += "FOREIGN KEY (`" + depends + "Id`)\n";
        sqlString += "REFERENCES `" + depends + "` (`" + depends + "Id`)\n";
        columns.push({name: depends + 'Id' + '(FK) '});
      }
      else if (contains !== null && depends === null) {
        for (var x = 0, count = tables.length; x < count; x++) {
          if (depends === tables[x].name) {
            tables[x].columns.push({name: contains + "Id" + '(FK)'});
          }
        }
      }
      else{
        sqlString += "PRIMARY KEY (`" + name + "Id`)";
      }
      if (contains !== null && depends !== null) {
        if (contains === depends) {
          sqlString += ");";
          sqlString += "CREATE TABLE `" + contains + name + "` ( ";
          sqlString += "`" + contains + name + "Id` INT NOT NULL AUTO_INCREMENT, ";
          sqlString += "`" + contains + "Id` INT NULL, ";
          sqlString += "`" + name + "Id` INT NULL, ";
          sqlString += "PRIMARY KEY (`" + contains+name + "Id`), ";
          sqlString += "INDEX `" + contains + "Id_idx` (`" + contains + "Id` ASC), ";
          sqlString += "INDEX `" + name + "Id_idx` (`" + name + "Id` ASC), ";
          sqlString += "CONSTRAINT `" + contains + "Id` ";
          sqlString += "FOREIGN KEY (`" + contains + "Id`) ";
          sqlString += "REFERENCES `"+ contains + "` (`"+ contains+ "Id`), ";
          sqlString += "CONSTRAINT `" + name + "Id` ";
          sqlString += "FOREIGN KEY (`" + name + "Id`) ";
          sqlString += "REFERENCES `"+ name + "` (`"+ name + "Id`)";
          tables.push({
            name: contains + name,
            columns: [{name: contains + name + "Id"}, {name: contains + "Id" + '(FK)'}, {name: name + "Id" + '(FK)'}]
          })
        }
      }

      sqlString += "); ";
      tables.push({name: name, columns: columns});
    };
    var createSql = function(){
      return sqlString;
    };

    return {
      tables: tables,
      sqlString:sqlString,
      createSql: createSql,
      addNewTable: addNewTable
    }
  });