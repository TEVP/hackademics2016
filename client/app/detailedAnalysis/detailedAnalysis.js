'use strict';

angular.module('devApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('detailedAnalysis', {
        url: '/detailedAnalysis',
        template: '<detailed-analysis></detailed-analysis>'
      });
  });
