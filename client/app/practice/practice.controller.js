'use strict';
(function(){

class PracticeComponent {
  constructor(Question, Answer, User, ngAudio) {
    this.message = 'Hello';
    this.Question = Question;
    this.ngAudio = ngAudio;
    this.Answer = Answer;
    this.User = User;
  }

  $onInit() {
    this.prepareQuestions();
    this.reset();
  }

  prepareQuestions() {
    this.questions = this.Question.getPractice();
  }

  reset() {
    this.step = 0;
    this.result = [];
    this.questionBeginTime = new Date().getTime();
  }

  submitAnswer(answerId) {
    let question = this.questions[this.step];
    let responseTime = new Date().getTime() - this.questionBeginTime;
    var answer = new this.Answer({
      question: question._id,
      category: question.category,
      time: new Date(),
      responseTime: responseTime
    });
    answer.result = answerId === question.correctAnswer;

    this.User.get().$promise.then(user => {
      answer.user = user._id;
      answer.$save();
    });

    this.result.push(answer);

    this.step += 1;
    this.questionBeginTime = new Date().getTime();

    if (this.audio) {
      this.audio.stop();
    }
  }

  getAverageResponseTime() {
    let averageTime = this.result.reduce(function(sum, result) {
      sum += result.responseTime;
      return sum;
    }, 0)/this.questions.length;
    return Math.round(averageTime/1000*100)/100;
  }

  playAgain() {
    this.prepareQuestions();
    this.reset();
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
