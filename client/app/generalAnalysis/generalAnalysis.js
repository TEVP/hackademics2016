'use strict';

angular.module('devApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('generalAnalysis', {
        url: '/generalAnalysis',
        template: '<general-analysis></general-analysis>'
      });
  });
