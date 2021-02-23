const auth = require('./auth/index');
const invite = require('./invite-code/index');
const demand = require('./demand/index');
const order = require('./order/index');
const supplier = require('./supplier/index');


module.exports = (app) => {
  app.use(auth.routes());
  app.use(invite.routes());
  app.use(demand.routes());
  app.use(order.routes());
  app.use(supplier.routes());
};