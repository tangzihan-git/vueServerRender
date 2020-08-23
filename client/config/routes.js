import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id', // /app/xxx
    path: '/app',
    props: true,
    // props: (route) => ({ id: route.query.b }),
    // component: () => import(/* webpackChunkName: "todo-view" */ '../views/todo/todo.vue'),
    component: Todo,
    name: 'app'
  },
  {
    path: '/login',
    component: Login
  }
]
