import Vuex from 'vuex'
import defalutState from './state/state.js'
import mutations from './mutations/mutationns'
import getters from './getters/getters'
// Vue.use(Vuex)
// export default store
/**服务端渲染的写法 */
export default ()=>{
    const store = new Vuex.Store({
        state:defalutState,
        mutations,
        getters,
        plugins:[
            //每一个方法都是一个插件接收store对象
            (store)=>{


            }
        ]
    })

// 热更新
    if(module.hot){
        module.hot.accept([
            './state/state.js',
            './mutations/mutationns.js',
            './actions/actions.js',
            './getters/getters.js'
        ],()=>{
            const newState = require('./state/state.js').default
            const newMutations = require('./mutations/mutationns').default
            const newActions = require('./actions/actions.js').default
            const newGetters = require('./getters/getters.js').default
            store.hotUpdatek({
                state:newState,
                mutations:newMutations,
                getters:newGetters,
                actions:newActions
            })
        })
    }
    return store
}





