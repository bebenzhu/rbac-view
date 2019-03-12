<template>
  <div>
    <div>
      <core-list ref="rbacList" :dwList="dwList">
        <div slot="UserName" slot-scope="event">
          <el-button  @click="deleteRow(event)" type="text" size="small">{{event.data.row.UserName}}</el-button>
        </div>
        <div slot="IsUsed" slot-scope="event">
          <el-select v-model="scope.row[scope.column.property]" placeholder="请选择" :disabled="column.isReadonly">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
        dwList : null
      }
    },
    created(){
      let tableData = new Table();
      let dwList= new DwList(tableData);
      dwList.startRun('testTemplate').then(r=>{
        // console.log(r);
      });
      if(this.dwList==null){
        this.dwList = dwList;
      }
    },
    methods: {
      deleteRow() {
        console.log(event.data);
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
