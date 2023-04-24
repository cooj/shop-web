<script lang="ts" setup>
import HeaderIndex from './header/HeaderIndex.vue'

const search = reactive({
  keyword: '',
  select: '1',
})
</script>

<template>
  <section class="header-box">
    <div class="mid py25px">
      <div class="flex items-center justify-between text-#f8f8f8 container">
        <div class="logo">
          <NuxtLink to="/">
            <img class="h50px" src="~/assets/images/shop-logo2.png" alt="">
          </NuxtLink>
        </div>
        <div class="search-box relative w50%">
          <el-input v-model="search.keyword" placeholder="" size="large">
            <template #prepend>
              <el-select v-model="search.select" placeholder="" size="large" style="width: 115px">
                <el-option label="全部商品" value="1" />
                <el-option label="精选商品" value="2" />
                <el-option label="特价商品" value="3" />
              </el-select>
            </template>
          </el-input>
          <div class="absolute left-0 mt3px text-12px">
            热门搜索：123,45466,8799,56456
          </div>
        </div>
        <div class="cart">
          <el-button type="primary" size="large">
            <i class="i-ep-shopping-cart-full" />
            购物车
            <!-- <el-icon class="el-icon--right"><Upload /></el-icon> -->
          </el-button>
          <el-button size="large">
            <i class="i-ep-shopping-cart-full" />
            批量下单
            <!-- <el-icon class="el-icon--right"><Upload /></el-icon> -->
          </el-button>
        </div>
      </div>
    </div>
    <!-- <client-only></client-only> -->

    <HeaderIndex />
  </section>
</template>

<style lang="scss" scoped>
.header-box {

  background-image: url('~/assets/images/banner-bg.png');
  background-position: top center;

}

.search-box {

  :deep(.el-input) {
    --el-input-focus-border-color: transparent;
    --el-input-border-radius: 10px;
  }

  // .el-input__wrapper,
  // .el-input {
  //   --el-input-border-radius: 10px;
  // }

  .el-input__wrapper {
    &.is-focus {
      box-shadow: none;
    }
  }
}
</style>
