// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('LoginController', ['$scope', '$state', 'User', function($scope,
      $state, User) {
        $scope.users = []

    $scope.login = function() {
      $scope.loginResult = User.login($scope.credentials,
        function() {
          // success
          alert("redirigir a usuario");
          console.log("esta logueado");
          $state.go('create_user');
        }, function(res) {
          // error
          alert("error");
          console.log(res);
          
        });
        
    }
      User.find().$promise
        .then(function(results) {
          $scope.users = results;
        });;
  }]);

  angular
  .module('app')
  .controller('CreateController', ['$scope', '$state', 'User', function($scope,
      $state, User) {
    $scope.create = function() {
      $scope.createResult = User.create($scope.credentials,
        function() {
          
          // success
          alert("usuario creado");
          console.log("usuario creado");
          $state.go('login');
        }, function(res) {
          // error
          alert("error");
          console.log(res);
          
        });

    }
  }]);
