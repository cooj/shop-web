<!-- 导航菜单 -->
<template>
    <nav class="nav-box min-h48px">
        <ClientOnly>
            <NuxtLink v-for="item in menu?.data" :key="item.nav_id" :to="item.nav_url">
                {{ item.nav_name }}
            </NuxtLink>
        </ClientOnly>
        <!-- <NuxtLink to="/order/cart">
            清仓特卖
        </NuxtLink> -->
    </nav>
</template>

<script lang="ts" setup>
import { HomeApi } from '~/api/home/home'

// 获取导航
const { data: menu } = await HomeApi.getNav()
// console.log('menu :>> ', menu)
</script>

<style lang="scss" scoped>
.nav-box {
    flex: 1;
    color: var(--el-color-white);
    font-weight: bold;

    >a {
        display: inline-block;
        line-height: 48px;
        padding: 0 20px;

        &.router-link-active,
        &:hover {
            color: var(--el-color-primary);
        }
    }
}
</style>
