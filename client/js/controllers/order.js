// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('OrderController', ['$scope', 'Board', 'Category', 'Product', 'cm01', 'ms01', '$uibModal', '$location', '$log', function($scope, Board, Category, Product, cm01, ms01,
      $uibModal, $location, $log) {
        var vm = this;

        $scope.boards = [];
        $scope.products = [];
        $scope.categorys = [];
        $scope.lstItems = [];
        $scope.total = 0;
        $scope.order = new Object();
        
        //Asina mesa al pedido
        $scope.selectBoard = function ( board ) {
            if( !($scope.order.board instanceof Object) ){
                $scope.order.board = board;
            }else{
              ms01.twiceBoard();
            }
        }

        //Agrega un producto a un pedido
        $scope.selectProduct = function ( product ) {
            order.product = product;
            order.cant = 1;
            order.lstAdd = new Array();
            order.lstQuit = new Array();
            $scope.total += product.price; 

            $scope.lstItems.push(order);
            ms01.msgAdd();
        }

        //Cancela un item del pedido
        $scope.quitItem = function( $index, product ) {
            $scope.total -= product.price;
            ms01.arrayDestroyByIndex( $scope.lstItems, $index );
            ms01.msgDestroy();
        }

        $scope.Inc

        //Encuentra todas las mesas con un filtro
        $scope.boardFind = function( ) {
          Board.find({"filter": {"where": {"active":"true", "free": "true"}}}).$promise
          .then(function(results) {
            $scope.boards = results;
          });
        }

        //Encuentra todas las categorias
        $scope.categoryFind = function( ) {
          Category.find({"filter": {"where": {"active":"true"}}}).$promise
          .then(function(results) {
            $scope.categorys = results;
          });
        }

        //Encuentra todos los productos
        $scope.productFind = function( ) {
          $scope.filterProduct = "Todos";
          $scope.productFindByFilter({"where": {"active":"true"}});
          $scope.categoryFind();
        }

        //Encuentra todos los productos pertenecientes a una categoria
        $scope.productsByCategory = function( category ) {
          $scope.filterProduct = category.name;
          $scope.productFindByFilter({"where": {"active":"true", "categoryId": ""+category.id}});
        }

        //Encuentra los productos con un filtro
        $scope.productFindByFilter = function( filter ) {
          Product.find({"filter": filter}).$promise
          .then(function(results) {
            console.log("RESULTADOS");
            console.log(results);
            $scope.products = results;
          });
        }

        //Comprueba si un producto ya fue seleccionado
        function exist( product ){
            $scope.lstProducts.forEach(function(element) {
                if( element.id == product.id ){
                    return true;
                }
            }, this);
            return false;
        }

        $scope.boardFind();
  }]);
