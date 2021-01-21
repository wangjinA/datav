<!--
 * @Author: 汪锦
 * @Date: 2021-01-18 14:53:33
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-01-18 15:01:56
 * @Description: 单个图层项
-->

<template>
  <li :class="{ active: item.active }" @click="selectHandle" @contextmenu.prevent="onContextmenu">
    <div class="preview-img-box">
      <img :src="item.previewImage" />
    </div>
    <p class="text-overflow" :title="item.name">{{ item.name }}</p>
  </li>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "LayerItem",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    ...mapMutations("layer", ["setActiveLayer"]),
    selectHandle() {
      this.setActiveLayer(this.item);
    },
    onContextmenu() {
      this.selectHandle();
    },
  },
};
</script>

<style lang="less" scoped>
li {
  padding: 0 8px;
  position: relative;
  cursor: pointer;
  color: var(--text-base);
  align-items: center;
  height: 44px;
  padding-left: 12px;
  display: flex;
  &:hover {
    background-color: var(--background-hover);
  }
  &.active {
    background-color: var(--primary-color);
  }
  .preview-img-box {
    width: 45px;
    height: 29px;
    margin-right: 5px;
    flex-shrink: 0;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
