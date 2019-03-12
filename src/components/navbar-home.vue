<template>
  <div id="navtabs">
    <div class="logo">
      <img src="/static/image/rbac.jpg" style="height: 60px;width: 100px;"/>
    </div>
    <div class="rbac">
    </div>
    <div class="menu">
      <el-menu default-active="0" class="el-menu-demo" mode="horizontal" text-color="#727E89" active-text-color="#017AF8" @select="clickMenu">
        <el-menu-item class="menu-first" index="0">首页</el-menu-item>
        <template  v-for="menu in menuList">
          <el-menu-item :index="menu.menuId" v-if="menu.childMenuList.length==0">{{menu.menuName}}</el-menu-item>
          <el-submenu :index="menu.menuId" v-else="menu.childMenuList==0">
            <template class="menu-first" slot="title">{{menu.menuName}}</template>
            <template v-for="menu1 in menu.childMenuList">
              <el-menu-item :index="menu1.menuId" v-if="menu1.childMenuList==0">{{menu1.menuName}}</el-menu-item>
              <el-submenu :index="menu1.menuId" v-else="menu1.childMenuList==0">
                <template slot="title">{{menu1.menuName}}</template>
                <template  v-for="menu2 in menu1.childMenuList">
                  <el-menu-item :index="menu2.menuId" v-if="menu2.childMenuList==0">{{menu2.menuName}}</el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-submenu>
        </template >
      </el-menu>
    </div>
    <div class="loginuser">
      <login-user></login-user>
    </div>
  </div>
</template>

<script>
  export default {
    props:['menuType'],
    data () {
      return {
        menuList: [],
        menuItemList: []
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData() {
        this.$http.get('/MenuRestCtrl/getMainMenu', {"Type":this.menuType}).then(r => {
          // console.log(r);
          this.menuList = r.data.body;
          let menuItemList = [];

          let dataList = r.data.body;
          eachMenu(dataList);

          function eachMenu(dataList) {
            dataList.forEach(function (menu) {
              if(menu.childMenuList.length==0){
                menuItemList.push(menu);
              }else{
                eachMenu(menu.childMenuList);
              }
            });
          }
          this.menuItemList=menuItemList;
        });
      },
      clickMenu(index, indexPath){
        if(index=='0'||index=='-1'){
          this.$router.push({path:"/content"});
          return;
        }else{
          if(this.menuItemList!=null&&this.menuItemList.length>0){
            let menu = this.menuItemList.filter(function (c) {
              if(index==c.menuId)return c;
            });
            if(menu!=null&&menu.length>0){
              this.$router.push({path:menu[0].url, query: menu[0].urlParam});
              return;
            }else{
              this.rbac.notice('打开菜单出错!','error');
              return;
            }
          }else {
            this.rbac.notice('打开菜单出错!','error');
            return;
          }
        }
      }
    }
  }
</script>
<style scoped>
  #navtabs{
    min-width: 100vh;
    height: 61px;
    display: flex;
    flex-direction: row;
    justify-content : space-between;
    align-items : center;
  }
  .logo{
    min-width: 100px;
    height: 60px;
    border-bottom: solid 1px #e6e6e6;
  }
  .rbac{
    min-width: 160px;
    height: 60px;
    border-bottom: solid 1px #e6e6e6;
  }
  .menu{
    flex: 1; /* 1 代表盡可能最大，會自動填滿除了 header footer 以外的空間 */
  }
  .loginuser{
    min-width:180px;
    height: 60px;
    padding: 0px;
    border-bottom: solid 1px #e6e6e6;
  }

  .menu-first{
    font-size:18px;
  }
</style>
