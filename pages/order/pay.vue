<template>
    <section>
        <div class="container">
            <el-skeleton :loading="defData.skeleton" animated>
                <template #template>
                    <div class="pb10px pt15px">
                        <el-skeleton-item style="width: 30%" />
                    </div>
                    <div class="mb20px min-h500px bg-#fff p15px">
                        <el-skeleton :rows="5" />
                    </div>
                </template>
                <div v-if="defData.ready">
                    <el-breadcrumb class="py15px">
                        <el-breadcrumb-item :to="{ path: '/' }">
                            首页
                        </el-breadcrumb-item>
                        <!-- <el-breadcrumb-item :to="{ path: '/order/cart' }">
                        购物车
                    </el-breadcrumb-item> -->
                        <el-breadcrumb-item>
                            订单支付
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="mb20px min-h300px bg-#fff p15px">
                        <el-result v-if="defData.status === 1" icon="info" title="订单提交成功" sub-title="立即支付完成订单">
                            <template #extra>
                                <div class="mb15px text-13px">
                                    需支付：<span class="mr20px text-24px">￥{{ defData.money }}</span>
                                    <span>
                                        您的订单号：
                                        <el-text type="primary">{{ order_no }}</el-text>
                                    </span>
                                </div>
                                <div class="radio-box mb20px">
                                    <el-radio-group v-model="form.payType">
                                        <div class="radio-item">
                                            <el-radio :label="1" border>
                                                <img src="~/assets/images/payment-wechat.jpg" alt="">
                                                <!-- <i class="i-ic-baseline-wechat mr3px inline-block v-text-top c-#09bb07" />
                                                微信 -->
                                            </el-radio>
                                        </div>
                                        <div class="radio-item">
                                            <el-radio :label="2" border>
                                                <img src="~/assets/images/payment-alipay.jpg" alt="">
                                                <!-- <i class="i-ic-baseline-payment mr3px inline-block v-text-top c-#3887ff" />
                                                支付宝 -->
                                            </el-radio>
                                        </div>
                                        <!-- <div class="radio-item">
                                            <el-radio :label="3" border>
                                                <i class="i-ic-twotone-payments mr3px inline-block v-text-top c-#ff5335" />
                                                线下转账
                                            </el-radio>
                                        </div> -->
                                    </el-radio-group>
                                </div>
                                <el-button type="primary" size="large" @click="onPayment">
                                    立即支付
                                </el-button>
                                <div ref="alipayRef" class="hidden" v-html="defData.aliData" />
                            </template>
                        </el-result>
                        <el-result v-else :icon="defData.status === 7 ? 'error' : 'success'"
                            :title="defData.status === 7 ? '订单已取消' : '订单支付完成'" sub-title="">
                            <template #extra>
                                <NuxtLink to="/">
                                    <el-button type="primary">
                                        返回首页
                                    </el-button>
                                </NuxtLink>
                                <NuxtLink to="/order/list">
                                    <el-button class="ml15px" type="primary" plain>
                                        我的订单
                                    </el-button>
                                </NuxtLink>
                            </template>
                        </el-result>
                    </div>
                </div>
                <div v-else class="my15px b-#eee bg-#fff">
                    <BaseError />
                </div>
            </el-skeleton>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { OrderApi } from '~/api/goods/order'

const alipayRef = ref<HTMLDivElement>()

const defData = reactive({
    skeleton: true, // 默认打开骨架屏
    ready: true,
    status: -1, // 支付状态 0未支付 1已支付 2已取消 3已退款
    aliData: '', // 支付宝返回的form表单代码
    money: '', // 支付金额
})

const form = reactive({
    payType: '' as '' | 1 | 2 | 3,
})

// 订单编号
const order_no = computed(() => {
    return useRouteQuery('out_trade_no').value || useRouteQuery('order_no').value
})

const initDefaultData = async () => {
    if (!order_no.value) {
        defData.ready = false
        defData.skeleton = false
        return
    }
    const { data: res } = await OrderApi.getInfo({ main_order_no: order_no.value })
    await wait(500)
    defData.skeleton = false
    console.log('res :>> ', res)
    if (res.value?.code === 200) {
        defData.status = res.value.data.order_status
        defData.money = formatNumber(Number(res.value.data.meet_price) || 0)
    } else {
        ElMessage.error(res.value?.msg)
        return defData.ready = false
    }
}

// 支付
const onPayment = async () => {
    if (!order_no.value) return
    if (!form.payType) return ElMessage.error('请选择支付方式')// 验证选择的支付方式是否选择了支付方式

    const { data: res } = await OrderApi.payOrder({ main_order_no: order_no.value, pay_type: form.payType })
    // console.log(error)
    // console.log('res :>> ', res)
    if (res.value?.code === 200) {
        if (form.payType === 2) {
            defData.aliData = res.value?.data
            nextTick(() => {
                const form = alipayRef.value?.firstElementChild as HTMLFormElement
                form.setAttribute('target', '_blank')
                form.submit()
            })
            // const aliPaySubmit = document.getElementById('alipaySubmit')
            // if (aliPaySubmit) document.body.removeChild(aliPaySubmit)// 删除动态创建的按钮元素，防止隐藏按钮造成的
            // const div = document.createElement('div')
            // div.id = 'aliPaySubmit'
            // div.innerHTML = res.value?.data
            // document.body.appendChild(div)
            // const form = div.firstElementChild as HTMLFormElement
            // form.setAttribute('target', '_blank')
            // form.submit()
        }
        if (form.payType === 3) defData.status = 1
    }
}

initDefaultData()
definePageMeta({
    layout: 'home',
    middleware: 'auth',
})
</script>

<style lang="scss" scoped>
.radio-box {
    .el-radio {
        height: unset;
    }

    .radio-item {
        // width: 150px;
        text-align: center;
        margin: 0 10px;
    }
}
</style>
