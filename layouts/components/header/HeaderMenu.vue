<!-- 导航菜单 -->
<template>
  <el-menu class="menu-box flex-1" :default-active="activeIndex" mode="horizontal">
    <el-menu-item v-for="item in menu?.data" :key="item.nav_id" :index="setMenuItemIndex(item.nav_url)">
      <NuxtLink :to="item.nav_url">
        {{ item.nav_name }}
      </NuxtLink>
    </el-menu-item>
    <el-menu-item index="2">
      <NuxtLink to="/goods/list">
        品牌导航
      </NuxtLink>
    </el-menu-item>
    <el-menu-item index="3">
      <NuxtLink to="/goods/detail">
        行家精选
      </NuxtLink>
    </el-menu-item>
    <el-menu-item index="4">
      <NuxtLink to="/goods/detail1">
        清仓特卖
      </NuxtLink>
    </el-menu-item>
    <el-menu-item index="15">
      <NuxtLink to="/goods/detail2">
        低价好货
      </NuxtLink>
    </el-menu-item>
    <el-menu-item index="6">
      <NuxtLink to="/goods/detail3">
        内容资讯
      </NuxtLink>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { HomeApi } from '~/api/home/home'

const activeIndex = ref('')
const route = useRoute()

// 获取导航
const { data: menu, pending } = await HomeApi.getNav()
// console.log('menu :>> ', menu)

// 设置el-menu-item的index属性，
const setMenuItemIndex = (url: string) => {
  // url为空、不存在时，返回随机字符串
  const str = Math.random().toString(36).slice(-6)
  if (!url) return str
  try {
    // 通过new URL取得主机地址
    const urls = new URL(url)
    if (urls.host === location.host) { // 跟浏览器地址一致，返回pathname
      return urls.pathname
    } else {
      return str
    }
  } catch (error) {
    // 返回?前面部分
    const arr = url.split('?')
    return arr[0]
  }
}

// 设置菜单高亮状态
const setMenuActive = () => {
  const list = menu.value?.data.map(item => setMenuItemIndex(item.nav_url))
  // const indexList = list?
  if (list?.includes(route.path)) {
    activeIndex.value = route.path
  } else {
    activeIndex.value = ''
  }
}

// 监听路由变化,以及菜单导航加载完成
watch(() => [route.path, pending.value], (val) => {
  setMenuActive()
}, {
  immediate: true,
})
</script>

<style lang="scss" scoped>
.menu-box {
  --el-menu-item-height: 48px;
  --el-menu-border-color: transparent;
  --el-menu-bg-color: transparent;
  --el-menu-text-color: var(--el-color-white);
  --el-menu-hover-bg-color: transparent;

  &.el-menu--horizontal {
    border-bottom: 0;
  }

  .el-menu-item {
    font-size: 16px;
    font-weight: bold;
    border: 0 !important;
    padding: 0;

    a {
      padding: 0 20px;
    }

    &.is-active {
      border: 0;
    }
  }

}
</style>
