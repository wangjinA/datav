/*
 * @Author: 汪锦
 * @Date: 2020-12-21 17:38:06
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-31 17:29:15
 * @Description: 图层管理
 */

import { randomString } from '@/lib/utils'
import { API } from '@/api'
import router from '@/router'
export default {
  namespaced: true,
  state: {
    datavInfo: null,
    resourceLayers: [], // 项目的所有图层
    activeLayer: null, // 选中的图层
  }
  ,
  mutations: {
    // 添加图层
    addLayer(state, value) {
      const { resourceLayers } = state
      value.$vueKey = randomString()
      resourceLayers.push(value)
      this.commit('layer/setActiveLayer', value)
      this.commit('layer/setLayerHistoryList')
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
          console.log(this);
          console.log(state);
          this.commit('layer/setActiveLayer', activeLayer)
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
          this.commit('layer/setActiveLayer', activeLayer)
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
        this.commit('layer/setActiveLayer', null)
      }
      const index = resourceLayers.findIndex(item => item === value) // 通过下标删除
      if (index !== -1) {
        resourceLayers.splice(index, 1)
        this.commit('layer/setLayerHistoryList')
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

  },
  actions: {
    // 画布图层组件更新
    updateLayers({ state }, params) {
      console.log(params);
      API.updateLayers(state['resourceLayers'], router.app.$route.params.id)
        .then((res) => {
          if (res.data !== "暂无更改") {
            this.commit('backoff/addHistory', state['resourceLayers']);
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
}