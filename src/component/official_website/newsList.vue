<template>
  <div id="newsList">
    <el-row class="newsList_body" type="flex" justify="center">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2 style="float: left">新闻列表</h2>
          </div>
          <el-table
            :data="newsList"
            border
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="新闻日期"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              label="新闻封面图"
              align="center">
              <template scope="scope">
                <img :src="scope.row.imgUrl" class="newsImg">
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="新闻名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="description"
              label="新闻描述"
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
        newsList: [ // 新闻列表 后台获取
          {
            date: '2017-04-23',
            imgUrl: 'http://img3.3lian.com/2013/c4/43/d/7.jpg',
            name: '习近平考察广西在当地引起热烈反响',
            description: '习近平考察广西在当地引起热烈反响,习近平 广西 自治区党委 重要讲话',
            id: 1
          },
          {
            date: '2017-04-23',
            imgUrl: 'http://a1.att.hudong.com/05/78/01300542415588139528788050827_s.jpg',
            name: '习近平考察广西在当地引起热烈反响',
            description: '习近平考察广西在当地引起热烈反响,习近平 广西 自治区党委 重要讲话',
            id: 2
          }
        ],
        // 当前页
        current_page: 1,
        // 总页数
        total_pages: 5,
        // 每页条数
        page_size: 5
      }
    },
    created: function () {},
    methods: {
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      /* 修改新闻 */
      modificationNews (id) {
        console.log(`修改新闻${id}`)
      },
      removeNews (id) {
        console.log(`删除新闻${id}`)
      }
    },
    components: {}
  }
</script>

<style lang="less">
   #newsList{
    width: 100%;
    height: 100%;
    .newsList_body{
      box-sizing: border-box;
      padding-top: 50px;
      .newsImg{
        padding-top: 5px;
        width: 100%;
      }
    }
  }
</style>