<!--
 * @Author: 汪锦
 * @Date: 2020-10-20 17:56:47
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-18 01:06:52
 * @Description: 数字组件
-->
<template>
  <div class="BaseNumber">
    <v-countup :end-value="value" :style="valueStyles"></v-countup>
    <span :style="companyStyles">{{company}}</span>
  </div>
</template>

<script>
import { getNumberUnit } from "@/lib/utils";
import vCountup from "vue-countupjs";
vCountup.props.options.default = () => ({
  separator: "",
});
export default {
  name: "BaseNumber",
  props: {
    value: {
      name: "数字",
      type: Number,
      default: 1000,
      setupInputType: "number",
    },

    color: {
      name: "字体颜色",
      setupType: "color",
      type: String,
      default: "#21DFFF",
    },

    fontSize: {
      name: "字体大小",
      min: 0,
      setupInputType: "number",
      type: [Number, String],
      default: 30,
    },

    company: {
      name: "单位",
      type: String,
      default: "单位",
    },

    companyColor: {
      name: "单位字体颜色",
      setupType: "color",
      type: String,
      default: "#21DFFF",
    },

    companyFontSize: {
      name: "单位字体大小",
      min: 0,
      setupInputType: "number",
      type: [Number, String],
      default: 18,
    },
  },
  components: {
    vCountup,
  },
  data() {
    return {};
  },
  computed: {
    valueStyles() {
      return {
        fontSize: getNumberUnit(this.fontSize),
        color: this.color,
      };
    },
    companyStyles() {
      return {
        fontSize: getNumberUnit(this.companyFontSize),
        color: this.companyColor,
      }
    }
  },
};
</script>

<style lang="less" scoped></style>
