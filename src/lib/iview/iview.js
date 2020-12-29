/*
 * @Author: 汪锦
 * @Date: 2020-07-13 09:35:50
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-29 11:05:13
 * @Description: iview配置
 */
import Vue from 'vue'

import 'view-design/dist/styles/iview.css'
import ViewUI from 'view-design'
Vue.use(ViewUI);
const { Message, Modal, Notice, } = ViewUI

Message.config({
  duration: 2.5,
})
// 只是为了默认显示背景颜色。 该死的iview不提供config配置
Vue.prototype.$Message = new Proxy({}, {
  get(target, prop) {
    return (config) => {
      if (config instanceof Object) {
        Message[prop]({
          background: true,
          ...config
        })
      } else {
        Message[prop]({
          content: config,
          background: true
        })
      }
    }
  }
})
Vue.prototype.$Modal = Modal
Vue.prototype.$Notice = Notice
Vue.prototype.$delAPI = (optionOrContent, title) => {
  return new Promise((resolve, reject) => {
    let option = {
      title: title || '温馨提示',
      cancelText: '取消',
      content: optionOrContent || '是否确认删除？',
      loading: true,
      onOk: () => (Modal.remove(), resolve()),
      onCancel: () => (reject()),
    }
    if (typeof optionOrContent === 'object') {
      option = {
        ...option,
        ...optionOrContent
      }
    }
    Modal.confirm(option)
  })
}