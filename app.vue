<template>
  <el-config-provider :locale="locale">
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@unocss/reset/tailwind.css'
import '~/assets/scss/default.scss'
import '~/assets/scss/app.scss'

const locale = ref(zhCn)

// 获取商城信息
const useSystem = useSystemState()
const systemInfo = await useSystem.getSystemInfo()

useHead({
  title: systemInfo.value?.shop_title,
  meta: [
    { name: 'description', content: systemInfo.value?.shop_describe },
  ],
})
</script>

<style lang="scss">
html,
body,
#__nuxt {
  // height: 100vh;
  margin: 0;
  padding: 0;
  // background: $bgColor;
}

html.dark {
  background: #333;
  color: white;
}
</style>
