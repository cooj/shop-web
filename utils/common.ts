/**
 * @function 判断数据类型
 * @param {any} o 对应的数据
 * @example
 *  types("") // "string"
    types({}); // "object"
    types([]); // "array"
    types(100); // "number"
    types(null); // "null"
    types(); // "undefined"
    types(/abcd/); // "regex"
    types(new Date()); // "date"
 *
 */
export const types = (o: any) => {
  const s = Object.prototype.toString.call(o)
  return s.match(/\[object (.*?)\]/)?.[1].toLowerCase()
}

/**
 * @description 时间戳转化为年 月 日 时 分 秒
 * @function formatTime(format,num)
 * @param {number|Date} [num = new Date().getTime()|new Date] 时间戳或者时间对象,默认使用当前时间戳, new Date().getTime(); 获取当前时间戳（毫秒）
 * @param {string} [format='YYYY-mm-dd HH:MM:SS'] 时间格式,不填时默认使用'YYYY-mm-dd HH:MM:SS'格式,更改只需替换中间连接符号就行'YYYY年mm月dd日 HH时MM分SS秒'
 * @example
    var sjc = 1472048779952; //js一般获取的时间戳是13位，PHP一般是10位
    formatTime(sjc,'YYYY-mm-dd HH:MM:SS')
*/
export const formatTime = (num: number | string | Date = new Date().getTime(), format = '') => {
  format = format || 'YYYY-mm-dd HH:MM:SS' // 第一个参数不填时，使用默认格式
  let ret,
    date: Date,
    reNum

  if (types(num) === 'number') {
    // 处理时间戳，js一般获取的时间戳是13位，PHP一般是10位,根据实际情况做判断处理
    if (num.toString().length === 10) {
      date = new Date((num as number) * 1000)
    } else {
      date = new Date(num)
    }
  } else if (types(num) === 'string') {
    date = new Date(num)
  } else if (types(num) === 'date') {
    date = num as Date
  } else {
    return ''
  }

  const opt = {
    Y: date.getFullYear().toString(), // 年
    m: (date.getMonth() + 1).toString(), // 月
    d: date.getDate().toString(), // 日
    H: date.getHours().toString(), // 时
    M: date.getMinutes().toString(), // 分
    S: date.getSeconds().toString(), // 秒
    // 目前用的是这六种符号,有其他格式化字符需求可以继续添加，值必须转化成字符串
  }
  let k: keyof typeof opt
  for (k in opt) {
    ret = new RegExp(`(${k}+)`).exec(format)
    if (ret) {
      reNum = ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0') // 根据复数前面是否补零,如“mm”补零，单“m”前面不补零
      format = format.replace(ret[1], reNum) // 替换
    }
  }
  return format
}




interface StorageSaveDataType {
  [key: string]: any
}

interface StorageDataType {
  [key: string]: any
}


/**
 * @description 对sessionStorage、localStorage的封装,localStorage默认一直保存数据,seesionStorage关闭标签页或窗口立即清除数据
 * @class CoStorage
 * @example
 * var session=new CoStorage('session','aaasss');
 * session.set('da',{a:1,b:2});
 * session.get('da');
 * session.remove('da');
 */
class CoStorage {
  private type: Storage;
  private prefix: string;
  private length: number;
  /**
   * @param {String} param 使用sessionStorage,还是localStorage，默认使用的是localStorage  
   * @param {String} pre 保存json数据的前缀
   */
  constructor(param: 'sessionStorage'|'localStorage', pre: string = 'co_') {
    this.type = localStorage;
    this.prefix = pre;
    if (param == 'sessionStorage') {
      this.type = sessionStorage;
    }
    this.length = this.type.length; 	//storage的长度
  }
  /**
   * @function 设置缓存数据,思路：封装成一个json数据存进去，保存多长时间、过期时间、保存的数据
   * @method CoStorage.set(name) 调用的是localStorage.setItem(name)或者sessionStorage.setItem(name)
   * @param {string} name  保存数据的key值,必填
   * @param {any} [value='']   需要保存的数据
   * @param {number} [time=0]   过期时间,以毫秒为单位,默认永不过期
   * @example CoStorage.set("aa","123456",5000)
   */
  set(name: keyof StorageDataType, value: StorageDataType[keyof StorageDataType], time = 0) {
    time = isNaN(time - 0) ? 0 : time - 0; //转换成数字,字符串类型的数字也转成数字
    time = time > 0 ? time : 0; //有负数的情况
    let obj: StorageSaveDataType = {};
    obj[this.prefix + 'value'] = value;
    obj[this.prefix + 'time'] = time;
    // obj[this.prefix + 'startTime'] = new Date().getTime() //记录何时将值存入缓存，毫秒级

    if (name) {
      this.type.setItem(name as string, JSON.stringify(obj));
    } else {
      console.log("请先设置name名");
    }
  }
  /**
   * @function 获取缓存数据
   * @method CoStorage.get(name) 调用的是localStorage.getItem(name)或者sessionStorage.getItem(name)
   * @param {string} name  保存数据的key值,必填
   * @example 
   * CoStorage.get("aa")
   */
  get(name: keyof StorageDataType): StorageDataType[keyof StorageDataType] {
    let item = this.type.getItem(name as string);
    if (item) {
      let obj: StorageSaveDataType = {}
      //先尝试进行json字符串转为对象,可能有直接存储字符串的情况
      try {
        obj = JSON.parse(item);
        let date = new Date().getTime(); //获取当前时间
        //  判断有没有设置过期时间、保存数据的格式
        //先判断设置时的时间大于0，是否为数字,过期时间是否也为数字
        if ((!isNaN(obj[this.prefix + 'time'])) && (this.prefix + 'value' in obj)) {
          if (obj[this.prefix + 'time'] == 0 || date < obj[this.prefix + 'time']) { //等于0永不过期      当前时间小于过期时间（还未过期）
            return obj[this.prefix + 'value'];
          } else {   // 已过期
            localStorage.removeItem(name as string);
            return null;
          }
        } else {            //如果没有设置失效时间，直接返回值
          return item
        }

      } catch (error) {
        //如果不行就不是json的字符串，就直接返回
        return item;
        // item = item;
      }

    } else {
      return null;
    }
  }
  /**
   * @function 清除缓存
   * @method CoStorage.remove(name) 调用removeItem(name)或是clear()
   * @param {string} [name]  保存数据的key值,不填清空所有缓存
   * @example CoStorage.remove("aa")
   */
  remove(name: string) {
    if (name) { //有参数清除单条数据
      this.type.removeItem(name);
    }
  }
  /**
   * @function 清除所有缓存
   * @method CoStorage.clear() 调用clear()
   * @example CoStorage.clear()
   */
  clear() {
    this.type.clear();
  }
  /**
   * @function 获取对应键名(下标)
   * @param {number} num 一个整数，表示要获取的键名索引
   * @returns 键名(下标)
   */
  key(num: number) {
    // num向下取整
    num = Math.floor(num);
    if (num >= 0) {
      return this.type.key(num);
    } else {
      return null;
    }
  }
}

export const useWebSession=new CoStorage('sessionStorage')
// export 