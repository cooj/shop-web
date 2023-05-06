declare module 'element-plus/dist/locale/zh-cn.mjs';






// search搜索项 数据格式公共类型
declare interface BaseFormToolType<T = any, U = any> {
  data: T,
  // config: {
  //     [key in keyof T]: { label: string, slot?: boolean, placeholder: string, width: string }
  // },
  config: { itemProp: { label: string, prop: keyof T, [key: string]: any; }, slot?: boolean, placeholder?: string, width?: string }[]
  searchFunc: () => void,     // 查询方法
  hideBtn?: boolean
  showAll?: boolean
}


interface BaseTableHeaderType<T, U> {
  property: keyof T | 'operate',
  label: string,
  slot?: string,
  [key in U]: U[keyof U];
}

// table 数据格式公共类型
declare interface BaseTableDataType<T = any, U = any> {
  data: T[],
  tableHeader:
  {
      property: keyof T | 'operate' | '',
      label: string,
      slot?: boolean,
      [key: string]: any;
  }[],
  pagination: {
      total: number,
      page: number,
      page_size: number,
      page_sizes: number[],
  };
}