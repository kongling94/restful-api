const mongoose = require('mongoose');
// const models = resolve(__dirname, '../database/schema')
const DB_URL = 'mongodb://localhost:27017/zhihu';

/**
 * 连接
 */
mongoose.connect(DB_URL, {
  useNewUrlParser: true
});
/**
 * 连接成功
 */
module.exports = database = app => {
  mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open to ' + DB_URL);
  });

  /**
   * 连接异常
   */
  mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
  });

  /**
   * 连接断开
   */
  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected');
  });
};
