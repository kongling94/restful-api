const Mongoose = require('mongoose');
const { Schema } = Mongoose;
const userSechma = new Mongoose.Schema({
  __v: {
    type: Number,
    // 默认不在查询结果中显示
    select: false
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  avatar: {
    type: String
  },
  gender: {
    type: String,
    // 可枚举的enum
    enum: ['male', 'female'],
    default: 'male',
    required: true
  },
  header: {
    type: String
  },
  locations: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    select: false
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Topic'
  },
  employments: {
    type: [
      {
        company: { type: Schema.Types.ObjectId, ref: 'Topic' },
        job: { type: Schema.Types.ObjectId, ref: 'Topic' }
      }
    ],
    select: false
  },
  //教育经历
  educations: {
    type: [
      {
        school: {
          type: Schema.Types.ObjectId,
          ref: 'Topic'
        },
        // 专业
        major: {
          type: Schema.Types.ObjectId,
          ref: 'Topic'
        },
        // 学历
        dimploma: {
          type: Number,
          enum: [1, 2, 3, 4, 5]
        },
        // 入学时间
        entrance_year: {
          type: String
        },
        // 毕业时间
        graduation_year: {
          type: String
        }
      }
    ],
    select: false
  },
  follows: {
    type: [
      {
        type: Schema.Types.ObjectId,
        // 引用
        ref: 'User'
      }
    ],
    select: false
  }
});
module.exports = Mongoose.model('User', userSechma);
