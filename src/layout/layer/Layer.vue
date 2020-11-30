<template>
  <div class="Layer">
    <div class="Layer-title">图层</div>
    <ul class="Layer-ul" ref="layer-ul" @contextmenu.stop>
      <li
        v-for="item in resourceLayers"
        :key="item.$vueKey"
        :class="{ active: item.active }"
        @click="selectHandle(item)"
        @contextmenu.prevent="onContextmenu(item)"
      >
        <div class="preview-img-box">
          <img :src="item.previewImage" />
        </div>
        <p>{{ item.name }}</p>
      </li>
    </ul>
    <Vue-context-menu
      class="right-menu"
      :target="$refs['layer-ul']"
      :show="contextMenuVisible"
      @update:show="(show) => (contextMenuVisible = show)"
    >
      <a href="javascript:;">复制</a>
      <a href="javascript:;">引用</a>
      <a href="javascript:;" @click="del">删除</a>
    </Vue-context-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { component as VueContextMenu } from "@xunlei/vue-context-menu";
export default {
  name: "Layer",
  components: {
    VueContextMenu,
  },
  data() {
    return {
      contextMenuVisible: false
    }
  },
  computed: {
    ...mapState(["resourceLayers"]),
  },
  methods: {
    ...mapMutations(['removeLayer']),

    del() {
      this.$delAPI('确认删除')
      .then(() => {
        this.removeLayer(this.$selectItem)
      })
    },

    onContextmenu(item){
      this.$selectItem = item
    },

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

<style lang="less">
.right-menu {
  position: fixed;
  background: #fff;
  border: solid 1px rgba(0, 0, 0, .2);
  border-radius: 3px;
  z-index: 999;
  display: none;
}
.right-menu a {
  width: 75px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  display: block;
  color: #1a1a1a;
}
.right-menu a:hover {
  background: #eee;
  color: #fff;
}
html,
body {
    height: 100%;
}
.right-menu {
    border: 1px solid #eee;
    box-shadow: 0 0.5em 1em 0 rgba(0,0,0,.1);
    border-radius: 1px;
}
a {
    text-decoration: none;
}
.right-menu a {
    padding: 2px;
}
.right-menu a:hover {
    background: #42b983;
}
</style>