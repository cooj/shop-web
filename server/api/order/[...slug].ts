import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

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
            })
            return { code: 200, info: res.data, pay: dat.data }
        }
    }
    return res
    //
    try {
        const a = await useServerFetch<any>(event, '/api/index/get_article_info')
        console.log(a)
        return a
    } catch (error) {
        console.log('45467978787', error)
        // throw new Error(error)
        // return error
        throw createError({
            statusCode: 500,
            message: '服务器错误',
        })
    }
}))

export default useBase('/api/order', router.handler)
