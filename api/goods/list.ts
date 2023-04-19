/**
 * 商品对应api
 */
export const GoodsApi = {

  getClass: () => useHttp<GoodsApi_GetClassResponse[]>('/api/index/goods_category_lists', '', { method: 'get' }),

}
