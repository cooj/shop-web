/**
 * 商品对应api
 */
export const OrderApi = {

  getClass: () => useHttp<GoodsApi_GetClassResponse[]>('/api/index/goods_category_lists', '', { method: 'get' }),

}
