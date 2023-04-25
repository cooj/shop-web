/**
 * 退出登录
 */
export const useLoginOut = async () => {
  const { data } = await useFetch<{ code: number }>('/api/loginOut')
  if (data.value?.code === 200) {
    // navigateTo('/')
    window.location.href = '/'
  }
}
