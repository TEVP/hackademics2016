'use strict';

angular.module('devApp')
  .service('Question', function ($resource) {
    var Question = $resource('/api/questions/:id', {}, {
      getPractice: {
        method: 'GET',
        url: '/api/questions/practice',
        isArray: true
      }
    });

    return Question;
  });
