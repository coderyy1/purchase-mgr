const Router = require('@koa/router');
const mongoose = require('mongoose');

const CountLog = mongoose.model('CountLog');

const router = new Router({
  prefix: '/count-log'
});

// 查询=---------------------------------------------------------------------------------
router.get('/list', async (ctx) => {
  const {
    stockId,
    type,
    size = 5,
    page
  } = ctx.query;

  // 按照插入数据库顺序倒序排序
  const list = await CountLog
    .find({
      stockId,
      type
    })
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await CountLog
    .find({
      stockId,
      type
    })
    .countDocuments()
    .exec();

  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    list,
    total,
    page,
    size
  }
});



module.exports = router;