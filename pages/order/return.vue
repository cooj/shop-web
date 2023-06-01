<!-- 退货订单 -->
<template>
    <LayoutUser>
        <el-skeleton :loading="defData.skeleton" animated>
            <template #template>
                <div class="min-h500px">
                    <el-skeleton class="mb20px" />
                    <el-skeleton :rows="5" />
                </div>
            </template>
            <CoTable v-model:page="tableData.pagination" v-model:table-header="tableData.tableHeader" class="table-box"
                :data="tableData.data" auto-height scrollbar-always-on border @update:page="onHandleCurrentChange">
                <template #main_order_no="{ scopes }">
                    <div class="mb5px">
                        订单编号：{{ scopes.row.main_order_no }}
                        <!-- 下单时间：{{ scopes.row.cerate_time }} -->
                    </div>
                    <ul class="goods-list">
                        <li v-for="item in scopes.row.goods_list" :key="item.goods_id">
                            <CoImage class="h55px w55px" :src="item.goods_img" style="--co-image-error-size:24px;" />
                            <div class="text">
                                <h3 class="tle">
                                    <NuxtLink :to="`/goods/${item.goods_sn}`">
                                        {{ item.goods_name }}
                                    </NuxtLink>
                                </h3>
                                <div class="pce text-12px c-#888">
                                    价格：<span class="mr5px">￥{{ item.meet_price }}</span>
                                    数量：<span>{{ item.goods_number }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </template>
                <template #type="{ scopes }">
                    <div>
                        申请时间：{{ scopes.row.add_time }}
                    </div>
                    <div class="type">
                        <span class="mr-5px">{{ scopes.row.is_all ? '全部' : '部分' }}</span>
                        <el-tag v-if="scopes.row.type === 1" type="info" size="small">
                            退货
                        </el-tag>
                        <el-tag v-else type="warning" size="small">
                            换货
                        </el-tag>
                    </div>
                    <div class="flex">
                        <div class="lte">
                            描述：
                        </div>
                        <div class="flex-1">
                            {{ scopes.row.describe }}
                        </div>
                    </div>
                </template>
                <template #refund_status="{ scopes }">
                    <div>
                        <el-tag v-if="scopes.row.refund_status === 1" type="success" size="small">
                            已完成
                        </el-tag>
                        <el-tag v-else-if="scopes.row.refund_status === 2" type="info" size="small">
                            已取消
                        </el-tag>
                        <el-tag v-else type="" size="small">
                            申请中
                        </el-tag>
                    </div>
                    <el-popover v-if="scopes.row.reply" placement="top" trigger="hover" :content="scopes.row.reply">
                        <template #reference>
                            <el-text class="cursor-pointer" size="small">
                                回复消息
                            </el-text>
                        </template>
                    </el-popover>
                </template>
                <template #operate="{ scopes }">
                    <div class="mb5px">
                        <el-button type="primary" size="small" link @click="onReturnDetail(scopes.row)">
                            退换详情
                        </el-button>
                    </div>
                    <el-button size="small" link @click="onOrderDetail(scopes.row)">
                        订单详情
                    </el-button>
                </template>
            </CoTable>
        </el-skeleton>
    </LayoutUser>
</template>

<script setup lang="ts">
import { OrderReturnApi } from '~/api/goods/order'

definePageMeta({
    layout: 'home',
    middleware: 'auth',
})

const defData = reactive({
    skeleton: true, // 显示骨架屏
})

type TableDataItem = OrderReturnApi_ReturnList['lists'][0]
const tableData = reactive<BaseTableDataType<TableDataItem>>({
    data: [],
    tableHeader: [
        // { property: '', label: '', type: "selection", width: 38, },
        // { property: 'goods_img', label: '图片', width: 60, align: "center", slot: true },
        { property: 'main_order_no', label: '订单信息', minWidth: 200, slot: true, className: 'goods-list-row', showOverflowTooltip: false },
        // { property: 'add_time', label: '申请时间', width: 150 },
        { property: 'type', label: '退换信息', minWidth: 150, slot: true, showOverflowTooltip: false },
        // { property: 'reply', label: '回复信息', minWidth: 150, slot: true, showOverflowTooltip: false },
        { property: 'refund_status', label: '状态', width: 100, slot: true, align: 'center' },
        { property: 'operate', label: '操作', width: 100, slot: true, align: 'center', showOverflowTooltip: false },
        // { property: 'market_price', label: '市场价', width: 85, align: 'center' },
    ],
    pagination: {
        ...PAGINATION,
        // total: 0,
    },
})

const initTableData = async () => {
    // const params: OrderApi_GetOrderList = {
    //     is_paging: 1,
    //     page: tableData.pagination.page,
    //     page_size: tableData.pagination.page_size,
    //     status: Number(searchData.data.status),
    //     main_order_no: searchData.data.order_no,
    //     pay_type: Number(searchData.data.pay_type),
    //     consignee_name: searchData.data.consignee_name,
    //     start_time: '',
    //     end_time: '',
    // }
    const loading = useElLoading()

    const { data: res } = await OrderReturnApi.returnList()
    await wait(1500)
    defData.skeleton = false
    loading?.close()

    if (res.value?.code === 200) {
        // const list: OrderListTableData[] = []
        // res.value.data.lists.forEach((item, index) => {
        //     const obj: OrderListTableData = {
        //         ...item,
        //         index: index + 1, // 序列号
        //     }
        //     const obj2: OrderListTableData = {
        //         ...obj,
        //         index: 0,
        //     }
        //     list.push(...[obj, obj2])
        // })
        tableData.data = res.value.data.lists
        tableData.pagination.total = res.value.data.total// 总条数 记录数大于10条记录不
    }
    console.log('res :>> ', res)
}

/**
 * 查看退换信息
 */
const onReturnDetail = (row: TableDataItem) => {

}

/**
 * 查看订单详情
 */
const onOrderDetail = (row: TableDataItem) => {
    navigateTo({
        path: '/order/detail',
        query: {
            order_no: row.main_order_no,
        },
    })
}

// 分页切换
const onHandleCurrentChange = () => {
    initTableData()
}

initTableData()
</script>

<style  lang="scss" scoped>
.table-box {

    :deep(.el-table__body) {
        td.el-table__cell {
            font-size: 13px;
        }
    }
}

.goods-list {
    display: grid;
    gap: 10px;

    li {
        display: flex;

        &+li {
            border-top: 1px;
        }

        .text {
            flex: 1;
            padding-left: 10px;

            .tle {
                font-weight: bold;
                line-height: 22px;
                max-height: 44px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                /* 需要显示的行数 */
                overflow: hidden;
                word-break: break-all;

                /* 强制英文单词断行 */
                a {
                    color: var(--el-text-color-regular);

                    &:hover {
                        color: var(--el-color-primary);
                    }
                }

            }
        }
    }
}
</style>
