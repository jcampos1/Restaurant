// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
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
      .state('todo', {
        url: '/todo',
        templateUrl: 'views/todo.html',
        controller: 'TodoController'
      });

    $urlRouterProvider.otherwise('login');
  }]);
