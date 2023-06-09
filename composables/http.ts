import type { UseFetchOptions } from '#app'

// type RequestDataType = '' | (() => void) | Record<string, any>
// type RequestDataType<T = Record<string, any>> = '' | { (): T } | T

export const useHttp = <T = any>(url: string, data?: RequestDataType, opt?: UseFetchOptions<T>) => {
    const token = useCookie('admin_token')
    const headers = useRequestHeaders(['token']) // as HeadersInit
    // console.log('headers :>> ', headers)
    //   console.log('headers :>> ', headers.cookie)
    const runtimeConfig = useRuntimeConfig()
    //   console.log('runtimeConfig :>> ', runtimeConfig)
    //   useFetch(url, { headers })

    const options = opt || {}

    if (token.value) {
        headers.token = token.value
    }

    options.headers = headers

    // 设置请求参数
    if (data) {
        if (typeof data == 'function' && typeof data() == 'object') {
            options.body = data()
        }
        if (typeof data == 'object') {
            options.body = data
        }
    }

    if (!options.baseURL) {
        options.baseURL = runtimeConfig.public.apiBase || ''
    }
    // console.log('options.baseURL :>> ', options.baseURL);
    // console.log('options :>> ', options)
    // 发送请求出错
    options.onRequestError = (error) => {
        console.log(error)
        // console.error('请求出错，请重试！')
        ElMessage.error('服务器内部错误')
    }
    // 发送请求出错
    options.onResponseError = ({ response }) => {
        // console.log('response :>> ', response)
        switch (response.status) {
            case 400:
                console.error('参数错误')
                break
            case 401:
                console.error('没有访问权限')
                //   router.push(`/login?callback=${route.path}`)
                break
            case 403:
                console.error('服务器拒绝访问')
                break
            case 404:
                console.error('请求地址错误')
                break
            case 500:
                console.error('服务器故障')
                break
            default:
                console.error('网络连接故障')
                break
        }
    }

    return useFetch<ResponseDataType<T>>(url, options as any)
}

export const useHttp2 = <T = any>(url: string, data?: RequestDataType, opt?: UseFetchOptions<T>) => {
    const token = useCookie('admin_token')
    const headers = useRequestHeaders(['token']) // as HeadersInit
    // console.log('headers :>> ', headers)
    //   console.log('headers :>> ', headers.cookie)
    const runtimeConfig = useRuntimeConfig()
    //   console.log('runtimeConfig :>> ', runtimeConfig)
    //   useFetch(url, { headers })

    const options = opt || {}

    if (token.value) {
        headers.token = token.value
    }

    options.headers = headers

    // 设置请求参数
    if (data) {
        if (typeof data == 'function' && typeof data() == 'object') {
            options.body = data()
        }
        if (typeof data == 'object') {
            options.body = data
        }
    }

    if (!options.baseURL) {
        options.baseURL = runtimeConfig.public.apiBase || ''
    }
    // console.log('options.baseURL :>> ', options.baseURL);
    // console.log('options :>> ', options)
    // 发送请求出错
    options.onRequestError = () => {
        console.error('请求出错，请重试！')
    }
    // 发送请求出错
    options.onResponseError = ({ response }) => {
        switch (response.status) {
            case 400:
                console.error('参数错误')
                break
            case 401:
                console.error('没有访问权限')
                //   router.push(`/login?callback=${route.path}`)
                break
            case 403:
                console.error('服务器拒绝访问')
                break
            case 404:
                console.error('请求地址错误')
                break
            case 500:
                console.error('服务器故障')
                break
            default:
                console.error('网络连接故障')
                break
        }
    }
    return useAsyncData(() => useFetch<ResponseDataType<T>>(url, options as any))
    // return useFetch<ResponseDataType<T>>(url, options as any)
}

// const { data: users, pending, refresh, error } = await http<{ name: string }>('/a')

/**
 * 异步处理error、loading
 * @param promise
 * @returns
 */
export function useCustomFetch<T = any>(promise: Promise<T>) {
    const data = ref()
    const error = ref()
    const isLoading = ref(false)

    async function fetchData() {
        isLoading.value = true
        // promise().then((result) => {
        //     data.value = result
        //     error.value = undefined
        // }).catch((err) => {
        //     data.value = undefined
        //     error.value = err
        // }).finally(() => {
        //     isLoading.value = false
        // })

        try {
            // const response = await fetch('https://randomuser.me/api/?results=3')
            // const { results: users } = await response.json()
            // data.value = users

            data.value = await promise
            error.value = undefined
        } catch (err) {
            data.value = undefined
            error.value = err
        }
        isLoading.value = false
    }
    fetchData()

    return { isLoading, error, data }
}

/**
 * 外部接口测试
 * @param promise
 * @returns
 */
export function useTestFetch(url: string, data?: any) {
    if (process.client) {
        throw new Error('useTestFetch 只能测试使用')
    }
    return useFetch('/api/test', {
        method: 'post',
        body: {
            api_url: url,
            ...data,
        },
    })
}
