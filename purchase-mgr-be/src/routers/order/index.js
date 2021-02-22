const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');

const Demand = mongoose.model('Demand');
const Order = mongoose.model('Order');

const router = new Router({
  prefix: '/order'
});

// 添加订单的接口------------------------------------------------------------------------------------------
router.post('/add', async (ctx) => {
  const {
    id,
    name,
    num,
    supplier = '',
    user = '',
    money
  } = ctx.request.body;

  const order = new Order({
    name,
    num,
    supplier,
    user,
    money,
    demandId: id
  });

  await order.save();

  const demand = await Demand.findOne({
    _id: id
  }).exec();
  // 修改已完成数量
  if(!demand.finishNum) {
    demand.finishNum = 0;
  }
  demand.finishNum = Number(demand.finishNum) + Number(num);
  // 设置demand状态
  if(demand.finishNum >= demand.num) {
    demand.state = 2; //完成
  }else {
    demand.state = 1;
  }
  const res = demand.save();

  ctx.body = {
    code: 1,
    msg: '操作成功',
    data: res
  }

});


//查询订单列表的接口--------------------------------------------
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

  const list = await Order
    .find(query)
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await Order.find(query).countDocuments();

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


//删除订单信息的接口------------------------------------------
router.delete('/deleteOrder/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const one = await Order.findOne({
    _id: id
  }).exec();

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '出错了'
    };

    return;
  }

  // 找到对应的demand
  const demand = await Demand.findOne({
    _id: one.demandId
  }).exec();

  demand.finishNum = Number(demand.finishNum) - Number(one.num);
  if(demand.finishNum < 0) {
    demand.finishNum = 0;
  }
  if(demand.finishNum < demand.num) {
    // 未完成
    demand.state = 1;
  }else {
    demand.state = 2;
  }

  await demand.save();

  const res = await Order.deleteOne({
    _id: id
  }).exec();

  ctx.body = {
    code: 1,
    msg: '删除成功',
    data: res
  }
});


//修改订单信息的接口---------------------------------------
router.post('/update', async (ctx) => {
  const {
    id,
    ...others
  } = ctx.request.body;

  const one = await Order.findOne({
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



//详情页面的接口------------------------------------------------
router.get('/detail/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const one = await Order.findOne({
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
    msg: '成功找到信息',
    data: one
  };

});

// id获取订单list的方法
router.get('/listById', async (ctx) => {
  // 分页查询所需参数
  const {
    id,
    page = 1,
    size = 4
  } = ctx.query;


  const list = await Order
    .find({
      demandId: id
    })
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await Order.find({
    demandId: id
  }).countDocuments();

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