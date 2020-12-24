<!--
 * @Author: 汪锦
 * @Date: 2020-10-20 17:56:47
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-01 16:24:35
 * @Description: 滚动文字 - 文字跑马灯
-->
<template>
  <div class="ScrollText" ref="ScrollText">
    <div class="my-inbox" ref="box">
      <div class="ScrollText-content" ref="content">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollText",
  props: {
    text: {
      name: "文本",
      type: String,
      default:
        "风圈半径：七级风圈半径 东北方向200公里；东南方向170公里；西南方向120公里；西北方向140公里 十级风圈半径　东北方向60公里；东南方向50公里；西南方向30公里；西北方向40公里预报结论：“白海豚”将以每小时15-20公里的速度向东北方向移动，强度变化不大时 间：23 日 10 时命 名：“白海豚”，DOLPHIN中心位置：北纬31.0度、东经137.0度强度等级：强热带风暴最大风力：10级， 28米/秒（约101公里/小时）中心气压：980 hPa参考位置：位于日本以南洋面，距离日本东京南偏西方向约580公里",
    },
    speed: {
      type: Number,
      default: 60,
    },
  },
  data() {
    return {
      nowTime: null, //定时器标识
      $width: 0, //每一个内容的宽度
    };
  },
  watch: {
    text() {
      this.$nextTick(this.init);
    },
    speed() {
      this.$nextTick(this.init);
    },
  },
  methods: {
    //获取margin属性
    getMargin(obj) {
      let marg = window.getComputedStyle(obj, null)["margin-right"];
      marg = marg.replace("px", "");
      return Number(marg); //强制转化成数字
    },
    //移动的方法
    moveLeft() {
      this.destroy();
      let startDis = 0; //初始位置
      this.nowTime = setInterval(() => {
        startDis -= 0.5;
        if (Math.abs(startDis) > Math.abs(this.$width)) {
          startDis = this.$refs.ScrollText.clientWidth;
        }
        this.$refs.box.style = "transform: translateX(" + startDis + "px)"; //每次都让盒子移动指定的距离
      }, 1000 / this.speed);
    },
    destroy() {
      clearInterval(this.nowTime); //页面关闭清除定时器
      this.nowTime = null; //清除定时器标识
      this.$refs.box.style = "transform: translateX(0px)"; //每次都让盒子移动指定的距离
    },
    init() {
      this.$width = this.$refs.content.clientWidth;
      if (this.$width > this.$refs.ScrollText.clientWidth) {
        this.moveLeft();
      } else {
        this.destroy();
      }
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
};
</script>

<style lang="less" scoped>
.ScrollText {
  color: #000;
  width: calc(100% - 60px);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid #b1f5ff;
  // background: #422b02;
  .my-inbox {
    white-space: nowrap;
    .ScrollText-content {
      color: rgba(255, 255, 255, 0.7);
      margin-right: 25px;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>
