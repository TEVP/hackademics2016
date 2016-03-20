'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
  }
}

angular.module('devApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
