

/**
 * useHttp 请求接口数据类型
 */
declare type RequestDataType<T = Record<string, any>> = '' | { (): T } | T
// type RequestDataType<T = any> = '' | { (): T } | T


/**
 * useHttp 响应接口数据类型
 */
declare type ResponseDataType<T = any> = {
    code: number;
    data: T;
    msg: string;
}