// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('OrderController', ['$scope', 'Order', 'Board', 'Category', 'Product', 'Ingrediente', 'INGR', 'cm01', 'ms01', '$uibModal', '$location', '$log', 
  function($scope, Order, Board, Category, Product, Ingrediente, INGR, cm01, ms01,
      $uibModal, $location, $log) {
        var vm = this;

        $scope.boards = [];
        $scope.products = [];
        $scope.categorys = [];
        $scope.types = INGR;

        $scope.orders = [];

        valorsInitials( );

        //Asigna/restaura valores
        function valorsInitials( ) {
          $scope.lstItems = [];
          $scope.total = 0;
          $scope.order = new Object();
          //Por defecto el pedido es para comer en el sitio
          $scope.order.onSite = true;

        }

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
            $scope.lstAdd = new Array();
            $scope.lstQuit = new Array();
    
            $scope.item.lstAdd = $scope.lstAdd;
            $scope.item.lstQuit = $scope.lstQuit;
            $scope.total += product.price; 

            $scope.lstItems.push($scope.item);
            ms01.msgAdd();
        }

        //Cancela un item del pedido
        $scope.quitItem = function( $index, product ) {
            //Se descuenta el producto  
            $scope.total -= product.price*$scope.lstItems[$index].cant;
            //Se descuenta sus adicionales
            $scope.lstItems[$index].lstAdd.forEach(function(elem){
                $scope.total -= elem.price;
            });
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

        //Graba el indice del producto seleccionado para agregar ingrediente (adicional o principal)
        $scope.selectProductForIngr = function( $index ){
            console.log("SE SELECCIONO PRODUCTO");
            cm01.setData06($index);
        }

        //Asocia un ingrediente a un producto
        $scope.associateIngToProd = function( ingr ) {
            if( cm01.getData06() != null ){
              //¿Es adicional?
              if( ingr.type == INGR[1].value ) {
                  $scope.lstItems[cm01.getData06()].lstAdd.push(angular.copy(ingr));
                  $log.info("Lista de adicionales es: "); $log.info($scope.lstItems[cm01.getData06()].lstAdd);
                  $scope.total += ingr.price;
              }else{
                  $scope.lstItems[cm01.getData06()].lstQuit.push(angular.copy(ingr));
              }
            }else{
              ms01.dontProduct();
            }
        }

        //Cancela ingrediente adicional asociado a un producto
        $scope.quitIngrOfProd = function( $key, $index ){
            $scope.total -= $scope.lstItems[$key].lstAdd[$index].price;
            $scope.lstItems[$key].lstAdd.splice($index, 1);
            ms01.msgDestroy();
        }

        //Cancela observacion asociado a un producto
        $scope.quitObserOfProd = function( $key, $index ){
            $scope.lstItems[$key].lstQuit.splice($index, 1);
            ms01.msgDestroy();
        }

        //CONFIRMAR PEDIDO
        $scope.confirm = function( ){
          //Se selecciono al menos un producto?
            if( $scope.lstItems.length > 0 ){
                //Para llevar?
                if( $scope.order.onSite ){
                    //Se selecciono una mesa?
                    if( $scope.order.board instanceof Object ){
                        $scope.order.lstProducts = $scope.lstItems;
                        $scope.order.total = $scope.total;
                        $log.info("LA COMANDA A ATENDER ES:");
                        $log.info($scope.order);
                    }else{
                        //Alerta de mesa no seleccionada
                        ms01.dontBoard();
                    }
                }else{
                    $scope.order.lstProducts = $scope.lstItems;
                    $scope.order.total = $scope.total;
                    $log.info("LA COMANDA A ATENDER ES:");
                    $log.info($scope.order);
                }
            }else{
                //Alerta de ningun producto asociado al pedido
                ms01.zeroProduct();
            }
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


        ///////////////////////////////////////////////
        $scope.orderFind = function( ) {
          Order.find({"filter":{"where": {"active":"true"}}}).$promise
          .then(function(results) {
            $scope.orders = results;
          });
        }

         $scope.orderFind();
  }]);
