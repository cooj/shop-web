/**
 * 发票管理 --新增 请求参数
 */
declare interface UserInvoiceApi_Add {
    enterprise_name: string //企业名称
    enterprise_email: string //企业邮箱
    type: 1 | 2 | 3 //类型1：增值税专用发票 2：普通发票 3：电子普通发票
    tax_no: string //纳税人识别号
    logon_tel: string //注册电话
    logon_addr: string //注册地址
    bank: string //开户银行
    bank_account: string//开户账号
    user_id: number //用户id
}