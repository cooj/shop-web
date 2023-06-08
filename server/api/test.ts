import { useServerFetch } from '../utils'

/**
 * 用于接口测试使用
 */
export default defineEventHandler(async (event) => {
    const res = await useServerFetch<any>(event, '/api/mall_user/clear_goods_record')
    console.log(res)

    return res
})
