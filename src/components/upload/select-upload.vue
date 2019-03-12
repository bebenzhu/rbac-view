<!--选择上传按钮-->
<template>
  <div>
    <el-upload
      :multiple="multiple?true:false"
      :disabled="disabled?true:false"
      :show-file-list="showFileList?true:false"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-success="onSuccess"
      :on-error="onError"
      :on-progress="onProgress"
      :on-change="onChange"
      :action="url">
      <el-button size="small" type="primary" icon="el-icon-upload">{{buttonName}}</el-button>
    </el-upload>
  </div>
</template>
<script>
  import baseURL from '@/config/baseURL.js';

  export default {
    props:['maxSize','showFileList','disabled','multiple','buttonName'],
    data () {
      return {
        url : (baseURL.baseURL+'/FileUploadCtrl/uploadToDisks')
      }
    },
    methods: {
      //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      beforeUpload (file) {
        //进行文件大小校验
        let size = Math.ceil(file.size/1024)
        if(this.maxSize){
          if(size>Math.floor(this.maxSize*1024)){
            this.rbac.notice('上传文件超出最大范围!','error');
            return false;
          }
        }else{
          console.log("未传入maxSize");
        }
      },
      //删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      beforeRemove (file, fileList) {

      },
      //点击文件列表中已上传的文件时的钩子
      onPreview (file) {
        console.log(file);
      },
      //文件列表移除文件时的钩子
      onRemove (file,fileList) {

      },
      //文件上传成功时的钩子
      onSuccess(response, file, fileList){
        console.log(response);
        this.rbac.notice('文件上传成功!','success');

        this.$emit('onUpload', response.body);
      },
      //文件上传失败时的钩子
      onError(err, file, fileList){
        console.log(err);
        this.rbac.notice('文件上传失败!','error');

        this.$emit('onUpload', err);
      },
      //文件上传时的钩子
      onProgress (event, file, fileList) {

      },
      //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      onChange(file, fileList){

      }


    }
  }
</script>
