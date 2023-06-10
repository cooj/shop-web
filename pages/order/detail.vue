<!-- 订单详情页面 -->
<template>
    <LayoutUser>
        <el-skeleton :loading="defData.skeleton" animated>
            <template #template>
                <div class="pb15px">
                    <el-skeleton-item class="w20%!" />
                </div>
                <div class="mb20px border-1 p20px">
                    <el-skeleton />
                </div>
                <div class="mb20px border-1 p20px">
                    <el-skeleton />
                </div>
                <div class="min-h300px border-1 p20px">
                    <el-skeleton />
                </div>
            </template>
            <el-breadcrumb class="mb20px">
                <el-breadcrumb-item v-for="item in breadcrumbData" :key="item.id" :to="item.href">
                    {{ item.text }}
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="order-top mb20px border-1 p20px">
                <div class="lt">
                    <span class="mr20px">订单号：<b>{{ order_no }}</b></span>
                    <span>订单状态：
                        <lazy-el-text class="font-bold" size="large" :type="orderState.type"
                            :style="`color: ${orderState.color};`">
                            {{ orderState.text }}
                        </lazy-el-text>
                    </span>
                    <p v-if="orderInfo?.order_status === 1" class="mt10px">
                        您的订单已提交成功，请尽快完成付款哦！
                    </p>
                </div>
                <div class="gt">
                    <OrderOperate class="order-ope"
                        :data="{ order_no, status: orderInfo!.order_status, bill_status: orderInfo!.bill_status, is_return: orderInfo!.is_refund }"
                        @update="updateOrder" />
                </div>
            </div>
            <div class="mb20px border-1 p20px">
                <div class="tle mb10px text-15px font-600 c-#222">
                    物流信息
                </div>
                <div class="bane-item">
                    <lazy-el-steps class="step-box" :active="stepSelect" finish-status="success">
                        <el-step v-for="(item, index) in orderInfo?.status_info" :key="index" :title="item.text"
                            :description="item.time" />
                        <!-- <el-step title="付款成功" description="2023-05-26 14:30:43" />
                    <el-step title="已发货" description="2023-05-26 14:30:43" />
                    <el-step title="确认收货" description="2023-05-26 14:30:43" /> -->
                    </lazy-el-steps>
                </div>
            </div>
            <div class="mb20px border-1 p20px">
                <div class="tle mb10px text-15px font-600 c-#222">
                    订单信息
                </div>
                <ul class="collect-item">
                    <!-- 下单时间：2023-05-30 13:18:38
                <li>
                    <div class="lt">
                        下单时间：
                    </div>
                    <div class="gt">
                        {{ orderInfo?.cerate_time }}
                    </div>
                </li> -->

                    <li>
                        <div class="lt">
                            收货信息：
                        </div>
                        <div class="gt">
                            <lazy-el-text>
                                {{ addressText }}
                            </lazy-el-text>
                            <span class="ml8px text-12px c-#999"> 收货信息有误？请立即联系客服修改</span>
                        </div>
                    </li>
                    <li>
                        <div class="lt">
                            备注信息
                        </div>
                        <div class="gt">
                            {{ orderInfo?.remarks }}
                        </div>
                    </li>
                    <li>
                        <div class="lt">
                            配送方式：
                        </div>
                        <div class="gt">
                            默认快递
                        </div>
                    </li>
                    <li>
                        <div class="lt">
                            支付方式：
                        </div>
                        <div class="gt">
                            在线支付
                        </div>
                    </li>
                </ul>
            </div>
            <div class="mb20px border-1 p20px">
                <div class="tle mb10px text-15px font-600 c-#222">
                    商品信息
                </div>
                <!-- <LazyClientOnly> -->
                <el-table :data="orderInfo?.goods_list" border>
                    <el-table-column prop="goods_name" label="商品名称" min-width="180">
                        <template #default="{ row }">
                            <div class="h50px flex">
                                <div class="goods_img">
                                    <CoImage class="h50px w50px" :src="row.goods_img" />
                                </div>
                                <div class="pl10px">
                                    <NuxtLink class="goods_link">
                                        {{ row.goods_name }}
                                    </NuxtLink>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="goods_code" label="商品型号" width="160" />
                <el-table-column prop="goods_spec" label="商品规格" width="160" /> -->
                    <el-table-column prop="price" label="商品价格" width="120" />
                    <el-table-column prop="goods_number" label="购买数量" width="100">
                        <template #default="{ row }">
                            <b>{{ row.goods_number }}</b>
                        </template>
                    </el-table-column>
                    <el-table-column prop="total" label="小计" width="100">
                        <template #default="{ row }">
                            <b>{{ formatNumber(row.price * row.goods_number) }}</b>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="count-money">
                    <p>商品总价 ：<span class="count-money-text"><del>￥{{ orderInfo?.total_price }}</del></span></p>
                    <p>折扣价格 ：<span class="count-money-text">￥{{ orderInfo?.total_price }}</span> </p>
                    <p>优惠金额 ：<span class="count-money-text">-￥{{ orderInfo?.coupon_price }}</span></p>
                    <p>运费 ：<span class="count-money-text">+￥{{ orderInfo?.freight_price }}</span></p>
                    <p>
                        实收金额：<el-text type="primary" class="count-money-text font-bold" style="--el-font-size-base:18px;">
                            ￥{{ orderInfo?.meet_price }}
                        </el-text>
                    </p>
                </div>
                <!-- </LazyClientOnly> -->
            </div>
        </el-skeleton>
    </LayoutUser>
</template>

<script lang="ts" setup>
import { OrderApi } from '~/api/goods/order'

const router = useRouter()

const backRoute = ref(router.options.history.state.back as string)

// 订单编号
const order_no = useRouteQuery('order_no')

const defData = reactive({
    skeleton: true, // 显示骨架屏

})

// 面包屑导航
const breadcrumbData = computed(() => {
    const _list = [
        { text: '个人中心', href: '/order/list', id: 1 },
        { text: '我的订单', href: '/order/list', id: 2 },
        { text: '订单详情', href: '', id: 3 },
    ]

    if (backRoute.value?.includes('/order/return')) {
        _list[1].text = '退换货订单'
        _list[1].href = '/order/return' // 回跳到指定页面的操作页面,不传递参数的情况下，
    }
    return _list
})

// 订单信息
const orderInfo = ref<OrderApi_GetInfoResponse>()

const orderState = computed(() => {
    return setOrderStatusType(orderInfo.value?.order_status || 0)
})
const addressText = computed(() => {
    return setArrayTextName([orderInfo.value?.province, orderInfo.value?.city, orderInfo.value?.area, orderInfo.value?.address], ' ')
})
// 步骤选中
const stepSelect = computed(() => {
    let step = 0
    orderInfo.value?.status_info.forEach((item, index) => {
        if (item.selected) step = index
    })
    return step
})

// 获取初始信息
const initDefaultData = async () => {
    // if (defData.ready) return false

    const { data } = await OrderApi.getInfo({ main_order_no: order_no.value })
    await wait(100)
    defData.skeleton = false // 显示内容
    if (data.value?.code !== 200) return ElMessage.error(data.value?.msg)

    orderInfo.value = data.value.data

    // defData.ready = true
}

/**
 * 更新订单状态
 */
const updateOrder = (status: number) => {
    if (status === 7) initDefaultData()
}

initDefaultData()

definePageMeta({
    layout: 'home',
})
</script>

<style lang="scss" scoped>
.order-top {
    display: flex;
    font-size: 13px;

    .lt {
        flex: 1;
    }
}

.bane-item {
    padding: 10px;
    background: var(--el-fill-color-light);
    border-radius: 4px;
}

.collect-item {
    li {
        display: flex;
        font-size: 14px;
        border-bottom: 1px dashed var(--el-border-color);
        padding: 8px 0;

        .lt {
            color: #666666;
            width: 70px;
        }

        .gt {
            width: calc(100% - 70px);
        }
    }
}

.count-money {
    text-align: right;
    font-size: 13px;
    margin-top: 5px;

    &-text {
        display: inline-block;
        min-width: 80px;
        color: var(--el-color-primary);
    }
}

.order-ope {
    display: flex;

    :deep(.item-ope) {
        &+.item-ope {
            margin-left: 10px;
        }
    }
}
</style>
