import { defineStore } from 'pinia'
import { AccountApi } from '~/api/user/account'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref<AccountApi_userInfoResponse>()

  // 获取接口数据
  const getUserData = async () => {
    const a = sessionStorage.getItem('token') as string

    const { data } = await AccountApi.userInfo({ token: a })

    await wait(500)

    if (data.value?.code === 200) {
      userInfo.value = data.value.data
    }

    return userInfo
  }

  /**
   * 获取用户信息
   * @param update boolean value 是否获取最新数据，默认false
   * @returns
   */
  const getUserInfo = async (update?: boolean) => {
    if (update) {
      return await getUserData()
    } else {
      if (userInfo.value) return userInfo

      const data = await getUserData()
      return data
    }
  }

  return {
    userInfo,
    getUserInfo,
  }
})
