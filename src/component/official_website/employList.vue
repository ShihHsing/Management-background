<template>
  <div id="employList">
    <el-row class="employList_body" type="flex" justify="center">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float: left">招聘列表</h2>
          </div>
          <el-table
            :data="employList"
            border
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="招聘日期"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="position"
              label="招聘职位"
              align="center">
            </el-table-column>
            <el-table-column
              prop="department"
              label="招聘部门"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="180"
              align="center">
              <template scope="scope">
                <el-button 
                  type="success" 
                  size="small"
                  @click="modificationNews(scope.row.id)">编辑<i class="el-icon-edit el-icon--right"></i></el-button>
                <el-button 
                  type="danger" 
                  size="small"
                  @click="removeNews(scope.row.id)">删除<i class="el-icon-delete2 el-icon--right"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
          </br>
          </br>
          <el-row type="flex" justify="center">
            <el-col :span="22">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="current_page"
                :page-size="page_size"
                layout="prev, pager, next, jumper"
                :total="page_size*total_pages"
                style="float: right;padding: 0;">
              </el-pagination>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    name: 'newsList',
    data () {
      return {
        employList: [
          {
            date: '2017-04-23',
            position: 'PHP工程师',
            department: '研发部',
            id: 1
          },
          {
            date: '2017-04-23',
            position: 'PHP工程师',
            department: '研发部',
            id: 1
          },
          {
            date: '2017-04-23',
            position: 'PHP工程师',
            department: '研发部',
            id: 1
          },
          {
            date: '2017-04-23',
            position: 'PHP工程师',
            department: '研发部',
            id: 1
          }
        ], // 招聘列表
        current_page: 1, // 当前页
        total_pages: 5, // 总页数
        page_size: 5 // 每页条数
      }
    },
    created: function () {},
    methods: {
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      /* 修改招聘 */
      modificationNews (id) {
        console.log(`修改招聘${id}`)
      },
      removeNews (id) {
        console.log(`删除招聘${id}`)
      }
    },
    components: {}
  }
</script>

<style lang="less">
   #employList{
    width: 100%;
    height: 100%;
    .employList_body{
      box-sizing: border-box;
      padding-top: 50px;
    }
  }
</style>
