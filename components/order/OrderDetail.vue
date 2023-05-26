<!-- 订单详情 -->
<template>
    <!-- auto-height -->
    <CoDialog v-model:visible="defData.visible" :loading="defData.btnLoading" auto-height hidden :title="comData.title"
        width="680px" @close="onClose" @cancel="onClose" @confirm="onConfirm">
        订单详情信息
    </CoDialog>
</template>

<script lang="ts" setup>
const emits = defineEmits<{
    (event: 'update', params: UserAddressApi_Edit): void
}>()

const defData = reactive({
    visible: false, // 是否显示窗口，默认为false。
    ready: false, // 内容是否加载完成
    btnLoading: false,
    orderNo: '', // 订单编号。
})

const comData = computed(() => {
    const dat = {
        title: `订单详情${defData.orderNo}`,
    }

    return dat
})

// 获取初始信息
const initDefaultData = async () => {
    if (defData.ready) return false

    defData.ready = true
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

<style lang="scss" scoped></style>
