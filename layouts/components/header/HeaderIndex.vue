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
                    <!-- <suspense> -->
                    <HeaderBanner />
                    <!-- <HeaderBanner2 /> -->
                    <!-- </suspense> -->
                </div>
                <div class="right">
                    <HeaderUser />
                </div>
            </div>
        </div>
        <div v-if="isIndex && defData.activeList.length" class="market">
            <div class="grid container">
                <NuxtLink v-for="item in defData.activeList" :key="item.ad_id" :to="item.ad_link" target="_blank">
                    <CoImage class="block h150px w100%" :src="item.ad_img" fit="cover" />
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
import { HomeApi } from '~/api/home/home'

// import HeaderBanner2 from './HeaderBanner2.vue'

const route = useRoute()

const isIndex = computed(() => {
    return route.path === '/'
})
const defData = reactive({
    activeList: [] as HomeApi_GetBannerItem[],
})

// 获取活动专区广告
const getActiveList = async () => {
    // 获取活动广告
    const { data: banner } = await HomeApi.getBanner({ position_id: 3 })

    //     "start_time": 1678334400, //开始时间
    // "end_time": 1685246400, //结束时间
    const _list = banner.value?.data.lists.filter((item) => {
        const nowTime = new Date().getTime() // 当前时间的毫秒数
        // php时间戳为10位
        const start = !!(nowTime > item.start_time * 1000 && nowTime < item.end_time * 1000) // 开始和结束时间是否在当前时间范围内 （比如
        if (item.enabled && start) {
            return true
        } else {
            return false
        }
    })
    defData.activeList = _list || []
}

onMounted(() => {
    getActiveList()
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
