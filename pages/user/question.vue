<template>
    <LayoutUser>
        <el-breadcrumb>
            <el-breadcrumb-item>
                我关注的
            </el-breadcrumb-item>
            <el-breadcrumb-item>问答列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-table :data="defData.tableData" border class="mt18px">
            <el-table-column prop="type" label="类型" width="120" show-overflow-tooltip align="center">
                <template #default="scopes">
                    {{ scopes.row.type === 1 ? '我的提问' : '我的回答' }}
                </template>
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" min-width="180" show-overflow-tooltip align="center" />
            <el-table-column prop="content" label="内容" min-width="80" show-overflow-tooltip align="center" />
            <el-table-column prop="is_show" label="是否显示" width="100" show-overflow-tooltip align="center">
                <template #default="scopes">
                    {{ scopes.row.is_show === 1 ? '是' : '否' }}
                </template>
            </el-table-column>
            <el-table-column prop="add_time" label="时间" width="180" show-overflow-tooltip align="center">
                <template #default="scopes">
                    {{ formatTime(scopes.row.add_time) }}
                </template>
            </el-table-column>
        </el-table>
        <div class="goods-pagination">
            <el-pagination v-model:current-page="defData.page" v-model:page-size="defData.pageSize" small background
                layout=" prev, pager, next,total, jumper" :total="defData.total" />
        </div>
    </LayoutUser>
</template>

<script setup lang="ts">
import { InterListApi } from '~/api/user/interList'

const defData = reactive({
    page: 1,
    total: 10,
    activeName: 'first',
    pageSize: 18,
    tableData: [] as InterListApi_getUserListResponse['lists'],
    user_id: 1,
})

const initTableData = async () => {
    const data: InterListApi_getUserList = {
        is_paging: 1,
        page: defData.page,
        page_size: defData.pageSize,
    }
    const { data: res } = await InterListApi.getUserList(data)
    if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
    defData.tableData = res.value.data.lists
    defData.total = res.value.data.total
}
initTableData()

definePageMeta({
    layout: 'home',
    middleware: 'auth',
})
</script>

<style scoped>
.demo-tabs>.el-tabs__content {
    padding-top: 0px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.goods-pagination {
    padding: 20px 0;
    --el-pagination-button-bg-color: var(--el-color-white);
    /* :deep(.el-pagination) {
    --el-pagination-button-bg-color: var(--el-color-white);
    justify-content: center;
    --el-disabled-bg-color: var(--el-border-color);
  } */
}
</style>
