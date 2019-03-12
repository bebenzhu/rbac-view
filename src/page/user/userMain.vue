<template>
  <div>
    <div class="button-group">
      <el-button  @click="deleteRow()" size="small" icon="el-icon-plus" type="primary">新增</el-button>
      <el-button  @click="deleteRow()" size="small" icon="el-icon-edit" type="warning">修改</el-button>
      <el-button  @click="deleteRow()" size="small" icon="el-icon-delete" type="danger">删除</el-button>
    </div>
    <div>
      <core-list ref="rbacList" :tableData="tableData">
        <div slot="UserName" slot-scope="event">
          <el-button  @click="deleteRow(event.data)" type="text" size="small">{{event.data.row.UserName}}</el-button>
        </div>
      </core-list>
    </div>
  </div>
</template>

<script>
  import Table from '@/rbac/entity/table/table-entity';
  import DwList from '@/rbac/frame/dw-list-object.js';
    export default {
      name: "UserMain",
      data(){
        return{
          tableData: new Table()
        }
      },
      created(){
        this.tableData.setStripe(false);
        let dwList = new DwList(this.tableData);
        dwList.startRun('testTemplate').then(r=>{

        });
      },
      methods: {
        deleteRow(event) {
          console.log(event.row);
        }
      }
    }
</script>

<style scoped>
  .button-group{
    background-color: white;
    padding: 10px;
  }
</style>
