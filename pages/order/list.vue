<!-- 订单列表 -->
<template>
    <LayoutUser>
        <el-skeleton :loading="defData.skeleton" animated>
            <!-- <template #template>
                <div class="mb20px flex items-center">
                    <el-skeleton-item class="mr10px py15px w10%!" />
                    <el-skeleton-item class="mr20px py15px w20%!" />
                    <el-skeleton-item class="mr10px py15px w10%!" />
                    <el-skeleton-item class="mr20px py15px w20%!" />
                    <el-skeleton-item class="mr15px py15px w10%!" />
                    <el-skeleton-item class="py15px w10%!" />
                </div>
                <div class="min-h500px">
                    <el-skeleton class="mb20px" />
                    <el-skeleton :rows="5" />
                </div>
            </template> -->
            <LazyClientOnly>
                <CoTableTool :data="searchData" inline @submit.prevent="onSearch">
                    <template #pay_type="{ row }">
                        <el-select v-model="row.pay_type" clearable filterable placeholder="">
                            <el-option v-for="(item, index) in defData.payList" :key="index" :label="item" :value="index" />
                        </el-select>
                    </template>
                    <template #status="{ row }">
                        <el-select v-model="row.status" filterable clearable placeholder="">
                            <el-option v-for="(item, index) in defData.stateList" :key="index" :label="item"
                                :value="index" />
                        </el-select>
                    </template>
                </CoTableTool>
            </LazyClientOnly>
            <!-- BUG Uncaught (in promise) TypeError: Cannot read properties of null (reading 'type') -->
            <!-- <LazyClientOnly> -->
            <LazyCoTable v-model:page="tableData.pagination" v-model:table-header="tableData.tableHeader" class="table-box"
                :data="tableData.data" :row-class-name="setRowClassName" :span-method="arraySpanMethod" auto-height
                scrollbar-always-on border @update:page="onHandleCurrentChange">
                <template #order_info="{ scopes }">
                    <div v-if="scopes.row.index">
                        订单编号：{{ scopes.row.order_info.main_order_no }}
                        下单时间：{{ scopes.row.order_info.cerate_time }}
                    </div>
                    <ul v-else class="goods-list">
                        <li v-for="item in scopes.row.order_info.goods_info" :key="item.goods_id">
                            <CoImage class="h55px w55px" :src="item.goods_img" style="--co-image-error-size:24px;" />
                            <div class="text">
                                <h3 class="tle">
                                    <NuxtLink :to="`/goods/${item.goods_id}`">
                                        {{ item.goods_name }}
                                    </NuxtLink>
                                </h3>
                                <div class="pce text-12px c-#888">
                                    价格：<span class="mr5px">￥{{ item.price }}</span>
                                    数量：<span>{{ item.goods_number }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </template>
                <template #order_mount="{ scopes }">
                    <div v-if="scopes.row.index" />
                    <div v-else class="goods-amount">
                        <!-- <p>总金额：{{ scopes.row.order_info.total_price }}</p>
          <p>优惠金额：{{ scopes.row.order_info.coupon_price }}</p>
          <p>实付金额(含运费)：¥{{ scopes.row.order_info.meet_price }}</p> -->
                        ￥{{ scopes.row.order_info.meet_price }}
                        <br>
                        <span class="text-12px c-#888">(含运费：0.00)</span>
                    </div>
                </template>
                <template #consignee_info="{ scopes }">
                    <div v-if="scopes.row.index" />
                    <div v-else>
                        <p>
                            <span class="mr5px">{{ scopes.row.order_info.consignee_name }}</span>
                            <span>{{ scopes.row.order_info.consignee_phone }}</span>
                        </p>
                        <p>{{ setAddressText(scopes.row.order_info) }}</p>
                    </div>
                </template>
                <template #status="{ scopes }">
                    <div v-if="scopes.row.index" />
                    <div v-else class="cur-button">
                        <el-button :type="setTagType(scopes.row.status).type" :color="setTagType(scopes.row.status).color"
                            size="small" plain class="pointer-events-none">
                            {{ setTagType(scopes.row.status).text }}
                        </el-button>
                        <div class="mt3px">
                            <el-button link type="primary" size="small" @click="onDetail(scopes.row)">
                                订单详情
                            </el-button>
                        </div>
                    </div>
                </template>

                <template #operate="{ scopes }">
                    <template v-if="!scopes.row.index">
                        <!-- 未支付时，才能取消订单 -->

                        <div v-if="scopes.row.status === 1">
                            <el-button type="warning" size="small" class="mb5px" @click="onPayOrder(scopes.row)">
                                去付款
                            </el-button>
                            <br>
                            <el-button type="info" size="small" @click="onCancel(scopes.row)">
                                取消订单
                            </el-button>
                        </div>
                    </template>
                </template>
            </LazyCoTable>
            <!-- </LazyClientOnly> -->
            <!-- <div v-if="show" /> -->
            <!-- <Teleport to="body"> -->

            <!-- <LazyOrderDetail ref="orderDetailRef" />
            <lazy-client-only /> -->
            <!-- </Teleport> -->
        </el-skeleton>
    </LayoutUser>
</template>

<script setup lang="ts">
import type { TableColumnCtx } from 'element-plus'
import { OrderApi } from '~/api/goods/order'

// import type { OrderDetail } from '#components'

definePageMeta({
    layout: 'home',
    middleware: 'auth',
})

// const orderDetailRef = ref<InstanceType<typeof OrderDetail>>()
const show = ref(false)

const defData = reactive({
    skeleton: true, // 显示骨架屏
    payList: { // 支付类型 1微信 2支付宝 3线下
        1: '微信',
        2: '支付宝',
        3: '线下',
    },
    stateList: { // 待支付 1，待发货 2，已发货 3，配货中 4，部分发货 5，已确认 6，已取消 7
        1: '待支付', 2: '待发货', 3: '待确认', 4: '配货中', 5: '部分发货', 6: '已确认', 7: '已取消',
    },

})

// form表单数据类型
interface FormSearchData {
    order_no: ''
    pay_type: '' | number
    consignee_name: ''
    status: ''
}

const searchData = reactive<BaseFormToolType<FormSearchData>>({
    data: {
        order_no: '',
        pay_type: '',
        consignee_name: '',
        status: '',
    },
    config: [
        { itemProp: { label: '订单编号', prop: 'order_no' }, placeholder: '请输入订单编号', width: '180' },
        { itemProp: { label: '收件人', prop: 'consignee_name' }, placeholder: '请输入收件人名称', width: '160' },
        { itemProp: { label: '支付类型', prop: 'pay_type' }, slot: true, placeholder: '', width: '120' },
        { itemProp: { label: '状态', prop: 'status' }, slot: true, placeholder: '', width: '130' },
    ],
    hideBtn: false,
    // showAll: true,
    searchFunc: () => initTableData(),
})

type TableDataItem = OrderListTableData
const tableData = reactive<BaseTableDataType<TableDataItem>>({
    data: [],
    tableHeader: [
        // { property: '', label: '', type: "selection", width: 38, },
        // { property: 'goods_img', label: '图片', width: 60, align: "center", slot: true },
        { property: 'order_info', label: '订单信息', minWidth: 200, slot: true, className: 'goods-list-row', showOverflowTooltip: false },
        { property: 'order_mount', label: '订单金额', width: 150, align: 'right', slot: true, showOverflowTooltip: false },
        { property: 'consignee_info', label: '收货信息', minWidth: 150, slot: true, showOverflowTooltip: false },
        { property: 'status', label: '订单状态', width: 100, slot: true, align: 'center' },
        { property: 'operate', label: '操作', width: 100, slot: true, align: 'center', showOverflowTooltip: false },
        // { property: 'market_price', label: '市场价', width: 85, align: 'center' },
    ],
    pagination: {
        ...PAGINATION,
        // total: 0,
    },
})

const initTableData = async () => {
    const params: OrderApi_GetOrderList = {
        is_paging: 1,
        page: tableData.pagination.page,
        page_size: tableData.pagination.page_size,
        status: Number(searchData.data.status),
        main_order_no: searchData.data.order_no,
        pay_type: Number(searchData.data.pay_type),
        consignee_name: searchData.data.consignee_name,
        start_time: '',
        end_time: '',
    }
    const loading = useElLoading()
    const { data: res } = await OrderApi.getOrderList(params)
    // await wait(500)
    defData.skeleton = false
    loading?.close()
    if (res.value?.code === 200) {
        const list: OrderListTableData[] = []
        res.value.data.lists.forEach((item, index) => {
            const obj: OrderListTableData = {
                index: index + 1, // 序列号
                order_info: item, // 订单信息（下单时间排序）
                order_mount: Number(item.meet_price), // 订单金额
                consignee_info: item.consignee_name, // 收货人信息
                // 物流/支付信息
                status: item.order_status, // 订单状态
            }
            const obj2: OrderListTableData = {
                ...obj,
                index: 0,
            }
            list.push(...[obj, obj2])
        })
        tableData.data = list
        tableData.pagination.total = res.value.data.total// 总条数 记录数大于10条记录不
    }
    // console.log('res :>> ', res)
}

// table合并行
interface SpanMethodProps {
    row: OrderListTableData
    column: TableColumnCtx<OrderListTableData>
    rowIndex: number
    columnIndex: number
}

const arraySpanMethod = (item: SpanMethodProps) => {
    if (item.row.index) {
        if (item.columnIndex === 0) {
            return [1, 5]
        }
    }
}

const setRowClassName = (item: {
    row: OrderListTableData
    rowIndex: number
}) => {
    return item.row.index ? 'line-text' : ''
}

const setTagType = (row: number) => {
    const dat = {
        type: '',
        color: '',
        text: '',
    }
    // 'primary'| 'success'| 'warning'| 'danger'| 'info'
    // 1: '待支付', 2: '待发货', 3: '待确认', 4: '配货中', 5: '部分发货', 6: '已确认', 7: '已取消',
    const lis = {
        1: {
            type: '',
            color: '#ff6c00',
            text: '待支付',
        },
        2: {
            type: 'primary',
            color: '',
            text: '待发货',
        },
        3: {
            type: 'success',
            color: '',
            text: '待确认',
        },
        4: {
            type: '',
            color: '#626aef',
            text: '配货中',
        },
        5: {
            type: 'warning',
            color: '',
            text: '部分发货',
        },
        6: {
            type: 'warning',
            color: '#ff6c6c',
            text: '已确认',
        },
        7: {
            type: 'info',
            color: '',
            text: '已取消',
        },
    }
    const end = (lis[row as 1] ?? dat) as {
        type: ''
        color: string
        text: string
    }
    // console.log(end)
    return end
}

const setAddressText = (row: OrderApi_GetOrderListItem) => {
    return setArrayTextName([row.province, row.city, row.area, row.address], '  ')
}

// 查看详情
const onDetail = (row: OrderListTableData) => {
    navigateTo({
        path: '/order/detail',
        query: {
            order_no: row.order_info.main_order_no,
        },
    })
}

/**
 * 去付款
 * @param row
 */
const onPayOrder = (row: OrderListTableData) => {
    navigateTo({
        path: '/order/pay',
        query: {
            order_no: row.order_info.main_order_no,
        },
    })
}

/**
 * 取消订单
 * @param row
 */
const onCancel = async (row: OrderListTableData) => {
    ElMessageBox.confirm('确定要取消该订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const { data } = await OrderApi.cancelOrder({ main_order_no: row.order_info.main_order_no })

        if (data.value?.code !== 200) return ElMessage.error(data.value?.msg)

        ElMessage.error('操作成功')
        row.status = 7 // 取消订单状态为已取消中间状态
    }).catch(() => {
        // ElMessage({
        //     type: 'info',
        //     message: 'Delete canceled',
        // })
    })
}

// 搜索
const onSearch = () => {
    initTableData()
}

const onHandleCurrentChange = () => {
    initTableData()
}
initTableData()
// onBeforeMount(() => {
//     initTableData()
//     // console.log('process.client :>> ', process.client)
//     // if (process.client) {
//     //     show.value = true
//     // }
// })
</script>

<style  lang="scss" scoped>
.table-box {
    :deep(.el-table) {
        font-size: 13px;

        // --el-table-row-hover-bg-color: var(--el-color-white);
        .line-text {
            background-color: var(--el-table-row-hover-bg-color);
        }
    }

    :deep(.el-table__body) {

        .goods-list-row:has(.goods-list) {
            padding: 0;

            .cell {
                padding: 0;
            }
        }
    }
}

.goods-list {
    display: grid;
    gap: 10px;
    padding: 8px 12px;

    li {
        display: flex;

        &+li {
            border-top: 1px;
        }

        .text {
            flex: 1;
            padding-left: 10px;

            .tle {
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
                    color: #333;

                    &:hover {
                        color: var(--el-color-primary);
                    }
                }

            }
        }
    }
}
</style>
