/**
 * 定义本地测试接口，最好与正式接口一致，避免联调阶段修改工作量
 */
// 引入mockjs
import Mock from 'mockjs';
// 引入模板函数类
import user from './user.js';

Mock.setup({
  timeout: 500, // 设置延迟响应，模拟向后端请求数据
});

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(/\/LoginRestCtrl\/getSessionUser(|\?\S*)$/, 'get', user.getSessionUser);

Mock.mock(/\/LoginRestCtrl\/getSessionUser(|\?\S*)$/, 'get', user.getSessionUser);
