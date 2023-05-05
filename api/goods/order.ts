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

  //
}
