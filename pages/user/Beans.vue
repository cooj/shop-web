<template>
  <div>
    <div h40px>
      <el-breadcrumb>
        <el-breadcrumb-item>
          订单中心
        </el-breadcrumb-item>
        <el-breadcrumb-item>我的工游豆</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'user',
  middleware: 'auth',
})
</script>

<style scoped></style>
