<template>
  <div class="line-module">
    <ul class="line-module-left">
      <li
        v-for="i in length"
        :key="i"
        :style="{ opacity: 1 / (length - (i - 1)) * (1.0 + (length - (i - 1))  * 0.2) }"
      ></li>
    </ul>
    <main></main>
    <ul class="line-module-right">
      <li
        v-for="i in length"
        :key="i"
        :style="{ opacity: (1 / i) * (1.0 + i * 0.2) }"
      ></li>
    </ul>
  </div>
</template>

<script>
// https://www.cnblogs.com/telwanggs/p/10975573.html
export default {
  props: {
    length: {
      type: Number,
      default: 4,
    },
  },
};
</script>


<style lang="less" scoped>
.line-module {
  display: flex;
  main {
    margin: 20px;
  }
  ul {
    display: flex;
    width: max-content;
    li {
      width: 40px;
      height: 8px;
      background-color: #00affc;
      & + li {
        margin-left: 4px;
      }
    }
  }
  &-left {
    transform: skewX(-40deg);
  }
  &-right {
    transform: skewX(40deg);
  }
}
</style>
