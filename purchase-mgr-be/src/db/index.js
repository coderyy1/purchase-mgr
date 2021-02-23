require('./Schemas/User');
require('./Schemas/InviteCode');
require('./Schemas/Demand');
require('./Schemas/Order');
require('./Schemas/Supplier');
const mongoose = require('mongoose');

// 修复mongoose弃用警告
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


const connect = () => {
  return new Promise((resolve, reject) => {
    // 连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/purchase-mgr')
      .then(() => {
        console.log('连接数据库成功!');

        resolve();
      })
      .catch((err) => {
        logError(err);

        reject();
      });
  });
};

module.exports = {
  connect
};