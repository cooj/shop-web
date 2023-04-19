<!-- 订单确认 -->
<template>
  <section class="text-14px">
    <div class="container">
      <el-breadcrumb class="py15px">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>购物车</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form size="small">
        <div min-h-200px></div>
      </el-form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';


definePageMeta({
  layout: 'home',
  middleware: ''
})
</script>

<style lang="scss" scoped></style>