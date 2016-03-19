'use strict';

var _ = require('lodash');
var debug = require('debug')('tvep');
var Question = require.main.require('./api/question/question.model');

debug('here');

class Match {
  constructor(users) {
    debug('here');
    this.users = users;

    this.prepareQuestions().then(questions => {
      this.questions = questions;
      this.start();
    });

    this.answers = {};
    this.scores = {};

    _.forEach(this.users, user => {
      user.socket.on('answer', data => {
        this.handleUserAnswer(user, data);
      });
    });
  }

  prepareQuestions() {
    return Question.find().exec()
      .then(entity => {
        return _.take(_.shuffle(entity), 7);
      });
  }

  handleUserAnswer(user, data) {
    let socket = user.socket;
    let questionId = data.questionId;
    let answerId = data.answerId;
    let question = _.find(this.questions, question => {
      return question._id.toString() === questionId;
    });
    let isCorrect = question.correctAnswer === answerId;

    if (!this.answers[questionId]) {
      this.answers[questionId] = [];
      this.answers[questionId].push({
        userId: socket.userId,
        result: isCorrect
      });
    } else if (this.answers[questionId].length === 1) {
      let answer = this.answers[questionId];
      if (answer.userId === socket.userId || answer.result === true) {
        // forbidden
        return;
      } else {
        // both have wrong answers
        this.answers[questionId].push({
          userId: socket.userId,
          result: isCorrect
        });
      }
    } else if (this.answers[questionId].length === 2) {
      // forbidden
      return;
    }

    debug('received answer from %s for question %s with answer %s', socket.userId, questionId, answerId);

    socket.emit('answerResult', {
      result: isCorrect,
      question: question
    });

    if (isCorrect) {
      this.scores[socket.userId] += 1;
      if (_.keys(this.answers).length === this.questions.length) {
        this.nextQuestion();
        this.gameOver();
      } else {
        this.nextQuestion();
      }
    } else {
      if (this.answers[questionId].length === 2) {
        this.nextQuestion();
      }
    }
  }

  nextQuestion() {
    _.each(this.users, user => {
      user.socket.emit('nextQuestion');
    });
  }

  gameOver() {
    _.each(this.users, user => {
      user.socket.emit('gameOver', {
        scores: this.scores
      });
    });
  }

  start() {
    debug('game start!', this.users[0].socket.userId, this.users[1].socket.userId);
    _.forEach(this.users, user => {
      user.socket.emit('startGame', {
        questions: this.questions
      });
    });
  }

}

export default Match;
