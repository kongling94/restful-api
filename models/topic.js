const Mongoose = require('mongoose');
const { Schema, model } = Mongoose;
const topicSchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  desc: {
    type: String,
    select: false
  }
});
module.exports = model('Topic', topicSchema);
