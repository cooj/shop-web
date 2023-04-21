/**
 * 商品对应api
 */
export const GoodsApi = {
  /**
   * 获取商品分类
   * @returns
   */
  getClass: () => useHttp<GoodsApi_GetClassResponse[]>('/api/index/goods_category_lists', '', { method: 'get' }),

  /**
   * 获取购物车商品
   * @returns
   */
  getCartList: () => useHttp<GoodsApi_GetCartListResponse>('/api/mall/cart_list', '', { method: 'get' }),

  // /api/mall/add_sub_cart

  /**
   * 获取购物车商品数量
   * @returns
   */
  editNum: () => useHttp<GoodsApi_GetCartListResponse>('/api/mall/cart_list', '', { method: 'get' }),

}
