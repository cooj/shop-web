import type { FormInstance } from 'element-plus'
import Big from 'big.js'

/**
 * vue路由获取Param类型的参数   /goods/list/1
 * @param name 名称 （必须）
 * @param init 默认值
 * @returns
 */
export function useRouteParam<T = string>(name: string, init = '' as T) {
    const route = useRoute()
    return computed(() => route.params[name] as T ?? init)
}
/**
 * vue路由获取query参数（获取？后面的参数）   /goods/list?name=foo&price=10
 * @param name 名称 （必须）
 * @param init
 * @returns
 */
export function useRouteQuery<T = string>(name: string, init = '' as T) {
    const route = useRoute()
    return computed(() => route.query[name] as T ?? init)
}

/**
 * 清除token
 */
export const useClearToken = async () => {
    const { data } = await useFetch<{ code: number }>('/api/user/out')
    if (data.value?.code === 200) {
        return true
    } else {
        return false
    }
}

/**
 * 退出登录
 */
export const useLoginOut = async () => {
    const { data } = await useFetch<{ code: number }>('/api/user/out')
    if (data.value?.code === 200) {
        // navigateTo('/')
        window.location.href = '/'
    }
}

/**
 * 验证el-form组件表单验证
 * @param formEl
 * @returns boolean true-验证通过，false-验证不通过
 */
export const useFormVerify = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        ElMessage.error('未获取到对应的组件,formEl为空')
        return false
    }
    return await formEl.validate((valid, fields) => {
        if (valid) {
            return true
        } else {
            const obj: any = fields
            const firstKey = Object.keys(obj)[0]
            const text = obj[firstKey][0].message
            ElMessage.error(text)
            return false
        }
    })
}

/**
 * 数字格式化，默认保留两位小数
 * @param num
 * @returns
 */
export const formatNumber = (num: number, scale = 2) => {
    return new Big(num).toFixed(scale)
}

export const PAGINATION = {
    total: 0, // 总条数
    page: 1, // 当前页面
    page_size: 20, // 每页显示的数量
    page_sizes: [20, 50, 100, 200],
}
