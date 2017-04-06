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
              width="100"
              sortable>
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
                  <el-button 
                    type="text" 
                    icon="edit" 
                    @click="modificationTrain(scope.row)"></el-button>
                  <el-button 
                    type="text" 
                    icon="delete" 
                    @click="deleteTrain(scope.row.id)"></el-button>
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
        modification_delete_moduleData: {},
        // 记录获取列表值
        // 大于十条不允许再添加
        // list_length: 0,
      }
    },

    computed: {
      list_length: function () {
        return this.training_classify_list.length;
      }
    },

    created: function () {
      // 初始化获取分类列表
      this.getTrainingClassifyList();
    },

    methods: {

      // 修改
      modificationTrain (list) {
        this.$prompt('请输入分类名称', '编辑分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: list.classify_name,
          inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9]{0,15}$/,
          inputErrorMessage: '分类名称不包含特殊字符,并名称长度在15字以内!'
        }).then( ({value}) => {
          this.$axios.post(API.modifyTrainingClassify,{
            classify: value,
            classify_id: list.id
          })
          .then( msg => {
            console.log(msg.data);
            const data = msg.data;

            switch (data.flag) {
              case 1000:
                this.getTrainingClassifyList();
                this.consoleSuccess(`修改培训分类成功!`);
                break;
              default:
                this.consoleError(`修改分类失败,请重试!`);
                break;
            }
          })
          .catch( error => {
            this.consoleError(`服务器${error.response}`);
          });
        }).catch( () => {
          
        });
      },

      // 删除
      deleteTrain (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(API.removeTrainingClassify,{
            classify_id: id
          })
          .then( msg => {
            console.log(msg.data);
            const data = msg.data;

            switch (data.flag) {
              case 1000:
                this.getTrainingClassifyList();
                this.consoleSuccess(`删除培训分类成功!`);
                break;
              default:
                this.consoleError(`删除分类失败,请重试!`);
                break;
            }
          })
          .catch( error => {
            this.consoleError(`服务器${error.response}`);
          });
        }).catch(() => {
          
        });
      },

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
            case 9001:
              this.addTrain = true;
              this.consoleSuccess(`暂无培训分类!请添加!`);
              break;
            default:
              this.consoleError(`获取分类失败,请重试!`);
              break;
          }
        })
        .catch( error => {
          this.consoleError(`服务器${error.response}`);
        });
      },

      // 添加培训分类
      addTrainList () {
        const reg = /^[\u4E00-\u9FA5A-Za-z0-9]{0,15}$/;
        if (this.list_length < 10) {
          if (this.classify) {
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
                    this.getTrainingClassifyList();
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
              this.consoleWarning(`分类名称不包含特殊字符,并名称长度在15字以内!`);
            }
          } else {
            this.consoleWarning(`数据不能为空`);
          }
        } else {
          this.consoleWarning(`最多添加十条培训分类!`);
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
