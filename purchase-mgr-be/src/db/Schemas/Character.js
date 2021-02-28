const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getMeta, preSave } = require('../helpers');

const CharacterSchema = new mongoose.Schema({
  name: String, //角色名称 ->    member  buyer      storeman      admin  
  title: String, //展示文案 ->   成员    采购人员    仓库人员    管理员

  meta: getMeta()
});

CharacterSchema.pre('save', preSave)

mongoose.model('Character', CharacterSchema);