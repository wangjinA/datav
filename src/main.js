import Vue from 'vue'
import App from './App.vue'

import './style/reset.less'
import './style/variable.less'

import axios from './myAxios'
Vue.use(axios)

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
window.$echarts = echarts

import store from './store'
import router from './router'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
