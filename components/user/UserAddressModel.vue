<!-- 新增、修改地址 -->
<template>
  <!-- auto-height hidden -->
  <BaseDialog
    v-model:visible="defData.visible" :loading="btnLoading" auto-height :title="comData.title" width="680px"
    @close="onClose" @cancel="onClose" @confirm="onConfirm"
  >
    <el-form ref="formRef" :model="form" :label-width="130" :rules="rules">
      <el-row>
        <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
          <el-form-item prop="contacts" label="联系人：">
            <el-input v-model="form.contacts" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
          <el-form-item prop="phone" label="联系电话：">
            <el-input v-model="form.phone" placeholder="请输入正确的手机号格式" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
          <el-form-item prop="email" label="电子邮箱：">
            <el-input v-model="form.email" type="email" placeholder="请输入正确的邮箱格式" clearable />
          </el-form-item>
        </el-col> <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
          <el-form-item prop="province" label="省份：">
            <el-input v-model="form.province" clearable />
          </el-form-item>
        </el-col> <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
          <el-form-item prop="city" label="城市：">
            <el-input v-model="form.city" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
          <el-form-item prop="area" label="地区：">
            <el-input v-model="form.area" clearable />
          </el-form-item>
        </el-col> <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
          <el-form-item prop="address" label="详细地址：">
            <el-input v-model="form.address" clearable />
          </el-form-item>
        </el-col> <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
          <el-form-item prop="is_default" label="是否默认：">
            <el-radio-group v-model="form.is_default">
              <el-radio label="1">
                是
              </el-radio>
              <el-radio label="0">
                否
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
          <el-form-item prop="is_bill_address" label="是否发票地址：">
            <el-radio-group v-model="form.is_bill_address">
              <el-radio label="1">
                是
              </el-radio>
              <el-radio label="0">
                否
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </BaseDialog>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()

const defData = reactive({
  visible: false, // 是否显示窗口，默认为false。
})

// 表单数据
const form = reactive({
  contacts: '',
  phone: '',
  email: '',
  province: '',
  city: '',
  area: '',
  address: '',
  is_default: 0,
  is_bill_address: 0,

})
const rules = reactive<FormRules>({
  contacts: [
    { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
  ],
  phone: [
    { required: true, pattern: /^(((\d{3,4}-)?[0-9]{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/, message: '填写正确的手机号格式', trigger: 'blur' },
  ],
  city: [
    { required: true, message: '必填项不能为空', trigger: 'blur' },
  ],
  province: [
    { required: true, message: '必填项不能为空', trigger: 'blur' },
  ],
  area: [
    { required: true, message: '必填项不能为空', trigger: 'blur' },
  ],
  address: [
    { required: true, pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, message: '填写正确的邮箱格式', trigger: 'blur' },
  ],
  is_default: [
    { required: true, message: '必填项不能为空', trigger: 'blur' },
  ],
  is_bill_address: [
    { required: true, message: '必填项不能为空', trigger: 'blur' },
  ],
})

const comData = computed(() => {
  return { title: '新增地址' }
})

// 打开弹窗
const onOpenDialog = () => {
  defData.visible = true
}

// 确认
const onConfirm = () => {

}
// 关闭弹窗
const onClose = () => {
  defData.visible = false
}

defineExpose({
  onOpenDialog,
})
</script>

<style lang="scss" scoped></style>
