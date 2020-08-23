const Koa  = require('koa')
const path = require('path')
const staticRouter = require('./routers/static')
const Router = require('koa-router');
const send = require('koa-send');
const app = new Koa()
const isDev = process.env.NODE_ENV === 'development'
let router = new Router()
//全局异常处理
app.use( async (ctx,next)=>{
    try{
        console.log(`request with path ${ctx.path}`)
        await next()
    }catch(err){
        console.log(err)
        ctx.status = 500
        if(isDev){
            ctx.body = err.message
        }else{
            ctx.body = 'please try again later'
        }

    }

})

// favicon.ico 处理
app.use(async (ctx,next)=>{
    if(ctx.path==='/favicon.ico'){
      await  send(ctx,'/favicon.ico',{root:path.join(__dirname,'../')})
    }else{
        await next()
    }
})
//静态资源
staticRouter(router,{
    html:365
});
app.use(router.routes())
//页面路由
let pageRouter
if(isDev){
    pageRouter = require('./routers/dev-ssr')
}else{
    pageRouter = require('./routers/ssr')
}

app.use(pageRouter.routes())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '4444'
app.listen(PORT,HOST,()=>{
    console.log(`server is run in ${HOST}:${PORT}`)
})



