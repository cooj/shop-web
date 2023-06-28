<template>
    <LayoutUser>
        <el-skeleton :loading="defData.skeleton" animated>
            <template #template>
                <div class="pb20px">
                    <el-skeleton-item class="w20%!" />
                </div>
                <div class="min-h500px">
                    <el-skeleton :rows="5" />
                </div>
            </template>

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
                <el-table-column prop="header" label="发票抬头" width="150" show-overflow-tooltip />
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
                <el-table-column prop="is_default" label="是否默认" width="83" show-overflow-tooltip>
                    <template #default="{ row }">
                        <el-tag v-if="row.is_default" type="success">
                            是
                        </el-tag>
                        <el-tag v-else type="danger">
                            否
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="logon_addr" label="注册地址" min-width="150" show-overflow-tooltip />
                <el-table-column prop="logon_tel" label="注册电话" width="120" show-overflow-tooltip />
                <el-table-column prop="bank" label="开户银行" min-width="150" show-overflow-tooltip />
                <el-table-column prop="bank_account" label="开户账户" min-width="150" show-overflow-tooltip />
                <el-table-column prop="operate" label="操作" width="100" align="center" show-overflow-tooltip fixed="right">
                    <template #default="{ row }">
                        <el-button type="primary" link size="small" @click="onEdit(row)">
                            修改
                        </el-button>
                        <el-button type="primary" link size="small" @click="onDel(row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <UserInvoiceModel ref="modelRef" @update="getInvoice" />
        </el-skeleton>
    </LayoutUser>
</template>

<script setup lang="ts">
import { UserInvoiceModel } from '#components'
import { UserInvoiceApi } from '~/api/user/invoice'

const modelRef = ref<InstanceType<typeof UserInvoiceModel>>()
const defData = reactive({
    tableData: [] as UserInvoiceApi_getListResponse[],
    skeleton: true,

})

// 新增
const onAdd = async () => {
    modelRef.value?.onOpenDialog()
}
// 修改发票
const onEdit = (row: UserInvoiceApi_getListResponse) => { // 选择的发票row对象
    modelRef.value?.onOpenDialog(row)
}

// 删除发票
const onDel = (row: UserInvoiceApi_getListResponse) => { // 选择发票的row对象
    if (!row.bill_header_id) return false
    ElMessageBox.confirm('此操作将永久删除该条内容，是否继续?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        buttonSize: 'default',
    }).then(async () => {
        const { data: del } = await UserInvoiceApi.del({
            bill_header_id: row.bill_header_id,
        })
        if (del.value?.code !== 200) {
            ElMessage.error(del.value?.msg)
            return false
        }
        ElMessage.success('删除成功')
        getInvoice()
    }).catch(() => { })
}

// 是否默认
// const onDefault = async (row: UserInvoiceApi_getListResponse) => {
//     const { data: def } = await UserInvoiceApi.default({
//         bill_header_id: row.bill_header_id,
//     })
//     if (def.value?.code !== 200) {
//         ElMessage.error(def.value?.msg)
//         return false
//     }
//     ElMessage.success('更改成功')
//     getInvoice()
// }

// 更新列表
const getInvoice = () => {
    initTableData()
}

const initTableData = async () => {
    const res = await UserInvoiceApi.getList()
    defData.skeleton = false// 让每个页面都要加载数据，防止溢出错误。 这会释放页面

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
