const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getMeta, preSave } = require('../helpers');

const StockSchema = new mongoose.Schema({
  name: String, // 商品名称
  count: Number, // 商品库存
  storeName: String, //所在仓库名称

  meta: getMeta()
});

StockSchema.pre('save', preSave);

mongoose.model('Stock', StockSchema);