const auth = require('./auth/index');
const invite = require('./invite-code/index');
const demand = require('./demand/index');
const order = require('./order/index');
const supplier = require('./supplier/index');
const goods = require('./goods/index');
const stock = require('./stock/index');
const countLog = require('./count-log/index');
const character = require('./character/index');
const user = require('./user/index');
const profile = require('./profile/index');
const home = require('./home/index');


module.exports = (app) => {
  app.use(auth.routes());
  app.use(invite.routes());
  app.use(demand.routes());
  app.use(order.routes());
  app.use(supplier.routes());
  app.use(goods.routes());
  app.use(stock.routes());
  app.use(countLog.routes());
  app.use(character.routes());
  app.use(user.routes());
  app.use(profile.routes());
  app.use(home.routes());
};