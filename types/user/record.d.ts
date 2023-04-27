


/**
 * 获取商品收藏、商品浏览历史记录 - 请求参数
 */
declare interface RecordApi_GetList {
  user_id: number;  // 用户id
  type: 1 | 2  //1收藏，2最近浏览
}


/**
 * 获取商品收藏、商品浏览历史记录 - 响应数据
 */
declare interface RecordApi_GetListResponse {
  "id": 1, //记录ID
  "user_id": 1, //用户id
  "goods_id": 1, //商品id
  "is_collect": 1, //是否收藏 1是 0否
  "collect_time": 1680251000, //收藏时间
  "is_recent": 0, //是否最近浏览 1是 0否
  "recent_time": 0, //最近浏览时间
  "user_name": "小明xxx", //用户名
  "goods_name": "红钐 按键寿命试验机 HSL-TA4 四工位" //商品名称
}

/**
 * 添加商品收藏、商品浏览历史记录 - 请求参数
 */
declare interface RecordApi_Add {
  user_id: number;  // 用户id
  goods_id: number;  // 商品id
  type: 1 | 2  //1收藏，2最近浏览
}

/**
 * 删除商品收藏、商品浏览历史记录 - 请求参数
 */
declare interface RecordApi_Del extends Omit<RecordApi_Add,'goods_id'> {
  goods_ids: string;  // 商品id，多个以英文逗号分隔
}


