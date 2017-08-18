// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'lbServices', 'comunication01', 'myservices01', 
    'ui.router', 'ngResource', 'oitozero.ngSweetAlert', 'cgNotify', 'localytics.directives', 'ui.bootstrap', 'pascalprecht.translate'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',  function($stateProvider,
      $urlRouterProvider, $httpProvider) {

    //Configuración de rutas
    $stateProvider
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
    .state('todo', {
        url: '/todo',
        templateUrl: 'views/todo.html',
        controller: 'TodoController'
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
      "NUME":         "Números",
      "LUGA":         "Lugares",
      "DSCA":         "Descripción",
      "CANC":         "Cancelar",
      "GUAR":         "Guardar",
      "ACTI":         "Activo",
      "NAME":         "Nombre",
      "CODE":         "Código",
      "PREC":         "Precio",
    },

    "FORM": {
      "REQU":         "Este campo é obrigatório."
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
      "NUME":         "Números",
      "LUGA":         "Lugares",
      "DSCA":         "Descripción", 
      "CANC":         "Cancelar", 
      "GUAR":         "Guardar",
      "ACTI":         "Activo",
      "NAME":         "Nombre",
      "CODE":         "Código",
      "PREC":         "Precio",
    },

    "FORM": {
      "REQU":         "Este campo es obligatorio."
    }
  });

  $translateProvider.preferredLanguage("es");
}]);
