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

    currentTitleName: '数据大屏',
  },
  mutations: {
    setCurrentTitleName(state, value) {
      state['currentTitleName'] = value
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
  modules: {
    layer,
    backoff,
    codeEditor,
    login
  }
})

export default store