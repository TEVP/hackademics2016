'use strict';
(function(){

class PracticeComponent {
  constructor(Question) {
    this.message = 'Hello';
    this.Question = Question;
  }

  $onInit() {
    this.questions = this.Question.query();
    this.step = 0;
  }
}

angular.module('devApp')
  .component('practice', {
    templateUrl: 'app/practice/practice.html',
    controller: PracticeComponent
  });

})();
