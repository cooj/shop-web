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
                <el-breadcrumb-item>浏览历史</el-breadcrumb-item>
            </el-breadcrumb>

            <ElTable ref="tableRef" :data="defData.tableData" class="mt25px">
                <el-table-column prop="goods_name" label="商品名称" min-width="180">
                    <template #default="{ row }">
                        <div class="h50px flex">
                            <div class="goods_img">
                                <el-image class="h50px w50px" :src="row.goods_img" />
                            </div>
                            <div class="pl10px">
                                <NuxtLink :to="`/goods/${row.goods_sn}`" target="_blank">
                                    {{ row.goods_name }}
                                </NuxtLink>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="goods_code" label="商品型号" width="160" />
        <el-table-column prop="goods_spec" label="商品规格" width="160" /> -->
                <el-table-column prop="shop_price" label="价格" width="120" align="center">
                    <template #default="{ row }">
                        <div class="shop_price">
                            {{ row.shop_price }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="recent_time" label="浏览时间" width="170px" align="center">
                    <template #default="{ row }">
                        {{ formatTime(row.recent_time) }}
                    </template>
                </el-table-column>

                <el-table-column prop="operate" label="操作" width="100" align="center">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="onRemove(row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </ElTable>
        </el-skeleton>
    </LayoutUser>
</template>

<script setup lang="ts">
import { ElTable } from 'element-plus'
import { RecordApi } from '~/api/user/record'

const tableRef = ref<InstanceType<typeof ElTable>>()
const userState = useUserState()

const defData = reactive({
    tableData: [] as RecordApi_GetListResponse[],
    skeleton: true,

})

const initTableData = async () => {
    const data: RecordApi_GetList = {
        type: 2,
    }
    const res = await RecordApi.getList(data)
    defData.skeleton = false// 让每个页面都要加载数据，防止溢出错误。 这会释放页面
    if (res.data.value?.code !== 200) return ElMessage.error(res.data.value?.msg)
    defData.tableData = res.data.value?.data
}
initTableData()

// 删除
const onRemove = async (row: any) => {
    ElMessageBox.confirm('确定要删除该订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const user = await userState.getUserInfo()
        if (user.value) {
            const data: RecordApi_Del = {
                type: 2,
                goods_ids: row.goods_id,
            }

            const res = await RecordApi.del(data)
            if (res.data.value?.code !== 200) {
                ElMessage.error(res.data.value?.msg)
                return false
            }
            ElMessage.success('删除成功')
            initTableData() // 重新加载列表
        }
    })
}

definePageMeta({
    layout: 'home',
    middleware: 'auth',
})
</script>

<style scoped></style>
