<script lang="ts" setup>
import HeaderClassify from './HeaderClassify.vue'
import HeaderMenu from './HeaderMenu.vue'
import HeaderBanner from './HeaderBanner.vue'
import HeaderUser from './HeaderUser.vue'

const route = useRoute()
// console.log('route :>> ', route)

const defData = reactive({
  isIndex: false,
})

// 监听是否为首页，显示首页模块头部内容
watch(() => route.path, () => {
  defData.isIndex = route.path === '/'
}, {
  immediate: true,
})
</script>

<template>
  <div class="nav-banner" :class="defData.isIndex ? 'index' : ''">
    <div class="nav">
      <div class="flex container">
        <div class="left-box">
          <HeaderClassify />
        </div>
        <HeaderMenu />
      </div>
    </div>
    <div v-if="defData.isIndex" class="banner">
      <div class="h520px flex container">
        <div class="left-box">
          <!-- 占位 -->
        </div>
        <div class="swp">
          <suspense>
            <HeaderBanner />
          </suspense>
        </div>
        <div class="right">
          <HeaderUser />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-banner {
  --banner-left-width: 230px;
  --banner-right-width: 250px;
  --banner-width: 700px;
  --banner-height: 520px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: var(--el-color-primary);
  }

  &.index {
    &::after {
      content: none;
    }

    :deep(.goods-class-child) {
      display: block !important;
      box-shadow: none !important;
    }

  }

  .left-box {
    width: var(--banner-left-width);
    position: relative;
  }

  .swp {
    width: var(--banner-width);
    height: 100%;
  }

  .right {
    width: var(--banner-right-width);
    height: 100%;
    background-color: var(--el-color-white);
  }

  .nav {
    position: relative;
    z-index: 15;
  }

  .banner {
    height: var(--banner-height);
  }
}
</style>
