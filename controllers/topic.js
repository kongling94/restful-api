const Topic = require('../models/topic');
class TopicCtl {
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const topic = await Topic.find({ name: new RegExp(ctx.query.q) })
      .limit(perPage)
      .skip(page * perPage);
    ctx.body = {
      topic
    };
  }
  async findById(ctx) {
    const { fields = '' } = ctx.query;
    const selectFields = fields
      .split(';')
      .filter(f => f)
      .map(r => ` +${r}`)
      .join('');

    const result = await Topic.findById(ctx.params.id).select(selectFields);
    ctx.body = {
      result
    };
  }
  async create(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      avatar: {
        type: 'string',
        required: false
      },
      desc: {
        type: 'srting',
        required: false
      }
    });
    const topic = await new Topic(ctx.request.body).save();
    ctx.body = {
      topic
    };
  }
  async update(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: false
      },
      avatar: {
        type: 'string',
        required: false
      },
      desc: {
        type: 'string',
        required: false
      }
    });
    const topic = await Topic.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = {
      topic
    };
  }
}
module.exports = new TopicCtl();
