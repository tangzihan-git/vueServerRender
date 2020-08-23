const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('../routers/server.render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})


const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '你等一会，别着急......'
    return
  }

  //发送axios获取js

  const clientManifestResp = await axios.get(
        'http://127.0.0.1:3000/public/vue-ssr-client-manifest.json'
  )
  // return console
  const clientManifest = clientManifestResp.data//静态文件地址
  // return ctx.body=clientManifest
  // ctx.body='test test'
  const template = fs.readFileSync(
      path.join(__dirname, '../server.template.ejs'),
      'utf-8'
    )

  // //生成调用rebnder的function
  const renderer =  VueServerRenderer
  .createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })
  // //获取webpack-dev-server打包的js文件路径
  // return console.log(render)
  await serverRender(ctx, renderer, template)
  // ctx.body=template





}

const router = new Router()
router.get(/\.*/, handleSSR)

module.exports = router
