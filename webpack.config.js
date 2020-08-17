const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let merge = require('webpack-merge')
//获取package.json cross 环境变量
const isDev = process.env.NODE=='development'
const config ={
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.jsx$/,
                loader:'babel-loader'
            },
            {
                test:/\.(png|jpg|jpeg|gif|svg)/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        //配置环境变量 全局访问
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ]
}
//开发模式生效
if(isDev){
    config.module.rules.push({
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
    })
    //webpacserver 
    config.devServer={
        port:3000,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        hot:true
    }
    //热更新
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
    //sourcemap
    config.devtool='#cheap-module-eval-source-map'
    
}else{
    config.entry = {
        app:path.join(__dirname,'./src/index.js'),
        vendor:['vue']//第三方单独打包
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.output.path=path.join(__dirname,'dist')
    config.module.rules.push({
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
    })
    config.plugins.push(
    new MiniCssExtractPlugin({
        filename:'main.[chunkhash:8].css'//生成的样式文件名称
    }),
    //单独抽离三方模块

   
  
    )

   
}


module.exports = config