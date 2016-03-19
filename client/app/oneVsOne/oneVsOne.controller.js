'use strict';
(function(){

class OneVsOneComponent {
  constructor(socket, ngAudio, User) {
    this.socket = socket.socket;
    this.User = User;
    this.ngAudio = ngAudio;
    this.answeredQuestions = {};

    this.startMatching();

    this.socket.on('startGame', data => {
      this.startGame(data);
    });

    this.socket.on('answerResult', data => {
      this.handleAnswerResult(data);
    });

    this.socket.on('nextQuestion', () => {
      this.handleNextQuestion();
    });
  }

  startMatching() {
    this.state = 'matching';
    this.User.get().$promise.then(user => {
      this.socket.emit('startMatching', {
        userId: user._id
      });
    });
  }

  startGame(data) {
    this.state = 'playing';
    this.questions = data.questions;
    this.step = 0;
    this.result = [];
    this.questionBeginTime = new Date().getTime();
  }

  submitAnswer(answerId) {
    let question = this.questions[this.step];
    if (this.answeredQuestions[question._id]) {
      return;
    } else {
      this.answeredQuestions[question._id] = true;
    }
    this.socket.emit('answer', {
      questionId: question._id,
      answerId: answerId
    });
  }

  handleNextQuestion() {
    this.step += 1;
    this.questionBeginTime = new Date().getTime();

    if (this.audio) {
      this.audio.stop();
    }
  }

  /**
   * handle answer result
   * @param {Object} data
   * @param {Boolean} data.result
   * @param {Object} data.question
   */
  handleAnswerResult(data) {
    let now = new Date().getTime();
    let responseTime = now - this.questionBeginTime;
    let question = data.question;
    let result = {
      question: question._id,
      category: question.category,
      time: now,
      responseTime: responseTime
    };
    this.questionBeginTime = now;
    result.result = data.result;

    this.result.push(result);
  }

  playSound(url) {
    this.audio = this.ngAudio.play(url);
  }
}

angular.module('devApp')
  .component('oneVsOne', {
    templateUrl: 'app/oneVsOne/oneVsOne.html',
    controller: OneVsOneComponent
  });

})();
