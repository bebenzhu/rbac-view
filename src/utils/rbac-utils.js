import Md5 from 'js-md5';

let Base64 = require('js-base64').Base64;

export default{
  md5Encryption:function (message) {
    return Md5.hex(message);
  },
  setRes:function (body) {
    return{
      footer: {repTime: (new Date()).toLocaleString()},
      header: {code: "SUCESS", message: null},
      body: body
    }
  }
}
