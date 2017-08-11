/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("myservices01", ['oitozero.ngSweetAlert', 'comunication01']);

angular.module("myservices01").factory('ms01', function($log, cm01, SweetAlert) {
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
            text: "¿Seguro de eliminar la mesa " + cm01.getData02().number + "?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            closeOnConfirm: true}, 
            function(){ 
                cm01.setEvnt02();
        });
    }
  };
});