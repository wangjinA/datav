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
    text: String,
    speed: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      nowTime: null, //定时器标识
      $width: 0, //每一个内容的宽度
    };
  },
  watch: {
    text() {
      this.$nextTick(this.init)
    },
    speed() {
      this.$nextTick(this.init)
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
      this.destroy()
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
      if(this.$width > this.$refs.ScrollText.clientWidth){
        this.moveLeft();
      }else {
        this.destroy()
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
