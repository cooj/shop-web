<!-- 轮播图 -->
<template>
    <Swiper class="swp-banner" :slides-per-view="1" :centered-slides="true" :navigation="true" :pagination="true"
        :loop="true" :autoplay="{ delay: 6000,
                                  disableOnInteraction: false }" :speed="1500" effect="fade" :modules="modules">
        <SwiperSlide v-for="item in defData.bannerList" :key="item.ad_id">
            <NuxtLink :to="item.ad_link">
                <img class="im" :src="item.ad_img" alt="">
            </NuxtLink>
        </SwiperSlide>
    </Swiper>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper'
import { HomeApi } from '~/api/home/home'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const modules = [Pagination, Navigation, Autoplay, EffectFade]

// import { register } from 'swiper/element/bundle'
// // register Swiper custom elements
// register()

// const initSwiper = () => {
//   const swiperEl: any = document.querySelector('swiper-container');

//   // swiper parameters
//   const swiperParams = {
//     slidesPerView: 1,
//     breakpoints: {
//       640: {
//         slidesPerView: 2,
//       },
//       1024: {
//         slidesPerView: 3,
//       },
//     },
//     on: {
//       init() {
//         // ...
//       },
//     },
//   };

//   // // now we need to assign all parameters to Swiper element
//   Object.assign(swiperEl, swiperParams);

//   // and now initialize it
//   swiperEl.initialize();
// }

// onMounted(() => {
//   initSwiper()
// })

const defData = reactive({
    bannerList: [] as HomeApi_GetBannerItem[],
})

// 获取轮播图
// const getBannerList = async () => {
const { data: banner } = await HomeApi.getBanner({ position_id: 1 })

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
defData.bannerList = _list || []
// }

// getBannerList()
</script>

<style lang="scss" scoped>
.swp-banner {
    // background-color: #fff;
    width: 100%;
    --swiper-navigation-size: 32px;
    --swiper-theme-color: var(--el-color-primary);
    --swiper-pagination-bullet-inactive-color: var(--el-color-white);
    // --swiper-pagination-color: var(--el-color-primary);
    --swiper-pagination-bullet-inactive-opacity: 0.7;

    .im {
        width: 100%;
        height: var(--banner-height);
        object-fit: cover;
    }
}
</style>
