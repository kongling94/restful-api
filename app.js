const Koa = require('koa');
const app = new Koa();
// const R = require('ramda');
const views = require('koa-views');
const json = require('koa-json');
const koaBody = require('koa-body');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const parameter = require('koa-parameter');
const koaStatic = require('koa-static');
const jwt = require('koa-jwt');
const db = require('./config/db');
const { resolve } = require('path');
const r = path => resolve(__dirname, path);
const { secretKey } = require('./config/auth');
const routers = require('./middleware/router');
// const middlewares = ['router'];

// error handler
onerror(app);
// 静态资源目录
app.use(koaStatic(r('./public/upload')));
// koa-body支持file类型的处理
app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 文件目录
      uploadDir: r('./public/upload'),
      // 保持后缀名
      keepExtensions: true
    }
  })
);
// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
);
app.use(
  jwt({ secret: secretKey }).unless({
    path: [/^\/users\/login/]
  })
);
db(app);
app.use(parameter(app));
routers(app);
/* // routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods()) */

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
