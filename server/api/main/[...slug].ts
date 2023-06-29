import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

/**
 * 获取轮播图、活动广告
 */
router.use('/banner', defineEventHandler(async (event) => {
    const res = await useServerFetch<HomeApi_GetBannerResponse>(event, '/api/index/banner_lists')

    return res
}))

export default useBase('/api/main', router.handler)
