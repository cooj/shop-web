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
                    <div v-if="defData.orderInfo?.pay_type === 3" class="mb20px min-h300px bg-#fff p20px">
                        <div class="flex">
                            <div class="flex-1">
                                <div class="pay-ready text-center">
                                    <el-alert type="success" show-icon :closable="false" center>
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

                                    <!-- (请在 14 天 23 小时 37 分 59 秒 内完成付款，否则订单将自动取消! ) -->
                                    <div class="pay-countdown mb20px" v-html="defData.countStr" />
                                    <div>
                                        <NuxtLink to="/login/register">
                                            <el-button class="min-w70px" type="primary" size="large">
                                                继续购物
                                            </el-button>
                                        </NuxtLink>
                                        <NuxtLink to="/login" class="ml10px">
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
                        </div>
                    </div>
                    <div v-else class="mb20px min-h300px bg-#fff p15px">
                        <el-result v-if="payStatus === 1" icon="info" title="订单提交成功" sub-title="立即支付完成订单">
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
    countStr: '', // 倒计时html字符串
    countReady: false, // 是否已经支付完成了
    orderInfo: {
        order_id: 60,
        main_order_no: 'S20230610093801317546',
        status: 0,
        user_id: 57,
        total_price: '110.00',
        total_number: 1,
        pay_type: 3,
        pay_sn: '',
        pay_status: 0,
        pay_time: '',
        coupon_price: '0.00',
        coupon_draw_id: 0,
        cerate_time: '2023-06-10 09:38:01',
        deduct_peas: 0,
        give_peas: 0,
        use_peas: 1,
        freight_price: '0.00',
        user_discount: '0.00',
        pay_price: '109.00',
        meet_price: '109.00',
        goods_meet_price: '109.00',
        consignee_name: '张三',
        consignee_phone: '13888888888',
        province: '广东省',
        city: '深圳市',
        area: '光明区',
        address: '楼村75号',
        salesman_id: 0,
        remarks: '线下支付',
        bill_status: 0,
        logistics_id: 0,
        out_time: '',
        out_status: 0,
        logistics_no: '',
        env_type: '',
        is_delete: 0,
        is_refund: 0,
        admin_remarks: '',
        confirm_time: '',
        reason: '',
        is_res: 0,
        is_replace: 0,
        goods_list: [
            {
                main_order_no: 'S20230610093801317546',
                order_no: 'C20230610093801305415',
                goods_id: 21038,
                price: '110.00',
                goods_number: 1,
                goods_name: '北京声华 超声波探伤仪 SUB100',
                goods_img: 'https://goyojo.oss-cn-shenzhen.aliyuncs.com/20221229/202212291934179647.png?x-oss-process=image/quality,Q_50',
                goods_sn: 'AA21038',
            },
        ],
        order_status: 1,
        status_info: [
            {
                text: '提交订单',
                time: '2023-06-10 09:38:01',
                selected: 1,
            },
            {
                text: '付款成功',
                time: '',
                selected: 0,
            },
            {
                text: '已发货',
                time: '',
                selected: 0,
            },
            {
                text: '确认收货',
                time: '',
                selected: 0,
            },
        ],
    } as unknown as OrderApi_GetInfoResponse | undefined, // 订单信息
    payInfo: {
        main_order_no: 'S20230610093801317546',
        amount: '109.00',
        end_time: 1687657081,
        bank_info: {
            name: '深圳工游记集团有限公司12465646123',
            company_name: '深圳工游记集团有限公司12465646123',
            bank_account: '4564641454785385761234',
            bank_name: '深圳农商银行',
            bank_cnaps: '4564641454785385761234',
            notes: '55555',
            duty: '4564641454785385761234',
            phone: '15766875587',
            address: '广东省深圳市光明去一片光明',
        },
        day_num: '15',
    } as unknown as OrderApi_PayOrderResponse | undefined, // 支付信息(线下支付)
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

    defData.skeleton = false

    // const { data: res0 } = await OrderApi.payOrder({ main_order_no: order_no.value, pay_type: 3 })

    // console.log('res0: ', res0);
    // return

    // const { data: ax, error } = await useFetch<OrderDetailInfoData>('/api/order/info', {
    //     method: 'post',
    //     body: { main_order_no: order_no.value },
    // })
    // console.log(ax, error.value)
    // defData.skeleton = false
    // if (error.value) return
    // if (ax.value?.code !== 200) {
    //     ElMessage.error(ax.value?.msg)
    //     return defData.ready = false
    // }

    // defData.status = ax.value!.info.order_status
    // defData.money = formatNumber(Number(ax.value?.info.meet_price) || 0)
    // defData.orderInfo = ax.value!.info

    // // 线下支付
    // if (ax.value?.pay) {
    //     defData.payInfo = ax.value.pay

    // }

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

// 天 时 分 秒 格式化函数
const setCountDown = () => {
    if (!defData.payInfo?.end_time) return
    const endTime = defData.payInfo.end_time * 1000

    const tim = setInterval(() => {
        const nowTime = Date.now()
        const remainTime = endTime - nowTime // 剩余时间
        if (remainTime > 0) {
            const d = remainTime / (24 * 60 * 60)
            const dd = d < 10 ? `0${d}` : d
            const h = remainTime / (60 * 60) % 24
            const hh = h < 10 ? `0${h}` : h
            const m = remainTime / 60 % 60
            const mm = m < 10 ? `0${m}` : m
            const s = remainTime % 60
            const ss = s < 10 ? `0${s}` : s
            defData.countStr = `${dd}天${hh}时${mm}分${ss}秒`
        } else {
            clearInterval(tim) // 结束计时器，
            // TODO 设置订单已取消
        }
    }, 1000)
}

// 定时器没过1秒参数减1
// Time() {
// setInterval(() => {
// this.seconds -= 1
// this.countDown()
// }, 1000)
// },

initDefaultData()
setCountDown()

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
    color: var(--el-text-color-regular)
}
</style>
