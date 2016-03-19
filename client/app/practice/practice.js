'use strict';

angular.module('devApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('practice', {
        url: '/practice',
        template: '<practice></practice>'
      });
  });
