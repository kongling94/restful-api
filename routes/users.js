const router = require('koa-router')();

const {
  find,
  findById,
  create,
  update,
  del,
  login,
  getFollow,
  following,
  unfollowing,
  listfollows,
  checkUser
} = require('../controllers/users');
router.prefix('/users');
// const auth = jwt({ secretKey });
// const auth = async (ctx, next) => {
//   const { authorization = '' } = ctx.request.header;
//   const token = authorization.replace('Bearer ', '');

//   try {
//     const user = jwt.verify(token, secretKey);
//     ctx.state.user = user;
//     console.log(1233333);
//   } catch (error) {
//     return (ctx.body = {
//       error
//     });
//   }
//   await next();
// };

router.get('/find', find);
router.get('/find/:id', findById);
router.post('/create', create);
router.patch('/update', update);
router.delete('/delete', del);
router.post('/login', login);
router.put('/following/:id', following);
router.put('/unfollowing/:id', checkUser, unfollowing);
router.get('/:id/follows', checkUser, getFollow);
router.get('/listfollows/:id', checkUser, listfollows);

module.exports = router;
