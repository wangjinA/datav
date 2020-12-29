import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import { randomString } from '@/lib/utils'
import backoff from './modules/backoff'
import { API } from '@/api'
import router from '@/router'
const store = new Vuex.Store({
  state: {
    datavInfo: null,
    resourceLayers: [], // 项目的所有图层
    activeLayer: null, // 选中的图层

    LayerHistoryIndex: 0,
    layerHistoryList: [],

    currentTitleName: '数据大屏',
  },
  mutations: {
    setCurrentTitleName(state, value) {
      state['currentTitleName'] = value
    },

    // 添加图层
    addLayer(state, value) {
      const { resourceLayers } = state
      value.$vueKey = randomString()
      resourceLayers.push(value)
      this.commit('setActiveLayer', value)
      this.commit('setLayerHistoryList')
      this.dispatch('updateLayers', {
        name: '添加图层：' + value.name
      })
    },
    // 初始化图层
    initLayer(state, value) {
      if (value instanceof Array) {
        state['resourceLayers'] = value
        this.commit('backoff/initHistory', value)
        // 设置选中图层
        const activeLayer = value.filter(item => item.active)[0]
        if (activeLayer) {
          this.commit('setActiveLayer', activeLayer)
        }
      } else {
        console.log(value);
        console.error('init value not Array')
      }
    },
    // 重置图层 - 和初始化图层方法一样，不过内涵操作不一样；初始化是通过id初始化，重置是在这个id基础上重置，包含ctrl+z+y的图层覆盖
    resetLayer(state, value) {
      if (value instanceof Array) {
        console.log(value);
        state['resourceLayers'] = value
        // 设置选中图层
        const activeLayer = value.filter(item => item.active)[0]
        if (activeLayer) {
          this.commit('setActiveLayer', activeLayer)
        }
      } else {
        console.log(value);
        console.error('init value not Array')
      }
    },

    // 删除单个图层
    removeLayer(state, value) {
      const { resourceLayers, activeLayer } = state
      // 删除的如果是选中的
      if (value === activeLayer) {
        this.commit('setActiveLayer', null)
      }
      const index = resourceLayers.findIndex(item => item === value) // 通过下标删除
      if (index !== -1) {
        resourceLayers.splice(index, 1)
        this.commit('setLayerHistoryList')
        this.dispatch('updateLayers', {
          name: '删除图层：' + value.name
        })
      }
    },

    // 清空图层 设置为空数组
    clearLayer(state) {
      state['resourceLayers'] = []
    },

    // 设置选中图层
    setActiveLayer(state, item) {
      state['resourceLayers'].forEach(_item => {
        _item.active = false
      })
      item && (item.active = true)
      state['activeLayer'] = item
    },

    setDatavInfo(state, value) {
      state['datavInfo'] = value
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
  },
  actions: {
    // 画布图层组件更新
    updateLayers({ state, commit }, params) {
      console.log(params);
      API.updateLayers(state['resourceLayers'], router.app.$route.params.id)
        .then((res) => {
          if (res.data !== "暂无更改") {
            commit('backoff/addHistory', state['resourceLayers']);
          }
        })
    },
    // 项目配置设置更新
    updateDatavInfo({ state }, params) {
      console.log(params);
      const { datavInfo } = state
      API.updateDatav({
        id: datavInfo.id,
        name: datavInfo.name,
        preview_img: datavInfo.preview_img,
        style: JSON.stringify(datavInfo.style),
      }, router.app.$route.params.id);
    }
  },
  modules: {
    backoff
  }
})

export default store