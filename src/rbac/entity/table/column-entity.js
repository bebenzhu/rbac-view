export default class Column{
  templateNo;                 //模板编号
  columnProp;                       //列标识（唯一）
  columnLabel;                      //列名称
  isTemplate=false;             //是否特殊模板
  width=200;                  //列宽度
  type='String';              //类型
  isVisible = true;           //是否可见
  isSum = false;              //是否合计
  isReadonly = true;          //是否只读


  /**
   * 将一个对象转为Column对象
   * @param obj
   */
  setColumn(obj){
    this.templateNo = obj.templateNo;
    this.columnProp = obj.columnProp;
    this.columnLabel = obj.columnLabel;
    this.isVisible = obj.isVisible?(obj.isVisible=='1'?true:false):true;
    this.isSum = obj.isSum?(obj.isSum=='1'?true:false):false;
    this.type = obj.type;
    this.isTemplate = obj.isTemplate?(obj.isTemplate=='1'?true:false):false;
    this.width = obj.width;
    this.isReadonly = obj.isReadonly?(obj.isReadonly=='1'?true:false):true;
  }







}
