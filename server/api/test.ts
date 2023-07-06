import { useServerFetch } from '../utils'

/**
 * 用于接口测试使用
 */
export default defineEventHandler(async (event) => {
    // const res = ''
    const body = await readBody(event)
    try {
        const res = await useServerFetch<any>(event, body.api_url)
        console.log(res)

        return res
    } catch (error: any) {
        console.log(error)
        return error.data
    }
})
