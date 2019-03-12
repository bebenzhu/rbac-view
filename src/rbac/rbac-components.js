//rbac  全局组件类

import Vue from 'vue'
//组件
import selectUpload from '@/components/upload/select-upload';
import dragUpload from '@/components/upload/drag-upload';
import popModal from '@/components/popmodal/pop-modal';
import navbarHome from '@/components/navbar-home';
import coreList from '@/components/table/core-list';
import loginUser from '@/components/login-user';
import tabs from '@/components/tabs/tabs';


Vue.component('select-upload',selectUpload);
Vue.component('drag-upload',dragUpload);
Vue.component('pop-modal',popModal);
Vue.component('navbar-home',navbarHome);
Vue.component('core-list',coreList);
Vue.component('login-user',loginUser);
Vue.component('tabs',tabs);
