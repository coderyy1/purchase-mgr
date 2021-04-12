const Router = require('@koa/router');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Character = mongoose.model('Character');
const Demand = mongoose.model('Demand');
const Supplier = mongoose.model('Supplier');
const Goods = mongoose.model('Goods');


const router = new Router({
  prefix: '/home'
});

// 获取各数据总数的接口------------------------------------------------------------------------------------------
router.get('/total', async (ctx) => {

  const totalDemand = await Demand.countDocuments();
  const totalSupplier = await Supplier.countDocuments();
  const totalGoods = await Goods.countDocuments();

  ctx.body = {
    code: 1,
    msg: '获取数据成功',
    data: {
      totalDemand,
      totalSupplier,
      totalGoods
    }
  }


});

//需求完成情况的接口--------------------------------------------------------------
router.get('/demandFinish', async (ctx) => {
  
  const finished = await Demand.find({
    state: 2
  })
  .countDocuments()
  .exec();

  const unFinish = await Demand.find({
    state: 1
  })
  .countDocuments()
  .exec();

  ctx.body = {
    code: 1,
    msg: '获取成功',
    data: {
      finished,
      unFinish
    }
  }


});

// 用户情况的接口
router.get('/userCharact', async (ctx) => {

  const memberNum = await User
    .find({
      character: '603b12dc9b550909f00ed266'
    })
    .countDocuments()
    .exec()

  const adminNum = await User
  .find({
    character: '603b12dc9b550909f00ed265'
  })
  .countDocuments()
  .exec()


  const buyerNum = await User
    .find({
      character: '603b12dc9b550909f00ed267'
    })
    .countDocuments()
    .exec()

  
  const storemanNum = await User
  .find({
    character: '603b12dc9b550909f00ed268'
  })
  .countDocuments()
  .exec()



  ctx.body = {
    code: 1,
    msg: '请求成功',
    data: {
      memberNum,
      adminNum,
      buyerNum,
      storemanNum
    }
  }
});


module.exports = router;