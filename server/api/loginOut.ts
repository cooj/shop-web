/**
 * 退出登录
 */
export default defineEventHandler((event) => {
  const token = getCookie(event, 'token')
  // Increase counter cookie by 1
  setCookie(event, 'token', '')

  return { code: 200, token }
})
