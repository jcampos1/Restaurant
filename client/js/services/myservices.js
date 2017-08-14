/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("myservices01", ['oitozero.ngSweetAlert', 'cgNotify', 'comunication01']);

angular.module("myservices01").factory('ms01', function($log, cm01, SweetAlert, notify, $location) {
    var urlNotify = '../vendor/angular-notify/angular-notify.html';
  return {
    unselected: function() {
        SweetAlert.swal({
            title: "Aviso",
            text: "Debe seleccionar un elemento",
            type: "warning",
            confirmButtonText: "Ok",
            closeOnConfirm: true}, 
            function(){ 
        });
    },

    dropBoard: function( ) {
        SweetAlert.swal({
            title: "Confirmación",
            text: "¿Seguro de eliminar la mesa: " + cm01.getData01().number + "?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            closeOnCancel: true}, 
            function(isConfirm){
                if (isConfirm) {
                    cm01.setEvnt02("emit");
                }
        });
    },

    dropCategory: function( ) {
        SweetAlert.swal({
            title: "Confirmación",
            text: "¿Seguro de eliminar la categoria: " + cm01.getData02().name + "?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            closeOnCancel: true}, 
            function(isConfirm){
                if (isConfirm) {
                    cm01.setEvnt04("emit");
                }
        });
    },

    dropProduct: function( ) {
        SweetAlert.swal({
            title: "Confirmación",
            text: "¿Seguro de eliminar el producto: " + cm01.getData03().code + "?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            closeOnCancel: true}, 
            function(isConfirm){
                if (isConfirm) {
                    cm01.setEvnt06("emit");
                }
        });
    },

    sidebarRightAdmin: function( scope ) {
        scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };
    },

    msgSuccess: function( ) {
        notify({ message:'Operación realizada exitosamente', position: 'right', classes:'alert-success', templateUrl: urlNotify} );
    }
  };
});