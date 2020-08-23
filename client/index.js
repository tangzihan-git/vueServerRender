import  Vue from 'vue'
import Vuex from 'vuex'
import App from './APP.vue'
import VueRouter from 'vue-router'
import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'
// import store from './store/store'


/*全局钩子*/
// router.beforeEach((to,from,next)=>{
//   /**next()控制跳转 数据校验 ，判断用户登录 */
//   //  next('/logijn')
//   // next({path:'/login'})
// })
// router.beforeResolve((to,from,next)=>{
// /**所有beforeenter触发后执行*/
// })
// router.afterEach((to,fron)=>{
//   //跳转之后
// })





Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

