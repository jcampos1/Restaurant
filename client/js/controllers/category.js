// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('CategoryController', ['$scope', 'Category', 'cm01', 'ms01', '$uibModal', '$location', '$log', function($scope, Category, cm01, ms01,
      $uibModal, $location, $log) {
        var vm = this;

        $scope.categorys = [];

        //Muestra en detalle la información
        vm.detailCategory = function() {
          if( cm01.isValid(cm01.getData02()) ) {
            var modalInstance = $uibModal.open({
              animation : true,
              templateUrl : 'modalDetailCategory.html',
              controller : 'DetailCategoryController',
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
        vm.newCategory = function() {
          var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'modalNewCategory.html',
            controller : 'NewCategoryController',
            backdrop: true,
            size : "md"
          });
          modalInstance.result.then(function() {
          }, function() {
          });
        }

        //Muestra formulario de edición
        vm.editCategory = function() {
          if( cm01.isValid(cm01.getData02()) ) {
            var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'modalEditCategory.html',
            controller : 'EditCategoryController',
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
        $scope.dropCategory = function() {
          if( cm01.isValid(cm01.getData02()) ) {
            ms01.dropCategory();
          }else{
            ms01.unselected();
          }
        }

        //Graba la categoria seleccionada
        $scope.selectedCategory = function( category ) {
          cm01.setData02(category);
        }
        
        //Encuentra todas las mesas
        $scope.categoryFind = function( ) {
          Category.find({"filter":{"where": {"active":"true"}}}).$promise
          .then(function(results) {
            $scope.categorys = results;
          });
        }

        //Evento para recargar mesas
        $scope.$watch(function() { return cm01.getEvnt03() }, function() {
          if( cm01.isValid(cm01.getEvnt03()) ){
            $scope.categoryFind( );
            cm01.setEvnt03(null);
          }
        });
              
        //Acción ejecutada después de confirmar eliminación
        $scope.$watch(function() { return cm01.getEvnt04() }, function() {
          if( cm01.isValid(cm01.getEvnt04()) ){
            cm01.getData02().active = false;
            cm01.getData02().$save().then(function(instance){
              $scope.categoryFind();
              ms01.msgSuccess();
              cm01.setData02(null);
              cm01.setEvnt04(null);
            });
          }
	      });

        //Encuentra todas las mesas
        $scope.categoryFind( );

        //Evento para resaltar opción actual seleccionada
        ms01.sidebarRightAdmin($scope);
  }]);

angular.module("app").controller('DetailCategoryController',
  ['$scope', 'cm01', '$uibModalInstance', '$log', function($scope, cm01, $uibModalInstance,
    $log) {

      $scope.category = cm01.getData02();
      
      $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
      };
}]);

angular.module("app").controller('NewCategoryController',
  ['$scope', 'Category', 'cm01', 'ms01', 'FileUploader', '$uibModalInstance', 'notify', '$state', '$location', '$log', function($scope, Category, cm01, ms01, FileUploader, $uibModalInstance, notify,
    $state, $location, $log) {

    $scope.category = new Object();

    //Creación de mesa
    $scope.save = function( form ) {
      if( form.$valid ) {
        if( $scope.image ){
          $scope.category.image= $scope.image.file.name
        }
        Category.create($scope.category).$promise
        .then(function(category) {
          cm01.setEvnt03("emit");
          ms01.msgSuccess();
          $scope.cancel();
          $scope.image.upload();
        });
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

angular.module("app").controller('EditCategoryController',
  ['$scope', 'Category', 'Container', 'FileUploader', 'cm01', 'ms01', '$uibModalInstance', '$state', '$location', '$log', 
  function($scope, Category, Container, FileUploader, cm01, ms01, $uibModalInstance,
    $state, $location, $log) {

      $scope.category = cm01.getData02();
      
      $scope.edit = function( form ) {
        if( form.$valid ) {
          if( $scope.image ){
            $scope.category.image= $scope.image.file.name
            Container.getFile(
              {container: "container1", file: $scope.category.image},
              //Se ejecuta si existe el archivo
              function(file){
              },
            //Es ejecutado si no existe
            function(err) {
              $scope.image.upload();
            });
          }
          $scope.category.$save().then(function(instance){
            ms01.msgSuccess();
            cm01.setEvnt03("emit");
            cm01.setData02(null);
            $scope.cancel();
          });
        }
      }

      // create a uploader with options
      var uploader = $scope.uploader = new FileUploader({
        scope: $scope,                       
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

angular.module('app').component('newCategoryComponent',
{
      templateUrl: '../../views/category/create.html',
      controller : 'CategoryController'
});

angular.module('app').component('editCategoryComponent',
{
      templateUrl: '../../views/category/edit.html',
      controller : 'CategoryController'
});

angular.module('app').component('listCategoryComponent',
{
      templateUrl: '../../views/category/list.html',
      controller : 'CategoryController'
});

angular.module('app').component('detailCategoryComponent',
{
      templateUrl: '../../views/category/detail.html',
      controller : 'CategoryController'
});