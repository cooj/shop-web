import { defineStore } from 'pinia'
import { GoodsApi } from '~/api/goods/list'

export const useGoodsStore = defineStore('goods', () => {
  // 商品分类
  const goodsClassList = ref<GoodsApi_GetClassResponse[]>([])

  /**
   * 获取商品分类
   * @returns
   */
  const getGoodsClass = async () => {
    if (goodsClassList.value.length) return goodsClassList
    const { data: cate } = await GoodsApi.getClass()
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
},
  // {
  //   persist: true,
  // }
)
