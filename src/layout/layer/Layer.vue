<template>
  <div class="Layer">
    <div class="Layer-title">图层</div>
    <ul class="Layer-ul">
      <li
        v-for="item in resourceLayers"
        :key="item.name"
        :class="{ active: item.active }"
        @click="selectHandle(item)"
      >
        <div class="preview-img-box">
          <img :src="item.previewImage" />
        </div>
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Layer",
  computed: {
    ...mapState(["resourceLayers"]),
  },
  methods: {
    selectHandle(item) {
      item.active = true;
    },
  },
};
</script>

<style lang="less" scoped>
.Layer {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  border-right: 1px solid #0d0e10;
  transition: all linear 500ms;
  background: var(--background);
  min-width: 160px;
  max-width: 200px;
  font-size: 14px;
  color: #fafafa;
  flex-shrink: 0;
  &-ul {
    > li {
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
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  &-title {
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    text-align: center;
    background: #2d2f38;
    border-bottom: 1px solid #0d0e10;
  }
}
</style>
