const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getMeta, preSave } = require('../helpers');

const UserSchema = new mongoose.Schema({
  account: String,  //用户名
  password: String,  //密码
  character: {  //权限
    type: Schema.Types.ObjectId,
    ref: 'Character'
  },
  key: String,  //密钥 -> 用于修改密码\
  avatSrc: String, //用户头像

  meta: getMeta()
});

UserSchema.pre('save', preSave);

mongoose.model('User', UserSchema);