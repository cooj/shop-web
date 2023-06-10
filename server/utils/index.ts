import type { H3Event } from 'h3'
import { getCookie, getHeaders, getMethod, getQuery, readBody } from 'h3'

//
export const useServerFetch = async <T = unknown>(event: H3Event, url: string, param?: any) => {
    const runtimeConfig = useRuntimeConfig()
    const baseURL = runtimeConfig.public.apiBase || ''
    const method = getMethod(event)
    const defaultParams = getQuery(event)
    const params = method === 'GET' && param ? { ...defaultParams, ...param } : defaultParams
    let body = method === 'GET' ? undefined : await readBody(event)
    console.log('body :>> ', body)
    if (body && param) {
        body = { ...body, ...param }
    }

    const headers = getHeaders(event)
    // const authorization = headers.Authorization || getCookie(event, 'auth._token.local')
    const token = getCookie(event, 'admin_token')
    // if (token) {
    //     headers.token = token
    // }
    console.log(baseURL)
    console.log(params,
        body)
    return $fetch<T>(url, {
        headers: {
            'Content-Type': headers['content-type'] as string,
            // 'Authorization': authorization as string,
            'token': token as string,
        },
        // headers: headers as HeadersInit,
        baseURL,
        method,
        params,
        body,
    }) as Promise<ResponseDataType<T>>
}
