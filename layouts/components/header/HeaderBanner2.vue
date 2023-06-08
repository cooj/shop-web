<!-- 轮播图 -->

<template>
    <!-- <Swiper class="swp-banner" :slides-per-view="1" :centered-slides="true" :pagination="{ hideOnClick: false }">
    <SwiperSlide v-for="item in banner?.data" :key="item.banner_id">
      <NuxtLink :to="item.banner_link">
        <img class="im" :src="item.banner_img" alt="">
      </NuxtLink>
    </SwiperSlide>
    <SwiperSlide>
      <img class="im" src="~/assets/images/banner.png" alt="">
      </SwiperSlide>
    </Swiper> -->
    <swiper-container class="swp-banner" :slides-per-view="1" :centered-slides="true" :pagination="{ hideOnClick: false }">
        <SwiperSlide v-for="item in banner?.data" :key="item.banner_id">
            <NuxtLink :to="item.banner_link">
                <img class="im" :src="item.banner_img" alt="">
            </NuxtLink>
        </SwiperSlide>
    </swiper-container>
</template>

<script lang="ts" setup>
// import { Swiper, SwiperSlide } from 'swiper/vue'

import { register } from 'swiper/element/bundle'
import { HomeApi } from '~/api/home/home'

// Import Swiper styles
// import 'swiper/css'

// register Swiper custom elements
register()

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

// 获取导航
const { data: banner } = await HomeApi.getBanner()
// console.log('banner :>> ', banner)
</script>

<style lang="scss" scoped>
.swp-banner {
  // background-color: #fff;
  width: 100%;
  --swiper-pagination-bullet-inactive-color: var(--el-color-white);
  --swiper-pagination-color: var(--el-color-primary);
  --swiper-pagination-bullet-inactive-opacity: 0.7;

  .im {
    width: 100%;
    height: var(--banner-height);
    object-fit: cover;
  }
}
</style>
