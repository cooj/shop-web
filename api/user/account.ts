/**
 * 个人中心 账户资料Api
 */
export const AccountApi = {
  // 用户信息
  userInfo: (data: { token: string }) => useHttp<AccountApi_userInfoResponse>('/api/mall/get_user_info', data, { method: 'post' }),
  // 用户信息 -- 编辑
  editInfo: (data: RequestDataType<AccountApi_editInfo>) => useHttp('/api/mall/get_user_info', data, { method: 'post' }),
  // 用户信息 -- 修改密码
  editPwd: (data: RequestDataType<AccountApi_editPwd>) => useHttp('/api/mall/edit_pwd', data, { method: 'post' }),
}
