import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    resourceLayers: [],
    activeLayer: null,

    LayerHistoryIndex: 0,
    layerHistoryList: [],

  },
  mutations: {
    // 添加图层
    addLayer(state, value) {
      const { resourceLayers } = state
      const resource_filter = resourceLayers.filter(item => item.id === value.id)
      if (resource_filter.length > 0) {
        value.name += resource_filter.length
      }
      resourceLayers.push(value)
      this.commit('setLayerHistoryList')
    },
    // 初始化图层
    initLayer(state, value) {
      state['resourceLayers'] = value
    },

    // 删除图层
    removeLayer(state, value) {
      const { resourceLayers } = state
      const index = resourceLayers.findIndex(item => item === value) // 通过下标删除
      if (index !== -1) {
        resourceLayers.splice(index, 1)
        this.commit('setLayerHistoryList')
      }
    },


    // 设置选中图层
    setActiveLayer(state, item) {
      state['activeLayer'] = item
    },

    // 设置图层记录
    setLayerHistoryList(state) {
      const { layerHistoryList, resourceLayers } = state
      layerHistoryList.push(resourceLayers)
      state['LayerHistoryIndex']++
    },
    // 图层撤销
    backLayer(state) {
      const { layerHistoryList, LayerHistoryIndex } = state
      if (LayerHistoryIndex > 1) {
        state['resourceLayers'] = layerHistoryList[LayerHistoryIndex - 1]
        state['LayerHistoryIndex']--
      }
    }
  }
})

export default store