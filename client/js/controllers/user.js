// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('LoginController', ['$scope', 'cm01', 'ms01', 'SweetAlert', '$state', 'User', '$location', '$log', function($scope, cm01, ms01, SweetAlert,
      $state, User, $location, $log) {
    
        var vm = this;
    $scope.users = []

    //Graba el usuario seleccionado
    /*$scope.selectedUser = function( user ) {
      cm01.setData04(user);
      alert("SE EJECUTO");
      User.findRolesByUser({user: user}, function(roles){
        $log.info("ROLES DEL USUARIO SELECCIONADO");
        $log.info(roles);
      });
    }*/

    //Muestra en detalle la información
    /*vm.detailUser = function() {
      if( cm01.isValid(cm01.getData04()) ) {
        var modalInstance = $uibModal.open({
          animation : true,
          templateUrl : 'modalDetailUser.html',
          controller : 'DetailUserController',
          backdrop: true,
          size : "md"
        });
        modalInstance.result.then(function() {
        }, function() {
        });
      }else{
        ms01.unselected();
      }
    }*/

    /*Inicio de sesión*/
    $scope.login = function() {
      User.login($scope.credentials, function() {
        $scope.messageStatus = "";
        $state.go("boardList");
        cm01.setEvnt07("emit");
        /*var next = $location.nextAfterLogin || '/';
        $location.nextAfterLogin = null;
        $location.path(next);*/
      }, function(error) {
        $scope.messageStatus ="Correo o contraseña incorrecta";
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

  }]);

  angular
  .module('app')
  .controller('UserController', ['$scope', 'cm01', 'ms01', 'SweetAlert', '$state', 'User', '$location', '$log', '$uibModal', function($scope, cm01, ms01, SweetAlert,
      $state, User, $location, $log, $uibModal) {
    
      var vm = this;
    $scope.users = []

    //Graba el usuario seleccionado
    $scope.selectedUser = function( user ) {
      cm01.setData04(user);
      console.log("SE SELECCIONO");console.log(user);
    }

    //Muestra en detalle la información
    vm.detailUser = function() {
      console.log("SE MUESTRA MODAL");
      if( cm01.isValid(cm01.getData04()) ) {
        var modalInstance = $uibModal.open({
          animation : true,
          templateUrl : 'modalDetailUser.html',
          controller : 'DetailUserController',
          backdrop: true,
          size : "md"
        });
        modalInstance.result.then(function() {
        }, function() {
        });
      }else{
        ms01.unselected();
      }
    }

    //Encuentra todos los usuarios
    $scope.userFind = function( ) {
      User.find().$promise
      .then(function(results) {
        $log.info("LOS USUARIOS SON:");
        $log.info(results);
        $scope.users = results;
      });
    }

    $scope.userFind();

    //Evento para resaltar opción actual seleccionada
    ms01.sidebarRightAdmin($scope);

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

angular.module("app").controller('DetailUserController',
  ['$scope', 'cm01', '$uibModalInstance', '$log', function($scope, cm01, $uibModalInstance,
    $log) { 
      //Usuario seleccionado
      $scope.user = cm01.getData04();

      //Encuentra la categoria asociada al producto
      /*Category.findById({id: $scope.product.categoryId}).$promise
      .then(function(category) {
        $scope.category = category;
      });*/
      
      $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
      };
}]);

angular
.module('app')
.controller('AccessLogoutController', ['$scope', 'cm01', 'User', '$state', function($scope,
    cm01, User, $state) {

    /*Cerrar sesión*/
    $scope.logout = function( ) {
      User.logout(function(){
        $scope.isLogged = false;
        $state.go("login");
      });
    }
 
    //Acción ejecutada después de acceder o salir del sistema
    $scope.$watch(function() { return cm01.getEvnt07() }, function() {
      if( cm01.isValid(cm01.getEvnt07()) ){
        $scope.isLogged = isAuthenticated();
        cm01.setEvnt07(null);
      }
    });
              
    //Indica si el usuario esta logueado
    function isAuthenticated( ) {
      return User.isAuthenticated() && User.getCurrentId()!=null;
    }

    $scope.isLogged = isAuthenticated();
}]);

/*Enlace acceder o salir del sistema*/
angular.module('app').component('accessLogoutComponent',
{
      templateUrl: '../../views/user/accessLogout.html',
      controller : 'AccessLogoutController'
});

angular.module('app').component('detailUserComponent',
{
      templateUrl: '../../views/user/detail.html',
      controller : 'UserController'
});