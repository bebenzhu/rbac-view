<template>
  <el-container class="content">
    <el-header class="header">
      <navbar-home menuType="MainMenu"></navbar-home>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
    <!--<el-footer class="footer" height="10px">@2019</el-footer>-->
  </el-container>
</template>
<script>

export default {
  name: 'hello',
  data () {
    return {
    }
  },
  created () {
  },
  mounted: function(){

  }
}
</script>

<style scoped>
  .content{
    display: flex;
    height: 100vh;
    width: 100%;
    flex-direction: column;
  }
  .header{
    padding: 0px;
    height: 61px;
  }
  .main {
    background-color: #F9F9F9;
    flex: 1; /* 1 代表盡可能最大，會自動填滿除了 header footer 以外的空間 */
    width: 100%;
    overflow: auto;
  }
  .footer {
    background-color: black;
    color: #B3C0D1;
    font-size: 11px;
    text-align: center;
    line-height: 10px;
    height: 10px;
  }
</style>
