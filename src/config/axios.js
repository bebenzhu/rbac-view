/**
 * axios请求配置
 */
import axios from 'axios';
import baseURL from './baseURL.js';


// axios默认配置
let generalInstance = axios.create({
  baseURL: baseURL.baseURL,
  timeout: 60000,
  headers: {
    post:{
      'Content-Type' : 'application/json;charset=UTF-8'             //'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }
});

//添加请求拦截器
generalInstance.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = JSON.stringify(config.data);
    // console.log(config.data);
  }
  return config;
},(error) =>{
  return Promise.reject(error);
});


//添加响应拦截器
generalInstance.interceptors.response.use((res) =>{
  // console.log(res);
  //对响应数据做些事
  if(!res.data.success){
    return Promise.resolve(res);
  }
  return res;
}, (error) => {
  return Promise.reject(error);
});



export default {
  generalInstance : generalInstance
};
