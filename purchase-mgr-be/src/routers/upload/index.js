const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');
const jwt = require('jsonwebtoken');
const { getFileExt, saveFileToDisk } = require('../../helpers/UploadImg');
const fs = require('fs');
const pathConfig = require('../../../pathConfig');
const path = require('path');

//=========================================================
const User = mongoose.model('User');

const router = new Router({
  prefix: '/upload'
});

// 上传用户头像的接口
router.post('/userAvat', async (ctx) => {
  const { userId } = ctx.request.body;

  const user = await User.findOne({
    _id: userId
  }).exec();

  //无用户
  if(!user) {
    ctx.body = {
      code: 0,
      msg: '出错了,用户不存在',
      data: null
    }
    return;
  }

  // 该用户已设置头像
  if(user.avatSrc) {
    // 获取文件后缀名
    const ext = user.avatSrc.split('.').pop();
    const fileName = `${user._id}.${ext}`
    //如果存在文件
    const filePath = path.resolve(pathConfig.UPLOAD_USER_DIR, fileName);
    if(fs.existsSync(filePath)) {
      // 删除头像文件
      fs.unlinkSync(filePath);
    }
    
  }
  const ext = getFileExt(ctx);
  const fileName = `${user._id}.${ext}`;
  await saveFileToDisk(
    ctx, path.resolve(pathConfig.UPLOAD_USER_DIR, fileName)
  );

  user.avatSrc =  `http://localhost:5000/avatar/${fileName}`;

  const res = await user.save();


  ctx.body = {
    code: 1,
    msg: '上传成功',
    data: {
      user,
      data: user.avatSrc
    }
  }

});



module.exports = router;