export const echartMixin = {
  props: {
    openInterval: {
      // 打开定时器refresh动画  默认开启定时器
      type: Boolean,
      default: true
    },
    openCarousel: {
      // 打开轮播  默认关闭
      type: Boolean,
      default: false
    },
    duration: {
      // 多少毫秒执行一次
      type: Number,
      default: 8000
    }
  },
  methods: {
    __openCarousel() {
      let endValue = this.options.dataZoom[0].endValue;
      this.carousel_timer = setInterval(() => {
        if (this.options.dataZoom[0].endValue == this.options.xAxis.data.length - 1) {
          this.options.dataZoom[0].endValue = endValue
          this.options.dataZoom[0].startValue = 0
        } else {
          this.options.dataZoom[0].endValue = this.options.dataZoom[0].endValue + 1
          this.options.dataZoom[0].startValue = this.options.dataZoom[0].startValue + 1
        }
        this.myChart.setOption(this.options)
      }, this.duration / 2)
    },
    __clearInterval() {
      // 销毁定时器
      clearInterval(this.private_timer)
      clearInterval(this.carousel_timer)
    },
    __openInterval() {
      // 开启定时器
      this.private_timer = setInterval(() => {
        this.refresh(true)
      }, this.duration)
    },
    refresh(relationReize = false) {
      // relationReize：是否关联定时器，可能需要被其他组件调用
      if (relationReize && !this.openInterval) {
        return this.__clearInterval()
      }
      let myChart = this.myChart
      if (myChart) {
        let options = myChart.getOption()
        myChart.clear()
        myChart.setOption(options)
      }
    },
    resize() {
      this.myChart && this.myChart.resize()
    }
  },
  mounted() {
    if (this.openInterval) {
      this.__openInterval()
    }
    if (this.openCarousel) {
      this.__openCarousel()
    }
  },
  destroyed() {
    this.__clearInterval() // 销毁定时器
  }
}

export const globalEchartMixin = {
  mounted() {
    this.$bus_$on('resize', () => {
      // 存在myChart对象则并且窗口发生变化的时候Resize
      if (this.myChart) {
        if (this.myChart.resize && typeof this.myChart.resize === 'function') {
          this.myChart.resize()
        }
      }
    })
  },

}

export default {
  echartMixin,
  globalEchartMixin
}
