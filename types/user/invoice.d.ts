/**
 * 发票管理 -- 列表 响应参数
 */
declare interface UserInvoiceApi_getList {
    "type": 1 | 2 | 3, //类型 1：增值税专用发票，2：普通发票， 3：电子普通发票
    "header": string, //发票抬头
    "enterprise_name": string, //企业名称
    "enterprise_email": string, //企业邮箱
    "tax_no": string, //纳税人识别号
    "logon_addr": string, //注册地址
    "logon_tel": string, //注册电话
    "bank": string, //开户银行
    "bank_account": string, //开户账户
    "verify_status": 0 | 1 | 2, //审核状态 0未审核 1审核通过 2审核不通过
    "express_name": string, //快递名称
    "express_no": string, //快递编号
    "failed_remark": string, //未通过原因
    "order_no": string, //订单号
    "is_send": 0 | 1 //是否发送 0否 1是
}

/**
 * 发票管理 --新增 请求参数
 */
declare interface UserInvoiceApi_Add {
    address_id: string; //添加收票地址返回ID
    enterprise_name: string //企业名称
    enterprise_email: string //企业邮箱
    type: 1 | 2 | 3 //类型1：增值税专用发票 2：普通发票 3：电子普通发票
    tax_no: string //纳税人识别号（普票可填，增票必填）
    logon_tel: string //注册电话（增票必填）
    logon_addr: string //注册地址（增票必填）
    bank: string //开户银行（增票必填）
    bank_account: string//开户账号（增票必填）
    user_id: number //用户id
}