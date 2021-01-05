<!--
 * @Author: 汪锦
 * @Date: 2020-12-29 10:50:20
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-01-05 09:30:12
 * @Description: 右键菜单操作
-->

<template>
  <div class="rightMenuList" v-if="activeLayer">
    <a href="javascript:;" @click="del">删除</a>
    <a @click="copy">复制组件</a>
    <a :href="`${$baseUrl}/api/downloadComponent?name=${activeLayer.componentName}`" target="_blank"
      >下载组件</a
    >
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { deepClone } from "@/lib/utils";
export default {
  name: "RightMenuList",
  computed: {
    ...mapState("layer", ["activeLayer"]),
  },
  methods: {
    ...mapMutations("layer", ["removeLayer", "copyLayer"]),
    ...mapActions("layer", ["updateLayers"]),

    copy() {
      const copyObj = deepClone(this.activeLayer);
      // 复制的时候偏移像素
      const offsetNum = 20;
      if (copyObj.editOption.w != "100%") {
        copyObj.editOption.x = parseInt(copyObj.editOption.x) + offsetNum;
      }
      if (copyObj.editOption.h != "100%") {
        copyObj.editOption.y = parseInt(copyObj.editOption.y) + offsetNum;
      }
      this.copyLayer(copyObj);
    },

    del() {
      this.$delAPI("确认删除：" + this.activeLayer.name).then(() => {
        this.removeLayer(this.activeLayer);
      });
    },
  },
};
</script>

<style lang="less">
.right-menu {
  position: fixed;
  background: #fff;
  border: solid 1px rgba(0, 0, 0, 0.2);
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
.right-menu {
  border: 1px solid #eee;
  box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
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
