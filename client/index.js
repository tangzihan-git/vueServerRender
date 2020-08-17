import Vue from 'vue'
import App from './APP.vue'
import './assets/styles/global.styl'
const root = document.createElement('div')
class Person {
  run () {
    console.log('i can run')
  }
}
new Person().run()
document.body.appendChild(root)
new Vue({
  render: (h) => h(App)// 渲染App内容
}).$mount(root)
