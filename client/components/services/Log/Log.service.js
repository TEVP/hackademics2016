'use strict';

angular.module('devApp')
  .service('Log', function ($resource) {
    var Log = $resource('/api/logs/:id', {});

    return Log;
  });
