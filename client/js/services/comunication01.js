/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("comunication01", []);

angular.module("comunication01").factory('cm01', function($log) {
  return {
		evnt01: null, //Actualizar lista de mesas
		evnt02: null, //Confirmación de eliminación de mesa
		evnt03: null, //Actualizar lista de categorias
		evnt04: null, //Confirmación de eliminación de categoria
		evnt05: null, //Actualizar lista de productos
		evnt06: null, //Confirmación de eliminación de productos

		data01: null, //Mesa seleccionada
		data02: null, //Categoria Seleccionada
		data03: null, //Producto Seleccionado
			
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
		getEvnt03: function() {
				return this.evnt03;
		},
		setEvnt03: function(data) {
				this.evnt03 = data;
		},
		getEvnt04: function() {
				return this.evnt04;
		},
		setEvnt04: function(data) {
				this.evnt04 = data;
		},
		getEvnt05: function() {
				return this.evnt05;
		},
		setEvnt05: function(data) {
				this.evnt05 = data;
		},
		getEvnt06: function() {
				return this.evnt06;
		},
		setEvnt06: function(data) {
				this.evnt06 = data;
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
		getData03: function() {
					return this.data03;
		},
		setData03: function(data) {
				this.data03 = data;
		},
		isValid: function(data) {
			return data!=null && data!=undefined;
		},
  };
});