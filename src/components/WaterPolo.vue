<!--
 * @Author: 汪锦
 * @Date: 2021-01-15 11:48:59
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-01-15 14:19:42
 * @Description: 水球图
-->

<template>
  <div class="WaterPolo" :style="styles">
    <div class="wave"></div>
  </div>
</template>

<script>
export default {
  name: "WaterPolo",
  props: {
    size: {
      name: "大小",
      setupInputType: "number",
      type: Number,
      default: 120,
    },
    color: {
      name: "颜色",
      setupType: "color",
      type: String,
      default: "#76daff",
    },
  },
  computed: {
    styles() {
      return { "--polo-size": this.size + "px", "--polo-color": this.color };
    },
  },
};
</script>

<style lang="less" scoped>
.WaterPolo {
  width: var(--polo-size);
  height: var(--polo-size);
  padding: 5px;
  border: 5px solid var(--polo-color);
  border-radius: 50%;
  overflow: hidden;
  box-sizing: content-box;
}
.wave {
  position: relative;
  width: var(--polo-size);
  height: var(--polo-size);
  background-color: var(--polo-color);
  border-radius: 50%;
  transition: 0.3s;
  &::before,
  &::after {
    content: "";
    position: absolute;
    transition: 0.3s;
    width: calc(var(--polo-size) * 2);
    height: calc(var(--polo-size) * 2);
    top: 0;
    left: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 45%;
    transform: translate(-50%, -70%) rotate(0);
    animation: rotate 6s linear infinite;
    z-index: 10;
  }

  &::after {
    border-radius: 47%;
    background-color: rgba(255, 255, 255, 0.9);
    transform: translate(-50%, -70%) rotate(0);
    animation: rotate 10s linear -5s infinite;
    z-index: 20;
  }
}

@keyframes rotate {
  50% {
    transform: translate(-50%, -73%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -70%) rotate(360deg);
  }
}
</style>
