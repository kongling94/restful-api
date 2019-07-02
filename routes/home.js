const router = require('koa-router')();
const { index1, string1, upload } = require('../controllers/home');

router.get('/', index1);

router.get('/string', string1);

router.post('/upload', upload);

module.exports = router;
