const auth = require('./auth/index');
const invite = require('./invite-code/index');
const demand = require('./demand/index');


module.exports = (app) => {
  app.use(auth.routes());
  app.use(invite.routes());
  app.use(demand.routes());
};