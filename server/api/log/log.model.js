'use strict';

import mongoose from 'mongoose';

var LogSchema = new mongoose.Schema({
  uid: String,
  time: Date,
  atime: Number,
  catid: String,
  quesid: String,
  result: Number,
  restime: Number
});

export default mongoose.model('Log', LogSchema);
