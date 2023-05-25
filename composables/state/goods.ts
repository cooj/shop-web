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

/**
 * 获取购物车商品数量
 * @returns
 */
export const useCartNumberState = () => {
    const cartNum = useState('cartNum', () => 0) // 记录购物车数量
    /**
     * 获取购物车数量
     */
    const setCartNumber = async (update?: boolean) => {
        const token = useUserState().token
        if (!token.value) return 0
        const { data } = await GoodsApi.cartNum()
        if (data.value?.code === 200) {
            cartNum.value = data.value.data.number || 0 //
        }

        return cartNum
    }
    return {
        cartNum,
        setCartNumber,
    }
}
