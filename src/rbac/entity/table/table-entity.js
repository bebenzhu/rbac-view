/**
 * 表格数据实体类
 */

import Column from './column-entity.js'
import http from '@/api/http.js'
import rbac from '@/rbac/rbac-service.js'
import DwList from '@/rbac/frame/dw-list-object.js'

export default class Table{

  /**
   * 模板名称
   * @type {string}
   */
  templateNo = '';
  /**
   * 表头
   * @type {Array}
   */
  columns = [];
  /**
   * 表数据
   * @type {Array}
   */
  datas = [];
  /**
   * 数据大小
   * @type {number}
   */
  dataSize = 0;
  /**
   * 模板参数
   * @type {{}}
   */
  queryParams={};

  /**
   * 已选列数组
   * @type {Array}
   */
  selectRows = [];
  /**
   * 合计列
   * @type {{}}
   */
  sumMap = {};

  /**
   * Table 的尺寸
   * @type {string}
   */
  size='mini';
  /**
   *是否为斑马纹 table
   * @type {boolean}
   */
  stripe=true;
  /**
   *是否带有纵向边框
   * @type {boolean}
   */
  border=true;
  /**
   *是否多选
   * @type {boolean}
   */
  multipleSelect=false;
  /**
   * 是否小计
   * @type {boolean}
   */
  isSummary=false;
  /**
   * 分页是否只读
   * @type {boolean}
   */
  paginationDisable = false;
  /**
   * 页面条数大小
   * @type {number}
   */
  pageSize=15;
  /**
   * 当前页
   * @type {number}
   */
  currentPage=1;

  /**
   *设置该列是否小计
   * @deprecated
   * @param columns {Array}
   * @param result
   */
  setSumMap(columns,result){
    if((columns.length)!=0){
      columns.forEach(column=>{
        this.sumMap[column]=result;

        let indexOfItem = -1;
        for(let i=0;i<this.columns.length;i++){
          if(column == this.columns[i].columnProp){
            indexOfItem = i;
            break;
          }
        }
        if(indexOfItem!=-1){
          rbac.setValueForArrayObject(this.columns,indexOfItem,'isSum',result);
        }
      });

      (this.columns).forEach(column=>{
        if(column.isSum){
          this.isSummary = true;
        }
      });
    }
  }

  /**
   * 设置是否多选
   * @param multipleSelect
   */
  setMultipleSelect(multipleSelect){
    this.multipleSelect=multipleSelect;
  }

  /**
   * 设置是否带有纵向边框
   * @param border
   */
  setBorder(border){
    this.border=border;
  }

  /**
   * 设置是否为斑马纹 table
   * @param stripe
   */
  setStripe(stripe){
    this.stripe=stripe;
  }

  /**
   * 设置表格大小
   * @param size
   */
  setSize(size){
    this.size=size;
  }

  /**
   * 获取单选列
   * @returns {*}
   */
  getSelectRow(){
    return this.selectRows[0];
  }

  /**
   * 获取多选所有的已选列
   * @returns {Array}
   */
  getSelectRows(){
    return this.selectRows;
  }

  /**
   * 设置本模板列宽度
   * @param column
   * @param width
   */
  setColumnWidth(column,width){
    if((this.columns.length)!=0){
      let indexOfItem = -1;
      for(let i=0;i<this.columns.length;i++){
        if(column == this.columns[i].columnProp){
          indexOfItem = i;
          break;
        }
      }
      if(indexOfItem!=-1){
        rbac.setValueForArrayObject(this.columns,indexOfItem,'width',width);
      }
    }
  }
}
