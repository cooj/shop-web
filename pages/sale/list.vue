<template>
    <LayoutSaleAfter>
        <el-breadcrumb>
            <el-breadcrumb-item>
                售后申请
            </el-breadcrumb-item>
            <el-breadcrumb-item>售后信息</el-breadcrumb-item>
        </el-breadcrumb>
        <div v-if="defData.tableData.length === 0">
            <el-empty description="没有售后信息" class="h500px" />
        </div>
        <el-table v-else :data="defData.tableData" border class="mt18px min-h500px">
            <el-table-column prop="type" label="类型" width="120" show-overflow-tooltip align="center">
                <template #default="scopes">
                    {{ scopes.row.type === 1 ? '安装申请' : '维修申请' }}
                </template>
            </el-table-column>
            <el-table-column prop="ask_date" label="上门预约时间" width="180" show-overflow-tooltip align="center">
                <template #default="scopes">
                    {{ formatTime(scopes.row.ask_date) }}
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="联系电话" width="120" show-overflow-tooltip align="center" />
            <el-table-column prop="goods_code" label="商品型号" width="100" show-overflow-tooltip align="center" />
            <el-table-column prop="goods_type_txt" label="商品类型" width="150" show-overflow-tooltip align="center" />
            <el-table-column prop="describe" label="需求描述" min-width="80" show-overflow-tooltip align="center" />
        </el-table>

        <!-- <div class="goods-pagination">
            <el-pagination v-model:current-page="defData.page" v-model:page-size="defData.pageSize" small background
                layout=" prev, pager, next,total, jumper" :total="defData.total" @size-change="onHandleSizeChange"
                @current-change="onHandleSizeChange" />
        </div> -->
    </LayoutSaleAfter>
</template>

<script setup lang="ts">
import { SaleAfterApi } from '~/api/user/saleAfter'

const defData = reactive({
    activeName: 'first',
    tableData: [] as SaleAfterApi_GetListResponse['lists'],
})

const initTableData = async () => {
    const { data: res } = await SaleAfterApi.getList()
    if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
    defData.tableData = res.value.data.lists
    // defData.total = res.value.data.total
}
initTableData()

// 分页数量点击
// const onHandleSizeChange = () => {
//     initTableData()
// }

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
