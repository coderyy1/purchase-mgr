const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');

//=========================================================
const Supplier = mongoose.model('Supplier');

const router = new Router({
  prefix: '/supplier'
});

//添加供应商信息的接口 ------------------------------------------------------------------------------------------------
router.post('/add', async (ctx) => {
  const {
    name,
    email,
    tel,
    address,
    contacts
  } = ctx.request.body;

  // 校验
  if(name === '' ||
  email === '' ||
  tel === '' ||
  address === '' ||
  contacts === ''
  ) {
      ctx.body = {
        code: 0,
        msg: '添加失败',
        data: null
      };
      
      return;
    }

  const one = await Supplier.findOne({
    name
  }).exec();

  if(one) {
    ctx.body = {
      code: 0,
      msg: '供应商已存在',
      data: null
    };
    
    return;
  }

  const supplier = new Supplier({
    name,
    email,
    tel,
    address,
    contacts
  });

  const res = await supplier.save();

  ctx.body = {
    code: 1,
    msg: '供应商信息添加成功',
    data: res
  };

});

//查询供应商信息的接口-----------------------------------------
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

  const list = await Supplier
    .find(query)
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await Supplier.find(query).countDocuments();

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

//删除供应商信息的接口---------------------------------------
router.delete('/deleteSupplier/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const one = await Supplier.findOne({
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

  const res = await Supplier.deleteOne({
    _id: id
  });

  ctx.body = {
    code: 1,
    msg: '删除成功',
    data: res
  }
});



//修改供应商信息的接口--------------------------------------------
router.post('/update', async (ctx) => {
  const {
    id,
    ...others
  } = ctx.request.body;

  const one = await Supplier.findOne({
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


//供应商详情接口----------------------------------------------
router.get('/detail/:id', async (ctx) => {
  const {
    id
  } = ctx.params;

  const one = await Supplier.findOne({
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