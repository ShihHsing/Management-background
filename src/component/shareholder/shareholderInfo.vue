<template>
    <div id="shareholderInfo">
        <div class="sx_basis_scroll sx_scroll_style shareholderInfo_wrap">
            <!-- 股东信息 -->
            <div class="shareholderInfo">
                <div class="name">
                    <p>翠花</p>
                    <el-button type="text"><i></i>编辑</el-button>
                </div>
                <div style="width: 150px;height: 2px;background: #8492A6;"></div>
                <p>手机号码:15338888742</p>
                <p>积分总数</p>
                <p>525.5</p>
                <ul>
                    <li>
                        <p>可用积分</p>
                        <p>650</p>
                    </li>
                    <li>
                        <p>冻结积分</p>
                        <p>300</p>
                    </li>
                    <li>
                        <p>已绑定会员数(人)</p>
                        <p>5</p>
                    </li>
                </ul>
                <p>分享链接:https://a001.aybc.so/Management-background/#/login</p>
            </div>
            <!-- 积分明细 -->
            <div class="shareholderIntegralInfo">

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

                width: 100%;
                border-bottom: 1px solid #eee;
                .name{
                    width: 100%;
                    height: 50px;
                    margin-bottom: 20px;
                    >p:nth-of-type(1){
                        float: left;

                        width: 90px;
                        color: #8492A6;
                        font-size: 38px;
                    }
                    button{
                        float: left;
                        padding-bottom: 20px;
                        i{
                            background: url('../../assets/img/shareholder/editor.png')no-repeat center center;
                        }
                    }
                }
            }
            .shareholderIntegralInfo{
                width: 100%;
                flex: 1;
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
