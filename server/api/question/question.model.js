'use strict';

import mongoose from 'mongoose';

var QuestionSchema = new mongoose.Schema({
  category: String,
  question: String,
  correctAnswer: String,
  answers: Object,
  pictureUrl: String,
  soundUrl: String,
  difficulty: Number
});

export default mongoose.model('Question', QuestionSchema);
