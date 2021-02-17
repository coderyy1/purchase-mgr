const Koa = require('koa');

const app = new Koa();

app.use((ctx) => {
  ctx.body = {
    code: 1,
    msg: '成功了'
  }
});

app.listen(3000, () => {
  console.log('启动成功');
  console.log('hi');
});