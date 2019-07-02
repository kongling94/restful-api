const fs = require('fs');
const { resolve } = require('path');
const r = path => resolve(__dirname, path);
const routerPath = r('../routes');

module.exports = app => {
  fs.readdirSync(routerPath).forEach(file => {
    const route = require(`${routerPath}/${file}`);
    app.use(route.routes(), route.allowedMethods());
  });
};
