import Vue from 'vue'

const component = {
    name:'comp',
    props:['props1'],
    // template:`
    //     <div>
    //         <slot></slot>
    //     </div>
    // `,
    data(){
        return {
            value:'com bvalue'
        }
    },
    render(createElement){
        return createElement(
            'div',
            {on:{
                // click:()=>{this.$emit('click')}//发送事件
            }},
            [
                this.$slots.header,
                this.props1,

            ]
            )
        }
    }

new Vue({
    el:'#app',
    components:{
        comp:component
    },
    data:{

          value:'123'

    },
    methods:{
        handeClick(){
            alert(0)
        }
    },
    // template:`
    //     <comp ref='comp'>
    //         <span ref='span'>{{value}}</span>
    //     </comp>
    // `,
    render(createElement){
       return createElement(
           'comp',
           {
               ref:'comp',
               props:{
                   props1:this.value

               },
               on:{
                  click:this.handeClick//接收事件
               },/**对应v-on */
               nativeOn:{
                click:this.handeClick/**不需要组件发送$emit 该事件会自动绑定到组件的根节点上自动发送*/
               }
           },
           [
           createElement('span',{
            ref:'span',
            //dom填充
            domProps:{
                innerHTML:'<span style="color:red">donm</span>'
            },
            attrs:{
                id:"myobj"
            },
            slot:'header'//指定solt名称 span=slot
           },this.value)
          ])
    }
})
/*
编译成reder template编译成render x
vue提供的创建节点的函数，每个vue实例都有这个函数
第一个参数为要创建的节点
第二个参数为创建节点的属性
第三个参数为节点内容(如果有子节点则为数组)
*/
