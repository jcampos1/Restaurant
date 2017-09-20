// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('BoardController', ['$scope', 'Board', 'Order',  'cm01', 'ms01', '$uibModal', '$location', '$log', 
  function($scope, Board, Order, cm01, ms01,
      $uibModal, $location, $log) {
        var vm = this;

        $scope.boards = [];

        //Muestra en detalle la información
        vm.detailBoard = function() {
          if( cm01.isValid(cm01.getData01()) ) {
            var modalInstance = $uibModal.open({
              animation : true,
              templateUrl : 'modalDetailBoard.html',
              controller : 'DetailBoardController',
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
        vm.newBoard = function() {
          var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'modalNewBoard.html',
            controller : 'NewBoardController',
            backdrop: true,
            size : "md"
          });
          modalInstance.result.then(function() {
          }, function() {
          });
        }

        //Muestra formulario de edición
        vm.editBoard = function() {
          if( cm01.isValid(cm01.getData01()) ) {
            var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'modalEditBoard.html',
            controller : 'editBoardController',
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
        $scope.dropBoard = function() {
          if( cm01.isValid(cm01.getData01()) ) {
            ms01.dropBoard(drop);
          }else{
            ms01.unselected();
          }
        }

        //Graba la mesa seleccionada
        $scope.selectedBoard = function( board ) {
          cm01.setData01(board);
        }
        
        //Encuentra todas las mesas
        $scope.boardFind = function( ) {
          Board.find({"filter":{"where": {"active":"true"}}}).$promise
          .then(function(results) {
            $scope.boards = results;
          });
        }

        //Evento para recargar mesas
        $scope.$watch(function() { return cm01.getEvnt01() }, function() {
          if( cm01.isValid(cm01.getEvnt01()) ){
            $scope.boardFind( );
            cm01.setEvnt01(null);
          }
        });

        function drop () {
          cm01.getData01().active = false;
          cm01.getData01().$save().then(function(instance){
            $scope.boardFind();
            ms01.msgSuccess();
            cm01.setData01(null);
          });
        }

        //Encuentra todas las mesas
        $scope.boardFind( );

        //Evento para resaltar opción actual seleccionada
        ms01.sidebarRightAdmin($scope);
  }]);

angular.module("app").controller('DetailBoardController',
  ['$scope', 'cm01', '$uibModalInstance', '$log', function($scope, cm01, $uibModalInstance,
    $log) {

      $scope.board = cm01.getData01();
      
      $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
      };
}]);

angular.module("app").controller('NewBoardController',
  ['$scope', 'Board', 'cm01', 'ms01', '$uibModalInstance', '$state', '$location', '$log', function($scope, Board, cm01, ms01, $uibModalInstance, notify,
    $state, $location, $log) {

      $scope.board = new Object();
      
      //Creación de mesa
      $scope.save = function( form ) {
        if( form.$valid ) {
          Board.create($scope.board).$promise
          .then(function(board) {
            cm01.setEvnt01("emit");
            ms01.msgSuccess();
            $scope.cancel();
          });
        }
      }
      $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
      };
}]);

angular.module("app").controller('editBoardController',
  ['$scope', 'Board', 'cm01', 'ms01', '$uibModalInstance', '$state', '$location', '$log', function($scope, Board, cm01, ms01, $uibModalInstance,
    $state, $location, $log) {

      $scope.board = cm01.getData01();
      
      $scope.edit = function( form ) {
        if( form.$valid ) {
          $scope.board.$save().then(function(instance){
            ms01.msgSuccess();
            cm01.setEvnt01("emit");
            cm01.setData01(null);
            $scope.cancel();
          });
        }
      }

      $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
      };
}]);

angular.module("app").controller('SelectBoardController',
  ['$scope', 'Board', 'cm01', 'ms01', '$state', '$location', '$log', function($scope, Board, cm01, ms01,
    $state, $location, $log) {
      
}]);

angular.module('app').component('newBoardComponent',
{
      templateUrl: '../../views/board/create.html',
      controller : 'BoardController'
});

angular.module('app').component('editBoardComponent',
{
      templateUrl: '../../views/board/edit.html',
      controller : 'BoardController'
});

angular.module('app').component('listBoardComponent',
{
      templateUrl: '../../views/board/list.html',
      controller : 'BoardController'
});

angular.module('app').component('detailBoardComponent',
{
      templateUrl: '../../views/board/detail.html',
      controller : 'BoardController'
});

angular.module('app').component('selectBoardComponent',
{
      templateUrl: '../../views/board/select.html',
      controller : 'SelectBoardController'
});