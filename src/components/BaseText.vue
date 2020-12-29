<!--
 * @Author: 汪锦
 * @Date: 2020-10-20 17:56:47
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-28 16:08:14
 * @Description: 基本文字
-->
<template>
  <div class="BaseText" :style="styles">{{ text }}</div>
</template>

<script>
import { getNumberUnit } from "@/lib/utils";
export default {
  name: "BaseText",
  props: {
    text: {
      name: "文字",
      type: String,
      default: "普通文字",
    },

    fontSize: {
      name: "字体大小",
      type: [Number, String],
      setupInputType: "number",
      min: 12,
      default: 18,
    },

    color: {
      name: "字体颜色",
      setupType: "color",
      type: String,
      default: "#21DFFF",
    },
  },
  data() {
    return {};
  },
  computed: {
    styles() {
      return {
        fontSize: getNumberUnit(this.fontSize),
        color: this.color,
      };
    },
  },
};
</script>

<style lang="less" scoped></style>
