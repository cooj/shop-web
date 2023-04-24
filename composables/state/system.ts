import { CommonApi } from '~/api/common'
import { AccountApi } from '~/api/user/account'

/**
 * 获取商城信息
 * @returns
 */
export const useSystemState = () => {
  const system = useState<CommonApi_GetSystemResponse | undefined>('system')

  const getSystemInfo = async (update?: boolean) => {
    // console.log('system.value :>> ', system.value)
    if (system.value) return system
    const { data } = await CommonApi.getSystem()
    if (data.value?.code === 200) {
      system.value = data.value.data
    } else {
      ElMessage.error(data.value?.msg)
    }
    return system
  }

  return {
    system,
    getSystemInfo,
  }
}

/**
 * 获取用户信息
 * @returns
 */
export const useUserState = () => {
  const cookieToken = useCookie<string>('token')

  const token = useState<string | null>('token', () => cookieToken.value)

  // 设置token
  const setToken = (val: string) => {
    token.value = val
    if (val) cookieToken.value = val

    return token
  }

  const userInfo = useState<AccountApi_userInfoResponse | undefined>('user')

  // 获取用户接口数据
  const getUserData = async () => {
    if (!token.value) {
      // ElMessage.error('请先登录')
      return userInfo
    }

    const { data } = await AccountApi.userInfo()
    await wait(800)

    if (data.value?.code === 200) {
      userInfo.value = data.value.data
    } else {
      userInfo.value = undefined
    }

    return userInfo
  }

  /**
   * 获取用户信息
   * @param update boolean value 是否获取最新数据，默认false
   * @returns
   */
  const getUserInfo = async (update?: boolean) => {
    // 获取最新数据
    if (update) return await getUserData()

    // 已经有数据了，直接返回
    if (userInfo.value) return userInfo

    // 啥都没有，重新获取接口数据
    return await getUserData()
  }

  return {
    token,
    setToken,
    userInfo,
    getUserInfo,
  }
}
