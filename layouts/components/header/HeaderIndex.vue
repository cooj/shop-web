<template>
    <div class="nav-banner" :class="isIndex ? 'index' : ''">
        <div class="nav">
            <div class="flex container">
                <div class="left-box">
                    <HeaderClassify />
                </div>
                <HeaderMenu />
            </div>
        </div>
        <div v-if="isIndex" class="banner">
            <div class="h100% flex container">
                <div class="left-box">
                    <!-- 占位 -->
                </div>
                <div class="swp">
                    <suspense>
                        <HeaderBanner />
                        <!-- <HeaderBanner2 /> -->
                    </suspense>
                </div>
                <div class="right">
                    <HeaderUser />
                </div>
            </div>
        </div>
        <div v-if="isIndex" class="market">
            <div class="grid container">
                <NuxtLink to="/">
                    <img class="h150px w100%" src="assets/images/pic/card1.png" alt="">
                    <!-- <el-image class="h150px w100%" src="assets/images/pic/card1.png" /> -->
                </NuxtLink>
                <NuxtLink to="/">
                    <img class="h150px w100%" src="assets/images/pic/card2.png" alt="">
                    <!-- <el-image class="h150px w100%" src="assets/images/pic/card1.png" /> -->
                </NuxtLink>
                <NuxtLink to="/">
                    <img class="h150px w100%" src="assets/images/pic/card3.png" alt="">
                    <!-- <el-image class="h150px w100%" src="assets/images/pic/card1.png" /> -->
                </NuxtLink>
                <NuxtLink to="/">
                    <img class="h150px w100%" src="assets/images/pic/card4.png" alt="">
                    <!-- <el-image class="h150px w100%" src="assets/images/pic/card1.png" /> -->
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import HeaderClassify from './HeaderClassify.vue'
import HeaderMenu from './HeaderMenu.vue'

import HeaderBanner from './HeaderBanner.vue'
import HeaderUser from './HeaderUser.vue'

// import HeaderBanner2 from './HeaderBanner2.vue'

const route = useRoute()

const isIndex = computed(() => {
    return route.path === '/'
})
</script>

<style lang="scss" scoped>
.nav-banner {
  // --banner-left-width: 230px;
  // --banner-right-width: 230px;
  --banner-left-width: var(--m-aside-width, 230px);
  --banner-right-width: 230px;
  --banner-width: 720px;
  --banner-height: 400px;
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
    padding: 0 6px;
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

.market {
  --m-gap-width: 8px;
  --m-card-number: 4;
  padding: var(--m-gap-width) 0;

  .grid {
    gap: var(--m-gap-width);
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
