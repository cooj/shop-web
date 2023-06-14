import type { H3Event } from 'h3'
import { getCookie, getHeaders, getMethod, getQuery, readBody } from 'h3'

// import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

/**
 * 服务端请求外部接口方法
 * @param event 事件对象 defineEventHandler方法里的参数
 * @param url 后端请求地址。 必须是 H3 网络地址或 URL 形式。 如果不需要特定的参数，
 * @param param 请求参数
 * @param merge 是否将param参数跟原有参数信息进行合并，默认不合并，直接覆盖
 * @returns
 */
export const useServerFetch = async <T = unknown>(event: H3Event, url: string, param?: any, merge?: Boolean) => {
    const runtimeConfig = useRuntimeConfig()
    const baseURL = runtimeConfig.public.apiBase || ''
    const method = getMethod(event)
    const defaultParams = getQuery(event)
    let body = method === 'GET' ? undefined : await readBody(event)
    let params = method === 'GET' && defaultParams ? defaultParams : {}

    // 判断是否有参数传入，根据merge参数与原有参数进行合并或覆盖，默认覆盖
    if (param) {
        if (merge) {
            params = method === 'GET' ? { ...defaultParams, ...param } : {}
            body = method === 'GET' ? undefined : { ...body, ...param }
        } else {
            params = method === 'GET' ? param : {}
            body = method === 'GET' ? undefined : param
        }
    }

    const headers = getHeaders(event)
    // const authorization = headers.Authorization || getCookie(event, 'auth._token.local')
    const token = getCookie(event, 'admin_token')
    // if (token) {
    //     headers.token = token
    // }
    console.log(baseURL)
    return $fetch<T>(url, {
        headers: {
            // 'Content-Type': headers['content-type'] as string,
            // 'Authorization': authorization as string,
            token: token as string,
        },
        // headers: headers as HeadersInit,
        baseURL,
        method,
        params,
        body,
    }) as Promise<ResponseDataType<T>>
}
