const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const SupplierSchema = new mongoose.Schema({
  name: String, // 供应商名称
  email: String, // 邮箱地址
  tel: String, // 联系方式
  address: String, // 地址
  contacts: String, // 联系人

  meta: getMeta()
});

SupplierSchema.pre('save', preSave);

mongoose.model('Supplier', SupplierSchema);