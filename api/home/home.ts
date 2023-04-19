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

}
