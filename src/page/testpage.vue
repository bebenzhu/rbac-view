<template>
  <el-button @click="warpCallback(buttonTest,$event)">默认按钮</el-button>
</template>

<script>
  import DwList from '@/rbac/frame/dw-list-object.js'
  import Table from '@/rbac/entity/table/table-entity';
    export default {
      name: "testpage",
      data(){
        return{
          tableData: new Table(),
          buttonTest: "test('21312')"
        }
      },
      created(){
        // let dwList = new DwList();
        // dwList.setPageObject(this);
        // dwList.addButton();
        // console.log(this.tableData);
      },
      mounted(){
      },
      methods: {
        warpCallback(callback, $event){
          console.log("1111111111111111111111111111111");
          console.log(callback);
          // console.log($event);
          let scope = this;


          console.log(this);

          // if (scope[callback]) {
          //   (scope[callback])({ $event: $event });
          // } else {
            let expr = 'this.' + callback;
            console.log(expr);
            eval(callback);
          // }
        },
        test (e){
          console.log("tset succcess"+e);
        }
      }
    }
</script>

<style scoped>

</style>
