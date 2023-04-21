

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

/**
 * 上传头像 请求参数
 */
declare interface CommonApi_upload {
    image: file //图片信息
    type?: image //上传类型：image=>图片（默认）
    token?: string
  }
  
  /**
   * 上传头像 响应数据
   */
  declare interface CommonApi_uploadResponse {
    "src": string //图片地址
  }