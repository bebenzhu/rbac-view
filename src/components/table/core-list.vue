/*
  -------------------------
  表格使用规范：
  -------------------------
  参数(Attributes)：
    1、tableData:表格数据
  插槽(slot):
    1、columnProp:自定义表头处理，包括按钮等html片段
*/
<template>
  <div class="list">
    <div class="list-core">
    <!--列表区域-->
      <el-table
        ref="table"
        :data="dwList.table.datas"
        :size="dwList.table.size"
        :border="dwList.table.border"
        :show-summary="dwList.table.isSummary"
        :summary-method="getSummaries"
        :row-style="rowStyle"
        @row-click="selectRow"
        @select="selectCheckbox"
        @select-all="selectAllCheckbox">

        <el-table-column type="index" width="60" align="center">
        </el-table-column>

        <el-table-column v-if="dwList.table.multipleSelect" type="selection" :reserve-selection="true" width="50" align="center">
        </el-table-column>

        <template v-for="(column,index) in dwList.table.columns" v-if="column.isVisible">
          <el-table-column v-if="column.type=='String'" :key="index" :prop="column.columnProp" :label="column.columnLabel" :width="column.width" class-name="normal-column"></el-table-column>

          <el-table-column v-if="column.type=='Select'" :key="index" :prop="column.columnProp" :label="column.columnLabel" :width="column.width">
            <template slot-scope="scope">
              <el-select v-model="scope.row[scope.column.property]" placeholder="请选择" :disabled="column.isReadonly">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column v-if="column.type=='Slot'" :key="index" :prop="column.columnProp" :label="column.columnLabel" :width="column.width">
            <template slot-scope="scope">
              <!--针对外部具名插槽-->
              <slot :name="column.columnProp" :data="scope"></slot>
              <!--针对内部columnType的格式-->
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :disabled="dwList.table.paginationDisable"
        :total="dwList.table.dataSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[15, 30, 50, 100, 500]"
        :page-size="15"
        :pager-count="11"
        layout="prev, pager, next, total, sizes, jumper">
      </el-pagination>
    </div>
  </div>
</template>
<script>
    export default {
      name: "normal-table",
      props:['dwList'],
      data() {
        return {
          value:'1',
          options: [{
            value: '0',
            label: '锁定'
          }, {
            value: '1',
            label: '正常'
          }]
        }
      },
      created(){
      },
      mounted(){
      },
      methods:{
        /**
         *当某一行被点击时会触发该事件
         * @param selection
         * @param row
         * @param column
         */
        selectRow(row, event, column){
          console.log(row);
          console.log(event);
          console.log(column);
          if(event.target.nodeName=='DIV'||event.target.nodeName=='TD'){
              let documentSelect = this.$refs.table;
              let selectRowsT = this.dwList.table.selectRows;

              //判断是否为相同的一列
              let curRow = selectRowsT.filter(function (r) {
                return r.index==row.index;
              });
              //单选则清空选择项
              if(!this.dwList.table.multipleSelect){
                selectRowsT=[];
                //当前行不为选中行
                if(curRow.length==0){
                  selectRowsT.push(row);
                }else{
                  documentSelect.setCurrentRow();
                }
              }else {//多选
                //当前行不为选中行
                if (curRow.length == 0) {
                  selectRowsT.push(row);

                  selectRowsT.forEach(function (r, index) {
                    documentSelect.toggleRowSelection(r, true);
                  })
                } else {
                  selectRowsT.forEach(function (r, index) {
                    if (r.index == row.index) {
                      selectRowsT.splice(index, 1);
                      documentSelect.toggleRowSelection(row, false);
                    }
                  })
                }
              }
              this.dwList.table.selectRows = selectRowsT;
          }
        },

        /**
         *当用户手动勾选全选 Checkbox 时触发的事件
         * @param selection
         * @param row
         */
        selectCheckbox(selection, row){
          this.dwList.table.selectRows=selection;
        },

        /**
         *当用户手动勾选数据行的 Checkbox 时触发的事件
         * @param selection
         */
        selectAllCheckbox(selection){
          this.dwList.table.selectRows=selection;
        },

        /**
         * 每行设置索引以及进行斑马纹区分
         * @param row
         * @param rowIndex
         */
        rowStyle({row, rowIndex}) {
          //把每一行的索引放进row
          row.index = rowIndex+1;

          //设置行背景色
          let style ='';
          if(this.dwList.table.stripe&&row.index%2==0){
            style = 'background-color:#F2F6FC';
          }
          let selectRowsT = this.dwList.table.selectRows;
          if (selectRowsT.some(r =>{return (rowIndex+1) === r.index;})) {
            style = 'background-color:#E4E7E1';
          }
          return style;
        },

        /**
         *小计功能
         * @param param
         */
        getSummaries(param) {
          const { columns, data } = param;
          const sums = [];

          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '小计';
              return;
            }
            if(this.dwList.table.sumMap[column.property]){
              const values = data.map(item => Number(item[column.property]));
              if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
              } else {
                sums[index] = 'N/A';
              }
            }else{
              sums[index] = '';
            }
          });
          return sums;
        },

        /**
         *pageSize 改变时会触发
         * @param pageSize
         */
        handleSizeChange(pageSize){
          this.dwList.changePageSize(pageSize).then(function (r) {

          });
        },
        /**
         * currentPage 改变时会触发(包括点击上一页和下一页)
         * @param currentPage
         */
        handleCurrentChange(currentPage){
          this.dwList.changeCurrentPage(currentPage).then(function (r) {

          });
        }
      }
    }
</script>

<style scoped>
  .list{
    padding-top: 10px;
    background-color: white;
  }

  .pagination{
    padding: 10px;
  }
</style>
