<template>
  <div class="line-module">
    <ul class="line-module-left">
      <li v-for="i in length" :key="i" :style="{ opacity: opacitys[i - 1] }"></li>
    </ul>
    <main>
      <div class="sj-box">
        <div class="sj">
          <span></span>
        </div>
      </div>
    </main>
    <ul class="line-module-right">
      <li v-for="i in length" :key="i" :style="{ opacity: opacitys[i - 1] }"></li>
    </ul>
  </div>
</template>

<script>
// https://www.cnblogs.com/telwanggs/p/10975573.html
export default {
  name: "LineModule",
  props: {
    length: {
      type: Number,
      default: 4,
    },
  },
  computed: {
    opacitys() {
      let arr = [];
      for (let i = 1; i <= this.length; i++) {
        arr.push((1 / i) * (1.0 + i * 0.2));
      }
      return arr;
    },
  },
};
</script>

<style lang="less" scoped>
.line-module {
  display: flex;
  align-items: flex-end;
  --color: #0990c5;
  main {
    margin: 0 50px;
    margin-bottom: -5px;
    .sj-box {
      height: 57px;
      width: 84px;
      display: flex;
      justify-content: center;
      overflow: hidden;
      .sj {
        width: 60px;
        height: 60px;
        border: 8px solid var(--color);
        transform: rotate(45deg) translate(20px, 20px);
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          width: 20px;
          height: 20px;
          background-color: var(--color);
        }
      }
    }
  }
  ul {
    display: flex;
    width: max-content;
    li {
      width: 40px;
      height: 8px;
      background-color: var(--color);
      transition: 0.3s;
    }
  }
  &-left {
    transform: skewX(-40deg);
    flex-flow: row-reverse;
    li + li {
      margin-right: 4px;
    }
  }
  &-right {
    transform: skewX(40deg);
    li + li {
      margin-left: 4px;
    }
  }
}
</style>
