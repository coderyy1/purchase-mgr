const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getMeta, preSave } = require('../helpers');

const UserSchema = new mongoose.Schema({
  account: String,
  password: String,
  character: {
    type: Schema.Types.ObjectId,
    ref: 'Character'
  },

  meta: getMeta()
});

UserSchema.pre('save', preSave);

mongoose.model('User', UserSchema);