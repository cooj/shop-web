<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item>
        我关注的
      </el-breadcrumb-item>
      <el-breadcrumb-item>浏览历史</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

definePageMeta({
  layout: 'user',
  middleware: 'auth',
})
</script>

<style scoped></style>
