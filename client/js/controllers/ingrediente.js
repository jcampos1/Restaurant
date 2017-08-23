// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('IngredienteController', ['$scope', 'Ingrediente', 'cm01', 'ms01', '$uibModal', '$location', '$log', function($scope, Ingrediente, cm01, ms01,
      $uibModal, $location, $log) {
        var vm = this;

        $scope.ingredientes = [];

        //Muestra en detalle la información
        vm.detailIngrediente = function() {
          if( cm01.isValid(cm01.getData05()) ) {
            var modalInstance = $uibModal.open({
              animation : true,
              templateUrl : 'modalDetailIngrediente.html',
              controller : 'DetailIngredienteController',
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

        //Muestra formulario de creación
        vm.newIngrediente = function() {
          var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'modalNewIngrediente.html',
            controller : 'NewIngredienteController',
            backdrop: true,
            size : "md"
          });
          modalInstance.result.then(function() {
          }, function() {
          });
        }

        //Muestra formulario de edición
        vm.editIngrediente = function() {
          if( cm01.isValid(cm01.getData05()) ) {
            var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'modalEditIngrediente.html',
            controller : 'EditIngredienteController',
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

        //Eliminación
        $scope.dropIngrediente = function() {
          if( cm01.isValid(cm01.getData05()) ) {
            ms01.dropIngrediente();
          }else{
            ms01.unselected();
          }
        }

        //Graba la categoria seleccionada
        $scope.selectedIngrediente = function( ingrediente ) {
          cm01.setData05(ingrediente);
        }
        
        //Encuentra todas las mesas
        $scope.ingredienteFind = function( ) {
          Ingrediente.find({"filter":{"where": {"active":"true"}}}).$promise
          .then(function(results) {
            $scope.ingredientes = results;
          });
        }

        //Evento para recargar mesas
        $scope.$watch(function() { return cm01.getEvnt10() }, function() {
          if( cm01.isValid(cm01.getEvnt10()) ){
            $scope.ingredienteFind( );
            cm01.setEvnt10(null);
          }
        });
              
        //Acción ejecutada después de confirmar eliminación
        $scope.$watch(function() { return cm01.getEvnt11() }, function() {
          if( cm01.isValid(cm01.getEvnt11()) ){
            cm01.getData05().active = false;
            cm01.getData05().$save().then(function(instance){
              $scope.ingredienteFind();
              ms01.msgSuccess();
              cm01.setData05(null);
              cm01.setEvnt11(null);
            });
          }
	      });

        //Encuentra todas las mesas
        $scope.ingredienteFind( );

        //Evento para resaltar opción actual seleccionada
        ms01.sidebarRightAdmin($scope);
  }]);

angular.module("app").controller('DetailIngredienteController',
  ['$scope', 'cm01', '$uibModalInstance', 'INGR', '$log', function($scope, cm01, $uibModalInstance, INGR,
    $log) {

      $scope.ingrediente = cm01.getData05();

      $scope.types = INGR;

      $scope.type = $scope.types[$scope.ingrediente.type];
      
      $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
      };
}]);

angular.module("app").controller('NewIngredienteController',
  ['$scope', 'Ingrediente', 'cm01', 'ms01', 'FileUploader', '$uibModalInstance', 'INGR', 'notify', '$state', '$location', '$log', function($scope, Ingrediente, cm01, ms01, FileUploader, $uibModalInstance, INGR, notify,
    $state, $location, $log) {

      $scope.ingrediente = new Object();

      $scope.types = INGR;
      
      //Creación de mesa
      $scope.save = function( form ) {
        if( form.$valid ) {
          if( $scope.image ){
            $scope.ingrediente.image= $scope.image.file.name
          }
          $scope.ingrediente.type = $scope.type.value;
          Ingrediente.create($scope.ingrediente).$promise
          .then(function(ingrediente) {
            cm01.setEvnt10("emit");
            ms01.msgSuccess();
            $scope.cancel();
            $scope.image.upload();
          });
        }
      }

      $scope.changeType = function() {
        if($scope.type.value == 0) {
          $scope.ingrediente.price = '';
        }
      }

        // create a uploader with options
      var uploader = $scope.uploader = new FileUploader({
        scope: $scope,                          // to automatically update the html. Default: $rootScope
        url: '/api/containers/container1/upload',
        formData: [
          { key: 'value' }
        ]
      });

      // REGISTER HANDLERS
      // --------------------
      uploader.onAfterAddingFile = function(item) {
        $scope.image = item;
      };

      $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
      };
}]);

angular.module("app").controller('EditIngredienteController',
  ['$scope', 'Ingrediente', 'cm01', 'ms01', 'FileUploader', '$uibModalInstance', 'INGR', '$state', '$location', '$log', function($scope, Ingrediente, cm01, ms01, FileUploader, $uibModalInstance, INGR,
    $state, $location, $log) {

      $scope.ingrediente = cm01.getData05();

      $scope.types = INGR;

      $scope.type = $scope.types[$scope.ingrediente.type];
      
      $scope.edit = function( form ) {
        if( form.$valid ) {
          if( $scope.image ){
            $scope.ingrediente.image= $scope.image.file.name
          }
          $scope.ingrediente.type = $scope.type.value;
          $scope.ingrediente.$save().then(function(instance){
            ms01.msgSuccess();
            cm01.setEvnt10("emit");
            cm01.setData05(null);
            $scope.cancel();
          });
        }
      }

      $scope.changeType = function() {
        if($scope.type.value == 0) {
          $scope.ingrediente.price = '';
        }
      }

      // create a uploader with options
      var uploader = $scope.uploader = new FileUploader({
        scope: $scope,                          // to automatically update the html. Default: $rootScope
        url: '/api/containers/container1/upload',
        formData: [
          { key: 'value' }
        ]
      });

      // REGISTER HANDLERS
      // --------------------
      uploader.onAfterAddingFile = function(item) {
        $scope.image = item;
      };

      $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
      };
}]);

angular.module('app').component('newIngredienteComponent',
{
      templateUrl: '../../views/ingrediente/create.html',
      controller : 'IngredienteController'
});

angular.module('app').component('editIngredienteComponent',
{
      templateUrl: '../../views/ingrediente/edit.html',
      controller : 'IngredienteController'
});

angular.module('app').component('listIngredienteComponent',
{
      templateUrl: '../../views/ingrediente/list.html',
      controller : 'IngredienteController'
});

angular.module('app').component('detailIngredienteComponent',
{
      templateUrl: '../../views/ingrediente/detail.html',
      controller : 'IngredienteController'
});