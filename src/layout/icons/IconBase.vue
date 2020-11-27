<template>
  <svg
    class="icon-base"
    ref="IconBase"
    :width="width"
    :height="height"
    viewBox="0 0 1024 1024"
    v-html="svgList[iconName]"
  ></svg>
</template>

<script>
// 图标地址
// https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=18346
// https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=17314
const mainClass = "main-path";
const secondClass = "second-path";
const svgList = {
  zzt: `
    <path d="M85.333333 384h213.333334v128H85.333333z" class="${secondClass}"/>
    <path d="M85.333333 512h213.333334v341.333333H85.333333z" class="${mainClass}"/>
    <path d="M405.333333 170.666667h213.333334v170.666666H405.333333z" class="${secondClass}"/>
    <path d="M405.333333 341.333333h213.333334v512H405.333333z" class="${mainClass}"/>
    <path d="M725.333333 298.666667h213.333334v170.666666H725.333333z" class="${secondClass}"/>
    <path d="M725.333333 469.333333h213.333334v384H725.333333z" class="${mainClass}"/>
  `,
  wenzi: `
    <path d="M576 192H192v192h64V256h192v512h-64v64h256v-64h-64V256h192v128h64V192z" class="${mainClass}"></path>
  `,
};
import Vivus from "vivus";
export default {
  name: "IconBase",
  props: {
    width: {
      type: [Number, String],
      default: 33,
    },
    height: {
      type: [Number, String],
      default: 33,
    },
    iconName: {
      type: String,
      default: "zzt",
    },
  },
  data() {
    return {
      svgList,
    };
  },
  mounted() {
    new Vivus(this.$refs.IconBase, { duration: 40 }, (e) => {
      console.log(e);
      e.el.classList.add("finished");
    });
  },
};
</script>

<style lang="less">
.icon-base {
  stroke: var(--icon-color);
  stroke-width: 20;
  * {
    fill-opacity: 0;
    transition: fill-opacity, stroke-width 0.5s;
  }
  &.finished {
    .main-path {
      fill-opacity: 1;
      fill: var(--icon-color);
    }
    .second-path {
      fill-opacity: 0.2;
      fill: var(--icon-color);
    }
    stroke-width: 0;
  }
}
</style>
