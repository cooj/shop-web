<template>
    <client-only>
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

                <div class="mt20px">
                    <el-radio-group v-model="defData.type" @change="onclick()">
                        <el-radio-button :label="1">
                            我的提问
                        </el-radio-button>
                        <el-radio-button :label="2">
                            我的回答
                        </el-radio-button>
                    </el-radio-group>
                </div>

                <el-table :data="defData.tableData" class="mt10px">
                    <el-table-column prop="type" label="类型" width="90" show-overflow-tooltip align="center">
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
                    <el-table-column prop="add_time" label="时间" width="170" show-overflow-tooltip align="center">
                        <template #default="scopes">
                            {{ formatTime(scopes.row.add_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="operate" width="90" align="center" show-overflow-tooltip>
                        <template #default="scopes">
                            <el-button type="primary" link size="small" @click="delClick(scopes.row)">
                                删除
                            </el-button>
                            <div v-if="defData.type === 1">
                                <el-button v-if="scopes.row.answer_lists.length === 0" type="info" link size="small">
                                    暂无回复
                                </el-button>
                                <el-button v-else type="primary" link size="small" @click="openView(scopes.row)">
                                    查看回复
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="goods-pagination">
                    <el-pagination v-model:current-page="defData.page" v-model:page-size="defData.pageSize" small background
                        layout=" prev, pager, next,total, jumper" :total="defData.total" @size-change="onHandleSizeChange"
                        @current-change="onHandleSizeChange" />
                </div>
            </el-skeleton>
        </LayoutUser>

        <el-dialog v-model="defData.myVisible" width="680px" :draggable="true">
            <el-table :data="defData.myTableData" style="width: 100%" max-height="600" default-expand-all>
                <el-table-column type="expand">
                    <template #default="props">
                        <div v-if="props.row.answer_lists.length === 0" class="ml-60px c-#aaa">
                            <span class="mr5px fw-800">答</span>
                            暂无回答
                        </div>
                        <el-table v-else :data="props.row.answer_lists" :show-header="false"
                            style="--el-table-border-color: none;">
                            <el-table-column width="49px" />
                            <el-table-column prop="content">
                                <template #default="scopes">
                                    <span class="mr5px fw-800 c-green">答</span>
                                    <span>{{ scopes.row.content }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="" width="300" show-overflow-tooltip align="right">
                                <template #default="scopes">
                                    <span style="font-weight: 80;font-size: 12px;"> {{
                                                                                        changeToStar(scopes.row.user_name) }}
                                        {{ formatTime(scopes.row.add_time) }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column label="" prop="content">
                    <template #default="scopes">
                        <span class="mr5px fw-800 c-red">问</span>
                        <span style="font-weight: 800;">{{ scopes.row.content }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" width="300" show-overflow-tooltip align="right">
                    <template #default="scopes">
                        <span style="font-weight: 80;font-size: 13px;"> {{
                                                                            changeToStar(scopes.row.user_name) }}
                            {{ formatTime(scopes.row.add_time) }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </client-only>
</template>

<script setup lang="ts">
import { InterListApi } from '~/api/user/interList'

const defData = reactive({
    page: 1,
    total: 10,
    activeName: 'first',
    pageSize: 11,
    tableData: [] as InterListApi_getUserListResponse['lists'],
    myTableData: [] as InterListApi_getUserListResponse['lists'],
    type: 1,
    skeleton: true,
    myVisible: false,

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

// 打开查看弹窗
const openView = async (row: any) => {
    // console.log('row.question_id :>> ', row.question_id)
    // console.log('row.q_id :>> ', row.q_id)
    const data: InterListApi_getUserList = {
        question_id: row.question_id,
    }
    const { data: res } = await InterListApi.getUserList(data)
    if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)
    defData.myTableData = res.value.data.lists
    defData.myVisible = true
}

// 删除
const delClick = (row: any) => {
    ElMessageBox.confirm('确定要删除该订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const { data } = await InterListApi.delList({ question_id: row.question_id })
        if (data.value?.code !== 200) return ElMessage.error(data.value?.msg)
        initTableData()
        ElMessage.success('删除成功')
    }).catch(() => {
    })
}

// 分页数量点击
const onHandleSizeChange = () => {
    initTableData()
}

// 用户名脱敏处理
const changeToStar = (str: any) => {
    const len1 = 1
    const len2 = 1
    const strLen = str.length
    str = `${str.substr(0, len1)}***${str.substr(strLen - len2)}`
    return str
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
