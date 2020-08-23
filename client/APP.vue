<template>
  <div id="app">
      <div id="cover"></div>
      <Header></Header>
      <router-link to="/app">app</router-link>
       <router-link to="/login">login</router-link>
      <!-- <todo></todo> -->
      <router-view></router-view>
      <Footer></Footer>

  </div>
</template>
<script>
import Header from "../layout/header.vue"
import Footer from '../layout/footer.jsx'
// import Todo from './views/todo/todo.vue'
export default {
  //声明元信息
   metaInfo:{
     title:'这时首页'
   },
    components:{
      Header,
      Footer
    },
    data(){
        return {
          title:'word hello'
        }
    }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover {
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>
