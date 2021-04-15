const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getMeta, preSave } = require('../helpers');

const GoodsSchema = new mongoose.Schema({
  name: String, // 货物名称
  place: String, // 产地
  price: Number, // 报价
  unit: String, // 报价单位
  supplier: {
    type:  Schema.Types.ObjectId,
    ref: 'Supplier'
  }, // 供应商信息

  meta: getMeta()
});

GoodsSchema.pre('save', preSave);

mongoose.model('Goods', GoodsSchema);
