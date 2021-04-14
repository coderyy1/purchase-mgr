const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getMeta, preSave } = require('../helpers');

const CountLogSchema = new mongoose.Schema({
  stockId: String,  //对应货物id
  type: String,  //出库还是入库
  num: Number,  //操作数量
  user: {  //操作者
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  meta: getMeta()
});

CountLogSchema.pre('save', preSave)

mongoose.model('CountLog', CountLogSchema);