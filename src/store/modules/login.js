/*
 * @Author: 汪锦
 * @Date: 2020-12-31 15:57:00
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-02-18 09:48:55
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
    async loginOut({ state }, isDelAPI = true) {
      if (isDelAPI) {
        try {
          await $delAPI('确认退出')
          state['userInfo'] = {}
          sessionStorage.clear('token')
          isDelAPI && $Message.success('退出成功')
          router.push('/login')
        } catch (e) {
          e
        }
      }
    }
  },
}