// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('LoginController', ['$scope', 'SweetAlert', '$state', 'User', '$location', '$log', function($scope, SweetAlert,
      $state, User, $location, $log) {
    
    $scope.users = []

    /*Inicio de sesión*/
    $scope.login = function() {
      User.login($scope.credentials, function() {
        var next = $location.nextAfterLogin || '/';
        $location.nextAfterLogin = null;
        $location.path(next);
      }, function(error) {
          $log.error(error);
      });
    }

    /*Resetear contraseña*/
    $scope.reset = function() {
      console.log($scope.credentials);
      User.resetPassword({
        email: $scope.credentials.email,
        }, function(error) {
          if (error){
            $log.error(error);
            return false;
          } 

          $state.go("login");
      });
    }

    $scope.setPassword = function( ) {
      console.log($scope.credentials.password);
      User.setPassword({
        newPassword: $scope.credentials.password,
        }, function(error) {
          $log.error(error);
          if (error){
            $log.error(error);
            return false;
          } 
          alert("contraseña cambiada");
          $state.go("login");
      });
    }

    /*Encontrar todos los usuarios registrados*/
    /*User.find().$promise
    .then(function(results) {
      $scope.users = results;
      $log.info($scope.users);
    });*/

    /*Cerrar sesión*/
    $scope.logout = function( ) {
      User.logout();
    }

  }]);

  angular
  .module('app')
  .controller('CreateController', ['$scope', '$state', 'User', function($scope,
      $state, User) {

    $scope.create = function() {
      User.create($scope.credentials,
      function() {
        alert("usuario creado");
        console.log("usuario creado");
        $state.go('login');
      }, function(res) {
        // error
        alert("error");
        console.log(res);
      });
    }

    /*Cerrar sesión*/
    $scope.logout = function( ) {
      User.logout();
    }
  }]);