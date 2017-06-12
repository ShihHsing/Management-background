<template>
    <div id="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>当前位置: </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'breadcrumb',
    data () {
        return {}
    }
}
</script>
