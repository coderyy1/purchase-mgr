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
    finishNum = 0,
    endTime,
    publisher = '',
    state = 1,
    order = ''
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
    finishNum,
    endTime,
    publisher,
    state,
    order
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


//删除需求的接口--------------------------------------------------
router.delete('/deleteDemand/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const one = await Demand.findOne({
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

  const res = await Demand.deleteOne({
    _id: id
  });

  ctx.body = {
    code: 1,
    msg: '需求删除成功',
    data: res
  }
});


//修改需求的接口-------------------------------------------------------------
router.post('/update', async (ctx) => {
  const {
    id,
    ...others
  } = ctx.request.body;

  const one = await Demand.findOne({
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

  if(one.finishNum < one.num) {
    one.state = 1;
  }else {
    one.state = 2;
  }
  const res = await one.save();

  ctx.body = {
    code: 1,
    msg: '修改成功',
    data: res
  };

});

// 需求详情页面接口---------------------------------------------------------------------------------------

router.get('/detail/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const one = await Demand.findOne({
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
    msg: '成功找到需求信息',
    data: one
  };

});


module.exports = router;