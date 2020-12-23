/*
 * @Author: 汪锦
 * @Date: 2020-12-22 15:28:05
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-23 09:28:05
 * @Description: 容器的配置操作
 */


import { getInt } from "@/lib/utils";
export default {
  methods: {

    // 调整位置
    onWrapDragging(...position) {
      const x = position[0];
      const y = position[1];
      this.$set(this.datavInfo.style, 'x', x)
      this.$set(this.datavInfo.style, 'y', y)
    },
    // 调整大小 
    onWrapResize(...size) {
      const x = size[0];
      const y = size[1];
      const w = size[2];
      const h = size[3];
      this.$set(this.datavInfo.style, 'x', x)
      this.$set(this.datavInfo.style, 'y', y)
      this.$set(this.datavInfo.style, 'w', w)
      this.$set(this.datavInfo.style, 'h', h)
    },
  },
  computed: {
    getWrapBaseOption() {
      if (!this.datavInfo) {
        return {}
      }
      let { w, h, x, y } = this.datavInfo.style;
      if (this.readonly) {
        x = y = 0
      }
      return {
        w: getInt(w),
        h: getInt(h),
        x: getInt(x),
        y: getInt(y),
      };
    },
  }
}