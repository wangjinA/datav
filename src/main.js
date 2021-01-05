import Vue from 'vue'
import App from './App.vue'

import './style/reset.less'
import './style/variable.less'

import '@/lib/bus'
import '@/lib/iview/index.js'

window.$baseUrl = process.env.NODE_ENV === "development" ? '/api' : ''
Vue.prototype.$baseUrl = window.$baseUrl
import axios from './myAxios'
Vue.use(axios)
import './api'

Vue.config.productionTip = false
// import VueDraggableResizable from 'vue-draggable-resizable';
// import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
// Vue.component('vue-draggable-resizable', VueDraggableResizable);

// https://github.com/gorkys/vue-draggable-resizable-gorkys
import VueDraggableResizable from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable);

// echarts
import echarts from 'echarts'
window.echarts = echarts
Vue.prototype.echarts = echarts

import store from './store'
import router from './router'

Vue.prototype.$getUrl = (imgName, isDefault = true) => {
  let src = ''
  if (isDefault && !imgName) {
    imgName = 'datav_default.png'
  }
  src = `/public/images/datav/${imgName}`
  if (process.env.NODE_ENV === "development") {
    src = window.$baseUrl + src
  }
  return src
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
