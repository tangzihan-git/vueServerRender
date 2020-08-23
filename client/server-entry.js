import createApp from './create-app'

//该函数接收的context = server-render/js里面的 renderer.renderToString(context)
export default context => {
  //可能要进行异步操作，我们要让vue-server-renderer只能异步结束了
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)//想导航到不同的 URL，使url与组件匹配

    //路由被推进去后，所有的异步操作都完成后
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()//获取url匹配的组件
      //如果请求的url没有相应的组件
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      // resolve(app)
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            route: router.currentRoute,
            router,
            store
          })
        }
      })).then(data => {
        context.meta = app.$meta()//vue服务端渲染meta使用方式
        context.state = store.state
        context.router = router
        resolve(app)
      })
    })
  })
}
