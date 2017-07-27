<template>
    <div id="shareholderInfo">
        <div class="shareholderInfo_wrap">
            <!-- 股东信息 -->
            <div class="shareholderInfo">
                <div class="name">
                    <p>翠花</p>
                    <el-button type="text"><i></i>编辑</el-button>
                </div>
                <div style="width: 150px;height: 2px;background: #8492A6;margin-bottom: 15px;"></div>
                <p>手机号码:15338888742</p>
                <p>积分总数</p>
                <p>525.5</p>
                <ul>
                    <li>
                        <p>可用积分</p>
                        <p>650</p>
                    </li>
                    <li>
                        <div></div>
                    </li>
                    <li>
                        <p>冻结积分</p>
                        <p>300</p>
                    </li>
                    <li>
                        <div></div>
                    </li>
                    <li>
                        <p>已绑定会员数(人)</p>
                        <p>5</p>
                    </li>
                </ul>
                <p>分享链接:https://a001.aybc.so/Management-background/#/login</p>
            </div>
            <!-- 积分明细 -->
            <div class="shareholderIntegralInfo sx_basis_scroll sx_scroll_style">
                <div style="margin-top: 35px;">
                    <p>积分明细</p>
                    <el-table
                        :data="dataList"
                        border
                        stripe
                        :height="290"
                        v-loading="loading"
                        element-loading-text="加载中..."
                        style="width: 1000px;">
                        <el-table-column
                            prop="s_name"
                            label="日期">
                        </el-table-column>
                        <el-table-column
                            prop="s_phone_number"
                            label="变更类型">
                        </el-table-column>
                        <el-table-column
                            prop="s_integral"
                            label="变更积分数">
                        </el-table-column>
                        <el-table-column
                            label="变动后剩余积分">
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="current_page"
                            :page-size="page_size"
                            layout="prev, pager, next, jumper"
                            :total="total"
                            style="float: right;padding: 0;">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #shareholderInfo{
        box-sizing: border-box;

        width: 100%;
        height: 100%;
        
        padding: 30px;
        background: #fff;

        overflow: hidden;
        label{
            color: #8492A6;
        }
        .shareholderInfo_wrap{
            display: flex;
            flex-direction: column;

            width: 100%;
            height: 100%;
            .shareholderInfo{
                box-sizing: border-box;
                padding-bottom: 25px;
                color: #8492A6;
                font-size: 12px;

                width: 100%;
                border-bottom: 2px solid #eee;
                .name{
                    width: 100%;
                    height: 50px;
                    margin-bottom: 20px;
                    >p:nth-of-type(1){
                        float: left;

                        width: 105px;
                        color: #8492A6;
                        font-size: 38px;
                    }
                    button{
                        float: left;
                        padding-bottom: 20px;
                        span{
                            line-height: 16px;
                            i{
                                float: left;

                                width: 15px;
                                height: 15px;
                                background: url('../../assets/img/shareholder/editor.png')no-repeat center center;
                            }
                        }
                    }
                }
                >p:nth-of-type(1){
                    margin-bottom: 50px;
                }
                >p:nth-of-type(2){
                    margin-bottom: 30px;
                }
                >p:nth-of-type(3){
                    color: #FF4949;
                    font-size: 30px;
                    font-weight: 600;
                    margin-bottom: 50px;
                }
                ul{
                    width: 100%;
                    height: 45px;
                    margin-bottom: 35px;
                    li{
                        list-style: none;
                        float: left;
                        &:nth-child(even){
                            div{
                                height: 30px;
                                width: 1px;

                                background: #8492A6;
                                margin: 0 35px;
                            }
                        }
                        >p:nth-of-type(1){
                            padding-bottom: 5px;
                        }
                        >p:nth-of-type(2){
                            font-size: 15px;
                            color: #FF4949;
                        }
                    }
                }
                >p:nth-of-type(4){
                    margin-bottom: 15px;
                }
            }
            .shareholderIntegralInfo{
                width: 100%;
                flex: 1;
                div{
                    >p:nth-of-type(1){
                        font-size: 12px;
                        color: #8492A6;
                        padding-bottom: 15px;
                    }
                    .pagination{
                        margin-top: 15px;
                        width: 1000px;
                    }
                }
            }
        }
    }
    .el-dialog__wrapper{
        z-index: 999999 !important;
    }
</style>

<script>
import {} from '../../assets/axios/api.js'
export default {
    name: 'shareholderInfo',
    data () {},
    created: function () {},
    methods: {}
}
</script>
