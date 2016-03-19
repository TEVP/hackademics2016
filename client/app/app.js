'use strict';

angular.module('devApp', [
  'devApp.auth',
  'devApp.admin',
  'devApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAudio',
  'btford.socket-io',
  'ui.router',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .run(function($rootScope, $state) {
    $rootScope.navigateTo = navigateTo;

    function navigateTo(state, stateParams) {
      $state.go(state, stateParams);
    }
  });
