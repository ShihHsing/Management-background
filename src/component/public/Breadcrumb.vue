<template>
    <div id="breadcrumb">
            <span class="breadcrumb_label">当前位置:</span>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="router_url">{{ router_name }}</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
</template>

<style lang="less">
    #breadcrumb{
        width: 100%;
        font-size: 16px;
        .breadcrumb_label{
            float: left;

            padding-right: 15px;
        }
        .el-breadcrumb__item{
            line-height: 22px;
            font-size: 16px;
        }
    }
</style>

<script>
export default {
    name: 'breadcrumb',
    data () {
        return {}
    },
    computed: {
        router_url: function () {
            return this.$route.path
        },
        router_name: function () {
            return this.$route.name
        }
    }
}
</script>
