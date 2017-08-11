/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("comunication01", []);

angular.module("comunication01").factory('cm01', function($log) {
  return {
		evnt01: null, //Actualizar lista de mesas
		evnt02: null, //Confirmación de eliminación de mesa
		data01: null, //Mesa a editar
		data02: null, //Mesa a eliminar
			
		getEvnt01: function() {
					return this.evnt01;
		},
		setEvnt01: function(data) {
				this.evnt01 = data;
		},
		getEvnt02: function() {
					return this.evnt02;
		},
		setEvnt02: function(data) {
				this.evnt02 = data;
		},
		getData01: function() {
					return this.data01;
		},
		setData01: function(data) {
				this.data01 = data;
		},
		getData02: function() {
					return this.data02;
		},
		setData02: function(data) {
				this.data02 = data;
		},
		isValid: function(data) {
			return data!=null && data!=undefined;
		},
  };
});