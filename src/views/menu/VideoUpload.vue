<template>
 <el-card class="box-card box" shadow="always">

  <div class="test2" style="margin-right:50%">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="视频名称">
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>
  
</el-form>
    <el-upload style="margin-left:14%;margin-top:5%"
      class="avatar-uploader el-upload--text"
      :drag="{Plus}"
      action="http://localhost:8888/uploadVideo"
      :headers= "myheaders"
      multiple
      :show-file-list="false"
      :data="{SavePath: this.Path.url}"
      :on-success="handleVideoSuccess"
      :before-upload="beforeUploadVideo"
      :on-progress="uploadVideoProcess">
      <i v-if="Plus" class="el-icon-upload"></i>
      <div v-if="Plus" class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
      <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
      <div class="el-upload__tip" slot="tip">只能上传mp4/flv/avi文件，且不超过300M</div>
    </el-upload>
    <el-button type="primary" style="margin:20px" @click="onSubmit">提交视频</el-button>
    
  </div>
 </el-card>
</template>

<script>
import axios from "axios"
export default {
  
  name: 'test2',
  data () {
    return {
       labelPosition: 'right',
        formLabelAlign: {
          name: ''
        },
      videoForm: {
        videoId: '',
        videoUrl: ''
      },
      myheaders:{Authorization:this.$route.params.tokena},
      videoFlag: false,
      Plus: true,
      Path: {
        url: '/Users/yuebing/Documents/video'
      },
      videoUploadPercent: 0
    }
  },
  mounted: function () {
  },
  methods: {
    // 视频上传前执行
    beforeUploadVideo (file) {
      const isLt300M = file.size / 1024 / 1024 < 300
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!isLt300M) {
        this.$message.error('上传视频大小不能超过300MB哦!')
        return false
      }
    },
    // 视频上传过程中执行
    uploadVideoProcess (event, file, fileList) {
      this.Plus = false
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0)
    },
    // 视频上传成功是执行
    handleVideoSuccess (res, file) {
      this.Plus = false
      this.videoUploadPercent = 100
      console.log(res)
      // 如果为200代表视频保存成功
      if (res.resCode === '200') {
        // 接收视频传回来的名称和保存地址
        this.videoForm.videoId = res.newVidoeName
        this.videoForm.videoUrl = res.VideoUrl
        this.$message.success('视频上传成功！')
      } else {
        this.$message.error('视频上传失败，请重新上传！')
      }
    },
    onSubmit(){
      let data = new FormData;
				data.append('videoname',this.formLabelAlign.name);
				data.append('videoaddress',this.videoForm.videoUrl);
        axios.post(`/api/insertvideo`,data,{headers:this.myheaders})
        .then(response =>{
					console.log(response)
          this.$message({
          message: '视频创建成功',
          type: 'success'
        });
				})
				.catch(error =>{
					console.log(error)
				})
    },
  }
}
</script>
