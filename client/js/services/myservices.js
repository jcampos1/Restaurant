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

    //Alerta cuando se selecciona una segunda mesa para el pedido
    twiceBoard: function() {
        SweetAlert.swal({
            title: "Aviso",
            text: "Usted ya ha seleccionado una mesa para el pedido",
            type: "warning",
            confirmButtonText: "Ok",
            closeOnConfirm: true}, 
            function(){ 
        });
    },

    //Alerta cuando se selecciona un ingrediente sin haber seleccionado el producto
    dontProduct: function() {
        SweetAlert.swal({
            title: "Aviso",
            text: "Aun no se ha seleccionado el producto para asociar ingrediente",
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

    dropUser: function( ) {
        SweetAlert.swal({
            title: "Confirmación",
            text: "¿Seguro de eliminar el usuario: " + cm01.getData04().email + "?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            closeOnCancel: true}, 
            function(isConfirm){
                if (isConfirm) {
                    cm01.setEvnt09("emit");
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

    dropIngrediente: function( ) {
        SweetAlert.swal({
            title: "Confirmación",
            text: "¿Seguro de eliminar el ingrediente: " + cm01.getData05().name + "?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            closeOnCancel: true}, 
            function(isConfirm){
                if (isConfirm) {
                    cm01.setEvnt11("emit");
                }
        });
    },

    sidebarRightAdmin: function( scope ) {
        scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };
    },

    /************************ NOTIFICACIONES *************************** */
    msgSuccess: function( ) {
        notify({ message:'Operación realizada exitosamente', position: 'right', classes:'alert-success', templateUrl: urlNotify} );
    },

    //notificacion para eliminacion de item
    msgDestroy: function( ) {
        notify({ message:'Cancelado', duration: 1000, position: 'right', classes:'alert-danger', templateUrl: urlNotify} );
    },

    //Notificacion para adicion de item
    msgAdd: function( ) {
        notify({ message:'Añadido', duration: 1000, position: 'right', classes:'alert-success', templateUrl: urlNotify} );
    },

    msgSendEmail: function( ) {
        notify({ message:'Un correo le fue enviado para la recuperación de su contraseña', position: 'right', classes:'alert-success', templateUrl: urlNotify} );
    },

    msgResetPassword: function( ) {
        notify({ message:'Su contraseña fue establecida exitosamente', position: 'right', classes:'alert-success', templateUrl: urlNotify} );
    },
    /********************************************************************** */

    /************************ FUNCIONES GENERALES ************************* */
    
    //Verifica si el usuario logueado posee un rol administrador
    hasRole: function( roles, rol ) {
        var ret = false;
        roles.roles.forEach(function(element) {
            if( element.name == rol ){
                ret = true;
            }
        }, this);
        return ret;
    },

    //Elimina un elemento de un array
    arrayDestroyByIndex: function ( array, $index ) {
        array.splice($index, 1);
    },

    /*********************************************************************** */
  };
});

angular.module("myservices01").factory('ms02', function($log, $http, $location, ms01, $state) {
  return {
    resetPassword: function(newPassword) {
        $http.post("/api/users/reset-password?access_token="+
            $location.search().access_token, {newPassword: newPassword}).then(
            function successCallback( response ) {
                $log.info("SE CAMBIO LA CONTRASEÑA");
                $log.info(response);
                ms01.msgResetPassword();
                $state.go("login");
            },
            function errorCallback( response ){
                $log.error(response);
        });
    }
  };
});