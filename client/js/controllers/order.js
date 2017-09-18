// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular.module("app").controller('OrderController',
['$scope', 'Order', '$uibModal', 'cm01', 'ms01', '$log', 'STOR', 
function($scope, Order, $uibModal, cm01,ms01, $log, STOR) {

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

    //Muestra el tiket de una orden para su posterior impresión
    vm.printOrder = function() {
        if( cm01.isValid(cm01.getData07()) ) {
            var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'printOrder.html',
            controller : 'PrintOrderController',
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

    //Muestra el modal para el pago del pedido
    vm.paymentOrder = function() {
        if( cm01.isValid(cm01.getData07()) ) {
            var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'paymentOrder.html',
            controller : 'PaymentOrderController',
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
        Order.find({"filter":{"where": {"active":"true", "stat":""+STOR[0].value}}}).$promise
        .then(function(results) {
            $scope.orders = results;
            $scope.orders.forEach(function(order, $index){
                $scope.orders[$index].board = Order.board({id: order.id});
                $scope.orders[$index].user = Order.user({id: order.id});
            });
        });
    }

    //Acción ejecutada después de confirmar eliminación
    $scope.$watch(function() { return cm01.getEvnt13() }, function() {
        if( cm01.isValid(cm01.getEvnt13()) ){
          cm01.getData07().stat = STOR[2].value;
          cm01.getData07().active = false;
          cm01.getData07().$save().then(function(instance){
            $scope.orderFind();
            ms01.msgSuccess();
            cm01.setData07(null);
            cm01.setEvnt13(null);
          });
        }
    });

    //Actualizar lista de pedidos
    $scope.$watch(function() { return cm01.getEvnt12() }, function() {
        if( cm01.isValid(cm01.getEvnt12()) ){
            $scope.orderFind();
            cm01.setEvnt12(null);
        }
    });

    $scope.orderFind();
}]);

//Detalle de pedido de usuario
angular.module("app").controller('DetailOrderController',
['$scope', 'Order', 'Item', 'cm01', '$uibModalInstance', '$log', 
function($scope, Order, Item, cm01, $uibModalInstance,
  $log) {

    //Pedido seleccionado
    $scope.order = cm01.getData07();
    
    //Lista de items
    Order.items({id: $scope.order.id}, function(items){
        $scope.items = items;
        $scope.items.forEach(function(item, $index){
            $scope.items[$index].product = Item.product({id: item.id});
        });
    });
    
    //Mesa asignada a la orden
    $scope.board = Order.board({id: $scope.order.id});

    $scope.cancel = function() {
      $uibModalInstance.dismiss(false);
    };
}]);

//Impresión de pedido de usuario
angular.module("app").controller('PrintOrderController',
['$scope', 'Order', 'User', 'Item', 'cm01', '$uibModalInstance', '$log', 
function($scope, Order, User, Item, cm01, $uibModalInstance,
  $log) {

    //Pedido seleccionado
    $scope.order = cm01.getData07();
    $scope.today = new Date(); 

    User.getCurrent(
        function(user){
            $scope.user = user;
        },
        function(err){
            $log.warn(err);
    });

    //Lista de items
    Order.items({id: $scope.order.id}, function(items){
        $scope.items = items;
        $scope.items.forEach(function(item, $index){
            $scope.items[$index].product = Item.product({id: item.id});
        });
    });
    
    //Mesa asignada a la orden
    $scope.board = Order.board({id: $scope.order.id});

    $scope.confirm = function() {
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="../../css/styles.css" /></head><body onload="window.print()">' + $("#printAreaId").html() + '</html>');
        popupWinindow.document.close();
        $uibModalInstance.dismiss(false);
    };

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
    //Mesa del pedido seleccionado
    $scope.board = Order.board({id: $scope.order.id});

    //Encuentra todas las mesas disponibles
    $scope.boardFind = function( ) {
        Board.find({"filter":{"where": {"active":"true", "free":"true"}}}).$promise
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
            $scope.order.board = cm01.getData08();
            $scope.order.$save().then(function(instance){
                //Se indica que la nueva mesa asignada no esta disponible
                cm01.getData08().free = false;
                cm01.getData08().$save().then(function(instance){
                     $log.info("Nueva mesa: " +instance.number+" ahora esta no disponible " );
                });
                //Se indica que la antigua mesa asignada ahora esta disponible
                $scope.board.free = true;
                $scope.board.$save().then(function(instance){
                    $log.info("Antigua mesa: " +$scope.board.number+" ahora esta disponible " );
                });
                ms01.msgSuccess();
                cm01.setData08(null);
                cm01.setEvnt14(null);
                cm01.setEvnt12("emit")
                $scope.cancel();
            });
        }
    });

    $scope.boardFind();
    
    $scope.cancel = function() {
      $uibModalInstance.dismiss(false);
    };
}]);

//Muestra el modal de confirmacion de pedido
angular.module("app").controller('ConfirmOrderController',
['$scope', 'Order', 'User', 'Board', 'cm01', 'ms01', '$uibModalInstance', '$log', 'order', 'items',
function($scope, Order, User, Board, cm01, ms01, $uibModalInstance,
  $log, order, items) {

    $scope.order = order;
    $scope.board = order.board;
    $scope.items = items;
    $scope.today = new Date();

    User.getCurrent(
        function(user){
            $scope.user = user;
        },
        function(err){
            $log.warn(err);
    });

    $scope.confirm = function() {
        cm01.setData09($("#printAreaId").html());
        $uibModalInstance.close(true);
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
    };
}]);

angular
  .module('app')

  .controller('NewOrderController', [
'$scope', '$rootScope', 'Order', 'Board', 'Category', 'Item', 'Product', 'Ingrediente', 'User', 'INGR', 'cm01', 'ms01', '$uibModal', '$location', '$log', '$timeout', '$window', 'STOR', 
  function($scope, $rootScope, Order, Board, Category, Item, Product, Ingrediente, User, INGR, cm01, ms01,
      $uibModal, $location, $log, $timeout, $window, STOR) {
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
                //Se activa el tab de productos
                $scope.productFind()
                $scope.active = 1;
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

            //Se activa el tab de ingredientes
            $scope.active = 2;
            $scope.ingredienteFind();
            
            //Se marca el producto seleccionado
            $timeout(function() {
                $scope.selectProductForIngr( $scope.lstItems.length-1 );
                $('.cls80').removeClass("clsSelected");
                $('#item'+$scope.lstItems.length).addClass("clsSelected");
            }, 600);
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

          $scope.lstItems[$index].lstAdd.forEach( function( add ) {
              if (add.type == INGR[1].value ) {
                  console.log( add );
                  $scope.total += add.price;
              }
            });
          $scope.lstItems[$index] = item;
          $("#cant"+$index).val(item.cant);
        }

        //Reducir la cantidad pedida de un producto seleccionado
        $scope.reduc = function( $index ) {
          var item = $scope.lstItems[$index]
          item.cant--;
          $scope.total -= item.product.price;
          $scope.lstItems[$index].lstAdd.forEach( function( add ) {
              if (add.type == INGR[1].value ) {
                  console.log( add );
                  $scope.total -= add.price;
              }
            });
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
            cm01.setData06($index);
        }

        //Asocia un ingrediente a un producto
        $scope.associateIngToProd = function( ingr ) {
            if( cm01.getData06() != null ){
              //¿Es adicional?
              if( ingr.type == INGR[1].value ) {
                  $scope.lstItems[cm01.getData06()].lstAdd.push(angular.copy(ingr));
                  $log.info("Lista de adicionales es: "); $log.info($scope.lstItems[cm01.getData06()].lstAdd);
                  $scope.total += $scope.lstItems[cm01.getData06()].cant*ingr.price;
              }else{
                  $scope.lstItems[cm01.getData06()].lstQuit.push(angular.copy(ingr));
              }
            }else{
              ms01.dontProduct();
            }
        }

        //Cancela ingrediente adicional asociado a un producto
        $scope.quitIngrOfProd = function( $key, $index ){
            $scope.total -= $scope.lstItems[$key].cant*$scope.lstItems[$key].lstAdd[$index].price;
            $scope.lstItems[$key].lstAdd.splice($index, 1);
            ms01.msgDestroy();
        }

        //Cancela observacion asociado a un producto
        $scope.quitObserOfProd = function( $key, $index ){
            $scope.lstItems[$key].lstQuit.splice($index, 1);
            ms01.msgDestroy();
        }

        //Muestra el proceso de cambio de mesa
        $scope.process = function() {
            $scope.order.total = $scope.total;

            var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'modalConfirmOrder.html',
            controller : 'ConfirmOrderController',
            backdrop: true,
            size : "md",
            resolve: {
                order: function () {return $scope.order},
                items: function(){return $scope.lstItems}
            }
            });
            modalInstance.result.then(
            function(confim) {
                if(confim) {
                    $scope.confirm();
                }
            }, function() {
            });
        }

        //CONFIRMAR PEDIDO
        $scope.confirm = function( ){
          //Se selecciono al menos un producto?
            if( $scope.lstItems.length > 0 ){
                //Para llevar?
                if( $scope.order.onSite ){
                    //Se selecciono una mesa?
                    if( $scope.order.board instanceof Object ){
                        $scope.order.boardnumb = $scope.order.board.number;
                        create();
                    }else{
                        //Alerta de mesa no seleccionada
                        ms01.dontBoard();
                    }
                }else{
                    $scope.order.lstProducts = $scope.lstItems;
                    $scope.order.total = $scope.total;
                    $scope.order.board = undefined;
                    create();
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

        //Crea un pedido
        function create() {
            var popupWinindow = $window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            $scope.order.items = $scope.lstItems;
            $scope.order.total = $scope.total;
            $log.info("LA COMANDA A ATENDER ES:");
            $log.info($scope.order);

            /*AQUI ESTA LA MAGIA*/
            $scope.order.orderdate = new Date();
            $log.info("LA fecha es: "+$scope.order.orderdate);

            User.getPrincipal().$promise
            .then(function(res) {
                //Usuario que crea la orden
                $scope.order.userId = res.userId;
                //Se crea la orden
                Order.create($scope.order).$promise
                .then(function(order) {
                    //Se indica que la mesa ya esta asignada
                    $scope.order.board.free = false;
                    $scope.order.board.$save().then(function(instance){
                        $log.info("Mesa " + instance.number+ " ocupada ");
                    });

                    $scope.order.items.forEach(function (item){
                        console.log('item product:' + item.product.name);
                        //item.orderId = order.id;
                        item.productId = item.product.id;
                        //Se crean los items para la orden
                        Order.items.create({id: order.id}, item).$promise
                        .then(function(miitem) {
                            item.lstAdd.forEach(function(ingr) {
                                Item.ingrds.link({id: miitem.id}, {fk: ingr.id}).$promise
                                .then(function(elem) {
                                    console.log('Ingrediente add añadido');
                                });
                            });

                            item.lstQuit.forEach(function(ingr) {
                                Item.ingrds.link({id: miitem.id}, {fk: ingr.id}).$promise
                                .then(function(elem) {
                                    console.log('Ingrediente quit añadido');
                                });
                            });

                            popupWinindow.document.open();
                            popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="../../css/styles.css" /></head><body onload="window.print()">' + cm01.getData09() + '</html>');
                            popupWinindow.document.close();
                        });
                        /*Item.create(item).$promise
                        .then(function(miitem) {
                            console.log('item añadido');
                        });*/
                    });
                    ms01.msgSuccess();
                    valorsInitials( );
                    $scope.active = 0;
                });
            });

            
        }

        $scope.boardFind();
  }]);

//Pago de pedido de usuario
angular.module("app").controller('BoxController',
['$scope', 'Order', 'Item', '$uibModal', 'cm01', 'ms01', '$log', '$timeout', '$window', 'STOR', 'PAY', 'INGR', 
function($scope, Order, Item, $uibModal, cm01, ms01, $log, $timeout, $window, STOR, PAY, INGR) {

    var vm = this;
    $scope.isPunto = 0;

    function valorsInitials(  ) {
        $scope.order = new Object( );  
        $scope.board = new Object( );
        $scope.items = new Array( );
        $scope.lstAdd = new Array();
        $scope.isPunto = 0;
        $scope.abon = null;
        //Se marca el producto seleccionado
        $timeout(function() {
            $('.cls89').removeClass("cls06Selected");
        }, 0);
    }
    
    //Encuentra todas las ordenes en estado cerrado para el dia actual
    $scope.orderFindClose = function(  ) {
        Order.orderFindClose(function(result){
            console.log("ordenes cerradas");
            console.log(result.orders);
            $scope.ordersClose = result.orders;
            $scope.ordersClose.forEach(function(order, $index){
                $scope.ordersClose[$index].board = Order.board({id: order.id});
                $scope.ordersClose[$index].payment = PAY[order.payment].dsca;
            });
        });
    }

    //Encuentra todas las ordenes en estado abierto para el dia actual
    $scope.orderFindOpen = function(  ) {
        Order.orderFindOpen(function(result){
            console.log("ordenes abiertas");
            console.log(result.orders);
            $scope.ordersOpen = result.orders;
            $scope.ordersOpen.forEach(function(order, $index){
                $scope.ordersOpen[$index].board = Order.board({id: order.id});
                $scope.ordersOpen[$index].payment = PAY[order.payment].dsca;
            });
      });
    }

    //Encuentra todas las ordenes en estado cerrado para el dia actual
    $scope.selectedOrder = function(  order ) {
        console.log(  order )

        $scope.order = order;  
        $scope.isPunto = 0;
        $scope.today = new Date(); 
        $scope.lstAdd = new Array();
        $scope.user = Order.user({id: $scope.order.id}); 
        var obj = new Object();

        //Lista de items
        Order.items({id: $scope.order.id}, function(items){
            $scope.items = items;
            $scope.items.forEach(function(item, $index){
                $scope.items[$index].product = Item.product({id: item.id});
                Item.ingrds({id: item.id}, function(adds){
                    //¿Es adicional?
                    adds.forEach(function(add, $index2){
                        if( add.type == INGR[1].value ) {
                            obj.cant = item.cant;
                            obj.add = angular.copy(add);
                            $scope.lstAdd.push(angular.copy(obj));
                        }
                    });
                });
            });
        });
        
        //Mesa asignada a la orden
        $scope.board = Order.board({id: $scope.order.id});
    }

    $scope.process = function( form ) {
        if( form.$valid ) {
            var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'paymentOrder.html',
            controller : 'PaymentOrderController',
            backdrop: true,
            size : "md",
            resolve: {
                order: function () {return $scope.order},
                isPunto: function(){return $scope.isPunto},
                abon: function(){return $scope.abon}
            }
            });
            modalInstance.result.then(
            function(confim) {
                if(confim) {
                    $scope.confirm();
                }
            }, function() {
            });
        //Encuentra los ingredientes con un filtro
          /**/
        }
    };

    $scope.confirm = function(  ) {
        Order.findById({"id":""+$scope.order.id}).$promise
          .then(function(model) {
              console.log(model)
              var popupWinindow = $window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                model.stat = STOR[1].value;
                model.payment = $scope.isPunto;
                model.closedate = new Date();
                
                //Pago en efectivo
                if( !model.payment ) {
                    model.abon = $scope.abon;
                    model.changing = $scope.abon - model.total;
                }else{
                    model.abon = model.total;
                    model.changing = 0;
                }
                
                model.$save().then(function(instance){
                    //Se indica que la mesa esta disponible
                    $scope.board.free = true;
                    $scope.board.$save().then(function(instance){
                        ms01.msgSuccess();
                        valorsInitials(  );
                        $scope.orderFindClose();
                        $scope.orderFindOpen();
                        popupWinindow.document.open();
                        popupWinindow.document.write('<html><link href="../../vendor/bootstrap/dist/css/bootstrap.css" rel="stylesheet"><head><link rel="stylesheet" type="text/css" href="../../css/styles.css" /></head><body onload="window.print()">' + cm01.getData09( ) + '</html>');
                        popupWinindow.document.close();
                    });
                });
            });
    }

    $scope.orderFindClose();
    $scope.orderFindOpen();
}]);

//Confirmación de Pago de pedido de usuario
angular.module("app").controller('PaymentOrderController',
['$scope', 'Order', 'Item', 'order', 'isPunto', 'abon', 'INGR', 'STOR', 'cm01', 'ms01', '$uibModalInstance', '$log', '$window', 
function($scope, Order, Item, order, isPunto, abon, INGR, STOR, cm01, ms01, $uibModalInstance,
  $log, $window) {

    //Pedido seleccionado
    $scope.order = order;
    $scope.abon = abon;
    $scope.today = new Date(); 
    $scope.lstAdd = new Array();
    $scope.user = Order.user({id: $scope.order.id}); 
    var obj = new Object();

    //Lista de items
    Order.items({id: $scope.order.id}, function(items){
        $scope.items = items;
        $scope.items.forEach(function(item, $index){
            $scope.items[$index].product = Item.product({id: item.id});
            Item.ingrds({id: item.id}, function(adds){
                //¿Es adicional?
                adds.forEach(function(add, $index2){
                    if( add.type == INGR[1].value ) {
                        obj.cant = item.cant;
                        obj.add = angular.copy(add);
                        $scope.lstAdd.push(angular.copy(obj));
                    }
                });
            });
        });
    });
    
    //Mesa asignada a la orden
    $scope.board = Order.board({id: $scope.order.id});

    $scope.confirm = function( form ) {
        cm01.setData09($("#printAreaId").html());
        $uibModalInstance.close(true);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss(false);
    };
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

  angular.module('app').component('printOrderComponent',
  {
        templateUrl: '../../views/order/printOrder.html',
        controller : 'OrderController'
  });

  angular.module('app').component('paymentOrderComponent',
  {
        templateUrl: '../../views/order/paymentOrder.html',
        controller : 'OrderController'
  });