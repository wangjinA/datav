<!--
 * @Author: 汪锦
 * @Date: 2020-10-20 17:56:47
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-11-27 11:44:18
 * @Description: 滚动文字 - 文字跑马灯
-->
<template>
  <div class="ScrollText">
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
  },
  data() {
    return {
      nowTime: null, //定时器标识
      disArr: [], //每一个内容的宽度
    };
  },
  mounted() {
    this.disArr = [this.$refs.content.clientWidth];
    this.moveLeft();
  },
  beforeDestroy() {
    clearInterval(this.nowTime); //页面关闭清除定时器
    this.nowTime = null; //清除定时器标识
  },
  methods: {
    //获取margin属性
    getMargin(obj) {
      var marg = window.getComputedStyle(obj, null)["margin-right"];
      marg = marg.replace("px", "");
      return Number(marg); //强制转化成数字
    },
    //移动的方法
    moveLeft() {
      var outbox = this.$refs.box;
      var that = this;
      var startDis = 0; //初始位置
      this.nowTime = setInterval(function() {
        startDis -= 0.5;
        if (Math.abs(startDis) > Math.abs(that.disArr[0])) {
          that.disArr.push(that.disArr.shift()); //每次移动完一个元素的距离，就把这个元素的宽度
          that.text.push(that.text.shift()); //每次移动完一个元素的距离，就把列表数据的第一项放到最后一项
          startDis = 0;
        }
        outbox.style = "transform: translateX(" + startDis + "px)"; //每次都让盒子移动指定的距离
      }, 1000 / 60);
    },
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
