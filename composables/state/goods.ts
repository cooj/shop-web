import { GoodsApi } from '~/api/goods/list'

/**
 * 获取用户信息
 * @returns
 */
export const useGoodsState = () => {
  // 商品分类
  const goodsClassList = useState<GoodsApi_GetClassResponse[]>('goodsClass', () => [])

  /**
     * 获取商品分类
     * @returns
     */
  const getGoodsClass = async () => {
    // return goodsClassList
    if (goodsClassList.value.length) return goodsClassList
    const { data: cate, error } = await GoodsApi.getClass()
    // 接口发生错误时
    if (error.value) return goodsClassList

    if (cate.value?.code === 200) {
      goodsClassList.value = cate.value.data
    } else {
      ElMessage.error(cate.value?.msg)
      goodsClassList.value = []
    }
    return goodsClassList
  }

  return {
    goodsClassList,
    getGoodsClass,
  }
}
