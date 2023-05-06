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
   * 获取订单信息
   * @param data main_order_no:订单编号;
   * @returns
   */
  getInfo: (data: { main_order_no: string }) => useHttp<OrderApi_GetInfoResponse>('/api/mall_order/order_details', data, { method: 'post' }),

}
