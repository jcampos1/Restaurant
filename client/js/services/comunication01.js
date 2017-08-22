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
		evnt06: null, //Confirmación de eliminación de producto
		evnt07: null, //Verificación si el usuario esta logueado o no
		evnt08: null, //Actualizar lista de usuarios
		evnt09: null, //Confirmación de eliminación de usuario
		evnt10: null, //Actualizar lista de ingredientes
		evnt11: null, //Confirmación de eliminación de ingrediente

		data01: null, //Mesa seleccionada
		data02: null, //Categoria Seleccionada
		data03: null, //Producto Seleccionado
		data04: null, //Usuario Seleccionado
		data05: null, //Ingrediente Seleccionado
		roles: null,  //Roles de la aplicacion
			
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
		getEvnt07: function() {
				return this.evnt07;
		},
		setEvnt07: function(data) {
				this.evnt07 = data;
		},
		getEvnt08: function() {
				return this.evnt08;
		},
		setEvnt08: function(data) {
				this.evnt08 = data;
		},
		getEvnt09: function() {
			return this.evnt09;
		},
		setEvnt09: function(data) {
				this.evnt09 = data;
		},
			getEvnt10: function() {
			return this.evnt10;
		},
		setEvnt10: function(data) {
				this.evnt10 = data;
		},
		getEvnt11: function() {
			return this.evnt11;
		},
		setEvnt11: function(data) {
				this.evnt11 = data;
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
		getData04: function() {
				return this.data04;
		},
		setData04: function(data) {
				this.data04 = data;
		},
			getData05: function() {
			return this.data05;
		},
		setData05: function(data) {
				this.data05 = data;
		},
		getRoles: function() {
				return this.roles;
		},
		setRoles: function(data) {
				this.roles = data;
		},
		isValid: function(data) {
			return data!=null && data!=undefined;
		},
  };
});