/**
 * 首页模块对应api
 */
export const HomeApi = {
  /**
   * 获取菜单导航
   * @returns
   */
  getNav: () => useHttp<HomeApi_GetNavResponse[]>('/api/index/nav_lists', '', { method: 'get' }),

  /**
   * 获取轮播图
   * @returns
   */
  getBanner: () => useHttp<HomeApi_GetBannerResponse[]>('/api/index/banner_lists', '', { method: 'get' }),

  /**
   * 获取楼层
   * @returns
   */
  getFloor: () => useHttp<HomeApi_GetFloorResponse[]>('/api/index/storey_lists', '', { method: 'get' }),

  /**
   * 精选商品
   * @returns
   */
  getNewGoods: () => useHttp<HomeApi_GetNewsGoodsResponse>('/api/index/goods_lists', '', { method: 'get' }),

}
