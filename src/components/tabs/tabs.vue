<template>
    <div>
      <el-tabs :value="activeName" type="border-card">
        <el-tab-pane v-for="item in tabPanes" :key="item.name" :label="item.title" :name="item.name">
          <slot :name="item.name"></slot>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
    export default {
      name: "tabs",
      props:['activeName','tabPanes'],
      data(){
        return{
        }
      }
    }
</script>

<style scoped>

</style>
