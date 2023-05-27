<!-- 订单详情 -->
<template>
    <div class="order-detail">
        <!-- auto-height -->
        <CoDialog v-model:visible="defData.visible" :loading="defData.btnLoading" auto-height :title="comData.title"
            width="1000px" @close="onClose" @cancel="onClose" @confirm="onConfirm">
            <div class="detail-item mb20px">
                <div class="tle mb10px text-13px">
                    <span>订单编号：{{ defData.orderNo }}</span>
                    <el-divider direction="vertical" />
                    <span>下单时间：{{ orderInfo?.cerate_time }}</span>
                </div>
                <div>
                    <el-steps class="step-box" :active="2">
                        <el-step title="订单确认" description="2023-05-26 14:30:43" />
                        <el-step title="付款成功" description="2023-05-26 14:30:43" />
                        <el-step title="已发货" description="2023-05-26 14:30:43" />
                        <el-step title="确认收货" description="2023-05-26 14:30:43" />
                    </el-steps>
                </div>
            </div>
            <div class="detail-item mb20px">
                <div class="tle mb15px text-16px font-600 c-#222">
                    订单信息
                    <!-- <el-button type="primary" size="small" text bg>
                        编辑
                    </el-button> -->
                </div>
                <div class="detail-grid">
                    <dl class="detail-grid-dl">
                        <dt>
                            收货人信息
                        </dt>
                        <dd>
                            <label class="l-text">收货人：</label>
                            <div class="l-info">
                                {{ orderInfo?.consignee_name }}
                            </div>
                        </dd>
                        <dd>
                            <label class="l-text">联系电话：</label>
                            <div class="l-info">
                                {{ orderInfo?.consignee_phone }}
                            </div>
                        </dd>
                        <dd>
                            <label class="l-text">地址：</label>
                            <div class="l-info">
                                {{ addressText }}
                            </div>
                        </dd>
                    </dl>
                    <dl class="detail-grid-dl">
                        <dt>
                            配送信息
                        </dt>
                        <dd>
                            <label class="l-text">配送方式：</label>
                            <div class="l-info">
                                默认快递（顺丰速运）
                                <!-- TODO  -->
                                {{ orderInfo?.logistics_id }}
                            </div>
                        </dd>
                        <dd>
                            <label class="l-text">发货时间：</label>
                            <div class="l-info">
                                <!-- TODO  -->
                                {{ orderInfo?.out_status ? '2023-05-26 17:22:05' : '待发货' }}
                            </div>
                        </dd>
                        <dd>
                            <label class="l-text">发货单号：</label>
                            <div class="l-info">
                                <!-- TODO  -->
                                {{ orderInfo?.out_status ? '158741346796541' : '--' }}
                            </div>
                        </dd>
                    </dl>
                    <dl class="detail-grid-dl">
                        <dt>
                            付款信息
                        </dt>
                        <dd>
                            <label class="l-text">支付方式：</label>
                            <div class="l-info">
                                <!-- "pay_type": 3, //类型 1微信 2支付宝 3线下 -->
                                {{ orderInfo?.pay_type }}
                            </div>
                        </dd>
                        <dd>
                            <label class="l-text">付款时间：</label>
                            <div class="l-info">
                                {{ orderInfo?.pay_status !== 0 ? orderInfo?.pay_time : '--' }}
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
            <div class="detail-item mb20px">
                <div class="tle mb15px text-16px font-600 c-#222">
                    商品信息
                    <!-- <el-button type="primary" size="small" text bg>
                        编辑
                    </el-button> -->
                </div>
                <el-table :data="orderInfo?.goods_list">
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
                    <el-table-column prop="goods_code" label="商品型号" width="160" />
                    <el-table-column prop="goods_spec" label="商品规格" width="160" />
                    <el-table-column prop="price" label="价格" width="120" align="center">
                        <!-- <template #default="{ row }">
                            <p>{{ row.meet_price }}</p>
                            <del>{{ row.price }}</del>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="goods_number" label="商品数量" width="150" align="center">
                        <template #default="{ row }">
                            <b>{{ row.goods_number }}</b>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="order_price_deail">
                    <div class="row row1">
                        <span class="item"><em class="range">+</em><strong class="tit">商品总金额：</strong><span class="price">
                            <m class="dollar">¥</m><b class="price_format">7.</b><b class="decimal">40</b>
                        </span></span>
                    </div>
                    <div class="row row2">
                        <em class="range range_d">=</em><strong class="tit">订单总金额：</strong><span class="price">
                            <m class="dollar">¥</m><b class="price_format">7.</b><b class="decimal">40</b>
                        </span>
                    </div>
                    <div class="row row3">
                        <strong class="tit">实收金额：</strong><span class="price">
                            <m class="dollar">¥</m><b class="price_format">7.</b><b class="decimal">40</b>
                        </span>
                    </div>
                </div>
            </div>
            <div class="detail-item mb20px">
                <div class="tle mb15px text-16px font-600 c-#222">
                    其他信息
                    <!-- <el-button type="primary" size="small" text bg>
                        编辑
                    </el-button> -->
                </div>
                <div class="grid grid-cols-2 gap20px">
                    <dl class="detail-grid-dl">
                        <dt>
                            发票信息
                        </dt>
                        <dd>
                            <label class="l-text">发票类型：</label>
                            <div class="l-info">
                                普通发票
                            </div>
                        </dd>
                        <dd>
                            <label class="l-text">发票抬头：</label>
                            <div class="l-info">
                                小强啊
                            </div>
                        </dd>
                        <dd>
                            <label class="l-text">发票内容：</label>
                            <div class="l-info">
                                商品明细
                            </div>
                        </dd>
                    </dl>
                    <dl class="detail-grid-dl">
                        <dt>
                            备注信息
                        </dt>
                        <dd>
                            <label class="l-text">订单备注：</label>
                            <div class="l-info">
                                --
                            </div>
                        </dd>
                        <dd>
                            <label class="l-text">商家备注：</label>
                            <div class="l-info">
                                哇哈哈哈哈
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        </CoDialog>
    </div>
</template>

<script lang="ts" setup>
import { OrderApi } from '~/api/goods/order'

const emits = defineEmits<{
    (event: 'update', params: UserAddressApi_Edit): void
}>()

const defData = reactive({
    visible: false, // 是否显示窗口，默认为false。
    ready: false, // 内容是否加载完成
    btnLoading: false,
    orderNo: '', // 订单编号。

})

const orderInfo = ref<OrderApi_GetInfoResponse>()

const comData = computed(() => {
    const dat = {
        title: `订单详情 ${defData.orderNo}`,
    }

    return dat
})

// 完整地址
const addressText = computed(() => {
    const text = setArrayTextName([orderInfo.value?.province, orderInfo.value?.city, orderInfo.value?.area, orderInfo.value?.address])
    return text ?? ''
})

// 获取初始信息
const initDefaultData = async () => {
    // if (defData.ready) return false

    const { data } = await OrderApi.getInfo({ main_order_no: defData.orderNo })
    if (data.value?.code !== 200) return ElMessage.error(data.value?.msg)
    console.log('data.value.data :>> ', data.value.data)
    orderInfo.value = data.value.data

    defData.visible = true
    // defData.ready = true
}

// 打开弹窗
const onOpenDialog = (row: OrderApi_GetOrderListItem) => {
    console.log('row :>> ', row)
    defData.orderNo = row.main_order_no

    initDefaultData()
    defData.visible = true
}
// 关闭弹窗
const onClose = () => {
    defData.visible = false
}

// 确认
const onConfirm = async () => {

}

defineExpose({
    onOpenDialog,
})
</script>

<style lang="scss" scoped>
.order-detail {
    :deep(.el-dialog__body) {
        background-color: #f2f4f7;
        overflow: auto;
        height: 70vh;
    }

    :deep(.el-dialog__footer) {
        display: none;
    }
}

.detail-item {
    padding: 20px;
    background-color: var(--el-color-white);
}

.step-box {
    padding: 15px;
    background: var(--el-fill-color-light);
    border-radius: 4px;
}

.detail-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.detail-grid-dl {
    padding: 10px;
    background: var(--el-fill-color-light);
    border-radius: 4px;

    dt {
        margin-bottom: 10px;
        color: var(--el-text-color-primary);
    }

    dd {
        display: flex;
        align-content: center;
        margin-top: 5px;
        font-size: 12px;

        .l-text {
            color: var(--el-text-color-secondary);
        }
    }
}
</style>
