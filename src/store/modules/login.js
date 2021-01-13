/*
 * @Author: 汪锦
 * @Date: 2020-12-31 15:57:00
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-01-13 09:49:47
 * @Description: 登录
 */
import { $delAPI, $Message } from "@/lib/iview/iview.js";
import router from '@/router'
export default {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo(state, value) {
      state['userInfo'] = value
    }
  },
  actions: {
    loginOut({ state }) {
      return $delAPI('确认退出')
        .then(() => {
          state['userInfo'] = {}
          sessionStorage.clear('token')
          $Message.success('退出成功')
          router.push('/login')
        })
    }
  },
}