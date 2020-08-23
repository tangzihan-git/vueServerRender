// const Router = require('koa-router')
// const send = require('koa-send')

// const staticRouter = new Router({ prefix: '/public' })

// staticRouter.get(/\.*/, async ctx => {
//   await send(ctx, ctx.path)
// })

// module.exports = router
const static = require('koa-static');
module.exports = function(router,options){
    options = options||{};
    options.image = options.image||30;
    options.script = options.script||1;
    options.styles = options.styles||30;
    options.html = options.html||30;
    options.other = options.othre||7;
    router.all(/((\.jpg)|(\.png)|(\.gif))$/i,static('./',{
        maxAge:options.image*86400*1000
    }));
    router.all(/((\.js)|(\.jsx))$/i,static('./',{
        maxAge:options.script*86400*1000
    }));
    router.all(/((\.css))$/i,static('./',{
        maxAge:options.styles*86400*1000
    }));
    router.all(/((\.html)|(\.htm))$/i,static('./',{
        maxAge:options.html*86400*1000
    }));
    // router.all(/\.*/,static('./',{
    //     maxAge:options.other*86400*1000
    // }))
}
