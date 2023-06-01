/**
 * 商品订单对应api
 */
export const OrderApi = {
    /**
     * 获取结算商品信息
     * @param data
     * @returns
     */
    getSettleGoods: (data: OrderApi_GetSettleGoods) => useHttp<OrderApi_GetSettleResponse>('/api/mall/settle_liji', data, { method: 'post' }),

    /**
     * 获取购物车结算商品信息
     * @param data
     * @returns
     */
    getSettleCart: (data: OrderApi_GetSettleCart) => useHttp<OrderApi_GetSettleResponse>('/api/mall/settle_goods', data, { method: 'post' }),

    /**
     * 订单确认
     * @param data
     * @returns
     */
    confirmSettle: (data: OrderApi_ConfirmSettle) => useHttp<OrderApi_ConfirmSettleResponse>('/api/mall/set_order', data, { method: 'post' }),

    /**
     * 订单支付
     * @param data main_order_no:订单编号;   pay_type:支付方式 1微信 2支付宝 3线下
     * @returns
     */
    payOrder: (data: { main_order_no: string; pay_type: 1 | 2 | 3 }) => useHttp('/api/mall/pay_order', data, { method: 'post' }),

    /**
     * 获取订单支付方式
     * @returns
     */
    getPayType: () => useHttp<OrderApi_GetPayTypeResponse[]>('/api/index/get_pay_type', '', { method: 'post' }),

    /**
     * 获取订单信息
     * @param data main_order_no:订单编号;
     * @returns
     */
    getInfo: (data: { main_order_no: string }) => useHttp<OrderApi_GetInfoResponse>('/api/mall_order/order_details', data, { method: 'post' }),

    /**
     * 获取订单列表
     * @param data main_order_no:订单编号;
     * @returns
     */
    getOrderList: (data: OrderApi_GetOrderList) => useHttp<OrderApi_GetOrderListResponse>('/api/mall_order/get_order_list', data, { method: 'post' }),

    /**
     * 取消订单
     * @param data main_order_no:订单编号;
     * @returns
     */
    cancelOrder: (data: { main_order_no: string }) => useHttp('/api/mall_order/cancel_order', data, { method: 'post' }),

    /**
     * 确认订单（确认收货）
     * @param data main_order_no:订单编号;
     * @returns
     */
    confirmOrder: (data: { main_order_no: string }) => useHttp('/api/mall_order/affirm_order', data, { method: 'post' }),

    /**
     * 删除订单
     * @param data main_order_no:订单编号;
     * @returns
     */
    delOrder: (data: { main_order_no: string }) => useHttp('/api/mall_order/del_order', data, { method: 'post' }),

}

/**
 * 商品退换货对应api
 */
export const OrderReturnApi = {
    /**
     * 获取可退货商品列表
     * @param data
     * @returns
     */
    getList: (data?: OrderApi_GetSettleGoods) => useHttp<OrderApi_GetSettleResponse>('/api/mall_refund/get_refund_goods', data, { method: 'post' }),

    /**
     * 退换货管理 -- 退货列表
     * @param data
     * @returns
     */
    returnList: () => useHttp<OrderReturnApi_ReturnList>('/api/mall_refund/get_refund_lists', '', { method: 'get' }),

    //

}
