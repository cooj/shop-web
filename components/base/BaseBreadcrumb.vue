<!-- 面包屑导航 -->
<template>
    <el-breadcrumb class="breadcrumb-box">
        <el-breadcrumb-item :to="{ path: '/' }">
            首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>物性测试仪器</el-breadcrumb-item>
        <el-breadcrumb-item>试验机</el-breadcrumb-item>
        <el-breadcrumb-item>德卡</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts" setup>
const props = defineProps<{
  type: 'goods'
  icon: string
  href: string
}>()
</script>

<style lang="scss" scoped></style>
