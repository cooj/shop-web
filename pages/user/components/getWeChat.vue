<template>
  <div>
    <div h40px>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>
          账户管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>账户资料</el-breadcrumb-item>
        <el-breadcrumb-item>修改手机号码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-button>
      <NuxtLink to="/user/Account">
        返回
      </NuxtLink>
    </el-button>
    <div class="m50px">
      <iframe id="iframe" class="ml40px h400px w300px" :src="weChat" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { LoginApi } from '~/api/login'

const route = useRoute()
const userState = useUserState()

// 微信扫码登录
const weChat = ref()
const getWeChat = async () => {
  const data: LoginApi_getChat = {
    qrcode_type: 2,
  }
  const { data: res } = await LoginApi.getWeChat(data)

  if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
  weChat.value = res.value?.data.url
}
getWeChat()

// 获取OpenId
const getOpenId = async () => {
  if (!route.query.code) return
  const user = await userState.getUserInfo()
  if (user.value) {
    const code: LoginApi_getOpenid = {
      code: route.query.code as string,
      user_id: user.value.user_id,
    }
    const { data: codeId } = await LoginApi.getOpenid(code)
    if (codeId.value?.code !== 200) return ElMessage.error(codeId.value?.msg)
    return navigateTo('/user/account')
  }
}
getOpenId()

definePageMeta({
  layout: 'user',
  middleware: 'auth',
})
</script>

<style scoped></style>
