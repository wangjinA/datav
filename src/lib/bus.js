import Vue from 'vue'
const bus = new Vue()

const busMixins = { // bus注册，使用$bus_$on, 在组件销毁之前，会自动销毁注册事件
  data() {
    return {
      private_busNames: []
    }
  },
  methods: {
    $bus_$on(busName, fun) {
      this.private_busNames.push(busName)
      this.$bus.$on(busName, fun)
    }
  },
  beforeDestroy() {
    this.private_busNames.forEach(busName => {
      this.$bus.$off(busName)
    })
  }
}

Vue.mixin(busMixins)
Vue.prototype.$bus = bus
export default bus