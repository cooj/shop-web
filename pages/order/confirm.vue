<!-- 订单确认 -->
<template>
    <section class="text-14px">
        <div class="container">
            <el-skeleton :loading="defData.skeleton" animated>
                <template #template>
                    <div class="pb10px pt15px">
                        <el-skeleton-item class="w30%!" />
                    </div>
                    <div class="mb20px min-h500px bg-#fff p15px">
                        <el-skeleton :rows="5" />
                    </div>
                </template>
                <template v-if="defData.ready">
                    <el-breadcrumb class="py15px">
                        <el-breadcrumb-item v-for="item in breadcrumbData" :key="item.id" :to="item.href">
                            {{ item.text }}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-form ref="formRef" :model="form" :rules="rules" label-width="100" label-position="left">
                        <section class="sec-box">
                            <div class="tle">
                                <b>收货地址</b>
                                <el-button text bg size="small" @click="onAddressInvoice(1)">
                                    新增地址
                                </el-button>
                            </div>
                            <el-form-item prop="address_id" label-width="auto">
                                <el-radio-group v-if="defData.addressList.length" v-model="form.address_id"
                                    class="address-radio">
                                    <el-radio v-for="item in defData.addressList" :key="item.address_id"
                                        :label="item.address_id">
                                        <span>{{ setAddressText(item) }}</span>
                                        <span class="mx5px opacity90">（{{ item.contacts }} 收）</span>
                                        <span class="mx5px">{{ item.phone }}</span>
                                        <em v-if="item.is_default" class="mx5px fw400 opacity70">默认地址</em>
                                    </el-radio>
                                </el-radio-group>
                                <div v-else class="w100% text-center text-13px c-#666">
                                    暂无收货地址,请点击
                                    <span class="cursor-pointer hover:c-#d7231e" @click="onAddressInvoice(1)">新增地址</span>
                                </div>
                            </el-form-item>
                        </section>
                        <section class="sec-box">
                            <div class="tle">
                                <b>发票信息</b>
                                <el-button text bg size="small" @click="onAddressInvoice(2)">
                                    新增发票
                                </el-button>
                            </div>
                            <el-form-item prop="is_invoice" label="是否开发票">
                                <el-radio-group v-model="form.is_invoice" class="mr15px">
                                    <el-radio :label="1">
                                        是
                                    </el-radio>
                                    <el-radio :label="0">
                                        否
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item v-if="form.is_invoice" prop="is_invoice" label="" label-width="auto">
                                <el-radio-group v-model="form.invoice_id" class="address-radio">
                                    <el-tabs v-model="form.billType" tab-position="left" class="radio-tabs">
                                        <el-tab-pane label="增值税发票" :name="1">
                                            <!-- <el-radio :label="1" border>
                                                普通发票
                                            </el-radio> -->
                                            <el-radio v-for="item in defData.billAddressList" :key="item.address_id"
                                                :label="item.address_id">
                                                <span>{{ setAddressText(item) }}</span>
                                                <span class="mx5px opacity90">（{{ item.contacts }} 收）</span>
                                                <span class="mx5px">{{ item.phone }}</span>
                                                <em v-if="item.is_default" class="mx5px fw400 opacity70">默认地址</em>
                                            </el-radio>
                                        </el-tab-pane>
                                        <el-tab-pane label="普通发票">
                                            <el-radio :label="2" border>
                                                增值税发票
                                            </el-radio>
                                        </el-tab-pane>
                                    </el-tabs>
                                </el-radio-group>
                            </el-form-item>
                        </section>
                        <section class="sec-box">
                            <div class="tle">
                                <b>商品列表</b>
                            </div>
                            <el-table :data="form.tableData">
                                <el-table-column prop="goods_name" label="商品名称" min-width="180">
                                    <template #default="{ row }">
                                        <div class="flex items-center">
                                            <CoImage class="h50px w50px" :src="row.goods_img" :icon-size="20" />
                                            <div class="pl10px">
                                                <NuxtLink class="goods-link" :to="`/goods/${row.goods_sn}`" target="_blank">
                                                    {{ row.goods_name }}
                                                </NuxtLink>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="goods_code" label="商品型号" width="160" />
                                <el-table-column prop="goods_spec" label="商品规格" width="160" />
                                <el-table-column prop="shop_price" label="价格" width="120" align="center" />
                                <el-table-column prop="goods_number" label="商品数量" width="150" align="center">
                                    <template #default="{ row }">
                                        <b>{{ row.goods_number }}</b>
                                        <!-- <el-input-number v-model="row.goods_number" class="w100%!" :precision="0" :min="0" :max="100" /> -->
                                    </template>
                                </el-table-column>
                            </el-table>
                        </section>
                        <section class="sec-box">
                            <div class="tle">
                                <b>支付方式</b>
                            </div>
                            <div>
                                <el-form-item prop="payType" label="" label-width="auto">
                                    <el-radio-group v-model="form.payType">
                                        <el-radio :label="1" border>
                                            在线支付
                                        </el-radio>
                                        <el-radio :label="2" border>
                                            对公转账
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div class="text-12px c-#888 -mt5px">
                                支持微信、支付宝在线支付
                            </div>
                            <!-- <div class="inline-flex items-center">
                                <span class="inline-flex items-center">
                                    支持
                                    <i class="i-ic-baseline-wechat mr3px c-#09bb07" />
                                    微信
                                </span>
                                <span class="ml3px inline-flex items-center">
                                    <i class="i-ic-baseline-payment mr3px c-#3887ff" />
                                    在线支付
                                </span>
                                <span class="ml3px inline-flex items-center">
                                    <i class="i-ic-twotone-payments mr3px c-#ff5335" />
                                    线下转账
                                </span>
                            </div> -->
                        </section>
                        <section class="sec-box">
                            <div class="flex-1">
                                <div class="tle">
                                    <b>优惠方式</b>
                                </div>
                            </div>
                            <el-form-item prop="coupon_id" label="优惠券">
                                <el-radio-group v-if="defData.couponList.length" v-model="form.coupon_id">
                                    <el-radio v-for="item in defData.couponList" :key="item.coupon_draw_id"
                                        :label="item.coupon_draw_id">
                                        {{ item.coupon_name }}-减{{ item.par_value }}
                                    </el-radio>
                                    <el-radio :label="0">
                                        不使用优惠券
                                    </el-radio>
                                </el-radio-group>
                                <span v-else class="text-12px c-#888">暂无可用优惠券</span>
                            </el-form-item>
                            <el-form-item prop="is_peas" label="是否使用工游豆" label-width="auto">
                                <!-- <template #label>
                                    是否使用工游豆
                                </template> -->
                                <!-- <span class="mr10px c-#666">是否使用工游豆</span> -->
                                <el-radio-group v-model="form.is_peas" class="mr15px">
                                    <el-radio :label="1">
                                        是
                                    </el-radio>
                                    <el-radio :label="0">
                                        否
                                    </el-radio>
                                </el-radio-group>
                                <el-input-number v-if="form.is_peas && peasNumber.max" v-model="form.peas_number"
                                    :precision="0" :min="peasNumber.min" :max="peasNumber.max" />
                                <p class="ml10px text-12px c-#999">
                                    本单可用工游豆数量：<span class="mr10px c-#000">{{ defData.total_peas }}</span>
                                    我的工游豆：<span class="c-#000">{{ defData.user_peas }}</span>
                                </p>
                            </el-form-item>
                        </section>
                        <section class="sec-box flex mb0!">
                            <div class="flex-1">
                                <el-form-item prop="remark" label="备注信息">
                                    <el-input v-model="form.remark" maxlength="150" show-word-limit resize="none" :rows="3"
                                        type="textarea" />
                                </el-form-item>
                            </div>
                            <ul class="prefer-ul w300px">
                                <li>
                                    <span class="item-title">商品总件数：</span><span class="item-text">{{ defData.count_number
                                    }}件</span>
                                </li>
                                <li>
                                    <span class="item-title">商品总金额：</span><span class="item-text">￥{{
                                        formatNumber(defData.total_price)
                                    }}</span>
                                </li>
                                <!-- <li>
                <span class="item-title">税额：</span><span class="item-text">￥30.68</span>
              </li> -->
                                <li>
                                    <span class="item-title">运费<i>(明细)</i>：</span>
                                    <span class="item-text">￥{{ formatNumber(defData.freight_price) }}</span>
                                </li>
                                <li>
                                    <span class="item-title">运费减免：</span><span class="item-text">-￥0.00</span>
                                </li>
                                <li>
                                    <span class="item-title">优惠券：</span><span class="item-text">-￥0.00</span>
                                </li>
                            </ul>
                        </section>
                        <section class="sec-box flex items-center justify-end b-t b-t-#eee">
                            <b class="mr30px">实付款：<span class="main-color text-24px">¥{{ payMoney }}</span></b>
                            <el-button type="primary" class="min-w150px" size="large" @click="onSubmit">
                                <b>提交订单</b>
                            </el-button>
                        </section>
                    </el-form>
                </template>
                <div v-else class="my15px b-#eee bg-#fff">
                    <BaseError />
                </div>
            </el-skeleton>
        </div>
        <UserAddressModel ref="modelRef" @update="getAddress" />
        <UserInvoiceModel ref="invoiceRef" @update="getInvoice" />
    </section>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { OrderApi } from '~/api/goods/order'
import { UserAddressApi } from '~/api/user/address'
import { UserAddressModel, UserInvoiceModel } from '#components'
import { UserInvoiceApi } from '~/api/user/invoice'

const router = useRouter()
const backRoute = ref(router.options.history.state.back as string)

const modelRef = ref<InstanceType<typeof UserAddressModel>>()
const invoiceRef = ref<InstanceType<typeof UserInvoiceModel>>()
const formRef = ref<FormInstance>()

const defData = reactive({
    skeleton: true, // 默认打开骨架屏
    type: 1, // 添加收货地址使用 1：收货地址 2：发票地址
    addressList: [] as UserAddressApi_GetListResponse[], // 用户地址列表
    billAddressList: [] as UserAddressApi_GetListResponse[], // 用户地址列表
    ready: true, // 页面正确

    invoiceList: [] as UserInvoiceApi_getList[], // 所有发票列表

    invoiceList1: [] as UserInvoiceApi_getList[], // 增值税单发票列表
    invoiceList2: [] as UserInvoiceApi_getList[], // 普通发票列表

    couponList: [] as OrderApi_GetSettleResponse['coupon_list'], // 优惠券列表
    count_number: 0, // 商品总数量
    total_price: 0, // 订单总金额
    total_peas: 0, // 该订单可用工游豆
    user_peas: 0, // 当前可用工游豆
    freight_price: 0, // 运费
})

const form = reactive({
    tableData: [] as OrderApi_GetSettleResponse['goods_list'],
    billType: 1, // 发票类型
    payType: 1, // 支付方式 1-在线，  2：对公转账
    address_id: '' as '' | number, // 地址id
    bill_address_id: '' as '' | number, // 发票地址

    is_invoice: 1, // 是否开发票 1：是 0：否 （默认1）
    invoice_id: '' as '' | number, // 发票id

    coupon_id: '' as '' | number, // 使用的优惠券编号或编号列表（可选）
    is_peas: 1, // 是否使用工游豆 1：是 0：否 (默认为1)
    peas_number: 0, // 使用的工游豆数量
    remark: '', // 备注信息
})

const rules = reactive<FormRules>({
    address_id: [{ required: true, message: '请设置收货地址', trigger: 'change' }],
    bill_address_id: [{ required: true, message: '请设置发票收货地址', trigger: 'change' }],
    invoice_id: [{ required: true, message: '请选择发票', trigger: 'change' }],
})

// 面包屑导航
const breadcrumbData = computed(() => {
    const _list = [
        { text: '首页', href: '/', id: 1 },
        { text: '购物车', href: '/order/cart', id: 2 },
        { text: '订单结算', href: '', id: 3 },
    ]
    // 不是从购物车进入时，删除进入购物车那项
    if (!backRoute.value?.includes('/order/cart')) {
        _list.splice(1, 1)
    }
    return _list
})

// 工游豆可用最大最小数量
const peasNumber = computed(() => {
    const min = 0
    const max = defData.user_peas > defData.total_peas ? defData.total_peas : defData.user_peas
    return { min, max }
})

const payMoney = computed(() => {
    return defData.total_price + defData.freight_price
})

const initDefaultData = async () => {
    const numReg = /^[0-9]*$/ // 检查数字是否合法或不包含数字的正则表达式 或 空或空字符串

    const cart_id = useRouteQuery('cart_id') // 购物车id
    const goods_id = useRouteQuery('goods_id') // 商品id
    const goods_number = useRouteQuery('goods_number') // 商品数量

    const num = numReg.test(goods_number.value) ? (Number(goods_number) || 1) : 1
    // 0:不请求接口，1：根据购物车id请求，2：根据商品id请求，
    let type = 0

    if (cart_id.value) {
        type = 1
    } else if (goods_id.value && numReg.test(goods_id.value)) {
        type = 2
    }

    // 获取结算商品信息、用户地址
    const [res1, res2, res3] = await Promise.all([
        type === 1
            ? OrderApi.getSettleCart({ cart_id: cart_id.value })
            : (type === 2 ? OrderApi.getSettleGoods({ goods_id: Number(goods_id.value), goods_number: num }) : undefined),
        UserAddressApi.getList(),
        UserInvoiceApi.getList(),
    ])

    await wait(800)
    defData.skeleton = false

    if (res1 && res1.data.value?.code === 200) {
        const data = res1.data.value?.data
        console.log('data :>> ', data)
        // 未获取到商品时
        if (data.goods_list.length === 0) {
            defData.ready = false
            return
        }

        form.tableData = data.goods_list
        defData.couponList = data.coupon_list

        defData.count_number = data.number
        defData.total_price = data.total_price
        defData.total_peas = data.total_peas
        defData.user_peas = data.user_peas
        defData.freight_price = data.freight_price
    } else {
        defData.ready = false
        return
    }

    if (res2 && res2.data.value?.code === 200) {
        const data = res2.data.value?.data
        defData.addressList = data
        defData.billAddressList = data
    }

    if (res3 && res3.data.value?.code === 200) {
        const data = res3.data.value?.data
        defData.invoiceList = data
        defData.invoiceList1 = data.filter(item => item.type === 1)
        defData.invoiceList2 = data.filter(item => item.type === 2)
    }
}

// 地址信息拼接
const setAddressText = (row: UserAddressApi_GetListResponse) => {
    return setArrayTextName([row.province, row.city, row.area, row.address], '  ')
}
/**
 * 新增地址、新增发票
 * @param type 1：收货地址 2：发票
 */
const onAddressInvoice = (type: 1 | 2) => {
    defData.type = type
    if (type === 1) {
        modelRef.value?.onOpenDialog()
    } else {
        invoiceRef.value?.onOpenDialog()
    }
}
// 获取地址
const getAddress = (params: UserAddressApi_Edit) => {
    if (defData.type === 1) {
        form.address_id = params.address_id
        const data = {
            ...params,
            user_id: 0,
        }
        defData.addressList.unshift(data)
        defData.billAddressList.push(data)
    } else if (defData.type === 2) {
        form.bill_address_id = params.address_id
        const data = {
            ...params,
            user_id: 0,
        }
        defData.billAddressList.unshift(data)
        defData.addressList.push(data)
    }
    console.log('defData.addressList :>> ', defData.addressList)
}

/**
 * 获取新增的发票数据
 */
const getInvoice = (params: any) => {
    console.log('params :>> ', params)
}

// 提交订单
const onSubmit = async () => {
    const isRun = await useFormVerify(formRef.value)
    if (!isRun) return false
    // 是否开发票
    if (form.is_invoice) {
        //
    }
    let goods_peas = Number(form.peas_number)
    if (!goods_peas) {
        form.is_peas = 0
        goods_peas = 0
    }

    const params: OrderApi_ConfirmSettle = {
        is_peas: form.is_peas,
        goods_peas,
        address_id: Number(form.address_id),
        coupon_draw_id: form.coupon_id || 0,
        remarks: form.remark,
        bill_status: 0,
        type: '',
        header: '',
        tax_no: '',
        bill_name: '',
        bill_tel: '',
        logon_tel: '',
        identifier: '',
        bank: '',
        bank_account: '',
        zip_code: '',
        address: '',
    }

    // 进行开票
    if (params.bill_status) {
        //
    }

    console.log('params :>> ', params)

    const { data: res } = await OrderApi.confirmSettle(params)
    if (res.value?.code === 200) {
        ElMessage.success('提交成功')

        navigateTo({
            path: '/order/pay',
            query: {
                order_no: res.value.data.main_order_no, // 订单编号，必须传递！！！！！！！！！！！！！！！
            },
        })
    } else {
        ElMessage.error(res.value?.msg)
    }
}

onBeforeMount(() => {
    initDefaultData()
})

definePageMeta({
    layout: 'home',
    middleware: 'auth',
})
</script>

<style lang="scss" scoped>
.sec-box {
    background: var(--el-color-white);
    padding: 15px;
    margin-bottom: 20px;

    .tle {
        font-size: 15px;
        margin-bottom: 10px;

        b {
            margin-right: 8px;
        }
    }

    :deep(.el-table) {
        .cell {
            font-size: 13px;
        }
    }

}

.address-radio {
    display: flex;
    width: 100%;

    .el-radio {
        width: 100%;
        padding: 0 10px;
        border: 1px solid transparent;
        margin: 0;

        &:hover {
            background-color: var(--el-color-danger-light-9);
        }

        &.is-checked {
            font-weight: bold;
            border-color: var(--el-color-danger-light-7);
        }
    }
}

.radio-tabs {
    --el-tabs-header-height: 28px;
    display: flex;

    :deep(.el-tabs__header.is-left) {
        height: auto;
    }
}

.prefer-ul {
    font-size: 12px;
    text-align: right;
    color: #333;
    line-height: 2;

    .item-text {
        display: inline-block;
        min-width: 90px;
        color: var(--el-color-primary);
    }
}

.goods-link {
    font-size: 14px;

    &:hover {
        color: var(--el-color-primary);
    }
}
</style>
