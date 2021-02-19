const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const DemandSchema = new mongoose.Schema({
  name: String, //需求资源的名称
  num: Number,  //数量
  endTime: String,  //截止时间
  publisher: String, //发布者
  state: Number, //状态 -> 1:未完成  2:已完成

  meta: getMeta()
});

DemandSchema.pre('save', preSave);

mongoose.model('Demand', DemandSchema);