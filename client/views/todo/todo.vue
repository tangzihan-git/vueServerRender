<template>
  <section class="real-app">
        <input type="text" class="add-input" 
        autofocus placeholder="挤下要做什么？" @keyup.enter="addTodo">
        <item :todo="todo"
        v-for="todo in filteredTods"  :key="todo.id" @delTodo="delTodo"></item>
        <tabs :filter="filter" :todos="todos" @toggle="toggle" @clearAll="clearAll"></tabs>
  </section>
</template>

<script>
let id=0
import item from "./item.vue"
import tabs from './tabs.vue'
export default {
    components:{
        item,tabs
    },
    data(){
        return {
            todos:[

            ],
            filter:'all'
        }
    },
    methods:{
        addTodo(e){
            this.todos.unshift({
                id:id++,
                content:e.target.value.trim(),
                completed:false
            })
            e.target.value=''
        },
         delTodo(id){
             this.todos.splice(this.todos.findIndex(todo=>{
                 return todo.id=id
             }),1)
         },
         toggle(state){
             this.filter=state
             console.log(this.filter)
         },
         clearAll(){
           this.todos = this.todos.filter(todo=>!todo.completed)
         }
    },
    computed:{
        filteredTods(){
          if(this.filter==='all'){
            return this.todos
          } 
          const completed = this.filter==='completed'
          return this.todos.filter(todo=>completed===todo.completed)
        }
    }

}
</script>

<style lang="stylus" scoped>
   .real-app{
       width 600px
       margin 0 auto
       box-shadow 0 0 5px #666
    
    .add-input{
       position relative
       margin 0
       width 100%
       font-size 24px
       line-height 1.4em
       border 0
       outline none
       color inherit
       padding 6px
       border 1px solid #999
       box-sizing border-box
       padding 16px 16px 16px 60px
    
     
   }

   }

   
</style>