<template>
  <el-button type="text" @click="skipUserInfo">
    <div class="loginuser">
      <img class="mui-icon-image" :src="userImgUrl"/>
      <p id="username" style="height: 59px;">{{userName}}</p>
    </div>
  </el-button>
</template>

<script>
    export default {
      name: "login-user",
      data: function() {
        return {
          userId : '',
          userName : '',
          userImgUrl: '/static/image/notlogin-usericon.jpg'
        }
      },
      created(){
        let sUserId = sessionStorage.getItem('SESSION-USER-ID');
        if(sUserId==''||sUserId==null){this.$router.push('/content');}
        // let sUserId = 'chenhao';
        this.$http.get('/LoginRestCtrl/getSessionUser', {"UserId":sUserId}).then(r => {
          let user = r.data.body;
          if(user){
            this.userName = user.userName;
            if(user.iconFileId){
              this.userImgUrl = this.rbac.packUri('/FileUploadCtrl/downLoadByFileId?fileId='+user.iconFileId);
            }
          }
        });
      },
      methods:{
        skipUserInfo(){
          this.$router.push({path:"/content"});
        }
      }
    }
</script>

<style scoped>
  .el-button{
    padding: 0px;
    margin: 0px;
  }
  .loginuser{
    margin: 0px;
    padding: 0px;
    height: 59px;
    min-width: 180px;
    display: flex;
    flex-direction: row;
  }
  img{
    padding: 7px;
    border-radius:50%;
    min-width: 46px;
    height: 46px;
  }
  #username{
    margin: 0px;
    font-size: 16px;
    color: black;
    font-weight: 400;
    text-align: left;
    line-height: 60px;
    flex: 1; /* 1 代表盡可能最大，會自動填滿除了 header footer 以外的空間 */
  }
</style>
