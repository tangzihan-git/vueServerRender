const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const vueLoaderOptions = require('./vue-loader.config')
//获取package.json cross 环境变量
const isDev = process.env.NODE=='development'
const config ={
    target: 'web',
    entry:path.join(__dirname,'../client/client-entry.js'),
    output:{
        filename:'bundle.[hash:8].js',
        path:path.join(__dirname,'../public'),
        publicPath:'http://127.0.0.1:3000/public/'//请求客户端的资源
    },
    module:{
        rules:[
            // {
            //     test:/\.(vue|js|jsx)$/,
            //     loader:'eslint-loader',
            //     exclude:/node_modules/,
            //     enforce:'pre'//预处理
            // },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:{
                    extractCSS: true
                }
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
