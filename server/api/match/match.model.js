'use strict';

import mongoose from 'mongoose';

var MatchSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Match', MatchSchema);

