<template>
    <LayoutUser>
        <div h40px>
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item>
                    账户管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>账户资料</el-breadcrumb-item>
                <el-breadcrumb-item>修改邮箱</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="formRef" label-width="130px" :rules="rules" :model="form" style="max-width: 500px">
            <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item prop="email" label="邮箱">
                        <el-input v-model="form.email" placeholder="请输入邮箱" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item>
                    <el-button @click="editPwd">
                        确定
                    </el-button>
                    <el-button>
                        <NuxtLink to="/user/Account">
                            返回
                        </NuxtLink>
                    </el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </LayoutUser>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { AccountApi } from '~/api/user/account'

const formRef = ref<FormInstance>()
const form = reactive({
    email: '',
})

// 规则
const rules = reactive<FormRules>({
    email: [
        { required: true, pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, message: '填写正确的邮箱格式', trigger: 'blur' },
    ],
})

// 修改密码
const editPwd = async () => {
    const isRun = await formRef.value?.validate((valid, _fields) => !!valid)
    if (!isRun) return
    const data: AccountApi_editEmail = {
        email: form.email,
    }
    const { data: res } = await AccountApi.editEmail(data)
    if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
    ElMessage.success('修改成功')
    return navigateTo('/user/Account')
}

definePageMeta({
    layout: 'home',
    middleware: 'auth',
})
</script>

<style scoped></style>
