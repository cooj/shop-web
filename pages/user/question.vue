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
                    我关注的
                </el-breadcrumb-item>
                <el-breadcrumb-item>问答列表</el-breadcrumb-item>
            </el-breadcrumb>

            <div style="margin-top: 20px">
                <el-radio-group v-model="defData.type" @change="onclick()">
                    <el-radio-button :label="1">
                        我的提问
                    </el-radio-button>
                    <el-radio-button :label="2">
                        我的回答
                    </el-radio-button>
                </el-radio-group>
            </div>

            <ElTable ref="tableRef" :data="defData.tableData" class="mt18px">
                <el-table-column prop="type" label="类型" width="120" show-overflow-tooltip align="center">
                    <template #default="scopes">
                        {{ scopes.row.type === 1 ? '我的提问' : '我的回答' }}
                    </template>
                </el-table-column>
                <el-table-column prop="goods_name" label="商品名称" min-width="80" show-overflow-tooltip align="center">
                    <template #default="{ row }">
                        <NuxtLink :to="`/goods/${row.goods_sn}`" target="_blank">
                            {{ row.goods_name }}
                        </NuxtLink>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="内容" min-width="80" show-overflow-tooltip align="center" />
                <!-- <el-table-column prop="is_show" label="是否显示" width="100" show-overflow-tooltip align="center">
                <template #default="scopes">
                    {{ scopes.row.is_show === 1 ? '是' : '否' }}
                </template>
            </el-table-column> -->
                <el-table-column prop="add_time" label="时间" width="180" show-overflow-tooltip align="center">
                    <template #default="scopes">
                        {{ formatTime(scopes.row.add_time) }}
                    </template>
                </el-table-column>
            </ElTable>
            <div class="goods-pagination">
                <el-pagination v-model:current-page="defData.page" v-model:page-size="defData.pageSize" small background
                    layout=" prev, pager, next,total, jumper" :total="defData.total" @size-change="onHandleSizeChange"
                    @current-change="onHandleSizeChange" />
            </div>
        </el-skeleton>
    </LayoutUser>
</template>

<script setup lang="ts">
import { ElTable } from 'element-plus'
import { InterListApi } from '~/api/user/interList'

const tableRef = ref<InstanceType<typeof ElTable>>()

const defData = reactive({
    page: 1,
    total: 10,
    activeName: 'first',
    pageSize: 11,
    tableData: [] as InterListApi_getUserListResponse['lists'],
    type: 1,
    skeleton: true,

})

const initTableData = async () => {
    const data: InterListApi_getUserList = {
        is_paging: 1,
        page: defData.page,
        page_size: defData.pageSize,
        type: defData.type as 1 | 2,
    }
    const { data: res } = await InterListApi.getUserList(data)
    defData.skeleton = false// 让每个页面都要加载数据，防止溢出错误。 这会释放页面
    if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
    defData.tableData = res.value.data.lists
    defData.total = res.value.data.total
}
initTableData()

const onclick = () => {
    initTableData()
}

// 分页数量点击
const onHandleSizeChange = () => {
    initTableData()
}

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
