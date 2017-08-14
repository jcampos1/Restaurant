// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('ProductController', ['$scope', 'Product', 'Category', 'cm01', 'ms01', '$uibModal', '$location', '$log', function($scope, Product, Category, cm01, ms01,
      $uibModal, $location, $log) {
        var vm = this;
        $scope.products = [];

        //Muestra en detalle la información
        vm.detailProduct = function() {
          if( cm01.isValid(cm01.getData03()) ) {
            var modalInstance = $uibModal.open({
              animation : true,
              templateUrl : 'modalDetailProduct.html',
              controller : 'DetailProductController',
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
        vm.newProduct = function() {
          var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'modalNewProduct.html',
            controller : 'NewProductController',
            backdrop: true,
            size : "md"
          });
          modalInstance.result.then(function() {
          }, function() {
          });
        }

        //Muestra formulario de edición
        vm.editProduct = function() {
          if( cm01.isValid(cm01.getData03()) ) {
            var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'modalEditProduct.html',
            controller : 'EditProductController',
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
        $scope.dropProduct = function() {
          if( cm01.isValid(cm01.getData03()) ) {
            ms01.dropProduct();
          }else{
            ms01.unselected();
          }
        }

        //Graba el producto seleccionado
        $scope.selectedProduct = function( product ) {
          cm01.setData03(product);
        }
        
        //Encuentra todas los productos
        $scope.productFind = function( ) {
          Product.find({"filter":{"where": {"active":"true"}}}).$promise
          .then(function(results) {
            $log.info("LOS PRODUCTOS SON");
            $log.info(results);
            $scope.products = results;
          });
        }

        //Evento para recargar productos
        $scope.$watch(function() { return cm01.getEvnt05() }, function() {
          if( cm01.isValid(cm01.getEvnt05()) ){
            $scope.productFind( );
            cm01.setEvnt05(null);
          }
        });

        //Acción ejecutada después de confirmar eliminación
        $scope.$watch(function() { return cm01.getEvnt06() }, function() {
          if( cm01.isValid(cm01.getEvnt06()) ){
            cm01.getData03().active = false;
            Category.products.updateById(
            {id: cm01.getData03().categoryId, fk: cm01.getData03().id},
            cm01.getData03()).$promise
            .then(function(instance) {
              $scope.productFind();
              ms01.msgSuccess();
              cm01.setData03(null);
              cm01.setEvnt06(null);
            });
          }
	      });

        //Encuentra todos las productos
        $scope.productFind( );

        //Evento para resaltar opción actual seleccionada
        ms01.sidebarRightAdmin($scope);
  }]);

angular.module("app").controller('DetailProductController',
  ['$scope', 'Category', 'cm01', '$uibModalInstance', '$log', function($scope, Category, cm01, $uibModalInstance,
    $log) {

      $scope.product = cm01.getData03();

      //Encuentra la categoria asociada al producto
      Category.findById({id: $scope.product.categoryId}).$promise
      .then(function(category) {
        $scope.category = category;
      });
      
      $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
      };
}]);

angular.module("app").controller('NewProductController',
  ['$scope', 'Product', 'Category', 'cm01', 'ms01', '$uibModalInstance', '$state', '$location', '$log', function($scope, Product, Category, cm01, ms01, $uibModalInstance,
    $state, $location, $log) {

      $scope.product = new Object();
      $scope.categorys = new Array( );
      
      //Encuentra todas las categorias
      Category.find({"filter":{"where": {"active":"true"}}}).$promise
      .then(function(results) {
        $scope.categorys = results;
      });
        
      //Creación de mesa
      $scope.save = function( form ) {
        if( form.$valid ) {
          Category.products.create({id: $scope.category.id}, $scope.product).$promise
          .then(function(product) {
            cm01.setEvnt05("emit");
            ms01.msgSuccess();
            $scope.cancel();
          });
        }
      }
      $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
      };
}]);

angular.module("app").controller('EditProductController',
  ['$scope', 'Product', 'Category', 'cm01', 'ms01', '$uibModalInstance', '$state', '$location', '$log', function($scope, Product, Category, cm01, ms01, $uibModalInstance,
    $state, $location, $log) {

      $scope.product = cm01.getData03();
      var beforeCat;

      //Encuentra todas las categorias
      Category.find({"filter":{"where": {"active":"true"}}}).$promise
      .then(function(results) {
        $scope.categorys = results;
      });

      //Encuentra la categoria asociada al producto
      Category.findById({id: $scope.product.categoryId}).$promise
      .then(function(category) {
        $scope.category = category;
        beforeCat = category;
      });
      
      //Ediciòn de producto
      $scope.edit = function( form ) {
        if( form.$valid ) {
          $scope.product.categoryId = $scope.category.id;
          Category.products.updateById(
            {id: beforeCat.id, fk: $scope.product.id},
            $scope.product).$promise
          .then(function(product) {
            $log.info("el producto editado es");$log.info(product);
            ms01.msgSuccess();
            cm01.setEvnt05("emit");
            cm01.setData03(null);
            $scope.cancel();
          });
        }
      }

      $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
      };
}]);

angular.module('app').component('newProductComponent',
{
      templateUrl: '../../views/product/create.html',
      controller : 'ProductController'
});

angular.module('app').component('editProductComponent',
{
      templateUrl: '../../views/product/edit.html',
      controller : 'ProductController'
});

angular.module('app').component('listProductComponent',
{
      templateUrl: '../../views/product/list.html',
      controller : 'ProductController'
});

angular.module('app').component('detailProductComponent',
{
      templateUrl: '../../views/product/detail.html',
      controller : 'ProductController'
});