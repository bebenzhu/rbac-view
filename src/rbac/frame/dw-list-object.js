import Vue from 'vue'
import Column from "../entity/table/column-entity";
import rbac from '@/rbac/rbac-service.js'
import http from '@/api/http.js'


export default class dwList {

  table;

  constructor(table){
    this.table = table;
  }

  /**
   * 列表的运行方法（入口）
   * @param templateNO
   * @param params
   */
  startRun = (templateNo,queryParams)=>{
    let _this = this;
    let promise = new Promise((resolve, reject) => {
      _this.queryList(resolve, reject, templateNo, queryParams, _this.table.currentPage, _this.table.pageSize);
    });
    return promise;
  }

  /**
   * 查询数据
   * @param resolve
   * @param param
   */
  queryList = (resolve, reject, templateNo, queryParams, currentPage, pageSize)=>{
    let _this = this;
    _this.table.queryParams = queryParams;
    if(templateNo&&templateNo!=''){
      _this.table.templateNo = templateNo;
    }else{
      rbac.notice("传入模板编号为空！","error");
      reject(new Error("传入模板编号为空！"));
    }
    if(currentPage&&currentPage>0){
      _this.table.currentPage = currentPage;
    }else{
      rbac.notice("页码数不能为0！","error");
      reject(new Error("页码数不能为0！"));
    }
    if(pageSize&&pageSize>0){
      _this.table.pageSize = pageSize;
    }else{
      rbac.notice("页面大小不能为0！","error");
      reject(new Error("页面大小不能为0！"));
    }

    let p = $.extend({templateNo:templateNo, currentPage:currentPage, pageSize:pageSize},queryParams);
    http.post('/TemplateCtrl/getTemplateData', p).then(r => {
      let result = r.data.body;
      let columnList = result.cloumns;
      let dataList = result.datas;
      let countNumber = result.countNumber;

      _this.table.datas = this.handleData(dataList,{});
      _this.table.dataSize = result.countNumber;
      _this.handleColumn(_this.table,columnList);
      resolve(_this.table);
    });
  }

  /**
   * 当页面大小发生变化
   * @param pageSize
   * @returns {Promise<any>}
   */
  changePageSize(pageSize){
    let _this = this;
    let promise = new Promise(function (resolve, reject) {
      _this.queryList(resolve, reject, _this.table.templateNo, _this.table.params, _this.table.currentPage, pageSize);
    });
    return promise;
  }

  /**
   * 改变时会触发(包括点击上一页和下一页)
   * @param currentPage
   * @returns {Promise<any>}
   */
  changeCurrentPage(currentPage){
    let _this = this;
    let promise = new Promise(function (resolve, reject) {
      _this.queryList(resolve, reject, _this.table.templateNo, _this.table.params, currentPage, _this.table.pageSize);
    });
    return promise;
  }


  /**
   * 处理数据表格表头
   * @param tableObject
   * @param columnList
   */
  handleColumn = (tableObject,columnList)=>{
    let columns = [];
    for(let i = 0;i<columnList.length;i++){
      let entity = new Column();
      entity.setColumn(columnList[i]);

      tableObject.sumMap[entity.columnProp] = entity.isSum;
      columns.push(entity);
    }
    tableObject.columns = columns;
  }

  /**
   * 对原始数据进行处理
   * @param primitiveData
   * @param maps
   */
  handleData = (primitiveData,maps)=>{
    let showDatas = [];
    primitiveData.forEach((rowData)=>{

      let showData = Object.assign({},rowData);
      Object.keys(rowData).forEach((key)=>{
        let value = rowData[key];
        let map = maps[key];
        if(map){
          map.forEach((sMap)=>{
            if(sMap.id===value){
              showData[key] = sMap.lable;
            }
          })
        }else{
          showData[key] = value;
        }
      })
      showDatas.push(showData);
    })
    return showDatas;
  }

  /**
   * 获取单选列
   * @returns {*}
   */
  getSelectRow = () => {
    return this.table.selectRows[0];
  }

  /**
   * 获取多选所有的已选列
   * @returns {Array}
   */
  getSelectRows = () => {
    return this.table.selectRows;
  }
}
