//rbac  service类

import rbacElement from './rbac-element.js'
import baseURL from '@/config/baseURL.js';
import './rbac-components.js'


// 返回在vue模板中的调用接口
export default {
  vue: rbacElement.vue,
  notice: function (message,type) {
    rbacElement.notice(message,type);
  },
  popModal: function (message,type) {
    rbacElement.popModal(message,type);
  },
  packUri: function (uri) {
    return baseURL.baseURL+uri;
  },
  setValueForArrayObject: function (array, indexOfItem, columnName, value) {
    rbacElement.vue.set(array[indexOfItem], columnName, value);
  },
  addButtonlist: function () {
    rbacElement.addButton();
  }
}

