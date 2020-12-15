/* eslint-disable */
// 深克隆
export const deepClone = (obj, hash = new WeakMap()) => {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}

// 对象转字符串，包括字符串
export const stringify = json => {
  return JSON.stringify(json, (key, val) => {
    if (typeof val === 'function') {
      return val.toString();
    }
    return val;
  });
}


// 字符串转对象，包括函数
export const parse = str => {
  return JSON.parse(str, function (k, v) {
    if (v.indexOf && (v.indexOf('function') > -1 || v.indexOf('=>') > -1)) {
      return eval("(function(){return " + v + " })()")
    }
    return v;
  });
}

/**
 * @description 指定范围随机数字
 * @param {Number} min 最小数  
 * @param {Number} max 最大数  
 * @return {Number} 返回数字
 */
export const randomNumber = (min = 0, max = 10) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
* @description 指定长度随机字符串
* @param {Number} length 随机字符串长度  
* @param {Number} chats 可自定义字符串列表  
* @return {String} 英文和数字的随机字符串
*/
export const randomString = (length = 10, chats) => {
  if (!chats) chats = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  let str = ''
  for (let i = 0; i < length; i++) {
    let num = randomNumber(0, chats.length - 1)
    str += chats[num]
  }
  return str
}

/**
* @description 获取数字，字符串转数字，失败返回0
* @param {Number} value 字符串  
* @return {Number} 返回数字
*/
export const getInt = (value) => {
  let _v = parseInt(value)
  if (isNaN(_v)) {
    return 0
  }
  return _v
}

/**
* @description 默认获取百分比，如果传了target，会乘以target
* @param {Number} value 字符串  
* @param {Number} target 数字
*/
export const getBfb = (value, target) => {
  if (typeof value === 'string') {
    if (value.indexOf('%') != -1) {
      let _v = value.replace('%', '')
      _v = getInt(_v) / 100
      target && (_v = _v * target)
      return _v
    } else if (isNaN(parseInt(value))) {
      return value.replace(/[^0-9]/ig, "");
    } else {
      return parseInt(value)
    }
  }
  return value
}

// 防抖函数
export const debounce = (fn, delay = 200) => {
  // 维护一个 timer
  let timer = null;

  return function () {
    // 获取函数的作用域和变量
    let context = this;
    let args = arguments;

    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay)
  }
}

// 时间格式化
export const getDateTimeFormat = (datetime, format = 'yyyy-MM-dd hh:mm:ss') => {
  let date = datetime ? new Date(datetime) : new Date()
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}