const path = require('path')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
let { merge }= require('webpack-merge')
let baseConfig = require('./webpack.config.base')
//获取package.json cross 环境变量
const VueServerPlugin  = require('vue-server-renderer/server-plugin')

let config
const isDev = process.env.NODE_ENV === 'development'
config = merge(baseConfig,{
    //sourcemap
   mode:'production',
   target:'node',//执行环境
   entry:path.join(__dirname,'../client/server-entry.js'),
   devtool:'source-map',
   output:{
       libraryTarget:"commonjs2",//通过module.expots导出 在nodehjs中就可以直接引用
       filename:'server-entry.js',
       path:path.join(__dirname,'../server-build')
   },
   externals: Object.keys(require('../package.json').dependencies),
   //引用库不打包，不妨碍使用,因为服务端会自动找node_modules里面的模块，所以不需要打包
   module:{
    rules:[{
        test:/\.styl/,
        use:[
        // 'style-loader',
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.join(__dirname,'../dist')
            },
        },
        'css-loader',
        {
            loader:'postcss-loader',
            options:{
                sourceMap:true
            }//使用前面的sourcemap
        },
        'stylus-loader',
        ]
    },
]
   },
   plugins:[
       new MiniCssExtractPlugin({
        filename:'main.[chunkhash:8].css'//生成的样式文件名称
       }),
       //配置环境变量
       new webpack.DefinePlugin({
           'process.env':{
               NODE_ENV:JSON.stringify(process.NODE_ENV || 'development'),
               VUE_ENV:'server'
           }
       }),
       new VueServerPlugin()//该配置打包不会输出js文件而是一个json文件，通过这个json文件做一些服务端渲染的操作
   ]

})


module.exports = config

/**
 * npm i  vue-server-renderer
 *
 */
