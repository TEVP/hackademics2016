'use strict';

angular.module('devApp')
  .service('Answer', function ($resource) {
    var Answer = $resource('/api/answers/:id', {});

    return Answer;
  });
