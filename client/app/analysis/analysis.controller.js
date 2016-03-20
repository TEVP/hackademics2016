'use strict';
(function(){

class AnalysisComponent {
  constructor(Log) {
    this.message = 'Hello';
  }
}

angular.module('devApp')
  .component('analysis', {
    templateUrl: 'app/analysis/analysis.html',
    controller: AnalysisComponent
  });

})();
