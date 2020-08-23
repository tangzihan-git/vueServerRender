const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let { merge }= require('webpack-merge')
let baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
//获取package.json cross 环境变量
const isDev = process.env.NODE=='development'

let config
const devServer = {
        port:3000,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        //history路由
        historyApiFallback:{
            index:'/index.html'
        },
        hot:true
}
//开发模式生效
if(isDev){
    config = merge(baseConfig,{
         //sourcemap
        devtool:'cheap-module-eval-source-map',
        devServer,
        module:{
            rules:[{
                test:/\.styl/,
                use:['style-loader','css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }//使用前面的sourcemap
                },
                'stylus-loader',
                ]
            }]
        },
        //热更新
        plugins:[
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new HTMLPlugin({
             template:path.join(__dirname,'template.html')
            }),
            new webpack.DefinePlugin({
                'process.env':{
                    NODE_ENV:isDev?'"development"':'"production"'
                }
            }),
            new VueClientPlugin()//该插件会自动生成js文件名方便服务端渲染引用
        ]

    })

}else{
    //生产环境
    config = merge(baseConfig,{
        entry:{
            app:path.join(__dirname,'../client/client-entry.js'),
            vendor:['vue']//第三方单独打包
        },
        output:{
            filename:'[name].[chunkhash:8].js',
            publicPath:'/public/'
        },
        module:{
            rules:[{
                test:/\.styl/,
                use:[
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }//使用前面的sourcemap
                },
                'stylus-loader',
                ]
            }]
        },
        plugins:[
            new MiniCssExtractPlugin({
                filename:'main.[chunkhash:8].css'//生成的样式文件名称
            }),
            new webpack.DefinePlugin({
                'process.env':{
                    NODE_ENV:isDev?'"development"':'"production"'
                }
            }),
            //单独抽离三方模块
            new VueClientPlugin()//该插件会自动生成js文件名方便服务端渲染引用
        ]
    })
}


module.exports = config
