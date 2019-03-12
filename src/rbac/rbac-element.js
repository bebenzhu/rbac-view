//rbac 组件

import Vue from 'vue'
import ElementUI from 'element-ui';

Vue.use(ElementUI);

let ButtonConstructor  = Vue.extend(ElementUI.Button);

  let addButton = ()=>{
    let buttonDom = new ButtonConstructor({
      el:document.createElement('div')    //将toast组件挂载到新创建的div上
    })
    document.body.appendChild( buttonDom.$el )   //把toast组件的dom添加到body里
  }

/**
 * 右边栏通知框
 * @param message
 * @param type
 */
let notice = function(message,type){
  let config = {
    title: '',
    message: message
  };
  switch (type) {
    case 'info':$.extend(config,{type: 'info',duration: 2000});break;
    case 'success':$.extend(config,{type: 'success',duration:'4000'});break;
    case 'warning':$.extend(config,{type: 'warning',duration: 7000});break;
    case 'error':$.extend(config,{type: 'error',duration: 10000});break;
  }
  ElementUI.Notification(config);
}


let popModal = function() {
  let options = {
    title:'popmodal测试'
  };
  return ElementUI.Dialog(options);
}


export default {
  vue: Vue,
  notice: notice,
  popModal: popModal,
  addButton: addButton
}
