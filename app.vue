<template>
    <el-config-provider :locale="locale" :message="messageConfig">
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

// 提示框
const messageConfig = reactive({
    max: 1,
})
const cookie = useCookie('admin_token')
if (!cookie.value) cookie.value = ''
// 获取商城信息
const useSystem = useSystemState()
const systemInfo = await useSystem.getSystemInfo()

useHead({
    title: systemInfo.value?.shop_title,
    meta: [
        { name: 'keywords', content: systemInfo.value?.seo_keywords },
        { name: 'description', content: systemInfo.value?.shop_describe },
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: systemInfo.value?.ico_img || '' },
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
