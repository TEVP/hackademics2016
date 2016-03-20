'use strict';
(function(){

class OneVsOneComponent {
  constructor(socket, ngAudio, User, Answer) {
    this.socket = socket.socket;
    this.User = User;
    this.Answer = Answer;
    this.ngAudio = ngAudio;

    this.startMatching();

    this.socket.on('startGame', data => {
      this.startGame(data);
    });

    this.socket.on('answerResult', data => {
      this.handleAnswerResult(data);
    });

    this.socket.on('nextQuestion', data => {
      this.handleNextQuestion(data);
    });

    this.socket.on('gameOver', data => {
      this.handleGameOver(data);
    });
  }

  startMatching() {
    this.state = 'matching';
    this.answeredQuestions = {};
    this.User.get().$promise.then(user => {
      this.me = user;
      this.socket.emit('startMatching', {
        userId: user._id
      });
    });
  }

  startGame(data) {
    this.state = 'playing';
    this.questions = data.questions;
    this.users = data.users;
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

  handleNextQuestion(data) {
    let scores = data.scores;
    this.updateScores(scores);
    this.step += 1;
    this.questionBeginTime = new Date().getTime();

    if (this.audio) {
      this.audio.stop();
    }
  }

  updateScores(scores) {
    this.users.forEach(user => {
      user.score = scores[user._id];
    });
  }

  handleGameOver(data) {
    let scores = data.scores;
    this.updateScores(scores);
  }

  getWinnerName() {
    var currentUser = this.me;
    var me, opponent;
    this.users.forEach(user => {
      if (!(user._id === currentUser._id)) {
        opponent = user;
      } else {
        me = user;
      }
    });

    if (me.score > opponent.score) {
      return 'you';
    } else if (me.score < opponent.score) {
      return opponent.name;
    } else {
      return null;
    }
  }

  matchAgain() {
    this.startMatching();
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
    let answer = new this.Answer(result);
    answer.$save();

    this.result.push(answer);
  }

  playSound(url) {
    this.audio = this.ngAudio.play(url);
  }

  getAverageResponseTime() {
    let averageTime = this.result.reduce(function(sum, result) {
      sum += result.responseTime;
      return sum;
    }, 0)/this.questions.length;
    return Math.round(averageTime/1000*100)/100;
  }
}

angular.module('devApp')
  .component('oneVsOne', {
    templateUrl: 'app/oneVsOne/oneVsOne.html',
    controller: OneVsOneComponent
  });

})();
