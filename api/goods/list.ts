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
   * 获取商品信息
   * @returns
   */
  getInfo: (data: { goods_id: number }) => useHttp<GoodsApi_GetInfoResponse>('/api/goods_detail/index', data, { method: 'post' }),

  /**
   * 获取购物车商品
   * @returns
   */
  getCartList: () => useHttp<GoodsApi_GetCartListResponse>('/api/mall/cart_list', '', { method: 'get' }),

  /**
   * 修改购物车商品数量
   * @returns
   */
  editNum: (data: { id: number; number: number }) => useHttp<{ 'number': number; 'goods_number': number }>('/api/mall/add_sub_cart', data, { method: 'post' }),

  /**
   * 首页获取购物车商品数量
   * @returns
   */
  cartNum: () => useHttp<{ 'number': number }>('/api/mall/get_goods_number', '', { method: 'get' }),

  /**
   * 删除购物车商品 id 可多个删除  使用,拼接
   * @returns
   */
  delCart: (data: { id: string }) => useHttp('/api/mall/del_cart', data, { method: 'post' }),

}
