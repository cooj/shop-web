/**
 * 个人中心 我的优惠券 响应数据
 */
declare interface CouponApi_getListResponse {
  /**
   * 优惠券列表
   */
  "lists": {
    "id": number, //记录ID
    "coupon_id": number, //优惠券ID
    "is_status": 0 | 1, //使用状态 0未使用 1已使用
    "add_time": string, //创建时间
    "start_time": string, //开始时间
    "end_time": string, //结束时间
    "coupon_name": string, //优惠券名称
    "type": 1 | 2, //类型 通用券 2品类券
    "par_value": string, //面值
    "img_url": string //图片理解
  }[]
  "total": number
}

/**
 * 展示优惠券 响应数据
 */
declare interface CouponApi_allListResponse {
  "coupon_id": number, //优惠券id
  "coupon_name": string, //名称
  "par_value": string, //面值
  "img_url": string, //图片路径
  "is_term": 1 | 2, //有限期类型 1天数 2时间段
  "term_time": string, //时间段
  "use_coupon": 0 | 1 //是否领取 0未领取 1已领取
}

/**
 * 领取优惠券 请求数据
 */
declare interface CouponApi_addList {
  user_id:number //用户id
  coupon_id:number //优惠券id
  token:string 
}

/**
 * 删除优惠券 请求参数
 */
declare interface CouponApi_delList {
  id:number 
  // user_id:number //用户id
  token:string 
}