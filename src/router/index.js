import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login/login.vue'
import home from '../pages/home/home.vue'
import center from '../pages/center/center.vue'
import message from '../pages/message/message.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/center', component: center
        },
        {
          path: '/message', component: message
        }
      ]
    }
  ]
})
