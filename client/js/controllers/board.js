// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('BoardController', ['$scope', 'Board', 'cm01', 'ms01', '$uibModal', '$location', '$log', function($scope, Board, cm01, ms01,
      $uibModal, $location, $log) {
        var vm = this;

        $scope.boards = []

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
          if( cm01.isValid(cm01.getData02()) ) {
            ms01.dropBoard();
          }else{
            ms01.unselected();
          }
        }

        //Fija la mesa a editar
        $scope.boardToEdit = function( board ) {
          cm01.setData01(board);
          cm01.setData02(board);
        }
        
        //Encuentra todas las mesas
        $scope.boardFind = function( ) {
          Board.find().$promise
          .then(function(results) {
            $scope.boards = results;
            $log.info($scope.boards);
          });
        }

        //Evento para recargar mesas
        $scope.$watch(function() { return cm01.getEvnt01() }, function() {
          if( cm01.isValid(cm01.getEvnt01()) ){
            $scope.boardFind( );
            cm01.SetEvnt01(null);
          }
        });
              
        //Acción ejecutada después de confirmar eliminación
        $scope.$watch(function() { return cm01.getEvnt02() }, function() {
          if( cm01.isValid(cm01.getEvnt02()) ){
            alert("Se eliminaa");
            $scope.boardFind();
          }
	      });

        //Encuentra todas las mesas
        $scope.boardFind( );
  }]);

angular.module("app").controller('NewBoardController',
  ['$scope', 'Board', 'cm01', '$uibModalInstance', '$state', '$location', '$log', function($scope, Board, cm01, $uibModalInstance,
    $state, $location, $log) {

      $scope.board = new Object();
      
      $scope.save = function( board, form ) {
        if( form.$valid ) {
          Board.create(board,
          function() {
            $log.info(board);
            alert("guardado exitosamente");
            cm01.setEvnt01("bordReload");
            $scope.cancel();
          }, function(res) {
            alert("error");
            $log.error(res);
          });
        }
      }
      $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
      };
}]);

angular.module("app").controller('editBoardController',
  ['$scope', 'Board', 'cm01', '$uibModalInstance', '$state', '$location', '$log', function($scope, Board, cm01, $uibModalInstance,
    $state, $location, $log) {

      $scope.board = cm01.getData01();
      
      $scope.edit = function( form ) {
        if( form.$valid ) {
          $scope.board.$save().then(function(instance){
            $log.info(instance);
            alert("editado exitosamente");
            cm01.setData01("bordReload");
            $scope.cancel();
          });
        }
      }

      $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
      };
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