const Koa = require('koa');
const koaBody = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const { middleware: koaJwtMiddleware, checkUser, catchTokenError } = require('./helpers/token');
const cors = require('@koa/cors')



const app = new Koa();

connect().then(() => {
  // 解决跨域
  app.use(cors());
  app.use(koaBody());
  app.use(catchTokenError);
  // 检查jwt的中间件
  koaJwtMiddleware(app);
  app.use(checkUser);
  // 注册路由
  registerRoutes(app);

  app.listen(3000, () => {
    console.log('启动成功!');
  });
})


