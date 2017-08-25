// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular.module("app").controller('OrderController',
['$scope', 'Order', '$uibModal', 'cm01', 'ms01', '$log', 
function($scope, Order, $uibModal, cm01,ms01, $log) {

    var vm = this;

    //Muestra en detalle la información
    vm.detailOrder = function() {
        if( cm01.isValid(cm01.getData07()) ) {
            var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'modalDetailOrder.html',
            controller : 'DetailOrderController',
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

    //Muestra el proceso de cambio de mesa
    vm.moveBoardOfOrder = function() {
        if( cm01.isValid(cm01.getData07()) ) {
            var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'modalMoveBoardOfOrder.html',
            controller : 'MoveBoardOfOrderController',
            backdrop: true,
            size : "lg"
            });
            modalInstance.result.then(function() {
            }, function() {
            });
        }else{
            ms01.unselected();
        }
    }

    //Eliminación
    $scope.dropOrder = function() {
        if( cm01.isValid(cm01.getData07()) ) {
          ms01.dropOrder();
        }else{
          ms01.unselected();
        }
    }

    //Graba el pedido seleccionado
    $scope.selectedOrder = function( order ) {
        cm01.setData07(order);
    }

    //Encuentra todas las ordenes en estado abierto
    $scope.orderFind = function( ) {
        Order.find({"filter":{"where": {"active":"true"}}}).$promise
        .then(function(results) {
            $scope.orders = results;
            $log.info("LISTA DE ORDENES");$log.info(results);
        });
    }

    //Acción ejecutada después de confirmar eliminación
    $scope.$watch(function() { return cm01.getEvnt13() }, function() {
        if( cm01.isValid(cm01.getEvnt13()) ){
          cm01.getData07().active = false;
          cm01.getData07().$save().then(function(instance){
            $scope.orderFind();
            ms01.msgSuccess();
            cm01.setData07(null);
            cm01.setEvnt13(null);
          });
        }
    });

    $scope.orderFind();
}]);

//Detalle de pedido de usuario
angular.module("app").controller('DetailOrderController',
['$scope', 'Order', 'cm01', '$uibModalInstance', '$log', function($scope, Order, cm01, $uibModalInstance,
  $log) {

    //Pedido seleccionado
    $scope.order = cm01.getData07();

    //Encuentra todas las ordenes en estado abierto
    $scope.orderFind = function( ) {
        Order.find({"filter":{"where": {"active":"true"}}}).$promise
        .then(function(results) {
            $scope.orders = results;

            $scope.orders.forEach(function (order) {
                order.items = Order.items({id: order.id});
            });
            $log.info("LISTA DE ORDENES");$log.info(results);
        });
    }
    
    $scope.cancel = function() {
      $uibModalInstance.dismiss(false);
    };
}]);

//Muestra el modal para el cambio de mesa
angular.module("app").controller('MoveBoardOfOrderController',
['$scope', 'Order', 'Board', 'cm01', 'ms01', '$uibModalInstance', '$log', 
function($scope, Order, Board, cm01, ms01, $uibModalInstance,
  $log) {

    //Pedido seleccionado
    $scope.order = cm01.getData07();

    //Encuentra todas las mesas disponibles
    $scope.boardFind = function( ) {
        Board.find({"filter":{"where": {"active":"true"}}}).$promise
        .then(function(results) {
            $scope.boards = results;
            console.log(results);
        });
    }

    $scope.selectedBoard = function( board ) {
        cm01.setData08(board);
        ms01.moveBoardOfOrder();
    }

    //Acción ejecutada después de confirmar la movilizacion de mesa
    $scope.$watch(function() { return cm01.getEvnt14() }, function() {
        if( cm01.isValid(cm01.getEvnt14()) ){
            alert("SE EFECTUA EL CAMBIO A LA MESA: "+cm01.getData08().number);
            $scope.cancel();
        }
    });

    $scope.boardFind();
    
    $scope.cancel = function() {
      $uibModalInstance.dismiss(false);
    };
}]);

angular
  .module('app')

  .controller('NewOrderController', ['$scope', 'Order', 'Board', 'Category', 'Item', 'Product', 'Ingrediente', 'INGR', 'cm01', 'ms01', '$uibModal', '$location', '$log', 
  function($scope, Order, Board, Category, Item, Product, Ingrediente, INGR, cm01, ms01,
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
                        $scope.order.items = $scope.lstItems;
                        $scope.order.total = $scope.total;
                        $log.info("LA COMANDA A ATENDER ES:");
                        $log.info($scope.order);

                        /*AQUI ESTA LA MAGIA*/
                        $scope.order.orderdate = "2017-08-24T22:53:44.688Z";
                        $scope.order.boardnumb = $scope.order.board.number;
                        $scope.order.hola = "hola";

                        Order.create($scope.order).$promise
                        .then(function(order) {
                            $scope.order.items.forEach(function (item){
                                console.log('item product:' + item.product.name);
                                //item.orderId = order.id;
                                item.productId = item.product.id;

                                Order.items.create({id: order.id}, item).$promise
                                .then(function(miitem) {
                                    item.lstAdd.forEach(function(ingr) {
                                        Item.adds.link({id: miitem.id}, {fk: ingr.id}).$promise
                                        .then(function(elem) {
                                            console.log('Ingrediente añadido');
                                        });
                                    });

                                    item.lstQuit.forEach(function(ingr) {
                                        Item.quits.link({id: miitem.id}, {fk: ingr.id}).$promise
                                        .then(function(elem) {
                                            console.log('Ingrediente añadido');
                                        });
                                    });
                                });
                                /*Item.create(item).$promise
                                .then(function(miitem) {
                                    console.log('item añadido');
                                });*/
                            });

                            ms01.msgSuccess();
                            $scope.cancel();
                        });
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
  }]);

  angular.module('app').component('detailOrderComponent',
  {
        templateUrl: '../../views/order/detail.html',
        controller : 'OrderController'
  });

  angular.module('app').component('moveBoardOfOrderComponent',
  {
        templateUrl: '../../views/order/moveBoardOfOrder.html',
        controller : 'OrderController'
  });