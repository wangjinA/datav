/*
 * @Author: 汪锦
 * @Date: 2020-12-31 15:57:00
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-31 16:24:14
 * @Description: 代码编辑器 - 弹窗
 */

let callback = null
export default {
  namespaced: true,
  state: {
    codeType: 'javascript',
    editorShow: false,
    code: '',
    isBeautifier: true
  },
  mutations: {
    editorOpen(state, params) {
      state.editorShow = true
      state.code = params.code
      state.codeType = params.codeType || params.type
      /* eslint-disable */
      state.isBeautifier = params.hasOwnProperty('isBeautifier') ? params.isBeautifier : true
      callback = params.callback || (() => { }) // 回调函数
    },
    editorClose(state) {
      state.editorShow = false
      callback = null
    },
    onChange(state, code) {
      callback(code)
    }
  },
}