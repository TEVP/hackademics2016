'use strict';

angular.module('devApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('oneVsOne', {
        url: '/oneVsOne',
        template: '<one-vs-one></one-vs-one>'
      });
  });
