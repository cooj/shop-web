import type { FormInstance } from 'element-plus'
import Big from 'big.js'

/**
 * 清除
 */
export const useClearToken = async () => {
  const { data } = await useFetch<{ code: number }>('/api/loginOut')
  if (data.value?.code === 200) {
    // navigateTo('/')
    // window.location.href = '/'
  }
}

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

/**
 * 验证el-form组件表单验证
 * @param formEl
 * @returns boolean true-验证通过，false-验证不通过
 */
export const useFormVerify = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    ElMessage.error('未获取到对应的组件,formEl为空')
    return false
  }
  return await formEl.validate((valid, fields) => {
    if (valid) {
      return true
    } else {
      const obj: any = fields
      const firstKey = Object.keys(obj)[0]
      const text = obj[firstKey][0].message
      ElMessage.error(text)
      return false
    }
  })
}

/**
 * 数字格式化，默认保留两位小数
 * @param num
 * @returns
 */
export const formatNumber = (num: number, scale = 2) => {
  return new Big(num).toFixed(scale)
}
