'use strict';

angular.module('devApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('analysis', {
        url: '/analysis',
        template: '<analysis></analysis>'
      });
  });
