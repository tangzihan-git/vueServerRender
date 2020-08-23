const Router = require('koa-router');
router = new Router();
router.get('/',ctx=>{
    ctx.body='test'
});
module.exports = router.routes();
