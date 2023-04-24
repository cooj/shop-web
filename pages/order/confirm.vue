<!-- 订单确认 -->
<template>
  <section class="text-14px">
    <div class="container">
      <el-breadcrumb class="py15px">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/order/cart' }">
          购物车
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          订单结算
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-form size="small">
        <div min-h-200px />
      </el-form>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'home',
  middleware: 'auth',
})
</script>

<style lang="scss" scoped></style>
