import { GoodsApi } from '~/api/goods/list'
import { OrderApi } from '~/api/goods/order'

/**
 * 获取用户信息
 * @returns
 */
export const useGoodsState = () => {
    // 商品分类
    const goodsClassList = useState<GoodsApi_GetClass[]>('goodsClass', () => [])

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

    const site = useState('cartSite', () => {
        return {
            show: false, // 图标显示隐藏
            top: 0, // 距离顶部的位置
            left: 0, //  距离左部的位置
        }
    })
    /**
     * 获取购物车数量
     */
    const setCartNumber = async (update?: boolean) => {
        const token = useUserState().token
        if (!token.value) {
            cartNum.value = 0
            return cartNum
        }
        const { data } = await GoodsApi.cartNum()
        if (data.value?.code === 200) {
            cartNum.value = data.value.data.number || 0 //
        }

        return cartNum
    }

    /**
     * 设置购物车动画
     */
    const setShop = () => {

    }

    return {
        cartNum,
        setCartNumber,
        site,
        setShop,
    }
}

/**
 * 获取支付方式
 * @returns
 */
export const usePayTypeState = () => {
    const typeList = useState<OrderApi_GetPayTypeResponse[]>('payType', () => []) // 记录购物车数量
    /**
     * 获取支付方式
     */
    const getPayTypeList = async () => {
        if (typeList.value.length === 0) return typeList
        const { data } = await OrderApi.getPayType()
        // await wait(1000)
        if (data.value?.code === 200) {
            typeList.value = data.value.data || [] //
        }

        return typeList
    }
    return {
        typeList,
        getPayTypeList,
    }
}
