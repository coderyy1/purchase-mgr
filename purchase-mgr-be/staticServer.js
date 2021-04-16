const Koa = require('koa');
const staticResource = require('koa-static');
const fs = require('fs');
// const cors = require('koa-cors');
const path = require('path');


const staticApp = new Koa();

// 跨域
// staticApp.use(cors());

// 静态资源
staticApp.use(staticResource(path.join(__dirname) + '/public'));

staticApp.listen(5000, () => {
  console.log('静态资源服务器运行在5000端口');
});