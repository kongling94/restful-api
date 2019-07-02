const path = require('path');
class Home {
  index1(ctx) {
    return ctx.render('index', {
      title: 'Hello Koa 2!'
    });
  }
  string1(ctx) {
    ctx.body = 'koa2 string';
  }
  upload(ctx) {
    const file = ctx.request.files.file;
    const basename = path.basename(file.path);
    ctx.body = {
      basename,
      path: `${ctx.origin}/upload/${basename}`
    };
  }
}
module.exports = new Home();
