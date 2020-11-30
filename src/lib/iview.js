/*
 * @Author: 汪锦
 * @Date: 2020-07-13 09:35:50
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-11-30 15:01:28
 * @Description: iview配置
 */
import Vue from 'vue'

import 'view-design/dist/styles/iview.css'
import ViewUI from 'view-design'
Vue.use(ViewUI);
const { Message, Modal, Notice, } = ViewUI

Message.config({
  duration: 2.5,
  background: true,
})
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.prototype.$Notice = Notice
Vue.prototype.$delAPI = (option) => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: '删除提醒',
      cancelText: '取消',
      content: '是否确认删除？',
      loading: true,
      onOk: () => (Modal.remove(), resolve()),
      onCancel: () => (reject()),
      ...option
    })
  })
}