<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="visible"
      width="60%"
      :before-close="doCancel">
      <span>这里面是内容</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="doCancel">取 消</el-button>
        <el-button type="primary" @click="doConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      doCancel(){
        this.rbac.notice("关闭了","warning");
        this.$emit('changeVisible', false);
      },
      doConfirm(){
        this.$emit('changeVisible', !this.visible);
      }
    }
  };
</script>

<style scoped>
</style>
