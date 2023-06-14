<!-- 新增发票 -->
<template>
    <!-- auto-height -->
    <CoDialog v-model:visible="defData.visible" :loading="defData.btnLoading" auto-height hidden title="新增发票抬头" width="680px"
        @close="onClose" @cancel="onClose" @confirm="onConfirm">
        <el-form ref="formRef" :model="form.data" :label-width="130" :rules="rules">
            <el-row>
                <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                    <el-form-item prop="enterprise_name" label="企业名称：">
                        <el-input v-model="form.data.enterprise_name" placeholder="请输入企业名称" maxlength="20" clearable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                    <el-form-item prop="enterprise_email" label="企业邮箱：">
                        <el-input v-model="form.data.enterprise_email" type="email" placeholder="请输入企业邮箱" maxlength="20"
                            clearable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item prop="type" label="发票类型：">
                        <el-radio-group v-model="form.data.type" class="ml-4">
                            <el-radio :label="1" border>
                                增值税专用发票
                            </el-radio>
                            <el-radio :label="2" border>
                                普通发票
                            </el-radio>
                            <el-radio :label="3" border>
                                电子普通发票
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                    <el-form-item v-if="form.data.type === 1" prop="tax_no" label="纳税人识别号：">
                        <el-input v-model="form.data.tax_no" placeholder="请输入纳税人识别号" maxlength="20" clearable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item v-if="form.data.type === 1" prop="logon_tel" label="注册电话：">
                        <el-input v-model="form.data.logon_tel" placeholder="请输入注册电话" maxlength="20" clearable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-form-item v-if="form.data.type === 1" prop="logon_addr" label="注册地址：">
                        <el-input v-model="form.data.logon_addr" placeholder="请输入注册地址" maxlength="20" clearable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-form-item v-if="form.data.type === 1" prop="bank" label="开户银行：">
                        <el-input v-model="form.data.bank" placeholder="请输入开户银行" maxlength="20" clearable />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22">
                    <el-form-item v-if="form.data.type === 1" prop="bank_account" label="开户账号：">
                        <el-input v-model="form.data.bank_account" placeholder="请输入开户账号" maxlength="20" clearable />
                    </el-form-item>
                </el-col>
                <el-form-item prop="address_id" label="收票地址：">
                    <el-cascader v-model="form.data.address_id" :options="defData.addressList"
                        :props="{ value: 'cityName', label: 'cityName' }" class="w100%" clearable filterable />
                </el-form-item>
                <!-- <NuxtLink v-if="defData.AddressList.length === 0" to="/user/address">
                        <span style="color: red;margin-left: 10px;">去添加地址</span>
                    </NuxtLink> -->
            </el-row>
        </el-form>
    </CoDialog>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { CommonApi } from '~/api/common'
import { UserInvoiceApi } from '~/api/user/invoice'

const emits = defineEmits(['update'])
const formRef = ref<FormInstance>()

const defData = reactive({
    visible: false, // 是否显示窗口，默认为false。
    ready: false, // 内容是否加载完成
    btnLoading: false,
    addressList: [] as CommonApi_GetAllRegionItem[],
})

// 表单数据
const form = reactive({
    data: {
        enterprise_name: '', // 企业名称
        type: 1 | 2 | 3, // 类型1：增值税专用发票 2：普通发票 3：电子普通发票
        enterprise_email: '', // 企业邮箱
        tax_no: '', // 纳税人识别号
        logon_tel: '', // 注册电话
        logon_addr: '', // 注册地址
        bank: '', // 开户银行
        bank_account: '', // 开户账号
        // user_id: '', // 用户id
        address_id: '', // 添加收票地址返回ID
    },
})

const rules = reactive<FormRules>({
    enterprise_name: [
        { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    enterprise_email: [
        { required: true, whitespace: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
    ],
    type: [
        { required: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    tax_no: [
        { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    logon_tel: [
        { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
        { required: true, pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' },
        // { required: true, pattern: /^(((\d{3,4}-)?[0-9]{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/, message: '填写正确的手机号格式', trigger: 'blur' },
    ],
    logon_addr: [
        { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    bank: [
        { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    bank_account: [
        { required: true, whitespace: true, message: '必填项不能为空', trigger: 'blur' },
    ],
    address_id: [
        { required: true, type: 'array', message: '必填项不能为空', trigger: 'blur' },
    ],
})

// 初始化数据
const initDefaultData = async () => {
    if (defData.ready) return false
    const { data } = await CommonApi.getAllRegion()
    if (data.value?.code === 200) {
        defData.addressList = data.value.data
    } else {
        ElMessage.error(data.value?.msg) // 提示信息或页面加载不当会引发任何内容。
    }

    defData.ready = true
}
initDefaultData()

// 打开弹窗
const onOpenDialog = () => {
    defData.visible = true
}

// 关闭弹窗
const onClose = () => {
    defData.visible = false
    formRef.value?.resetFields()
}

// 确认
const onConfirm = async () => {
    const isRun = await useFormVerify(formRef.value)
    if (!isRun) return false

    const params: UserInvoiceApi_Add = {
        enterprise_name: form.data.enterprise_name.trim(),
        enterprise_email: form.data.enterprise_email.trim(),
        type: form.data.type as 1 | 2 | 3,
        tax_no: form.data.tax_no.trim(),
        logon_tel: form.data.logon_tel,
        logon_addr: form.data.logon_addr.trim(),
        bank: form.data.bank.trim(),
        bank_account: form.data.bank_account.trim(),
        // user_id: user.value.user_id,
        address_id: form.data.address_id,
    }
    // console.log('params :>> ', params)
    const { data: res } = await UserInvoiceApi.add(params)
    if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
    ElMessage.success('新增成功')
    emits('update')
    onClose()
}

defineExpose({
    onOpenDialog,
})
</script>

<style lang="scss" scoped></style>
