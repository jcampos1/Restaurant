// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'lbServices', 'comunication01', 'myservices01', 'angularFileUpload',
    'ui.router', 'ngResource', 'oitozero.ngSweetAlert', 'cgNotify', 'localytics.directives', 'ui.bootstrap', 'pascalprecht.translate'
  ])
.constant('INGR', [{ value: 0, dsca: "Observación"}, { value: 1, dsca: "Adicional"}])
.constant('STOR', [{ value: 0, dsca: "Abierto"}, { value: 1, dsca: "Cerrado"}, { value: 2, dsca: "Cancelado"}])
.constant('PAY', [{ value: 0, dsca: "Tarjeta"}, { value: 1, dsca: "Efectivo"}])  
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',  function($stateProvider,
      $urlRouterProvider, $httpProvider) {

    //Configuración de rutas
    $stateProvider
    .state('principal', {
        url: '/principal',
        templateUrl: 'views/user/principal.html',
        controller: 'PrincipalController'
      })
    .state('create_user', {
        url: '/user/create',
        templateUrl: 'views/user/create.html',
        controller: 'CreateController'
      })
    .state('login', {
        url: '/login',
        templateUrl: 'views/user/login.html',
        controller: 'LoginController'
      })
    .state('reset', {
      url: '/reset',
      templateUrl: 'views/user/reset.html',
      controller: 'LoginController'
    })
    .state('resetPassword', {
      url: '/resetPassword',
      templateUrl: 'views/user/resetPassword.html',
      controller: 'LoginController'
    })
    .state('boardList', {
      url: '/boardList',
      templateUrl: 'views/board/list.html',
      controller: 'BoardController'
    })
    .state('categoryList', {
      url: '/categoryList',
      templateUrl: 'views/category/list.html',
      controller: 'CategoryController'
    })
    .state('productList', {
      url: '/productList',
      templateUrl: 'views/product/list.html',
      controller: 'ProductController'
    })
    .state('userList', {
      url: '/userList',
      templateUrl: 'views/user/list.html',
      controller: 'UserController'
    })
    .state('ingredienteList', {
      url: '/ingredienteList',
      templateUrl: 'views/ingrediente/list.html',
      controller: 'IngredienteController'
    })
    .state('newOrder', {
        url: '/newOrder',
        templateUrl: 'views/order/create.html',
        controller: 'NewOrderController'
    })
    .state('orderList', {
        url: '/orderList',
        templateUrl: 'views/order/list.html',
        controller: 'OrderController'
    });

    $urlRouterProvider.otherwise('login');

    //Redirección de usuario al inicio de sesión trás expirar la sesión
}])
.config(['$translateProvider',  function( $translateProvider ) {

  //IDIOMA BRASILEÑO
  $translateProvider.translations( "pt", {
    "GENE": {
      "USER":         "Usuário",
      "USERS":        "Usuários",
      "PASS":         "Senha",
      "ENTR":         "Entrar",
      "FORG_PASS":    "Esqueceu a senha?",
      "LIST":         "Lista",
      "DETA":         "Detalho",
      "NEW":          "Novo",
      "EDIT":         "Editar",
      "DELE":         "Deletar",
      "MESA":         "Mesa",
      "MESAS":        "Mesas",
      "CATE":         "Categoria",
      "PROD":         "Produtos",
      "INGRE":        "Ingrediente",
      "INGRES":       "Ingredientes",
      "NUME":         "Números",
      "LUGA":         "Lugares",
      "DSCA":         "Descripción",
      "CANC":         "Cancelar",
      "GUAR":         "Guardar",
      "ACTI":         "Activo",
      "NAME":         "Nombre",
      "CODE":         "Código",
      "PREC":         "Precio",
      "ROLES":        "Roles",
      "TIPO":         "Tipo",
      "ACCE":         "Acceder",
      "SALI":         "Salir",
      "PHONE":        "Teléfono",
      "ADDR":         "Dirección",
      "COMM":         "Comentarios",
      "RECU":         "Recuperar",
      "LOGI":         "iniciar sesión",
      "NEWPASS":      "Nueva contraseña",
      "CONF":         "Confirmación",
      "CONF2":        "Confirmar",
      "INSI":         "¿Comer aqui?",
      "TOTAL":        "Total",
      "MOVE":         "Mover",
      "CANT":         "Cantidad",
      "SELIMG":       "Seleccione una imagen",
      "true":         "Si",
      "false":        "No",
      "PROCES":       "Procesar",
      "ORDER":        "Orden",
      "PRINT":        "Imprimir",
      "PAYMENT":      "Pago",
      "MODU":         "Módulos",
      "ADMI":         "Administración",
      "LSTPE":        "Lista de pedidos",
      "NEWPE":        "Nuevo pedido",
      "UNID":         "Unid.",
      "PVP":          "PVP.",
      "IMPO":         "Importe",
      "DATE":         "Fecha",
      "HOUR":         "Hora",
      "ATND":         "Atendido por",
      "CAMB":         "Cambio",
      "PNTVNT":       "Punto de Venta",
      "ABON":         "Cantidad abonada",
      "MESE":         "Mesero",
      "CAMA":         "Camarero",

      "LBL01":        "Sin resultados",
      "LBL02":        "Seleccione",
    },

    "FORM": {
      "REQU":         "Este campo é obrigatório."
    },

    "USER": {
      "401":          "Usuario o contraseña incorrectos",
      "404":          "Usuario no encontrado",
    }
  });

  //IDIOMA ESPAÑOL
  $translateProvider.translations( "es", {
    "GENE": {
      "USER":         "Usuario",
      "USERS":        "Usuarios",
      "PASS":         "Contraseña",
      "ENTR":         "Entrar",
      "FORG_PASS":    "¿Olvidaste tu contraseña?",
      "LIST":         "Lista",
      "DETA":         "Detalle",
      "NEW":          "Nuevo",
      "EDIT":         "Editar",
      "DELE":         "Eliminar",
      "MESA":         "Mesa",
      "MESAS":        "Mesas",
      "CATE":         "Categoria",
      "PROD":         "Productos",
      "INGRE":        "Ingrediente",
      "INGRES":       "Ingredientes",
      "NUME":         "Números",
      "LUGA":         "Lugares",
      "DSCA":         "Descripción", 
      "CANC":         "Cancelar", 
      "GUAR":         "Guardar",
      "ACTI":         "Activo",
      "NAME":         "Nombre",
      "CODE":         "Código",
      "PREC":         "Precio",
      "ROLES":        "Roles",
      "TIPO":         "Tipo",
      "LBL01":        "Sin resultados",
      "ACCE":         "Acceder",
      "SALI":         "Salir",
      "PHONE":        "Teléfono",
      "ADDR":         "Dirección",
      "COMM":         "Comentarios",
      "RECU":         "Recuperar",
      "LOGI":         "iniciar sesión",
      "NEWPASS":      "Nueva contraseña",
      "CONF":         "Confirmación",
      "CONF2":        "Confirmar",
      "INSI":         "¿Comer aqui?",
      "TOTAL":        "Total",
      "MOVE":         "Mover",
      "CANT":         "Cantidad",
      "SELIMG":       "Seleccione una imagen",
      "true":         "Si",
      "false":        "No",
      "PROCES":       "Procesar",
      "ORDER":        "Orden",
      "PRINT":        "Imprimir",
      "PAYMENT":      "Pago",
      "MODU":         "Módulos",
      "ADMI":         "Administración",
      "LSTPE":        "Lista de pedidos",
      "NEWPE":        "Nuevo pedido",
      "UNID":         "Unid.",
      "PVP":          "PVP.",
      "IMPO":         "Importe",
      "DATE":         "Fecha",
      "HOUR":         "Hora",
      "ATND":         "Atendido por",
      "CAMB":         "Cambio",
      "PNTVNT":       "Punto de Venta",
      "ABON":         "Cantidad abonada",
      "MESE":         "Mesero",
      "CAMA":         "Camarero",
      
      "LBL01":        "Sin resultados",
      "LBL02":        "Seleccione",
    },

    "FORM": {
      "REQU":         "Este campo es obligatorio."
    },

    "USER": {
      "401":          "Usuario o contraseña incorrectos",
      "404":          "Usuario no encontrado",
    }
  });

  $translateProvider.preferredLanguage("es");
}]);
