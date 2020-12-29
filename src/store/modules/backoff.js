/*
 * @Author: 汪锦
 * @Date: 2020-12-21 17:11:09
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-28 14:31:27
 * @Description: 回退操作 - 有BUG
 */


let historyList = [];
let historyIndex = 0;
import { deepClone } from "@/lib/utils";
const isClose = false // 撤销功能未完善 - 记录有问题 先关闭
export default {
  namespaced: true,
  mutations: {
    // 初始化记录
    initHistory(state, option) {
      if (isClose) return;
      historyList = [deepClone(option)]
      historyIndex = 0
      console.log(historyList);
    },

    // 添加记录
    addHistory(state, option) {
      if (isClose) return;
      historyList.push(deepClone(option))
      historyIndex = historyList.length - 1
      console.log(historyIndex);
    },
    // 撤销
    revoke() {
      if (historyIndex <= 0) {
        console.log("不可撤销，下标索引 <= 0");
      } else {
        this.commit('resetLayer', historyList[--historyIndex]);
      }
    },
    // 还原
    reduction() {
      if (historyIndex >= historyList.length - 1) {
        console.log("不可还原，下标索引 >= 记录长度");
      } else {
        this.commit('resetLayer', historyList[++historyIndex]);
      }
    },
  },
}