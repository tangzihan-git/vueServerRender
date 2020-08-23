let ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url:ctx.path}
  /**
   * context 用在服务端渲染的时候传入到vue-server-renderer vue-server-renderer拿到context之后渲染完成之后汇报在context插入各种属性
   * 方面我们渲染html 包含客户端js路径，css路径，将vue组件的样式写入到当前路由style标签，以及titledescript等。。。
   *
   * */

  try {
    const appString = await renderer.renderToString(context)//该操作会改变context

    const {title} = context.meta.inject()//查找meta信息

    //渲染模板
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),//生成<link ...>
      scripts: context.renderScripts(),//生成<script ...>
      title: title,//带标签的title信息
      initalState: context.renderState()
    })

    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
