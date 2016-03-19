'use strict';

angular.module('devApp.auth', [
  'devApp.constants',
  'devApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
