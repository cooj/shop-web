<template>
  <section class="header-box">
    <el-form class="py25px" size="large">
      <div class="flex items-center justify-between text-#f8f8f8 container">
        <div class="logo">
          <NuxtLink to="/">
            <img class="h50px" :src="systemInfo?.shop_logo" alt="">
          </NuxtLink>
        </div>
        <div class="search-box relative w50%">
          <el-input v-model="search.keyword" placeholder="">
            <template #prepend>
              <el-select v-model="search.select" placeholder="" style="width: 115px">
                <el-option label="全部商品" value="1" />
                <el-option label="精选商品" value="2" />
                <el-option label="特价商品" value="3" />
              </el-select>
            </template>
            <template #append>
              <el-button type="primary" class="btn-search min-w100px" @click="onSearch">
                搜 索
              </el-button>
            </template>
          </el-input>
          <div class="absolute left-0 mt3px text-12px">
            热门搜索：123,45466,8799,56456
          </div>
        </div>
        <div class="cart">
          <el-button type="primary" class="min-w150px">
            <i class="i-ep-shopping-cart-full mr8px" />
            购物车
          </el-button>
          <!-- <el-button>
            <i class="i-ep-shopping-cart-full" />
            批量下单
          </el-button> -->
        </div>
      </div>
    </el-form>
    <!-- <client-only></client-only> -->

    <HeaderIndex />
  </section>
</template>

<script lang="ts" setup>
import HeaderIndex from './header/HeaderIndex.vue'

const route = useRoute()

const search = reactive({
  keyword: '',
  select: '1',
})

const useSystem = useSystemState()
const systemInfo = ref(useSystem.system)

// 搜索
const onSearch = () => {
  if (search.keyword.trim()) {
    linkGoodsList({
      query: {
        keyword: search.keyword,
      },
    })
  } else if (route.path === '/goods/list') {
    linkGoodsList({
      query: {},
    })
  }
}

watch(() => route.query.keyword, (val) => {
  search.keyword = val ? val as string : ''
})
</script>

<style lang="scss" scoped>
.header-box {

  background-image: url('~/assets/images/banner-bg.png');
  background-position: top center;

}

.search-box {

  :deep(.el-input) {
    --el-input-focus-border-color: transparent;
    // --el-input-border-radius: 10px;
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

  :deep(.el-input-group__append) {
    overflow: hidden;
  }

  .btn-search {
    border-color: var(--el-button-bg-color);
    background-color: var(--el-button-bg-color);
    color: var(--el-color-white);
    --el-border-radius-base: 0;

    &:focus,
    &:hover {
      color: var(--el-button-hover-text-color);
      border-color: var(--el-button-hover-border-color);
      background-color: var(--el-button-hover-bg-color);
      outline: 0;
    }
  }
}
</style>
