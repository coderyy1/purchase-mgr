const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const InviteCodeSchema = new mongoose.Schema({
  code: String,
  user: String,
  character: String, // 对应注册码的权限 chara的id

  meta: getMeta()
});

InviteCodeSchema.pre('save', preSave);

mongoose.model('InviteCode', InviteCodeSchema);
