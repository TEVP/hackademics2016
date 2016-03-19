'use strict';

angular.module('devApp')
  .service('Question', function ($resource) {
    var Question = $resource('/api/questions/:id', {});

    return Question;
  });
