// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('OrderController', ['$scope', 'Board', 'Category', 'Product', 'Ingrediente', 'INGR', 'cm01', 'ms01', '$uibModal', '$location', '$log', 
  function($scope, Board, Category, Product, Ingrediente, INGR, cm01, ms01,
      $uibModal, $location, $log) {
        var vm = this;

        $scope.boards = [];
        $scope.products = [];
        $scope.categorys = [];
        $scope.types = INGR;
        $scope.lstItems = [];
        $scope.total = 0;
        $scope.order = new Object();
        
        /****************ACCIONES SOBRE MESAS ************************ */
        //Asina mesa al pedido
        $scope.selectBoard = function ( board ) {
            if( !($scope.order.board instanceof Object) ){
                $scope.order.board = board;
            }else{
              ms01.twiceBoard();
            }
        }

        //Encuentra todas las mesas con un filtro
        $scope.boardFind = function( ) {
          Board.find({"filter": {"where": {"active":"true", "free": "true"}}}).$promise
          .then(function(results) {
            $scope.boards = results;
          });
        }
        /************************************************************* */

        /****************ACCIONES SOBRE PRODUCTOS********************* */
        //Agrega un producto a un pedido
        $scope.selectProduct = function ( product ) {
            $scope.item = new Object();
            $scope.item.product = product;
            $scope.item.cant = 1;
            $scope.item.lstAdd = new Array();
            $scope.item.lstQuit = new Array();
            $scope.total += product.price; 

            $scope.lstItems.push($scope.item);
            ms01.msgAdd();
        }

        //Cancela un item del pedido
        $scope.quitItem = function( $index, product ) {
            $scope.total -= product.price*$scope.lstItems[$index].cant;
            ms01.arrayDestroyByIndex( $scope.lstItems, $index );
            ms01.msgDestroy();
        }

        //Aumentar la cantidad pedida de un producto seleccionado
        $scope.aument = function( $index ) {
          var item = $scope.lstItems[$index];
          item.cant++;
          $scope.total += item.product.price;
          $scope.lstItems[$index] = item;
          $("#cant"+$index).val(item.cant);
        }

        //Reducir la cantidad pedida de un producto seleccionado
        $scope.reduc = function( $index ) {
          var item = $scope.lstItems[$index]
          item.cant--;
          $scope.total -= item.product.price;
          $scope.lstItems[$index] = item;
          $("#cant"+$index).val(item.cant);
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
        /************************************************************ */

         /***************ACCIONES SOBRE INGREDIENTES***************** */
        //Encuentra todos los ingredientes
        $scope.ingredienteFind = function( ) {
          $scope.filterIngrediente = INGR[1].dsca;
          $scope.ingredienteFindByFilter({"where": {"active":"true", "type": "1" }});
        }

        //Encuentra todos los productos pertenecientes a una categoria
        $scope.ingredientesByType = function( type ) {
          $scope.filterIngrediente = type.dsca;
          $scope.ingredienteFindByFilter({"where": {"active":"true", "type": ""+type.value}});
        }

        //Encuentra los ingredientes con un filtro
        $scope.ingredienteFindByFilter = function( filter ) {
          Ingrediente.find({"filter": filter}).$promise
          .then(function(results) {
            console.log("RESULTADOS");
            console.log(results);
            $scope.ingredientes = results;
          });
        }
        /************************************************************ */

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
