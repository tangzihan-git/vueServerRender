let ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url:ctx.path}

  try {
    const appString = await renderer.renderToString(context)//该操作会改变context
    // return console.log(appString)
    // if (context.router.currentRoute.fullPath !== ctx.path) {
    //   return ctx.redirect(context.router.currentRoute.fullPath)
    // }

    const {title} = context.meta.inject()//查找meta信息

    // console.log(test,'普通')

    // return console.log(context)
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),//带标签的title信息
      // initalState: context.renderState()
    })

    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
