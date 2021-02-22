const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const OrderSchema = new mongoose.Schema({
  name: String, //资源的名称
  num: Number,  //数量
  supplier: String,  //供应商
  user: String, //操作者
  money: Number, //支出
  demandId: String, //需求对应的id

  meta: getMeta()
});

OrderSchema.pre('save', preSave);

mongoose.model('Order', OrderSchema);