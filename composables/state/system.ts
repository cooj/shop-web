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
        const { data, error } = await CommonApi.getSystem()
        // console.log(data.value?.code)
        // 接口发生错误时
        if (error.value) return system
        // await wait(800)
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
    const cookieToken = useCookie<string>('admin_token', { maxAge: 3600 * 24 * 2 })

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
        if (!token.value) return userInfo
        // if (token.value && userInfo.value) {
        //     // ElMessage.error('请先登录')
        //     return userInfo
        // }

        // const res = await AccountApi.userInfo()
        // console.log('res :>> ', res)
        // console.log('res.data.value?.code :>> ', res.data.value?.code)
        // console.log('res.error.value :>> ', res.error.value)
        // if (res.data.value?.code !== 200 || res.error.value) {
        //     console.log('111 :>> ', 111)
        //     // await useClearToken()
        //     token.value = ''
        //     return userInfo
        // }
        // console.log('res :>> ', res)
        // userInfo.value = res.data.value?.data
        // return userInfo

        const { data, error } = await AccountApi.userInfo()

        if (error.value) {
            token.value = ''
            return userInfo
        }

        watch(() => data.value, () => {
            userInfo.value = data.value?.data
        })
        // const dat = computed(() => userInfo.value)
        // console.log('userInfo.values :>> ', data.value?.data)
        return computed(() => data.value?.data)

        // console.log(data.value?.code)
        // await wait(5800)
        // console.log(data.value?.code)
        // console.log('data,error :>> ', data, error.value)
        // // 接口发生错误时
        // if (error.value) {
        //     // await useClearToken()
        //     token.value = ''
        //     return userInfo
        // }
        // if (data.value?.code === 200) {
        //     userInfo.value = data.value.data
        // } else {
        //     userInfo.value = undefined
        // }

        // return userInfo
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
        if (token.value && userInfo.value) return userInfo

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
