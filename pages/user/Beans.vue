<template>
  <div>
    <div h40px>
      <el-breadcrumb>
        <el-breadcrumb-item>
          订单中心
        </el-breadcrumb-item>
        <el-breadcrumb-item>我的工游豆</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px; color: var(--el-color-primary);">
      我的工游豆：{{ defData.pears }}
    </div>
    <div>
      <el-table :data="defData.tableData" style="width: 100%" border>
        <el-table-column prop="peas" label="工游豆" width="200px" align="center" />
        <el-table-column prop="remarks" label="工游豆来源、用途" min-width="200px" align="center" />
        <el-table-column prop="type" label="类型" width="180px" align="center">
          <template #default="scopes">
            <el-tag v-if="scopes.row.type === 1">
              收入
            </el-tag>
            <el-tag v-else type="info">
              支出
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_at" label="时间" width="200px" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BeansApi } from '~/api/user/coupon'

const userState = useUserStore()

const defData = reactive({
  tableData: [] as BeansApi_getListResponse['lists'],
  pears: '' as unknown as number,
})

const initTableData = async () => {
  const a = userState.token
  const data: BeansApi_getList = {
    token: a,
    type: 0,
  }
  const { data: res } = await BeansApi.geList(data)
  if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
  defData.tableData = res.value?.data.lists
  defData.pears = res.value?.data.peas
}

initTableData()
definePageMeta({
  layout: 'user',
  middleware: 'auth',
})
</script>

<style scoped></style>
