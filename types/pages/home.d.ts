

/**
 * 获取banner轮播图 - 响应数据
 */
declare interface HomeApi_GetBannerResponse {
  "banner_id": 2,
  "banner_link": "https://www.baidu.com/",
  "banner_img": "https://goyojo.oss-cn-shenzhen.aliyuncs.com/20230104/202301040927291851.jpg?x-oss-process=image/quality,Q_50",
  "sort": 100,
  "enabled": 1
}


/**
 * 获取导航菜单 - 响应数据
 */
declare interface HomeApi_GetNavResponse {
  "nav_id": 2,
  "nav_name": "折扣专区",
  "nav_url": "https://www.baidu.com/",
  "sort": 10
}

/**
 * 精选商品 - 响应数据
 */
declare interface HomeApi_GetNewsGoodsResponse {
  "lists": {
    "goods_id": 256,
    "goods_name": "艾斯瑞 冷热冲击试验箱 ASR-100D 100L   -60-150水冷3厢",
    "goods_img": "",
    "purchase_price": "0.00",
    "shop_price": "0.00"
  }[],
  "total": 1

}


/**
 * 获取楼层商品 - 响应数据
 */
declare interface HomeApi_GetFloorResponse {
  "storey_id": 1,
  "storey_name": "1f",
  "storey_img": "https://goyojo.oss-cn-shenzhen.aliyuncs.com/20230104/202301040927291851.jpg?x-oss-process=image/quality,Q_50",
  "sort": 1,
  "brand_lists": HomeApi_GetFloorBrand[],
  "cat_lists": HomeApi_GetFloorCate[],
  "class_lists": HomeApi_GetFloorClass[]
}
// 品牌
declare interface HomeApi_GetFloorBrand {
  "brand_id": 1,
  "brand_name": "红钐",
  "brand_logo": ""
}
// 品牌
declare interface HomeApi_GetFloorCate {
  "cat_id": 1,
  "cat_name": "物性测试仪器"
}
// 商品标签
declare interface HomeApi_GetFloorClass {
  "class_id": 1,
  "class_name": "段路器",
  "goods_lists": HomeApi_GetFloorGoods[]
}
// 商品
declare interface HomeApi_GetFloorGoods {
  "goods_id": 11,
  "goods_name": "红钐 热封仪 HS-RF",
  "goods_img": "",
  "purchase_price": "0.00",
  "shop_price": "0.00"
}

