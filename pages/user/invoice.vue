<template>
    <LayoutUser>
        <el-breadcrumb>
            <el-breadcrumb-item>
                账户管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>抬头管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="my15px">
            <el-button type="primary" @click="onAdd">
                新增发票抬头
            </el-button>
        </div>
        <el-table :data="defData.tableData" border>
            <el-table-column prop="enterprise_name" label="企业名称" min-width="150" show-overflow-tooltip />
            <el-table-column prop="enterprise_email" label="企业邮箱" width="175" show-overflow-tooltip />
            <el-table-column prop="header" label="发票抬头" width="85" show-overflow-tooltip />
            <el-table-column prop="tax_no" label="纳税人识别号" width="110" show-overflow-tooltip />
            <el-table-column prop="type" label="发票类型" width="120" align="center" show-overflow-tooltip>
                <template #default="{ row }">
                    <el-tag v-if="row.type === 1" type="success">
                        增值税务发票
                    </el-tag>
                    <el-tag v-else-if="row.type === 2" type="danger">
                        普通发票
                    </el-tag>
                    <el-tag v-else type="danger">
                        普通电子发票
                    </el-tag>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="logon_addr" label="注册地址" min-width="150" show-overflow-tooltip />
            <el-table-column prop="logon_tel" label="注册电话" width="120" show-overflow-tooltip />
            <el-table-column prop="bank" label="开户银行" min-width="150" show-overflow-tooltip />
            <el-table-column prop="bank_account" label="开户账户" min-width="150" show-overflow-tooltip /> -->
            <!-- <el-table-column prop="enterprise_name" label="快递名称" min-width="150" show-overflow-tooltip /> -->
            <!-- <el-table-column prop="express_no" label="快递编号" min-width="150" show-overflow-tooltip />
            <el-table-column prop="failed_remark" label="未通过原因" min-width="150" show-overflow-tooltip />
            <el-table-column prop="order_no" label="订单号" min-width="150" show-overflow-tooltip />
            <el-table-column prop="is_send" label="是否发送" min-width="90" show-overflow-tooltip>
                <template #default="{ row }">
                    <el-tag v-if="row.is_send" type="success">
                        是
                    </el-tag>
                    <el-tag v-else type="danger">
                        否
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="verify_status" fixed="right" label="审核状态" width="90" align="center" show-overflow-tooltip>
                <template #default="{ row }">
                    <el-tag v-if="row.verify_status === 0" type="success">
                        未审核
                    </el-tag>
                    <el-tag v-else-if="row.verify_status === 1" type="danger">
                        审核通过
                    </el-tag>
                    <el-tag v-else type="danger">
                        审核不通过
                    </el-tag>
                </template>
            </el-table-column> -->
        </el-table>
        <UserInvoiceModel ref="modelRef" @update="getInvoice" />
    </LayoutUser>
</template>

<script setup lang="ts">
import { UserInvoiceModel } from '#components'
import { UserInvoiceApi } from '~/api/user/invoice'

const modelRef = ref<InstanceType<typeof UserInvoiceModel>>()
const defData = reactive({
    tableData: [] as UserInvoiceApi_getList[],
})

// 新增
const onAdd = async () => {
    modelRef.value?.onOpenDialog()
}

// 更新列表
const getInvoice = () => {
    initTableData()
}

const initTableData = async () => {
    const res = await UserInvoiceApi.getList()
    if (res.data.value?.code !== 200) return ElMessage.error(res.data.value?.msg)

    defData.tableData = res.data.value.data
}
initTableData()

definePageMeta({
    layout: 'home',
    middleware: 'auth',
})
</script>

<style scoped></style>
