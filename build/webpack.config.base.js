const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const vueLoaderOptions = require('./vue-loader.config')
//获取package.json cross 环境变量
const isDev = process.env.NODE=='development'
const config ={
    entry:path.join(__dirname,'../client/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'../dist')
    },
    module:{
        rules:[
            {
                test:/\.(vue|js|jsx)$/,
                loader:'eslint-loader',
                exclude:/node_modules/,
                enforce:'pre'//预处理
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:vueLoaderOptions(isDev)
            },
            {
                test:/\.jsx$/,
                loader:'babel-loader'
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.(png|jpg|jpeg|gif|svg)/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10,
                            name:'resource/[path][name]-[hash:8].[ext]'
                        }
                    }
                ]
            },

        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
}


module.exports = config
