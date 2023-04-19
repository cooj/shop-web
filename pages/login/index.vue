<template>
  <div class="center">
    <div v-if="defData.type === 4" class="login">
      <el-icon style="float: right;margin: 5px;" @click="defData.type = 1">
        <Close />
      </el-icon>
      <Iframe id="iframe" class="ml40px w300px h400px" :src="weChat" />
    </div>
    <div v-else class="login">
      <div v-if="defData.type !== 3">
        <el-row>
          <el-col :span="6" />
          <el-col :span="6">
            <div class="title" @click="loginClick">
              账号登录 |
            </div>
          </el-col>
          <el-col :span="6">
            <div class="title" @click="validateClick">
              验证码登录
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="8" />
          <el-col :span="8">
            <div class="title">
              绑定手机号
            </div>
          </el-col>
          <el-col :span="8" />
          <el-col :span="2" />
          <el-col :span="8">
            <div style="color: red;">
              手机号未绑定
            </div>
          </el-col>
        </el-row>
      </div>
      <el-form ref="formRef" label-width="40px" :rules="rules" :model="form" style="max-width: 330px" size="large">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" :prefix-icon="User" />
        </el-form-item>
        <el-form-item v-if="defData.type === 1" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password :prefix-icon="Lock" />
        </el-form-item>
        <el-form-item v-else prop="validate_code">
          <el-col :span="15">
            <el-input v-model.trim="form.validate_code" type="text" placeholder="请输入短信验证码" clearable tabindex="3" />
          </el-col>
          <el-col :span="1" />
          <el-col :span="8">
            <el-button v-if="defData.sendCode" class="w100%" @click="getCodeClick">
              获取验证码
            </el-button>
            <el-button v-else class="w100%">
              {{ defData.time }}秒
            </el-button>
          </el-col>
        </el-form-item>
        <el-form-item v-if="defData.type !== 3">
          <el-button class="w300px" :loading="form.loading" @click="onClick">
            登 录
          </el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button class="w300px" :loading="form.loading" @click="onClick">
            进入工游记
          </el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="2" />
        <el-col :span="14">
          <NuxtLink to="/login/register">
            立即注册
          </NuxtLink>
        </el-col>
        <el-col :span="8">
          <NuxtLink to="/login/forgotPassword">
            忘记密码?
          </NuxtLink>
        </el-col>
        <el-col :span="2" />
        <el-col :span="4">
          <div class="mt-2">
            第三方：
          </div>
        </el-col>
        <el-col :span="6">
          <el-image class="w50px" :src="url" fit="fill" @click="weChatLogin" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { Close, Lock, User } from '@element-plus/icons-vue'
import { LoginApi } from '~/api/login'
definePageMeta({
  layout: 'login',
})

const route = useRoute()
const defData = reactive({
  type: 1, // 1账户登录 2验证码登录 3微信扫码之后注册 4二维码
  time: 0, // 验证码倒计时时间
  sendCode: true, // true：发送验证码 false:倒计时
})
const form = reactive({
  phone: '',
  password: '',
  loading: false,
  validate_code: '',
})

const rules = reactive<FormRules>({
  phone: [
    { required: true, pattern: /^(((\d{3,4}-)?[0-9]{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/, message: '填写正确的手机号格式', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入登录密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
  ],
  validate_code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ],
})
const formRef = ref<FormInstance>()

// 登录
const onClick = async () => {
  const isRun = await formRef.value?.validate((valid, _fields) => !!valid)
  if (!isRun) return

  if (defData.type === 1) { // 账号登录
    const data: LoginApi_Login = {
      type: 1,
      phone: form.phone,
      password: form.password,

    }
    const { data: res } = await LoginApi.Login(data)
    if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
    ElMessage.success('登录成功')
    sessionStorage.setItem('token', res.value.data.token)
    return navigateTo('/')
  } else { // 验证码登录
    const data: LoginApi_Login = {
      type: 2,
      phone: form.phone,
      validate_code: form.validate_code,
    }
    const { data: res } = await LoginApi.Login(data)
    if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
    ElMessage.success('登录成功')
    sessionStorage.setItem('token', res.value.data.token)
    return navigateTo('/')
  }
}

// 点击验证码登录
const validateClick = () => {
  defData.type = 2
}
// 点击账号登录
const loginClick = () => {
  defData.type = 1
}

// 获取短信验证码
const getCodeClick = async () => {
  if (!form.phone) ElMessage.error('请先输入手机号码')
  const data: LoginApi_validateCode = {
    type: 2,
    phone: form.phone,
  }
  const { data: res } = await LoginApi.validateCode(data)
  if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
  ElMessage.success('发送成功')
  defData.sendCode = false
  defData.time = 60
  const times = setInterval(() => {
    defData.time--
    if (defData.time <= 0) {
      defData.sendCode = true
      clearInterval(times)
    }
  }, 1000)
}

// 微信扫码登录
const url = 'https://img.sj33.cn/uploads/allimg/201402/7-140223103130591.png'
const weChat = ref()
const weChatLogin = async () => {
  const { data: res } = await LoginApi.getWeChat()

  if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
  weChat.value = res.value?.data.url

  defData.type = 4
}

// 获取OpenId
const getOpenId = async () => {
  const code: LoginApi_getOpenid = {
    code: route.query.code as string,
  }
  const { data: codeId } = await LoginApi.getOpenid(code)
  if (codeId.value?.data.status === 1) { // 已注册用户
    sessionStorage.setItem('token', codeId.value.data.token)
    // sessionStorage.getItem('token')
    return navigateTo('/')
  } else { // 未注册用户
    defData.type = 3
    const info: LoginApi_Login = {
      type: 2,
      phone: form.phone,
      validate_code: form.validate_code,
      nickname: codeId.value?.data.openid_info.nickname,
      openid: codeId.value?.data.openid_info.openid,
      unionid: codeId.value?.data.openid_info.unionid,
      headimgurl: codeId.value?.data.openid_info.headimgurl,
    }
    const res = await LoginApi.Login(info)
    if (res.data.value?.code !== 200) return ElMessage.error(res.data.value?.msg)
    return navigateTo('/')
  }
}
getOpenId()
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}

.center {
  // margin-top: 120px;
  height: 500px;
  // background-color: #797572;
  background-image: url('../../assets/images/banner-bg.png');
  background-blend-mode: multiply;
}

.login {
  width: 390px;
  height: 400px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  border-radius: 5px;
  top: 150px;
  right: 400px;
}

.title {
  font-size: large;
  text-align: center;
  height: 70px;
  padding-top: 20px;
  color: #000;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
