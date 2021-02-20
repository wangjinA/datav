<!--
 * @Author: 汪锦
 * @Date: 2021-02-19 15:28:42
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-02-19 16:45:09
 * @Description: 3d卡片
-->
<template>
  <div class="ThreeCards">
    <div class="economy" v-for="(item, index) in list" :key="index" :style="getStyle(item, index)">
      <div class="slot-default">
        <h3>
          {{ item.name }}
        </h3>
        <span>
          {{ item.info }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// 原文地址： https://jsrun.net/QW6Kp/edit
export default {
  name: "ThreeCards",
  props: {
    list: {
      name: "数据",
      setupCodeType: "json",
      type: Array,
      default: () => [
        {
          name: "大数据可视化",
          info: "niu wa niu wa",
          color: ["#bd7be8", "#8063e1"],
        },
        {
          name: "Vue for datav",
          info: "niu wa niu wa",
          color: ["#7f94fc", "#3f58e3"],
        },
        {
          name: "Business Class",
          info: "niu wa niu wa",
          color: ["#21bbfe", "#2c6fd1"],
        },
        {
          name: "Full Insurance",
          info: "niu wa niu wa",
          color: ["#415197", "#352f64"],
        },
      ],
    },
    gap: {
      name: "上下间距",
      setupInputType: "number",
      type: Number,
      default: 25,
    },
    width: {
      name: "卡片宽度",
      setupInputType: "number",
      type: Number,
      default: 280,
    },
    height: {
      name: "卡片高度",
      setupInputType: "number",
      type: Number,
      default: 140,
    },
  },
  methods: {
    getStyle(item, index) {
      const color1 = item.color[1] || item.color[0];
      const style = {
        "--color": item.color,
        zIndex: this.list.length - index,
        backgroundColor: color1,
        backgroundImage: `linear-gradient(135deg, ${item.color[0]}, ${color1})`,
        boxShadow: `20px 20px 60px rgba(34, 50, 84, 0.5), 1px 1px 0px 1px ${color1}`,
        height: `${this.height}px`,
        width: `${this.width}px`,
      };
      if (index > 0) {
        style.marginTop = -(this.height - this.height * ((this.gap * 2) / 100)) + "px"; // 反向计算 负间距
      }
      if (index === this.list.length - 1) {
        style.boxShadow = `5px 5px 60px rgba(34, 50, 84, 0.1), 1px 1px 0px 1px ${color1}`;
      }
      return style;
    },
  },
};
</script>

<style lang="less" scoped>
.ThreeCards {
  user-select: none;
  transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
  // 底部阴影
  &:after {
    position: absolute;
    bottom: -27px;
    left: 5%;
    content: "";
    width: 65%;
    height: 10px;
    border-radius: 100%;
    background-image: radial-gradient(rgba(34, 50, 84, 0.04), rgba(34, 50, 84, 0));
  }
  > div {
    position: relative;
    border-radius: 12px;
    color: white;
    transform: rotateX(45deg) rotateY(-15deg) rotate(45deg);
    transition: all 0.4s ease;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      transform: rotateX(30deg) rotateY(-15deg) rotate(30deg) translate(-25px, 50px);
      &:after {
        transform: translateX(100%);
        transition: all 1.2s ease-in-out;
      }
    }

    &:after {
      position: absolute;
      top: -70px;
      left: 0;
      content: "";
      width: 200%;
      height: 200%;
      background-image: linear-gradient(
        60deg,
        rgba(255, 255, 255, 0) 20%,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0) 80%
      );
      transform: translateX(-100%);
    }
    .slot-default {
      padding-left: 15px;
      padding-bottom: 15px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    h3 {
      font-size: 18px;
      font-weight: 800;
    }
    span {
      font-weight: 700;
      font-size: 12px;
      font-weight: 600;
      opacity: 0.8;
    }
  }
}
</style>
