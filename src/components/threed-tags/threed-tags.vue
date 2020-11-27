<!--
 * @Author: 汪锦
 * @Date: 2020-04-03 14:33:47
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-11-25 17:58:00
 * @Description: 3D动画标签
 -->
<template>
  <div class="tagBall" ref="tagBall" @mouseover="onmousemove">
    <span class="tagItem" v-for="(item, i) in list" :key="i" ref="tagItem">{{ item }}</span>
  </div>
</template>

<script>
export default {
  name: "threedTags",
  props: {
    speed: {
      // 数值越大，速度慢
      type: Number,
      default: 1,
    },
    list: {
      type: Array,
      required: true,
    },
    colorRange: {
      // 颜色范围
      type: Array,
      default: () => ["#04FBFF", "#00A8FF"],
    },
  },
  data() {
    return {};
  },
  computed: {
    privatSpeed() {
      if (this.speed >= 10) {
        return 10;
      } else if (this.speed <= 0) {
        return 1;
      }
      return this.speed;
    },
  },
  methods: {
    // 指定范围小数
    getRandom(start, end, fixed = 0) {
      let differ = end - start;
      let random = Math.random();
      return (start + differ * random).toFixed(fixed);
    },
    init() {
      let _this = this;
      let tag = function(ele, x, y, z) {
        this.ele = ele;
        this.x = x;
        this.y = y;
        this.z = z;
      };
      tag.prototype = {
        move: function() {
          let scale = _this.fallLength / (_this.fallLength - this.z);
          let alpha = (this.z + _this.RADIUS) / (2 * _this.RADIUS);
          let left = this.x + _this.CX - this.ele.offsetWidth / 2 + "px";
          let top = this.y + _this.CY - this.ele.offsetHeight / 2 + "px";
          let transform = "translate(" + left + ", " + top + ") scale(" + scale + ")";
          this.ele.style.opacity = alpha + 0.5;
          this.ele.style.zIndex = parseInt(scale * 100);
          this.ele.style.transform = transform;
          this.ele.style.webkitTransform = transform;
        },
      };
      (this.tagEle = this.$refs.tagItem),
        (this.paper = this.$refs.tagBall),
        (this.paperWidth = this.paper.offsetWidth);
      this.paperHeight = this.paper.offsetHeight;
      (this.RADIUS = this.paperHeight / 2.5),
        (this.fallLength = this.paperWidth),
        (this.tags = []),
        (this.angleX = Math.PI / this.paperWidth / 1 / this.privatSpeed),
        (this.angleY = Math.PI / this.paperHeight / 1 / this.privatSpeed),
        (this.CX = this.paperWidth / 2),
        (this.CY = this.paperHeight / 2),
        (Array.prototype.$forEach = function(callback) {
          for (let i = 0; i < this.length; i++) {
            callback.call(this[i]);
          }
        });
      for (let i = 0; i < this.tagEle.length; i++) {
        let k = -1 + (2 * (i + 1) - 1) / this.tagEle.length;
        let a = Math.acos(k);
        let b = a * Math.sqrt(this.tagEle.length * Math.PI);
        let x = this.RADIUS * Math.sin(a) * Math.cos(b);
        let y = this.RADIUS * Math.sin(a) * Math.sin(b);
        let z = this.RADIUS * Math.cos(a);
        let t = new tag(this.tagEle[i], x, y, z);
        this.tagEle[i].style.color = this.colorRange[this.getRandom(0, this.colorRange.length)];
        this.tags.push(t);
        t.move();
      }
    },
    rotateX() {
      let cos = Math.cos(this.angleX);
      let sin = Math.sin(this.angleX);
      this.tags.$forEach(function() {
        let y1 = this.y * cos - this.z * sin;
        let z1 = this.z * cos + this.y * sin;
        this.y = y1;
        this.z = z1;
      });
    },
    rotateY() {
      let cos = Math.cos(this.angleY);
      let sin = Math.sin(this.angleY);
      this.tags.$forEach(function() {
        let x1 = this.x * cos - this.z * sin;
        let z1 = this.z * cos + this.x * sin;
        this.x = x1;
        this.z = z1;
      });
    },
    onmousemove() {
      let EX =
        this.paper.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft;
      let EY = this.paper.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;
      let x = event.clientX - EX - this.CX;
      let y = event.clientY - EY - this.CY;
      this.angleY = x * 0.00005;
      this.angleX = y * 0.00005;
    },
    animate() {
      this.rotateX();
      this.rotateY();
      this.tags.$forEach(function() {
        this.move();
      });
      this.requestId = requestAnimationFrame(this.animate);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.animate();
    });
  },
  destroyed() {
    cancelAnimationFrame(this.requestId);
  },
};
</script>

<style lang="less">
.tagBall {
  height: 100%;
  position: relative;
  user-select: none;
  .tagItem {
    display: block;
    position: absolute;
    left: 0px;
    top: 0px;
    color: #00a8ff;
    text-decoration: none;
    font-size: 15px;
    will-change: transform;
    font-family: "MicrosoftYaHei";
    &:hover {
      cursor: pointer;
      border: 1px solid #666;
      padding: 0 5px;
    }
  }
}
</style>
