const Router = require('@koa/router');
const mongoose = require('mongoose');

const Stock = mongoose.model('Stock');
const CountLog = mongoose.model('CountLog');

const router = new Router({
  prefix: '/stock'
});

const COUNT_CONST = {
  IN: 'IN_COUNT',
  OUT: 'OUT_COUNT'
};

// 添加库存货物的接口-----------------------------------------
router.post('/add', async (ctx) => {
  const {
    name,
    count
  } = ctx.request.body;

  const one = await Stock.findOne({
    name
  }).exec();
  if(one) {
    ctx.body = {
      code: 0,
      msg: '出错了'
    };

    return;
  }

  const stock = new Stock({
    name,
    count
  });

  const res = await stock.save();
  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: res
  };
});

// 查询list的接口---------------------------------------------
router.get('/list', async (ctx) => {
  const {
    page = 1,
    size = 5,
    keyword = ''
  } = ctx.query;

  const query = {};
  if(keyword) {
    query.name = keyword
  }

  const list = await Stock
    .find(query)
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await Stock.find(query).countDocuments();

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

// 删除的接口------------------------------------------------
router.delete('/deleteStock/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const one = await Stock.findOne({
    _id: id
  }).exec();

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '出错了'
    };

    return;
  }

  // 删除对应log信息
  const logRes = await CountLog.deleteMany({
    stockId: id
  }).exec();

  // 删除货物信息
  const res = await Stock.deleteOne({
    _id: id
  }).exec();



  ctx.body = {
    code: 1,
    msg: '删除成功',
    data: res
  }
});

// 修改的接口------------------------------------------------
router.post('/update', async (ctx) => {
  const {
    id,
    ...others
  } = ctx.request.body;

  const one = await Stock.findOne({
    _id: id
  }).exec();

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '出错了',
      data: null
    };

    return;
  }

  // 利用对象合并 + es6的rest语法完成修改
  const newObj = {};
  // entries => 创建可迭代对象
  Object.entries(others).forEach(([key, value]) => {
    if(value) {
      newObj[key] = value;

    }
  });

  Object.assign(one, newObj);

  const res = await one.save();

  ctx.body = {
    code: 1,
    msg: '修改成功',
    data: res
  };

});

// 修改库存的接口----------------------------------------------
router.post('/update/count', async (ctx) => {
  const {
    id,
    type,
    user
  } = ctx.request.body;

  let {
    num
  } = ctx.request.body;

  num = Number(num);

  const stock = await Stock.findOne({
    _id: id
  }).exec();

  if(!stock) {
    ctx.body = {
      code: 0,
      msg: '出错了',
      data: null
    };

    return;
  }

  if(type === COUNT_CONST.OUT) {
    // 出库
    num = -Math.abs(num);
  }else {
    // 入库
    num = Math.abs(num);
  }

  stock.count = stock.count + num;
  if(stock.count < 0) {
    ctx.body = {
      code: 0,
      msg: '出库失败，库存不足',
      data: null
    };

    return;
  }

  const res = await stock.save();

  // 存入库存操作log
  const log = new CountLog({
    stockId: id,
    type,
    num: Math.abs(num),
    user
  });

  log.save();

  ctx.body = {
    code: 1,
    msg: '操作成功',
    data: res
  }

});

//详情页面接口------------------------------------------------
router.get('/detail/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const one = await Stock.findOne({
    _id: id
  }).exec();
  if(!one) {
    ctx.body = {
      code: 0,
      msg: '出错了',
      data: null
    }

    return;
  }

  ctx.body = {
    code: 1,
    msg: '成功',
    data: one
  };

});


module.exports = router;