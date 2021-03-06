/*
 * @Author: 汪锦
 * @Date: 2020-06-19 11:32:06
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-02-20 10:56:47
 * @Description: 通过原生fetch封装请求
 */
import { Message } from 'view-design'
const qs = require('qs')
import router from "@/router";
console.log(router);
let $timer = null
const requestAPI = (url, options, showInfo = false) => {
  url = window.$baseUrl + url
  if (!(options.body instanceof FormData)) {
    options.headers = {
      'content-type': 'application/json',
    }
    options.body = JSON.stringify(options.body)
  }
  const _option = {
    cache: 'reload', // *default, no-cache, reload, force-cache, only-if-cached
    //reload 表示本次请求忽略浏览器已经有的缓存（相当于 Ctrl + R 强制刷新），但本次请求的结果还是会遵循响应的 Cache-Control 标头的值来进行缓存存储。
    // 跟 no-store 的不同点在于 no-store 本次请求强制刷新了，下次如果另一个请求 Cache-Control 再指定成别的值比如 only-if-cached，完全不会命中缓存，
    // 因为 no-store 压根没把响应结果存在本地；而 reload 第一次强制刷新，第二次是的 only-if-cached 之类的就会命中缓存。
    method: options.method || 'GET', // *GET, POST, PUT, DELETE, etc.
    // credentials: 'same-origin', // include, same-origin, *omit
    // mode: 'no-cors', // no-cors, cors, *same-origin
    // redirect: 'follow', // manual, *follow, error
    // referrer: 'no-referrer', // *client, no-referrer
    credentials: 'include',//为了在当前域名内自动发送 cookie ， 必须提供这个选项
    ...options,
  }
  _option.headers = _option.headers || {}
  _option.headers.token = window.sessionStorage.getItem('token')
  return fetch(url, _option).then(response => {
    return response.json().then(res => {
      console.log(response);
      if (response.status === 401) {
        console.log(1);
        clearTimeout($timer)
        $timer = setTimeout(() => {
          Message.warning({
            content: res.message,
            duration: 2.2,
            background: true
          })
          router.app.$store.dispatch('login/loginOut', false)
        }, 200);
      }
      if (showInfo && res.message) {
        Message[res.status ? 'success' : 'error']({
          content: res.message,
          duration: 2.2,
          background: true
        })
      }
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
function bodyFactory(method, url, params, showInfo) {
  const options = {
    body: params,
    method: method,
  }
  return requestAPI(url, options, showInfo)
}
export function install(Vue) {
  Vue.prototype.$get = $get
  // url, params, showInfo
  Vue.prototype.$post = function () {
    return bodyFactory('POST', ...arguments)
  }
  Vue.prototype.$put = function () {
    return bodyFactory('PUT', ...arguments)
  }
  Vue.prototype.$del = function () {
    return bodyFactory('DELETE', ...arguments)
  }
  return Vue
}
export default {
  install
}