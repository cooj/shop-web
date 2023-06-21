import { useServerFetch } from '../utils'

/**
 * 用于接口测试使用
 */
export default defineEventHandler(async (event) => {
    // const res = ''
    try {
        const res = await useServerFetch<any>(event, '/api/mall_refund/set_refund')
        console.log(res)

        return res
    } catch (error: any) {
        console.log(error)
        return error.data
    }
})
