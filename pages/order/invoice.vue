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
            <!-- <el-button type="primary" class="mb20px" @click="onAdd">
                添加退货
            </el-button> -->
            <el-breadcrumb class="mb15px">
                <el-breadcrumb-item>
                    订单中心
                </el-breadcrumb-item>
                <el-breadcrumb-item>退换货订单</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" class="mb20px" @click="onAdd">
                发票申请
            </el-button>

            <CoTable v-model:page="tableData.pagination" v-model:table-header="tableData.tableHeader" class="table-box"
                :data="tableData.data" auto-height scrollbar-always-on border @update:page="onHandleCurrentChange">
                <template #main_order_no="{ scopes }">
                    <div class="mb5px">
                        订单编号：{{ scopes.row.main_order_no }}
                        <!-- 下单时间：{{ scopes.row.cerate_time }} -->
                    </div>
                    <ul class="goods-list">
                        <li v-for="item in scopes.row.goods_list" :key="item.goods_id">
                            <CoImage class="h50px w50px" :src="item.goods_img" :icon-size="24" />
                            <div class="flex-1 pl10px">
                                <h3 class="tle">
                                    <NuxtLink :to="`/goods/${item.goods_sn}`" target="_blank">
                                        {{ item.goods_name }}
                                    </NuxtLink>
                                </h3>
                                <div class="pce text-12px c-#888">
                                    价格：<span class="mr5px">￥{{ item.meet_price }}</span>
                                    退换数量：<span class="c-#f00">{{ item.goods_number }}</span>
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
                    <div class="text-13px">
                        {{ defData.operateList[scopes.row.status as '1'] }}
                    </div>
                </template>
                <template #operate="{ scopes }">
                    <NuxtLink :to="`/order/returned?order_no=${scopes.row.refund_no}`">
                        <el-button type="primary" size="small" link>
                            查看
                        </el-button>
                    </NuxtLink>
                    <!-- <NuxtLink :to="`/order/detail?order_no=${scopes.row.main_order_no}`">
                        <el-button size="small" link>
                            订单详情
                        </el-button>
                    </NuxtLink> -->
                </template>
            </CoTable>
            <OrderInvoiceModel ref="modelRef" />
        </el-skeleton>
    </LayoutUser>
</template>

<script setup lang="ts">
import { OrderInvoiceModel } from '#components'

definePageMeta({
    layout: 'home',
    middleware: 'auth',
})

const modelRef = ref<InstanceType<typeof OrderInvoiceModel>>()

const defData = reactive({
    skeleton: true, // 显示骨架屏
    operateList: { // 0售后正在审核出来 1审核通过待处理 2审核未通过 3要求售后寄回 4快递已寄回 5售后完成
        0: '售后正在审核处理',
        1: '审核通过,待处理',
        2: '审核未通过',
        3: '售后要求寄回',
        4: '快递已寄回',
        5: '售后已完成',
    },
})

type TableDataItem = OrderReturnApi_ReturnList['lists'][0]
const tableData = reactive<BaseTableDataType<TableDataItem>>({
    data: [],
    tableHeader: [
        { property: 'main_order_no', label: '订单编号', minWidth: 200, className: 'goods-list-row', showOverflowTooltip: false },
        { property: 'title', label: '发票抬头', width: 160, showOverflowTooltip: false },
        { property: 'type', label: '发票类型', width: 130, align: 'center', showOverflowTooltip: false },
        { property: 'time', label: '申请时间', width: 160, showOverflowTooltip: false },
        { property: 'refund_status', label: '状态', width: 130, align: 'center' },
        { property: 'operate', label: '操作', width: 100, align: 'center', slot: true, showOverflowTooltip: false },
    ],
    pagination: {
        ...PAGINATION,
    },
})

const initTableData = async () => {
    tableData.data = [
        {
            main_order_no: 'S20230615145358237918',
            time: '2023-06-29 14:25:33',
            title: '发票抬头',
            type: '增值税发票',
            refund_status: '未审核',
            operate: '查看',
        },
    ]

    defData.skeleton = false

    // const loading = useElLoading()

    // const { data: res, error } = await OrderReturnApi.returnList()
    // await wait(100)
    // loading?.close()
    // if (error.value) return
    // defData.skeleton = false

    // if (res.value?.code === 200) {
    //     tableData.data = res.value.data.lists
    //     tableData.pagination.total = res.value.data.total// 总条数 记录数大于10条记录不
    // }
}

const onAdd = () => {
    modelRef.value?.onOpenDialog()
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
    }

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
</style>
