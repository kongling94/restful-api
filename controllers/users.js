const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/auth');
class Users {
  async checkUser(ctx, next) {
    const user = await User.findById(ctx.params.id);
    if (!user) {
      ctx.body = {
        code: 0,
        msg: '用户不存在'
      };
    }
    await next();
  }
  // 查询所有用户
  async find(ctx) {
    return (ctx.body = await User.find());
  }
  async findById(ctx) {
    const { id } = ctx.params;
    const { fields } = ctx.query;
    let selectFields;
    if (fields) {
      selectFields = fields
        .split(';')
        .filter(f => f)
        .map(f => ` +${f}`)
        .join('');
    }
    let populateFields;
    if (fields) {
      selectFields = fields
        .split(';')
        .filter(f => f)
        .map(f => {
          if (f === 'employments') {
            return 'employments.company employments.job';
          }
          if (f === 'educations') {
            return 'educations.school educations.major';
          }
          return f;
        })
        .join('');
    }

    const user = await User.findById(id)
      .select(selectFields)
      .populate(populateFields);
    if (!user) {
      ctx.body = {
        code: 404,
        msg: '未查询到该用户'
      };
    }
    ctx.body = {
      user
    };
  }
  async create(ctx) {
    const {
      name,
      password,
      avatar,
      locations,
      employments,
      educations,
      business
    } = ctx.request.body;

    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      },
      avatar: {
        type: 'string',
        required: false
      },
      gender: {
        type: 'string',
        required: false
      },
      headeline: {
        type: 'string',
        required: false
      },
      locations: {
        type: 'array',
        itemType: 'string',
        required: false
      },
      business: { type: 'string', required: false },
      employments: {
        type: 'array',
        itemType: 'object',
        required: false
      },
      educations: {
        type: 'array',
        itemType: 'object',
        required: false
      }
    });

    const isUser = await User.findOne({ name });

    if (!isUser) {
      const newUser = await new User({
        name,
        password,
        avatar,
        locations,
        employments,
        educations,
        business
      });
      const isSave = await newUser.save();

      if (isSave) {
        return (ctx.body = {
          code: 1,
          user: newUser,
          msg: '创建成功'
        });
      } else {
        ctx.body = {
          code: 0,
          msg: '保存失败'
        };
      }
    } else {
      return (ctx.body = {
        code: 0,
        msg: '用户已存在'
      });
    }
  }
  async update(ctx) {
    const { name, id, password } = ctx.request.body;
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      },
      avatar: {
        type: 'string',
        required: false
      },
      gender: {
        type: 'string',
        required: false
      },
      headeline: {
        type: 'string',
        required: false
      },
      locations: {
        type: 'array',
        itemType: 'string',
        required: false
      },
      business: { type: 'string', required: false },
      employments: {
        type: 'array',
        itemType: 'object',
        required: false
      },
      educations: {
        type: 'array',
        itemType: 'object',
        required: false
      }
    });
    const user = await User.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    });
    if (user) {
      return (ctx.body = {
        user
      });
    } else {
      ctx.body = {
        code: 0,
        msg: '更新失败'
      };
    }
  }

  async del(ctx) {
    const { id } = ctx.request.body;
    const user = await User.findByIdAndRemove(id);
    if (user) {
      ctx.body = {
        user,
        msg: '用户删除成功'
      };
    }
  }
  async login(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    });

    const user = await User.findOne(ctx.request.body);
    const { _id, name } = user;

    if (!user) {
      ctx.body = {
        code: 0,
        msg: '用户不存在或密码错误'
      };
    }
    const token = jwt.sign(
      {
        name,
        _id
      },
      secretKey,
      { expiresIn: '1d' }
    );

    ctx.body = {
      token
    };
  }
  async getFollow(ctx) {
    const user = await User.findById(ctx.params.id)
      .select('+follows')
      .populate('follows');

    if (!user) {
      ctx.body = {
        code: 0,
        msg: '未找到'
      };
    }
    ctx.body = {
      user
    };
  }
  async following(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+follows');
    if (!me.follows.includes(ctx.params.id)) {
      me.follows.push(ctx.params.id);
      me.save();
      ctx.body = {
        code: 1,
        msg: '关注成功'
      };
    }
  }
  async unfollowing(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+follows');
    const index = me.follows.indexOf(ctx.params.id);
    if (index > -1) {
      me.follows.splice(index, 1);
      me.save();
      ctx.body = {
        code: 1,
        msg: '取消关注成功'
      };
    }
  }
  async listfollows(ctx) {
    const list = await User.find({ follows: ctx.params.id });
    ctx.body = {
      list
    };
  }
}
module.exports = new Users();
