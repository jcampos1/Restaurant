/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("comunication01", []);

angular.module("comunication01").factory('cm01', function($log, $rootScope) {
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
		evnt12: null, //Actualizar lista de pedidos
		evnt13: null, //Confirmación de cancelacion de pedido
		evnt14: null, //Confirmacion de movilizacion de mesa

		data01: null, //Mesa seleccionada
		data02: null, //Categoria Seleccionada
		data03: null, //Producto Seleccionado
		data04: null, //Usuario Seleccionado
		data05: null, //Ingrediente Seleccionado
		data06: null, //Producto seleccionado para agregar ingrediente (adicional o principal)
		data07: null, //Pedido Seleccionado
		data08: null, //Mesa a la cual van a ser movilizados
		data09: null, //Comanda a imprimir
		roles: null,  //Roles de la aplicacion

		admin: null, //El usuario es administrador?
		cajero: null, //El usuario es cajero?
		camarero: null, //El usuario es camarero?
			
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
		getEvnt12: function() {
			return this.evnt12;
		},
		setEvnt12: function(data) {
				this.evnt12 = data;
		},
		getEvnt13: function() {
			return this.evnt13;
		},
		setEvnt13: function(data) {
				this.evnt13 = data;
		},
		getEvnt14: function() {
			return this.evnt14;
		},
		setEvnt14: function(data) {
				this.evnt14 = data;
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
		getData06: function() {
			return this.data06;
		},
		setData06: function(data) {
				this.data06 = data;
		},
		getData07: function() {
			return this.data07;
		},
		setData07: function(data) {
				this.data07 = data;
		},
		getData08: function() {
			return this.data08;
		},
		setData08: function(data) {
				this.data08 = data;
		},
		getData09: function() {
			return this.data09;
		},
		setData09: function(data) {
				this.data09 = data;
		},

		isAdmin: function() {
			return this.admin;
		},
		setAdmin: function(data) {
				this.admin = data;
		},
		isCajero: function() {
			return this.cajero;
		},
		setCajero: function(data) {
				this.cajero = data;
		},
		isCamarero: function() {
			return this.camarero;
		},
		setCamarero: function(data) {
				this.camarero = data;
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