import Utils from '@/utils/rbac-utils.js';


let getSessionUser = function (options) {
  return Utils.setRes({
    userId:"chenhao",
    userName:'陈浩',
    userIphone:'1233234'
  });
}


export default {
  getSessionUser
};
