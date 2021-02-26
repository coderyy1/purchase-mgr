const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getMeta, preSave } = require('../helpers');

const CountLogSchema = new mongoose.Schema({
  stockId: String,
  type: String,
  num: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  meta: getMeta()
});

CountLogSchema.pre('save', preSave)

mongoose.model('CountLog', CountLogSchema);