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
                        <el-breadcrumb-item>
                            订单支付
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="mb20px min-h300px bg-#fff p15px">
                        <div v-if="defData.orderInfo?.pay_type === 3 && !defData.countDown.flag"
                            class="flex flex-wrap p5px">
                            <div class="flex-1">
                                <div class="pay-ready text-center">
                                    <el-alert type="success" :closable="false" center show-icon>
                                        <div class="text-16px -mt5px">
                                            订单已提交成功，请您及时付款，我们将尽快为您安排发货!
                                        </div>
                                    </el-alert>
                                    <div class="my20px flex items-center justify-center">
                                        <span class="mr5px">订单编号: </span>
                                        <el-text type="primary">
                                            {{ order_no }}
                                        </el-text>
                                        <span class="ml20px">订单金额: </span>
                                        <b class="text-20px c-#f00">￥{{ defData.orderInfo?.meet_price }}</b>
                                    </div>
                                    <div class="pay-countdown mb30px">
                                        (请在<span>{{ defData.countDown.day }}</span>天
                                        <span>{{ defData.countDown.hour }}</span>小时
                                        <span>{{ defData.countDown.minute }}</span>分
                                        <span>{{ defData.countDown.second }}</span>秒 内完成付款，否则订单将自动取消! )
                                    </div>
                                    <div>
                                        <NuxtLink to="/goods/list">
                                            <el-button class="min-w70px" type="primary" size="large">
                                                继续购物
                                            </el-button>
                                        </NuxtLink>
                                        <NuxtLink to="/order/list" class="ml10px">
                                            <el-button class="min-w70px" type="primary" size="large" plain>
                                                我的订单
                                            </el-button>
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                            <el-descriptions class="ml20px w40%" title="银行账号信息" :column="1" border>
                                <el-descriptions-item label="公司名称">
                                    <b>{{ defData.payInfo?.bank_info.company_name }}</b>
                                </el-descriptions-item>
                                <el-descriptions-item label="银行账号">
                                    <b>{{ defData.payInfo?.bank_info.bank_account }}</b>
                                </el-descriptions-item>
                                <el-descriptions-item label="开户银行">
                                    <b>{{ defData.payInfo?.bank_info.bank_name }}</b>
                                </el-descriptions-item>
                                <el-descriptions-item label="银联号(CNAPS)">
                                    <b>{{ defData.payInfo?.bank_info.bank_cnaps }}</b>
                                </el-descriptions-item>
                                <el-descriptions-item label="用途/备注/摘要">
                                    <b>{{ defData.payInfo?.bank_info.notes }}</b>
                                </el-descriptions-item>
                                <el-descriptions-item label="税号">
                                    <b>{{ defData.payInfo?.bank_info.duty }}</b>
                                </el-descriptions-item>
                                <el-descriptions-item label="电话">
                                    <b>{{ defData.payInfo?.bank_info.phone }}</b>
                                </el-descriptions-item>
                                <el-descriptions-item label="地址">
                                    <b>{{ defData.payInfo?.bank_info.address }}</b>
                                </el-descriptions-item>
                            </el-descriptions>
                            <div class="mt20px w100%">
                                <h3 class="mb5px">
                                    注意事项：
                                </h3>
                                <el-alert type="info" :closable="false">
                                    <template #title>
                                        银行账号信息
                                        公司名称 深圳工游记集团有限公司12465646123
                                        银行账号 4564641454785385761234
                                        开户银行 深圳农商银行
                                        银联号(CNAPS) 4564641454785385761234
                                        用途/备注/摘要 55555
                                        税号 4564641454785385761234
                                        电话 15766875587
                                        地址 广东省深圳市光明去一片光明
                                    </template>
                                </el-alert>
                            </div>
                        </div>
                        <el-result v-else-if="payStatus === 1" icon="info" title="订单提交成功" sub-title="立即支付完成订单">
                            <template #extra>
                                <div class="mb15px text-13px">
                                    需支付：<span class="mr20px text-24px">￥{{ defData.money }}</span>
                                    您的订单号：<span class="color-primary">{{ order_no }}</span>
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
                                    </el-radio-group>
                                </div>
                                <el-button type="primary" size="large" :loading="defData.submit" @click="onPayment">
                                    立即支付
                                </el-button>
                                <div ref="alipayRef" class="hidden" v-html="defData.aliData" />
                            </template>
                        </el-result>
                        <el-result v-else :icon="payStatus === 7 ? 'error' : 'success'"
                            :title="payStatus === 7 ? '订单已取消' : '订单支付完成'" sub-title="">
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
                        <!-- pay_type -->
                        <el-dialog v-model="defData.visibleChat" width="300px" title="" center @close="onClose">
                            <div class="text-center">
                                <co-image :src="defData.chatPayUrl" class="h130px w130px b-1 b-#eee" />
                                <p class="mt5px">
                                    请使用微信扫一扫完成支付
                                </p>
                            </div>
                        </el-dialog>
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
import QRCode from 'qrcode'
import { OrderApi } from '~/api/goods/order'

const alipayRef = ref<HTMLDivElement>()

const defData = reactive({
    skeleton: true, // 默认打开骨架屏
    ready: true,
    status: -1, // 支付状态 0未支付 1已支付 2已取消 3已退款
    aliData: '', // 支付宝返回的form表单代码
    money: '', // 支付金额
    orderInfo: {} as OrderApi_GetInfoResponse | undefined, // 订单信息
    payInfo: {} as OrderApi_PayOrderResponse | undefined, // 支付信息(线下支付)

    countDown: { // 倒计时
        day: '', // 天
        hour: '', // 时
        minute: '', // 分
        second: '', // 秒
        flag: false,
    },
    submit: false,
    visibleChat: false,
    chatPayUrl: '', // 微信返回的支付地址
    update: false, // 是否重新获取订单详情

})

const form = reactive({
    payType: '' as '' | 1 | 2 | 3,
})

// 订单编号
const order_no = computed(() => {
    return useRouteQuery('out_trade_no').value || useRouteQuery('order_no').value
})

// 支付状态
const payStatus = computed(() => defData.orderInfo?.order_status)

const initDefaultData = async () => {
    if (!order_no.value) {
        defData.ready = false
        defData.skeleton = false
        return
    }

    const { data: res, error } = await useFetch<OrderDetailInfoData>('/api/order/info', {
        method: 'post',
        body: { main_order_no: order_no.value },
    })

    // 线下支付
    if (res.value?.pay) {
        defData.payInfo = res.value.pay
        setCountDown()
    }
    await wait(500)
    defData.skeleton = false
    if (error.value) return
    if (res.value?.code !== 200) {
        ElMessage.error(res.value?.msg)
        return defData.ready = false
    }

    defData.status = res.value!.info.order_status
    defData.money = formatNumber(Number(res.value?.info.meet_price) || 0)
    defData.orderInfo = res.value!.info

    // const { data: res } = await OrderApi.getInfo({ main_order_no: order_no.value })
    // await wait(500)
    // defData.skeleton = false
    // console.log('res :>> ', res)
    // if (res.value?.code === 200) {
    //     defData.status = res.value.data.order_status
    //     defData.money = formatNumber(Number(res.value.data.meet_price) || 0)
    // } else {
    //     ElMessage.error(res.value?.msg)
    //     return defData.ready = false
    // }
}

// 支付
const onPayment = async () => {
    if (!order_no.value) return
    if (!form.payType) return ElMessage.error('请选择支付方式')// 验证选择的支付方式是否选择了支付方式
    defData.submit = true
    const { data: res, error } = await OrderApi.payOrder({ main_order_no: order_no.value, pay_type: form.payType })
    defData.submit = false
    if (error.value) return
    // console.log('res :>> ', res)
    if (res.value?.code !== 200) return ElMessage.error(res.value?.msg)

    if (form.payType === 1) {
        const dat = res.value?.data as OrderApi_PayOrderWeChatResponse
        const url = dat.code_url
        // const url = dat.code_url ? `${dat.code_url}&_tcs=${Date.now()}` : ''
        if (!url) return ElMessage.error('未获取到付款码，请稍后再试')
        defData.chatPayUrl = await QRCode.toDataURL(url)

        defData.visibleChat = true
        return
    }

    if (form.payType === 2) { // 支付宝支付
        defData.aliData = res.value?.data as string
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

/**
 * 设置倒计时
 */
const setCountDown = () => {
    if (!defData.payInfo?.end_time) return
    const timestamp = defData.payInfo.end_time
    const timer = setInterval(() => {
        const nowTime = new Date()
        const endTime = new Date(timestamp * 1000)
        const t = endTime.getTime() - nowTime.getTime()
        if (t > 0) {
            const d = Math.floor(t / 86400000)
            const h = Math.floor((t / 3600000) % 24)
            const m = Math.floor((t / 60000) % 60)
            const s = Math.floor((t / 1000) % 60)
            const hh = h < 10 ? `0${h}` : h
            const mm = m < 10 ? `0${m}` : m
            const ss = s < 10 ? `0${s}` : s

            defData.countDown.day = d.toString()
            defData.countDown.hour = hh.toString()
            defData.countDown.minute = mm.toString()
            defData.countDown.second = ss.toString()

            // const format = `(请在<span>${d}</span>天<span>${hh}</span>小时<span>${mm}</span>分<span>${ss}</span>秒 内完成付款，否则订单将自动取消! )`
            // if (d > 0) {
            //     format = `${d}天${hh}小时${mm}分${ss}秒`
            // }
            // if (d <= 0 && Number(hh) > 0) {
            //     format = `${hh}小时${mm}分${ss}秒`
            // }
            // if (d <= 0 && Number(hh) <= 0) {
            //     format = `${mm}分${ss}秒`
            // }
        } else {
            // 关闭倒计时，
            clearInterval(timer)
            defData.countDown.flag = true
            // defData.orderInfo!.order_status=7
        }
    }, 1000)
}

// 微信扫码支付关闭弹窗，查询订单是否支付完成了
const onClose = async () => {
    if (defData.update) return
    defData.update = true
    const { data: res, error } = await useFetch<OrderDetailInfoData>('/api/order/info', {
        method: 'post',
        body: { main_order_no: order_no.value },
    })

    await wait(500)
    defData.update = false
    if (error.value) return
    if (res.value?.code === 200) {
        defData.status = res.value!.info.order_status
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

.pay-ready {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: var(--el-color-danger-light-9);
    border-radius: var(--el-border-radius-base);
    font-size: 14px;

    :deep(.el-alert) {
        background-color: var(--el-color-primary-light-9);
    }
}

.pay-countdown {
    color: var(--el-text-color-regular);

    >span {
        display: inline-block;
        min-width: 30px;
        text-align: center;
        color: var(--el-color-primary);
    }
}
</style>
