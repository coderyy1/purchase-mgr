const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');

//=========================================================
const Goods = mongoose.model('Goods');
const Supplier = mongoose.model('Supplier');

const router = new Router({
  prefix: '/goods'
});

//添加供应货物的接口---------------------------------------------
router.post('/add', async (ctx) => {
  const {
    id,
    name,
    place,
    price
  } = ctx.request.body;

  // 校验
  if(name === '' ||
  place === '' ||
  price === '') {
      ctx.body = {
        code: 0,
        msg: '添加失败',
        data: null
      };
      
      return;
    }

  const one = await Goods.findOne({
    name,
    supplier: id
  }).exec();
  if(one) {
    ctx.body = {
      code: 0,
      msg: '商品已存在',
      data: null
    };
    
    return;
  }

  const goods = new Goods({
    name,
    place,
    price,
    supplier: id
  });

  const res = await goods.save();

  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: res
  };

});

//查询的接口(供应商详情界面)--------------------------------------------------
router.get('/supplierList', async (ctx) => {
  // 分页查询所需参数
  const {
    id,
    page = 1,
    size = 5,
    keyword = ''
  } = ctx.query;

  // 处理id: string -> objectId
  // const objId = mongoose.Types.ObjectId(id);

  // 处理keyword
  const query = {
    supplier: id
  };
  if(keyword) {
    query.name = keyword
  }

  const list = await Goods
    .find(query)
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await Goods.find(query).countDocuments();

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

// 删除供货信息接口-----------------------------------------------
router.delete('/deleteGoods/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const one = await Goods.findOne({
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

  const res = await Goods.deleteOne({
    _id: id
  });

  ctx.body = {
    code: 1,
    msg: '删除成功',
    data: res
  }
});

//修改供货信息的接口-----------------------------------------
router.post('/update', async (ctx) => {
  const {
    _id,
    ...others
  } = ctx.request.body;

  const one = await Goods.findOne({
    _id
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

module.exports = router;