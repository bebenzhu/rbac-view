<template>
  <div>
    <el-container direction="vertical">
      <!--<el-header height="50px">Header</el-header>-->
      <el-main>
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div slot="header">
            <span class="login-font" style="color: gold">Login</span>
          </div>
          <div style="width: 240px;margin-left: 20px;margin-top: 20px">
            <el-form :model="loginDate" :rules="ruleValidate" ref="loginRuleForm">
              <el-form-item prop="name">
                <el-input size="small" prefix-icon="rbac-icon-my_light" placeholder="用户名" v-model="loginDate.name" clearable></el-input>
              </el-form-item>
              <el-form-item prop="passwd">
                <el-input size="small" prefix-icon="rbac-icon-lock" placeholder="密码" v-model="loginDate.passwd" clearable type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="login" style="width:240px;">Sign</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-main>
      <el-footer height="5vh">安全小提示：如你未授权使用这私人电脑,请立即离开。在未发通知或未允许的情况下,所有系统行为会受监控记录</el-footer>
    </el-container>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'

  export default {
    name: 'Home',
    data: function() {
      return {
        loginDate: {
          name: '',
          passwd: ''
        },
        ruleValidate: {
          name:[
            { required: true, message: '请输入用户名！', trigger: 'blur' },
          ],
          passwd:[
            { required: true, message: '请输入密码！', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.loginDate.name=Cookies.get('UserId');
      this.loginDate.passwd=Cookies.get('Password');
    },
    methods: {
      login() {
        this.$refs['loginRuleForm'].validate((valid) => {
          if (valid) {
            this.$http.post("/LoginRestCtrl/login", {"UserId": this.loginDate.name,
              "Password": this.utils.md5Encryption(this.loginDate.passwd)}).then(r => {
              if(r.data.body=='Failure'){
                  this.rbac.notice("用户名或密码错误！","error");
              }else{
                sessionStorage.setItem("SESSION-ID",r.data.body);
                sessionStorage.setItem("SESSION-USER-ID",this.loginDate.name);
                sessionStorage.setItem("SESSION-USER-PASSWORD",this.loginDate.passwd);

                Cookies.set('SessionId', r.data.body, { expires: 7, path: '' });
                Cookies.set('UserId', this.loginDate.name, { expires: 7, path: '' });
                Cookies.set('Password', this.loginDate.passwd, { expires: 7, path: '' });

                this.$router.push('/content');
              }
            }).catch(function (error) {
              console.log(error);
            });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>
<style scoped>
  .el-container{
    height:100%;
    min-height:100vh;
  }
  .el-header{
    background-color: crimson;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
  .el-main{
    height: 95vh;
    background-image: url("/static/image/login.jpeg");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    opacity: 0.9;
  }
  .el-footer {
    background-color: black;
    color: #B3C0D1;
    font-size: 11px;
    text-align: center;
    line-height: 5vh;
  }
  .el-card{
    width: 280px;
    height: 300px;
    position: absolute;
    left: 180px;
    top: 150px;
  }
  .login-font{
    font-weight: 500;
    font-size: 25px;
  }
</style>
