<template>
  <div id="trainList">
    <el-row type="flex" class="steps" justify="center">
      <el-col :span="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float: left">培训分类列表</h2>
            <el-button 
            type="text" 
            style="float: right" @click="addTrain = true">新增分类</el-button>
          </div>
          <el-table
            :data="training_classify_list"
            stripe
            style="width: 100%">
            <el-table-column
              prop="id"
              label="序号"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="classify_name"
              label="分类名称"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="100">
              <template scope="scope">
                <el-row type="flex" justify="space-around">
                  <el-button type="text" icon="edit"></el-button>
                  <el-button type="text" icon="delete"></el-button>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
          
          <el-dialog title="新增分类" style="text-align: center;" v-model="addTrain" size="tiny">
            <el-input v-model="classify" placeholder="请输入分类名称"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addTrain = false">取 消</el-button>
              <el-button type="primary" @click="addTrainList">确 定</el-button>
            </span>
          </el-dialog>
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
</style>

<script>
  import * as API from '../assets/axios/api.js';
  export default{
    name: 'trainList',
    data () {
      return {
        // 添加分类名称
        addTrain: false,
        classify: '',
        // 获取列表数据 ---> 服务端
        training_classify_list: [],
        // 修改 删除 控件数据模型
        modification_delete_moduleData: {}
      }
    },

    watch: {

      // 根据后台返回数据 动态生成数据模型
      training_classify_list: function(val) {
        console.log(val);
        for (var i = val.length - 1; i >= 0; i--) {
          this.modification_delete_moduleData[val[i].id] = {
            modification: false,
            delete: false
          }
        }
      }
    },

    created: function () {
      // 初始化获取分类列表
      this.getTrainingClassifyList();
    },

    methods: {
      // 获取分类列表
      getTrainingClassifyList () {
        this.$axios.post(API.getTrainingClassifyList)
        .then( msg => {
          console.log(msg.data);
          const data = msg.data;

          switch (data.flag) {
            case 1000:
              this.training_classify_list = data.training_classify_list;
              break;
            default:
              this.consoleError(`新增分类失败,请重试!`);
              break;
          }
        })
        .catch( error => {
          this.consoleError(`服务器${error.response}`);
        });
      },

      // 添加培训分类
      addTrainList () {
        const reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        if (this.classify) {
          if (this.classify.length < 15) {
            if (reg.test(this.classify)) {
              this.$axios.post(API.addTrainingClassify,{
                classify: this.classify
              })
              .then( msg => {
                console.log(msg.data);
                const data = msg.data;

                switch (data.flag) {
                  case 1000:
                    this.addTrain = false;
                    this.classify = '';
                    this.consoleSuccess(`新增分类成功`);
                    break;
                  case 9005:
                    this.consoleError(`该分类已被使用,请删除培训分类后再试!`);
                    break;
                  default:
                    this.consoleError(`新增分类失败,请重试!`);
                    break;
                }
              })
              .catch( error => {
                this.consoleError(`服务器${error.response}`);
              });
            } else {
              this.consoleWarning(`分类名称不包含特殊字符!`);
            }
          } else {
            this.consoleWarning(`名称长度在15字以内!`);
          }
        } else {
          this.consoleWarning(`数据不能为空`);
        }
      },

      consoleSuccess(success) {
        this.$notify({
          title: '成功',
          message: success,
          type: 'success'
        });
      },

      consoleWarning(warning) {
        this.$notify({
          title: '警告',
          message: warning,
          type: 'warning'
        });
      },

      consoleNews(news) {
        this.$notify.info({
          title: '消息',
          message: news
        });
      },

      consoleError(error) {
        this.$notify.error({
          title: '错误',
          message: error
        });
      }
    }
  }
</script>
