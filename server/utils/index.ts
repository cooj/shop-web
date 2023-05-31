import type { H3Event } from 'h3'
import { getCookie, getHeaders, getMethod, getQuery, readBody } from 'h3'

//
export const useServerFetch = async (event: H3Event, url: string) => {
    const runtimeConfig = useRuntimeConfig()
    const baseURL = runtimeConfig.public.apiBase || ''
    const method = getMethod(event)
    const params = getQuery(event)

    const headers = getHeaders(event)
    // const authorization = headers.Authorization || getCookie(event, 'auth._token.local')
    const token = getCookie(event, 'admin_token')
    if (token) {
        headers.token = token
    }
    console.log(baseURL)
    const body = method === 'GET' ? undefined : await readBody(event)

    return await $fetch(url, {
        // headers: {
        //     'Content-Type': headers['content-type'] as string,
        //     // 'Authorization': authorization as string,
        //     'token': token as string,
        // },
        headers: headers as HeadersInit,
        baseURL,
        method,
        params,
        body,
    })
}
