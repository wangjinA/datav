/*
 * @Author: 汪锦
 * @Date: 2020-06-19 11:32:06
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-11-27 17:58:51
 * @Description: 通过原生fetch封装请求
 */
// import { Message } from 'view-design'
const qs = require('qs')
const requestAPI = (url, options, showInfo = false) => {
  return fetch(url, {
    body: options.data, // must match 'Content-Type' header
    cache: 'reload', // *default, no-cache, reload, force-cache, only-if-cached
    //reload 表示本次请求忽略浏览器已经有的缓存（相当于 Ctrl + R 强制刷新），但本次请求的结果还是会遵循响应的 Cache-Control 标头的值来进行缓存存储。
    // 跟 no-store 的不同点在于 no-store 本次请求强制刷新了，下次如果另一个请求 Cache-Control 再指定成别的值比如 only-if-cached，完全不会命中缓存，
    // 因为 no-store 压根没把响应结果存在本地；而 reload 第一次强制刷新，第二次是的 only-if-cached 之类的就会命中缓存。
    headers: {
      'content-type': 'application/json',
      token: localStorage.getItem('token')
    },
    method: options.method || 'GET', // *GET, POST, PUT, DELETE, etc.
    // credentials: 'same-origin', // include, same-origin, *omit
    // mode: 'no-cors', // no-cors, cors, *same-origin
    // redirect: 'follow', // manual, *follow, error
    // referrer: 'no-referrer', // *client, no-referrer
    credentials: 'include',//为了在当前域名内自动发送 cookie ， 必须提供这个选项
    ...options
  }).then(response => {
    console.log(response);
    return response.json().then(res => {
      console.log(showInfo, res.message);
      // if (showInfo && res.message) {
      //   Message[res.status ? 'success' : 'error']({
      //     content: res.message,
      //     duration: 2.2,
      //     background: true
      //   })
      // }
      return res
    })
  })
}

function $get(url, params, showInfo) {
  url = url.split('?')[0] + '?' + qs.stringify(params)
  return requestAPI(url, {
    method: 'GET'
  }, showInfo)
}
function $post(url, params, showInfo) {
  return requestAPI(url, {
    body: JSON.stringify(params),
    method: 'POST',
  }, showInfo)
}

export default {
  install(Vue) {
    Vue.prototype.$get = $get
    Vue.prototype.$post = $post
  }
}