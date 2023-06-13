import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

/**
 * 获取商品详情
 */
router.use('/info', defineEventHandler(async (event) => {
    // 获取订单信息
    const res = await useServerFetch<OrderApi_GetInfoResponse>(event, '/api/mall_order/order_details')
    // console.log(res)
    if (res) {
        if (res.code !== 200) return { code: res.code, msg: res.msg }
        // 获取线下支付的订单信息
        if (res.data.pay_type === 3) {
            // { main_order_no: order_no.value, pay_type: form.payType }
            const dat = await useServerFetch<OrderApi_PayOrderResponse>(event, '/api/mall/pay_order', {
                pay_type: 3,
            }, true)
            return { code: 200, info: res.data, pay: dat.data }
        }
        return { code: 200, info: res.data }
    }
    return res
}))

// const ITEM = {
//     handler_name: '崔高旋',
//     account_name: '“其他银行”',

//     balance1: '0.00',
//     cost1: '8241.78',
//     profit1: '68330.00',
//     rate1: '1.00',

//     balance2: '0.00',
//     cost2: '8241.78',
//     profit2: '68330.00',
//     rate2: '1.00',

//     balance3: '0.00',
//     cost3: '8241.78',
//     profit3: '68330.00',
//     rate3: '1.00',
// }

/**
 * 订单确认
 */
router.use('/confirm', defineEventHandler(async (event) => {
    return { event }
    // 获取订单信息
    // const res = await useServerFetch<OrderApi_GetInfoResponse>(event, '/api/mall_order/order_details')
    // console.log(res)
    // if (res) {
    //     if (res.code !== 200) return { code: res.code, msg: res.msg }
    //     // 获取线下支付的订单信息
    //     if (res.data.pay_type === 3) {
    //         // { main_order_no: order_no.value, pay_type: form.payType }
    //         const dat = await useServerFetch<OrderApi_PayOrderResponse>(event, '/api/mall/pay_order', {
    //             pay_type: 3,
    //         })
    //         console.log(dat)
    //         return { code: 200, info: res.data, pay: dat.data }
    //     }
    //     return { code: 200, info: res.data }
    // }
    // return res
}))

export default useBase('/api/order', router.handler)
