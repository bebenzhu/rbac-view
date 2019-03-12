// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont.css'
import App from './App'
import router from './router'
import $ from 'jquery'
import http from './api/http.js'
import rbac from './rbac/rbac-service.js'
import utils from './utils/rbac-utils.js'
import store from './store/index.js'
import './mock/index';

// 将API方法绑定到全局
Vue.prototype.$http = http;
Vue.prototype.rbac = rbac;
Vue.prototype.utils = utils;

Vue.config.productionTip = false;

/**
 * 路由跳转前进行登陆校验
 */
// router.beforeEach((to, from, next) => {
//   if(chackLoginSession(to.path))
//     next();
//   else
//     router.push('/content');
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


/**
 * 判断是否登陆成功
 * @returns {boolean}
 */
function chackLoginSession(toPath){
  if(sessionStorage.getItem('SESSION-ID')||toPath=='/content'||toPath=='/'){
    return true;
  }else{
    rbac.notice("系统会话超时，请重新登录");
    return false;
  }
}
