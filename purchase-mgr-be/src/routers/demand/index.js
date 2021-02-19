const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');

//=========================================================
const Demand = mongoose.model('Demand');

const router = new Router({
  prefix: '/demand'
});
//添加需求货物的接口-----------------------------------------
router.post('/add', async (ctx) => {
  const {
    name,
    num,
    endTime,
    publisher = '',
    state = 1
  } = ctx.request.body;

  // 校验
  if(name === '' ||
    num === '' ||
    endTime === '') {
      ctx.body = {
        code: 0,
        msg: '添加失败',
        data: null
      };
      
      return;
    }

  const demand = new Demand({
    name,
    num,
    endTime,
    publisher,
    state
  });

  const res = await demand.save();

  ctx.body = {
    code: 1,
    msg: '采购需求发布成功',
    data: res
  };

});

//查询的接口--------------------------------------------------------------------
router.get('/list', async (ctx) => {
  // 分页查询所需参数
  const {
    page = 1,
    size = 5,
    keyword = ''
  } = ctx.query;

  // 处理keyword
  const query = {};
  if(keyword) {
    query.name = keyword
  }

  const list = await Demand
    .find(query)
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await Demand.find(query).countDocuments();

  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    data: {
      total,
      list,
      page,
      size
    }
  };
});


module.exports = router;