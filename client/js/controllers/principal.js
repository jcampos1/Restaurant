// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('PrincipalController', ['$scope', 'cm01', function($scope,
      cm01) {
    
    /*Uso desde la vista - perfiles del usuario*/
    $scope.isAdmin = function ( ){
      alert("se ejecuto isAdmin"+cm01.isAdmin());
      return cm01.isAdmin();
    }

    $scope.isCajero = function ( ){
      alert("se ejecuto isCajero"+cm01.isCajero());
      return cm01.isCajero();
    }

    $scope.isCamarero = function ( ){
      alert("se ejecuto isCamarero"+cm01.isCamarero());
      return cm01.isCamarero();
    }
  }]);
