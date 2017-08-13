// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'lbServices', 'comunication01', 'myservices01', 
    'ui.router', 'ngResource', 'oitozero.ngSweetAlert', 'cgNotify', 'ui.bootstrap'
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
    .state('todo', {
        url: '/todo',
        templateUrl: 'views/todo.html',
        controller: 'TodoController'
      });
    $urlRouterProvider.otherwise('login');

    //Redirección de usuario al inicio de sesión trás expirar la sesión
    
}]);
