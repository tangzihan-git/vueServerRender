//每次渲染都渲染一个新的app，不能用上一次渲染过的

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './APP.vue'
import Meta from 'vue-meta'
import createStore from './store/store'
import createRouter from './config/router.js'

import './assets/styles/global.styl'

//
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)//处理页面元信息
//每一次创建新的属性
export default ()=>{
    const router =  createRouter()
    const store = createStore()
    const app = new Vue({
        router,
        store,
        render: (h) => h(App)
    })
    return {app,router,store}
}
