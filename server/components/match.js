'use strict';

var _ = require('lodash');
var debug = require('debug')('tvep');
var Question = require.main.require('./api/question/question.model');
var User = require.main.require('./api/user/user.model');

class Match {
  constructor(sockets) {
    this.sockets = sockets;

    this.prepareQuestions().then(questions => {
      this.questions = questions;
      this.start();
    });

    this.answers = {};
    this.scores = {};
  }

  prepareQuestions() {
    return Question.find().exec()
      .then(entity => {
        return _.take(_.shuffle(entity), 7);
      });
  }

  handleUserAnswer(socket, data) {
    let questionId = data.questionId;
    let answerId = data.answerId;
    let question = _.find(this.questions, question => {
      debug(question._id.toString(), questionId);
      return question._id.toString() === questionId;
    });
    let isCorrect = question.correctAnswer === answerId;

    if (!this.answers[questionId]) {
      this.answers[questionId] = [];
      this.answers[questionId].push({
        userId: socket.decoded_token.id,
        result: isCorrect
      });
    } else if (this.answers[questionId].length === 1) {
      let answer = this.answers[questionId];
      if (answer.userId === socket.decoded_token._id || answer.result === true) {
        // forbidden
        return;
      } else {
        // both have wrong answers
        this.answers[questionId].push({
          userId: socket.decoded_token._id,
          result: isCorrect
        });
      }
    } else if (this.answers[questionId].length === 2) {
      // forbidden
      return;
    }

    debug('received answer from %s for question %s with answer %s', socket.decoded_token._id, questionId, answerId);

    socket.emit('answerResult', {
      result: isCorrect,
      question: question
    });

    if (isCorrect) {
      this.scores[socket.decoded_token._id] += 1;
      if (_.keys(this.answers).length === this.questions.length) {
        this.nextQuestion();
        this.gameOver();
      } else {
        this.nextQuestion();
      }
    } else {
      if (this.answers[questionId].length === 2) {
        this.nextQuestion();
        if (_.keys(this.answers).length === this.questions.length) {
          this.gameOver();
        }
      }
    }
  }

  nextQuestion() {
    _.each(this.sockets, socket => {
      socket.emit('nextQuestion', {
        scores: this.scores
      });
    });
  }

  gameOver() {
    _.each(this.sockets, socket => {
      socket.emit('gameOver', {
        scores: this.scores
      });

      socket.removeAllListeners('answer');
    });
  }

  start() {
    debug('game start!', this.sockets[0].decoded_token._id, this.sockets[1].decoded_token._id);

    var userIds = _.map(this.sockets, socket => {
      return socket.decoded_token._id;
    });

    _.each(userIds, id => {
      this.scores[id] = 0;
    });

    User.find({
      _id: {
        $in: userIds
      }
    }).exec().then(users => {
      _.forEach(this.sockets, socket => {
        socket.emit('startGame', {
          questions: this.questions,
          users: _.map(users, user => {
            return {
              _id: user._id,
              name: user.name
            }
          })
        });
      });
    });


    _.forEach(this.sockets, socket => {
      debug('socket token', socket.decoded_token);
      socket.on('answer', data => {
        // FIXME: this is a hack because currently remove socket listeners
        // on an event doesn't work properly
        try {
          this.handleUserAnswer(socket, data);
        } catch(e) {
          // not implement
        }

      });
    });
  }

}

export default Match;
