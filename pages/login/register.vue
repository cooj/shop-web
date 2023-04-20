<template>
  <div class="container">
    <div>
      已有账号，去<NuxtLink to="/login">
        登录
      </NuxtLink>
    </div>
    <div style="border: 1px solid #50585e;height: 650px;display:flex;justify-content: center;">
      <div style="width: 600px;margin-top: 50px;">
        <div style="font-size: xx-large;margin: 40px 160px;">
          欢迎您注册工游记
        </div>
        <el-form ref="formRef" label-width="130px" :rules="rules" :model="form" style="max-width: 500px" size="large">
          <el-form-item prop="phone" label="手机号码：">
            <el-input v-model="form.phone" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item prop="validate_code" label="验证码：">
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
          <el-form-item>
            <el-button class="mt-20px w400px" @click="onClick">
              <!-- <i class="i-ep-plus" /> -->
              注册
            </el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-radio-group>
              <el-radio :label="3">
                我已阅读并同意《工游记网站服务协议》《工游记隐私政策》
              </el-radio>
            </el-radio-group>
          </el-form-item> -->
        </el-form>
      </div>
    </div>
  </div>

  <!-- <div style="margin-top: 120px; width:1152px;height: 650px;position: absolute; left: 330px;">
    <div style="width: 600px;position: absolute; left: 300px;top:40px">
    </div>
  </div> -->
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { LoginApi } from '~/api/login'

definePageMeta({
  layout: 'login',
})

const defData = reactive({
  time: 0, // 验证码倒计时时间
  sendCode: true, // true：发送验证码 false:倒计时
})

const formRef = ref<FormInstance>()

const form = reactive({
  validate_code: '',
  password: '',
  phone: '',
  // loading: true,
})

const rules = reactive<FormRules>({
  phone: [
    { required: true, pattern: /^(((\d{3,4}-)?[0-9]{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/, message: '填写正确的手机号格式', trigger: 'blur' },
  ],
  validate_code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ],
})

// 获取短信验证码
const getCodeClick = async () => {
  if (!form.phone) ElMessage.error('请先输入手机号码')

  const data: LoginApi_validateCode = {
    type: 1,
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

// 注册
const onClick = async () => {
  const isRun = await formRef.value?.validate((valid, _fields) => !!valid)
  if (!isRun) return

  const data: LoginApi_Login = {
    type: 3,
    phone: form.phone,
    validate_code: form.validate_code,

  }
  const { data: res } = await LoginApi.Login(data)
  if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
  ElMessage.success('注册成功')
  return navigateTo('/login')
}
</script>

<style scoped></style>
