'use strict';
(function(){

class PracticeComponent {
  constructor(Question, ngAudio) {
    this.message = 'Hello';
    this.Question = Question;
    this.ngAudio = ngAudio;
  }

  $onInit() {
    this.questions = this.Question.query();
    this.step = 0;
    this.result = 0;
  }

  submitAnswer(answerId) {
    this.question = this.questions[this.step];
    if (answerId === this.question.correctAnswer) {
      this.result += 1;
    }

    this.step += 1;

    if (this.audio) {
      this.audio.stop();
    }
  }

  playSound(url) {
    this.audio = this.ngAudio.play(url);
  }
}

angular.module('devApp')
  .component('practice', {
    templateUrl: 'app/practice/practice.html',
    controller: PracticeComponent
  });

})();
