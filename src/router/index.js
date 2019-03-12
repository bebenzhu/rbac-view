import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Content from '@/page/content'
import Login from '@/page/login'
import User from '@/page/user/userMain'
import test from '@/page/testpage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: test
    },
    //登陆界面路由
    {
      path: '/login',
      component: Login
    },
    //主页面路由
    {
      path: '/content',
      component: Content,
      children:[{
        path: '/content/index',
        name: 'Index',
        component: Index
      },{
        path: '/content/user',
        name: 'User',
        component: User
      }]
    }
  ]
})
