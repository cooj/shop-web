/**
 * 登录注册Api
 */
export const LoginApi = {
  Login: (data: RequestDataType<LoginApi_Login>) => useHttp<{ number: number }>('/api/mall/login', data, { method: 'post' }),
  /**
   *登录页--短信验证码登录 发送短信验证码
   */
  validateCode: (data: RequestDataType<LoginApi_validateCode>) => useHttp<{ number: number }>('/api/mall/sms_code', data, { method: 'post' }),
  /**
   * 找回密码--提交身份验证
   */
  submitIde: (data: RequestDataType<LoginApi_submitIde>) => useHttp<LoginApi_submitIdeResponse>('/api/mall/set_iden', data, { method: 'post' }),

  /**
   * 找回密码--验证码
   */
  getCode: () => useHttp<LoginApi_getCodeResponse>('/api/mall/validate_code', '', { method: 'get' }),
  /**
   * 找回密码--提交密码
   */
  submitPas: (data: RequestDataType<LoginApi_submitPas>) => useHttp<{ number: number }>('/api/mall/set_pwd', data, { method: 'post' }),

  /**
   * 获取微信二维码路径--验证码API
   */
  getWeChat: () => useHttp<LoginApi_GetWeChatResponse>('/api/mall/get_wechat_url', '', { method: 'get' }),
  /**
   * 获取微信getOpenid--验证码API
   */
  getOpenid: (data: RequestDataType<LoginApi_getOpenid>) => useHttp<LoginApi_getOpenidResponse>('/api/mall/get_openid', data, { method: 'post' }),

}
