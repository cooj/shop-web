<template>
  <div>
    <div h40px>
      <el-breadcrumb>
        <el-breadcrumb-item>
          账户管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>账户资料</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- ***********个人信息*************************************** -->
    <div v-if="defData.type === 1">
      <div style="font-weight: bold">
        个人信息
      </div>
      <div style="margin:15px 0px;font-size: 14px;">
        头像： <el-image class="h100px w100px" :src="defData.headImgUrl" />
      </div>
      <div style="margin:15px 0px;font-size: 14px;">
        我的用户名：{{ defData.user_name }}
      </div>
      <el-button type="danger" ml20 mt5 @click="editClick">
        修改
      </el-button>
    </div>
    <div v-else>
      <p>修改信息</p>
      <el-form ref="formRef" :model="form" label-width="130px" class="pt15px" :rules="rules">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item prop="headimgurl" label="头像：">
              <BaseUpload v-model="form.headImgUrl" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="20" :md="18" :lg="14" :xl="14">
            <el-form-item prop="user_name" label="我的用户名：">
              <el-input v-model="form.user_name" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item>
              <el-button type="primary" @click="onClick">
                确定
              </el-button>
              <el-button @click="defData.type = 1">
                返回
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- ***********账户安全**************************************** -->
    <div mt40px>
      <el-descriptions title="账户安全" :column="2">
        <el-descriptions-item label="登录密码：">
          联网账号存在被盗风险，建议定期更改密码以保护账户安全
        </el-descriptions-item>
        <el-descriptions-item>
          <NuxtLink to="/user/components/editPwd">
            修改
          </NuxtLink>
        </el-descriptions-item>
        <el-descriptions-item label="绑定手机：">
          您已绑定手机：{{ defData.phone }}，若手机丢失或停用，请及时更换
        </el-descriptions-item>
        <el-descriptions-item>
          <NuxtLink to="/user/components/editPhone">
            换绑
          </NuxtLink>
        </el-descriptions-item>
        <el-descriptions-item label="绑定微信：">
          {{ defData.nickname ? '已绑定' : '暂无绑定' }}{{ defData.nickname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <div v-if="defData.nickname">
            <button @click="delWeChat">
              解绑
            </button>
          </div>
          <div v-else>
            <NuxtLink to="/user/components/getWeChat">
              绑定
            </NuxtLink>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="绑定邮箱：">
          {{ defData.email ? '您已绑定邮箱' : '暂未绑定' }}{{ defData.email }}
          <el-button v-if="defData.email && defData.email_status === 0" @click="sendEmail">
            去激活
          </el-button>
        </el-descriptions-item>
        <el-descriptions-item>
          <NuxtLink to="/user/components/editEmail">
            修改
          </NuxtLink>
        </el-descriptions-item>
      </el-descriptions>
      <!-- <i class="i-ep-apple block" />
      <i class="ic-baseline-add-home-work block" />
      <i class="i-carbon:battery-low block" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { AccountApi } from '~/api/user/account'

const userState = useUserStore()

const defData = reactive({
  type: 1, // 1个人信息 2修改个人信息
  user_name: '',
  phone: '',
  email: '',
  headImgUrl: 'https://goyojo.oss-cn-shenzhen.aliyuncs.com/20230420/202304201450139203.gif',
  openid: '',
  nickname: '',
  email_status: 0,
})

const formRef = ref<FormInstance>()
const form = reactive({
  user_name: '',
  phone: '',
  email: '',
  headImgUrl: '',
  confirm_password: '',
  password: '',
})

// 规则
const rules = reactive<FormRules>({
  user_name: [
    { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
    { min: 2, max: 16, message: '最少2个,最多16个字符', trigger: 'blur' }],
})

// 获取用户信息
const initData = async () => {
  const user = await userState.getUserInfo()
  if (user.value) {
    defData.user_name = user.value.user_name
    defData.email = user.value.email
    defData.phone = user.value.phone
    defData.openid = user.value.openid
    defData.nickname = user.value.nickname
    defData.email_status = user.value.email_status
    if (user.value.headimgurl) defData.headImgUrl = user.value.headimgurl
  }
}

// 修改用户信息
const editClick = () => {
  defData.type = 2
  form.headImgUrl = defData.headImgUrl
  form.user_name = defData.user_name
  form.phone = defData.phone
  form.email = defData.email
}

// 修改用户信息 确定
const onClick = async () => {
  const data: AccountApi_editInfo = {
    user_name: form.user_name,
    headimgurl: form.headImgUrl,
  }
  const res = await AccountApi.editInfo(data)
  if (res.data.value?.code !== 200) return ElMessage.error(res.data.value?.msg)
  ElMessage.success('修改成功')
  userState.getUserInfo(true)
  defData.user_name = data.user_name
  defData.headImgUrl = data.headimgurl
  defData.type = 1
}

// 解绑微信
const delWeChat = async () => {
  const res = await AccountApi.del_openid()
  if (res.data.value?.code !== 200) ElMessage.error(res.data.value?.msg)
  ElMessage.success('解绑成功')
}

// 发送激活邮件
const sendEmail = async () => {
  const data: AccountApi_sendEmail = {
    email: defData.email,
  }
  const res = await AccountApi.sendEmail(data)
  if (res.data.value?.code !== 200) ElMessage.error(res.data.value?.msg)
  ElMessage.success('激活邮件发送成功')
}

definePageMeta({
  layout: 'user',
  middleware: 'auth',
})

onBeforeMount(() => {
  initData()
})
</script>

<style scoped>
.avatar-upload.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
