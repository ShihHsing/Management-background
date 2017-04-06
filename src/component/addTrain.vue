<template>
  <div id="addTrain">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="16">
         <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float: left">新增培训</h2>
          </div>

          <el-form 
            ref="form" 
            :model="form" 
            label-width="100px" 
            style="width: 400px;"
            label-position="left">

            <el-form-item label="培训标题:">
              <el-input v-model="form.training_title"></el-input>
            </el-form-item>
            <el-form-item label="培训分类:">
              <el-select v-model="form.training_classify" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="培训缩略图:">
              <!-- <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success=""
                :before-upload="">
                <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload> -->
            </el-form-item>
            <el-form-item label="培训缩略图:">
              <el-radio class="radio" v-model="from.training_type" label="1">图文</el-radio>
              <el-radio class="radio" v-model="from.training_type" label="2">视频</el-radio>
            </el-form-item>
            <el-form-item label="图文详情:">
              <!-- <vue-html5-editor :height="500" @change="updateData"></vue-html5-editor> -->
            </el-form-item>
          </el-form>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style>
  .steps{
    height: auto;
    width: 100%;
    margin-top: 100px;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
  import * as API from '../assets/axios/api.js';
  export default{
    name: 'addTrain',
    data () {
      return {
        form: {
          training_title: '',
          training_classify: '',
          imageUrl: '',
          training_type: '',
          newDescription: ''
        }
      }
    },

    methods: {
      // 富文本数据更新 第一次进入初始化 为上传准确性
      // 如果用户操则会更新数据 最终上传以 newDescription 数据为准
      updateData (data) {
        this.form.newDescription = data;
      },
      
    }
  }
</script>
