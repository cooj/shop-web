<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>
        账户管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>发票管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="my15px">
      <el-button type="primary" @click="onAdd">
        新增发票
      </el-button>
    </div>
    <el-table :data="address?.data" border>
      <el-table-column prop="contacts" label="发票抬头" width="150" show-overflow-tooltip />
      <el-table-column prop="phone" label="纳税人识别号" min-width="120" show-overflow-tooltip />
      <el-table-column prop="is_default" label="发票类型" width="90" align="center" show-overflow-tooltip>
        <template #default="{ row }">
          <el-tag v-if="row.is_default" type="success">
            增值税务发票
          </el-tag>
          <el-tag v-else type="danger">
            普通发票
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作" width="100" align="center" show-overflow-tooltip>
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
    <UserInvoiceModel ref="modelRef" @update="onUpdateData" />
  </div>
</template>

<script setup lang="ts">
import UserInvoiceModel from '~/components/user/UserInvoiceModel.vue'

const modelRef = ref<InstanceType<typeof UserInvoiceModel>>()

// 新增
const onAdd = async () => {
   modelRef.value?.onOpenDialog()
}

// 修改
const onEdit = (row: any) => {

}
// 删除
const onDel = (row: UserAddressApi_GetListResponse) => { // 选择的地址row对象
  if (!row.address_id) return false
  ElMessageBox.confirm('此操作将永久删除该条内容，是否继续?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    buttonSize: 'default',
  }).then(async () => {

  }).catch(() => { })
}

// 更新列表
const onUpdateData = () => {

}
definePageMeta({
  layout: 'user',
  middleware: 'auth',
})
</script>

<style scoped></style>
