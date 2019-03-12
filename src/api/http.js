import axios from '../config/axios.js';




// 返回在vue模板中的调用接口
export default {
  get: function (url, params) {
    return axios.generalInstance.get(url,{params:params});
  },
  delete: function (url, params) {
    return axios.generalInstance.delete(url,{params:params});
  },
  post: function (url, params) {
    return axios.generalInstance.post(url,params);
  },
  put: function (url, params) {
    return axios.generalInstance.put(url,params);
  },
  upload : function (url, params) {
    return axios.uploadInstance.post(url,params);
  }
}
