<template>
    <div class="order-operate">
        <div v-if="orderStatus === 1" class="item-ope">
            <el-button type="warning" :size="props.size" class="mb3px" @click="onPayOrder()">
                去付款
            </el-button>
        </div>
        <div v-if="orderStatus === 1 || orderStatus === 2" class="item-ope">
            <el-button type="info" :size="props.size" @click="onCancel()">
                取消订单
            </el-button>
        </div>
        <div v-if="orderStatus === 3" class="item-ope">
            <el-button type="success" :size="props.size" @click="onConfirm()">
                确认收货
            </el-button>
        </div>
        <div v-if="orderStatus === 7" class="item-ope">
            <!-- <el-button type="primary" :size="props.size" @click="onOrderBuy()">
                再次购买
            </el-button> -->
            <el-button type="info" :size="props.size" @click="onDel()">
                删除订单
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { OrderApi } from '~/api/goods/order'

// const props = defineProps<{
//     data: OrderOperatePropsData
//     size: 'small' | 'default' | 'large'
// }>()
const props = withDefaults(defineProps<{
    data: OrderOperatePropsData
    size?: '' | 'small' | 'default' | 'large'
}>(), {
    size: '',
})

// const emits = defineEmits<{
//     (event: 'update', status: number): void
// }>()

const emits = defineEmits<{
    update: [status: number]
}>()

// 订单状态
const orderStatus = computed(() => props.data.status)

/**
 * 去付款
 * @param row
 */
const onPayOrder = () => {
    navigateTo({
        path: '/order/pay',
        query: {
            order_no: props.data.order_no,
        },
    })
}

/**
 * 取消订单
 * @param row
 */
const onCancel = async () => {
    ElMessageBox.confirm('确定要取消该订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const { data } = await OrderApi.cancelOrder({ main_order_no: props.data.order_no })

        if (data.value?.code !== 200) return ElMessage.error(data.value?.msg)

        ElMessage.error('操作成功')
        emits('update', 7) // 取消订单状态为已取消中间状态
    }).catch(() => {
        // ElMessage({
        //     type: 'info',
        //     message: 'Delete canceled',
        // })
    })
}

/**
 *  确认订单
 */
const onConfirm = async () => {
    const { data } = await OrderApi.confirmOrder({ main_order_no: props.data.order_no })
    if (data.value?.code !== 200) return ElMessage.error(data.value?.msg)

    ElMessage.error('操作成功')
}

/**
 * 再次购买
 */
const onOrderBuy = () => {

}

/**
 * 删除订单
 */
const onDel = () => {
    ElMessageBox.confirm('确定要删除该订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const { data } = await OrderApi.delOrder({ main_order_no: props.data.order_no })

        if (data.value?.code !== 200) return ElMessage.error(data.value?.msg)

        ElMessage.error('操作成功')
        emits('update', 7) // 取消订单状态为已取消中间状态
    }).catch(() => {
        // ElMessage({
        //     type: 'info',
        //     message: 'Delete canceled',
        // })
    })
}
</script>

<style lang="scss" scoped></style>
