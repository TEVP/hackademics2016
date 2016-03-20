'use strict';

import mongoose from 'mongoose';

var AnswerSchema = new mongoose.Schema({
  question: String,
  category: String,
  time: Date,
  result: Boolean,
  responseTime: Number,
  user: String
});

export default mongoose.model('Answer', AnswerSchema);
