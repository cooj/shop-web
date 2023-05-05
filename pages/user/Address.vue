<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>
        账户管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>地址管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="my15px">
      <el-button type="primary" @click="onAdd">
        新增地址
      </el-button>
    </div>
    <el-table :data="address?.data" border>
      <el-table-column prop="contacts" label="收件人" width="150" show-overflow-tooltip />
      <el-table-column prop="phone" label="联系电话" width="120" show-overflow-tooltip />
      <el-table-column prop="province" label="收件地址" min-width="150" show-overflow-tooltip>
        <template #default="{ row }">
          {{ setAddressText(row) }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱地址" width="150" show-overflow-tooltip />
      <el-table-column prop="is_default" label="默认地址" width="90" align="center" show-overflow-tooltip>
        <template #default="{ row }">
          <el-tag v-if="row.is_default" type="success">
            是
          </el-tag>
          <el-tag v-else type="info">
            否
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
    <UserAddressModel ref="modelRef" @update="getAddress" />
  </div>
</template>

<script setup lang="ts">
import UserAddressModel from '~/components/user/UserAddressModel.vue'

import { UserAddressApi } from '~/api/user/address'

const modelRef = ref<InstanceType<typeof UserAddressModel>>()

const { data: address, refresh } = await UserAddressApi.getList() // 获取所有地址列表
// const addressList = ref(address.value?.data)

// 地址信息拼接
const setAddressText = (row: UserAddressApi_GetListResponse) => {
  const arr: string[] = [] // 保存地址列表的字符串数组 或 字符串 或 数组
  if (row.province) arr.push(row.province) // 省份 名称 或 省份id 或 省份名称id 或
  if (row.city) arr.push(row.city)
  if (row.area) arr.push(row.area) //
  if (row.address) arr.push(row.address) //

  return arr.join('  ')
}

// 新增地址
const onAdd = async () => {
  modelRef.value?.onOpenDialog()
}

// 修改地址
const onEdit = (row: UserAddressApi_GetListResponse) => { // 选择的地址row对象
  modelRef.value?.onOpenDialog(row)
}

// 删除地址
const onDel = (row: UserAddressApi_GetListResponse) => { // 选择的地址row对象
  if (!row.address_id) return false
  ElMessageBox.confirm('此操作将永久删除该条内容，是否继续?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    buttonSize: 'default',
  }).then(async () => {
    const { data: del } = await UserAddressApi.del({
      address_id: row.address_id,
    })
    if (del.value?.code !== 200) {
      ElMessage.error(del.value?.msg)
      return false
    }
    ElMessage.success('删除成功')
    refresh()
  }).catch(() => { })
}

// 新增、修改更新列表
const getAddress = () => {
  refresh()
}

definePageMeta({
  layout: 'user',
  middleware: 'auth',
})
</script>

<style scoped></style>
