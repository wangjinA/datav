<!--
 * @Author: 汪锦
 * @Date: 2020-12-24 15:02:18
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-24 15:48:33
 * @Description: 图片组件
-->

<template>
  <div class="baseImage">
    <img :src="img_src" :style="{ objectFit: fit }" />
  </div>
</template>

<script>
export default {
  name: "BaseImage",
  props: {
    src: {
      name: "选择图片",
      type: String,
      default: "",
      setupType: "img",
    },
    fit: {
      name: "类型",
      type: String,
      default: "fill",
      setupType: "select",
      data: [
        {
          name: "填充",
          value: "fill",
        },
        {
          name: "原大小比例（完全显示）",
          value: "contain",
        },
        {
          name: "原大小比例（填充&裁剪）",
          value: "cover",
        },
      ],
    },
  },
  computed: {
    img_src() {
      return this.$getUrl(this.src);
    },
  },
};
</script>

<style lang="less" scoped>
.baseImage {
  height: 100%;
  width: 100%;
  > img {
    width: 100%;
    height: 100%;
  }
}
</style>
