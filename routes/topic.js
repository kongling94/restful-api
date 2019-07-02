const router = require('koa-router')();
const { find, findById, create, update } = require('../controllers/topic');
router.prefix('/topic');
router.get('/', find);
router.post('/', create);
router.get('/:id', findById);
router.patch('/:id', update);
module.exports = router;
