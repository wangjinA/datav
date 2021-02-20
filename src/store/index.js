import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import backoff from './modules/backoff'
import codeEditor from './modules/codeEditor'
import layer from './modules/layer'
import login from './modules/login'
const store = new Vuex.Store({
  state: {
    LayerHistoryIndex: 0,
    layerHistoryList: [],

    currentWorkSpace: {
      id: 0,
      name: '数据大屏'
    },
  },
  mutations: {
    setCurrentWorkSpace(state, value) {
      state['currentWorkSpace'] = value
    },

    // 设置图层记录
    // setLayerHistoryList(state) {
    //   const { layerHistoryList, resourceLayers } = state
    //   layerHistoryList.push(resourceLayers)
    //   state['LayerHistoryIndex']++
    // },
    // 图层撤销
    // backLayer(state) {
    //   const { layerHistoryList, LayerHistoryIndex } = state
    //   if (LayerHistoryIndex > 1) {
    //     state['resourceLayers'] = layerHistoryList[LayerHistoryIndex - 1]
    //     state['LayerHistoryIndex']--
    //   }
    // }
  },
  actions: {
    // 下载组件，传递组件名
    downloadCom(store, componentName) {
      const token = window.sessionStorage.getItem('token')
      window.open(`${window.$baseUrl}/api/downloadComponent?name=${componentName}&token=${token}`);
    }
  },
  modules: {
    layer,
    backoff,
    codeEditor,
    login
  }
})

export default store