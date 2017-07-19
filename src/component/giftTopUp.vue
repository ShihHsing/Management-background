<template>
    <div id="giftTopUp">
        <el-col :span="24" style="height: 100%; width: 100%;">
            <!-- 头部 -->
            <div class="giftTopUp_top">
                <span>砸金蛋礼品充值</span>
            </div>
            
            <div class="giftTopUp_form_wrap">
                <div class="giftTopUp_form_body sx_basis_scroll sx_scroll_style">
                    
                    <el-form
                        label-position="left"
                        class="giftTopUp_form"
                        label-width="120px">
                        
                        <el-form-item label="礼品列表" prop="name" required>
                            <el-select v-model="award_id" placeholder="请选择" @change="getAwarCountMax">
                            <el-option
                                v-for="item in awardList"
                                :key="item.value"
                                :label="item.award_name"
                                :value="item.id">
                            </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="礼品数量" prop="phone_number" required>
                            <el-input-number :disabled='this.award_count_max === 0' v-model.number="award_count" :min="1" :max="award_count_max"></el-input-number>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="chargeTheCostfreeAward">提交</el-button>
                        </el-form-item>

                        <el-table
                            :data="awardList"
                            style="width: 100%">
                            <el-table-column
                            prop="award_name"
                            label="礼品">
                            </el-table-column>
                            <!-- <el-table-column
                            prop="award_count"
                            label="总量">
                            </el-table-column> -->
                            <el-table-column
                            prop="passed"
                            label="可充值量">
                            </el-table-column>
                        </el-table>
                    </el-form>
                </div>
            </div>
        </el-col>
    </div>
</template>

<style lang="less">
    #giftTopUp{
        width: 100%;
        height: 100%;

        background: #fff;

        overflow: hidden;
        .giftTopUp_top{
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;

            height: 50px;
            
            padding: 0 30px;

            border-bottom: 1px solid #E5E9F2;
    
            line-height: 50px;
            font-size: 18px;
            color: #8492A6;
            .OI{
                color: #1D8CE0;
                font-size: 12px;
            }
        }
        .giftTopUp_form_wrap{
            box-sizing: border-box;

            width: 100%;
            height: 100%;
            
            padding-bottom: 50px;
            .giftTopUp_form_body{
                width: 100%;
                height: 100%;
                .giftTopUp_form{
                    box-sizing: border-box;
                    padding: 30px;

                    label{
                        color: #8492A6;
                    }
                    .el-tag{
                        margin-right: 15px!important;
                    }
                }
            }
        }
    }
</style>

<script>
import { chargeTheCostfreeAward } from '../assets/axios/api.js'
export default {
    name: 'giftTopUp',
    data () {
        return {
            awardList: [], // 礼品列表
            award_id: null, // 选择礼品ID
            award_count: null, // 礼品数量
            award_count_max: null // 礼品最大数量
        }
    },
    created: function () {
        // 初始化
        // this.$axios.post(chargeTheCostfreeAward, {
        //     init: 'init'
        // })
        // .then(msg => {
        //     const data = msg.data

        //     if (data.flag !== 1000) {
        //         this.$message.error(data.return_code)
        //         return false
        //     }

        //     this.awardList = data.award_list
        // })
        // .catch(error => {
        //     this.$message.error('服务器异常')
        // })
        this.getAwardList()
    },
    methods: {
        // 获取分类列表
        getAwardList () {
            this.$axios.post(chargeTheCostfreeAward, {
                init: 'init'
            })
            .then(msg => {
                const data = msg.data

                if (data.flag !== 1000) {
                    this.$message.error(data.return_code)
                    return false
                }
                this.award_id = null
                this.award_count = null
                this.award_count_max = null
                this.awardList = data.award_list
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        },

        // 获取最大可充值量
        getAwarCountMax () {
            for (var i = this.awardList.length - 1; i >= 0; i--) {
                if (this.awardList[i].id === this.award_id) {
                    this.award_count_max = this.awardList[i].passed
                }
            }
        },

        // 提交充值量
        chargeTheCostfreeAward () {
            if (!this.award_id) {
                this.$message('请选择充值礼品')
                return false
            }
            this.$axios.post(chargeTheCostfreeAward, {
                award_count: this.award_count,
                award_id: this.award_id
            })
            .then(msg => {
                const data = msg.data

                if (data.flag !== 1000) {
                    this.$message.error(data.return_code)
                    return false
                }

                this.$message({
                    message: data.return_code,
                    type: 'success'
                })
                this.getAwardList()
            })
            .catch(error => {
                this.$message.error('服务器异常')
            })
        }
    }
}
</script>
